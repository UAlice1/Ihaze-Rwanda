"""Local standard-library API and static frontend. Run: python -m backend.server"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit, parse_qs
import argparse
import json
import os
from pathlib import Path
from . import service

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    dotenv_path = Path(__file__).resolve().parents[1] / '.env'
    if dotenv_path.exists():
        load_dotenv(dotenv_path)
        print(f'✓ Loaded environment from {dotenv_path}')
except ImportError:
    pass  # python-dotenv not installed, use system environment variables

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(service.ROOT/'dist'), **kwargs)

    def json_response(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False, allow_nan=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Length', str(len(body)))
        # CORS headers for local development
        origin = self.headers.get('Origin')
        allowed_origins = ['http://127.0.0.1:3000', 'http://localhost:3000']
        if origin in allowed_origins:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = urlsplit(self.path)
        if not path.path.startswith('/api/'):
            return super().do_GET()
        try:
            query = parse_qs(path.query)
            if path.path == '/api/health':
                result = {'status': 'ok', 'dataset': 'agricultural-2017-v1', 'ai_configured': service.ai_ready()}
            elif path.path == '/api/districts':
                result = service.districts(query.get('q', [''])[0], query.get('sort', ['share'])[0])
            elif path.path == '/api/crops':
                result = service.crops()
            elif path.path == '/api/indicators':
                result = service.indicators()
            elif path.path == '/api/metadata':
                result = service.META
            elif path.path == '/api/research':
                result = service.research()
            elif path.path == '/api/changes':
                changes = service.change_analysis()
                if changes:
                    result = changes
                else:
                    result = {'available': False, 'message': 'No change analysis available. Run analysis/compare_datasets.py to generate.'}
            else:
                raise service.APIError('Endpoint not found', 404)
            self.json_response(result)
        except service.APIError as e:
            self.json_response({'error': str(e)}, e.status)

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        origin = self.headers.get('Origin')
        allowed_origins = ['http://127.0.0.1:3000', 'http://localhost:3000']
        if origin in allowed_origins:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Access-Control-Max-Age', '86400')
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_POST(self):
        try:
            # Same-origin local application; do not let other websites invoke paid AI.
            origin = self.headers.get('Origin')
            allowed_origins = {'http://'+self.headers.get('Host', ''), 'http://127.0.0.1:3000', 'http://localhost:3000', os.getenv('AGRI_FRONTEND_ORIGIN', '')}
            if origin and origin not in allowed_origins:
                raise service.APIError('Cross-origin requests are not allowed', 403)
            try:
                length = int(self.headers.get('Content-Length', '0'))
            except ValueError:
                raise service.APIError('Invalid content length')
            if not 0 < length <= 8192:
                raise service.APIError('Request must be 1–8192 bytes', 413)
            if self.headers.get('Content-Type', '').split(';')[0] != 'application/json':
                raise service.APIError('Content-Type must be application/json', 415)
            try:
                body = json.loads(self.rfile.read(length))
            except (ValueError, UnicodeDecodeError):
                raise service.APIError('Invalid JSON')
            path = urlsplit(self.path).path
            if path == '/api/plan':
                result = service.plan(body)
            elif path == '/api/ask':
                result = service.ask(body)
            else:
                raise service.APIError('Endpoint not found', 404)
            self.json_response(result)
        except service.APIError as e:
            self.json_response({'error': str(e)}, e.status)

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--port', type=int, default=8765)
    args = p.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(f'Ihaze Rwanda: http://127.0.0.1:{args.port}', flush=True)
    print('Local development only. Ctrl+C to stop.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
