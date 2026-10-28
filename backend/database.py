"""Optional PostgreSQL aggregate snapshot store. No microdata are imported."""
import json
import os
from pathlib import Path
import csv

FILES = ('soil_support_by_district.csv', 'crop_loss_summary.csv', 'key_indicators.csv')
VERSION = 'agricultural-2017-v1'

def connect():
    import psycopg
    url = os.getenv('AGRI_DATABASE_URL')
    if not url:
        raise RuntimeError('Set AGRI_DATABASE_URL on the server')
    return psycopg.connect(url, connect_timeout=10)

def load(filename):
    if filename not in FILES:
        raise ValueError('Unsupported aggregate table')
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT payload FROM agri_aggregate_snapshots WHERE dataset_version=%s AND table_name=%s', (VERSION, filename))
            row = cur.fetchone()
    if row is None:
        raise RuntimeError('Aggregate snapshot missing; run python -m backend.database')
    return row[0]

def import_snapshots():
    from psycopg.types.json import Jsonb
    root = Path(__file__).resolve().parents[1]
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute((Path(__file__).with_name('schema.sql')).read_text())
            for filename in FILES:
                with (root/filename).open(encoding='utf-8-sig', newline='') as f:
                    payload = list(csv.DictReader(f))
                cur.execute('''INSERT INTO agri_aggregate_snapshots(dataset_version,table_name,period,payload)
                    VALUES(%s,%s,%s,%s) ON CONFLICT(dataset_version,table_name)
                    DO UPDATE SET payload=EXCLUDED.payload, imported_at=CURRENT_TIMESTAMP''',
                    (VERSION, filename, '2016–2017', Jsonb(payload)))
    print('Imported 3 aggregate snapshots. No household records were imported.')

if __name__ == '__main__':
    import_snapshots()
