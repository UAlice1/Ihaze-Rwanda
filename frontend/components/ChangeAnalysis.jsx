'use client';
import { useEffect, useState } from 'react';

const panel = 'rounded-xl border border-[#e0e7df] bg-white p-5 sm:p-7';

function TrendBadge({ trend }) {
  const config = {
    improving: { icon: '📉', text: 'Improving', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    worsening: { icon: '📈', text: 'Worsening', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    stable: { icon: '➡️', text: 'Stable', bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
    increase: { icon: '↗️', text: 'Increased', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    decrease: { icon: '↘️', text: 'Decreased', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
  };
  
  const c = config[trend] || config.stable;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${c.bg} ${c.text} ${c.border}`}>
      <span>{c.icon}</span>
      <span>{c.text}</span>
    </span>
  );
}

function ChangeSummary({ summary }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Districts Summary */}
      <div className={`${panel} border-l-4 border-l-[#8eac65]`}>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#245a3f]">
          <span>📍</span>
          District Changes
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#728178]">Compared</span>
            <strong className="text-[#245a3f]">{summary.districts.total_compared}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600">Improving</span>
            <strong className="text-green-700">{summary.districts.improving}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-red-600">Worsening</span>
            <strong className="text-red-700">{summary.districts.worsening}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Stable</span>
            <strong className="text-gray-700">{summary.districts.stable}</strong>
          </div>
        </div>
      </div>

      {/* Crops Summary */}
      <div className={`${panel} border-l-4 border-l-[#8eac65]`}>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#245a3f]">
          <span>🌾</span>
          Crop Changes
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#728178]">Compared</span>
            <strong className="text-[#245a3f]">{summary.crops.total_compared}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-red-600">Loss Increasing</span>
            <strong className="text-red-700">{summary.crops.loss_increasing}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600">Loss Decreasing</span>
            <strong className="text-green-700">{summary.crops.loss_decreasing}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Stable</span>
            <strong className="text-gray-700">{summary.crops.loss_stable}</strong>
          </div>
        </div>
      </div>

      {/* Indicators Summary */}
      <div className={`${panel} border-l-4 border-l-[#8eac65]`}>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#245a3f]">
          <span>📊</span>
          Key Indicators
        </h3>
        <div className="space-y-3 text-xs">
          {Object.entries(summary.indicators).slice(0, 4).map(([key, data]) => (
            <div key={key} className="rounded bg-[#f8faf5] p-2">
              <div className="mb-1 font-medium text-[#526847]">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#88948a]">
                  {data.old.toFixed(1)}% → {data.new.toFixed(1)}%
                </span>
                <TrendBadge trend={data.trend} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DistrictChanges({ districts }) {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 10;
  
  const filtered = districts
    .filter(d => d.status === 'compared' && (filter === 'all' || d.trend === filter))
    .sort((a, b) => 
      filter === 'improving' ? a.erosion_barrier_pct_point_change - b.erosion_barrier_pct_point_change :
      filter === 'worsening' ? b.erosion_barrier_pct_point_change - a.erosion_barrier_pct_point_change :
      Math.abs(b.erosion_barrier_pct_point_change) - Math.abs(a.erosion_barrier_pct_point_change)
    );
  
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedRows = filtered.slice((page - 1) * perPage, page * perPage);
  const goToPage = (p) => { if (p >= 1 && p <= totalPages) setPage(p) };
  
  return (
    <section className={panel}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-[#245a3f]">District-Level Changes</h2>
        <div className="flex gap-2">
          {['all', 'improving', 'worsening', 'stable'].map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === f
                  ? 'bg-[#245a3f] text-white'
                  : 'border border-[#d7e0d3] bg-white text-[#526847] hover:bg-[#f0f4e9]'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f5f7f2] text-xs uppercase tracking-wide text-[#849184]">
            <tr>
              <th className="p-4">District</th>
              <th className="p-4">Old Rate</th>
              <th className="p-4">New Rate</th>
              <th className="p-4">Change</th>
              <th className="p-4">Trend</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map(d => (
              <tr key={d.district} className="border-b border-[#edf0ea]">
                <td className="p-4 font-semibold text-[#245a3f]">{d.district}</td>
                <td className="p-4 text-[#728178]">{d.old_erosion_barrier_pct.toFixed(1)}%</td>
                <td className="p-4 text-[#728178]">{d.new_erosion_barrier_pct.toFixed(1)}%</td>
                <td className={`p-4 font-semibold ${
                  d.erosion_barrier_pct_point_change > 0 ? 'text-red-600' : 
                  d.erosion_barrier_pct_point_change < 0 ? 'text-green-600' : 
                  'text-gray-600'
                }`}>
                  {d.erosion_barrier_pct_point_change > 0 ? '+' : ''}
                  {d.erosion_barrier_pct_point_change.toFixed(1)} pp
                </td>
                <td className="p-4">
                  <TrendBadge trend={d.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          No districts match the selected filter.
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-[#edf0ea] pt-6">
          <div className="text-sm text-[#728178]">
            Showing {((page - 1) * perPage) + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length} districts
          </div>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <button onClick={() => goToPage(page - 1)} className="rounded-lg border border-[#d7e0d3] bg-white px-4 py-2 text-sm hover:bg-[#f0f4e9]">
                ← Previous
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .map((p, i, arr) => (
                <span key={p}>
                  {i > 0 && arr[i - 1] !== p - 1 && <span className="px-2 text-[#88948a]">...</span>}
                  <button
                    onClick={() => goToPage(p)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      p === page
                        ? 'bg-[#245a3f] text-white'
                        : 'border border-[#d7e0d3] bg-white text-[#526847] hover:bg-[#f0f4e9]'
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}
            {page < totalPages && (
              <button onClick={() => goToPage(page + 1)} className="rounded-lg border border-[#d7e0d3] bg-white px-4 py-2 text-sm hover:bg-[#f0f4e9]">
                Next →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default function ChangeAnalysis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/changes')
      .then(res => res.json())
      .then(result => {
        if (result.available === false) {
          setError('No change analysis available yet. Data comparison will appear here when multiple survey periods are available.');
        } else {
          setData(result);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Unable to load change analysis.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#e0e7df] border-t-[#8eac65] mx-auto"></div>
          <p className="text-sm text-[#728178]">Loading change analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border-2 border-dashed border-[#e0e7df] bg-[#f8faf5] p-12 text-center">
        <div className="mb-4 text-5xl">📊</div>
        <h2 className="mb-3 text-xl font-bold text-[#245a3f]">Change Analysis Coming Soon</h2>
        <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-[#728178]">
          {error || 'Change analysis will automatically appear here when you update the platform with new NISR survey data. The system will compare surveys and highlight trends, improvements, and areas needing attention.'}
        </p>
        <div className="mx-auto max-w-xl rounded-lg bg-white p-6 text-left">
          <p className="mb-3 text-sm font-semibold text-[#245a3f]">When you update data, you'll see:</p>
          <ul className="space-y-2 text-sm text-[#728178]">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>District-by-district trend analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Crop loss pattern changes over time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Extension coverage improvements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Barrier pattern shifts</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6d8e76]">
          Survey Comparison
        </div>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#245a3f]">
          Change Analysis: {data.summary.old_period} vs {data.summary.new_period}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[#728178]">
          Automatically generated analysis comparing agricultural indicators across survey periods. 
          Trends highlight areas of improvement and concern to inform extension planning.
        </p>
      </div>

      {/* Summary Cards */}
      <ChangeSummary summary={data.summary} />

      {/* District Changes */}
      <DistrictChanges districts={data.districts} />

      {/* Interpretation Note */}
      <div className="rounded-xl border-l-4 border-[#8eac65] bg-[#f0f4e9] p-6">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-[#245a3f]">
          <span>💡</span>
          How to Interpret Changes
        </h3>
        <div className="space-y-2 text-sm leading-relaxed text-[#526847]">
          <p>
            <strong>Percentage Points (pp):</strong> A change from 60% to 65% is +5 percentage points. This represents an 8.3% relative increase.
          </p>
          <p>
            <strong>Trend Categories:</strong> Improving (decrease &gt;2pp), Worsening (increase &gt;2pp), Stable (±2pp or less).
          </p>
          <p>
            <strong>Important:</strong> Changes may reflect survey methodology improvements, not just real-world shifts. Always cross-reference with NISR documentation and validate trends before making policy decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
