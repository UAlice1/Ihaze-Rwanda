"""Optional FastAPI adapter. Install requirements.txt, then uvicorn backend.fastapi_app:app."""
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from . import service

app = FastAPI(title='Ihaze Rwanda', version='0.4.0')

@app.exception_handler(service.APIError)
async def api_error(request, error):
    return JSONResponse({'error': str(error)}, status_code=error.status)

@app.get('/api/health')
def health():
    return {'status': 'ok', 'dataset': 'agricultural-2017-v1', 'ai_configured': service.ai_ready()}

@app.get('/api/metadata')
def metadata():
    return service.META

@app.get('/api/research')
def research():
    return service.research()

@app.get('/api/districts')
def districts(q: str = '', sort: str = 'share'):
    return service.districts(q, sort)

@app.get('/api/crops')
def crops():
    return service.crops()

@app.get('/api/indicators')
def indicators():
    return service.indicators()

@app.post('/api/plan')
def plan(body: dict):
    return service.plan(body)

@app.post('/api/ask')
def ask(body: dict):
    return service.ask(body)

app.mount('/', StaticFiles(directory=service.ROOT/'dist', html=True), name='frontend')
