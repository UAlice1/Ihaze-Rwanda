CREATE TABLE IF NOT EXISTS agri_aggregate_snapshots (
    dataset_version TEXT NOT NULL,
    table_name TEXT NOT NULL CHECK (table_name IN ('soil_support_by_district.csv', 'crop_loss_summary.csv', 'key_indicators.csv')),
    period TEXT NOT NULL,
    payload JSONB NOT NULL CHECK (jsonb_typeof(payload) = 'array'),
    imported_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (dataset_version, table_name)
);
