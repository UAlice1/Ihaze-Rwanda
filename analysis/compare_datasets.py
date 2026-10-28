"""
Compare NISR agricultural survey datasets and analyze changes over time.

Usage:
    python analysis/compare_datasets.py --old-period 2016-2017 --new-period 2023-2024
"""

import argparse
import csv
import json
from pathlib import Path
from datetime import datetime

def load_csv_dict(filepath):
    """Load CSV file as list of dictionaries."""
    with open(filepath, encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))

def convert_numeric(value):
    """Convert string to numeric, handling various formats."""
    if value is None or value == '':
        return None
    try:
        n = float(value)
        return int(n) if n.is_integer() else n
    except (ValueError, TypeError):
        return value

def load_dataset_version(base_path, version):
    """Load all data files for a specific version."""
    base = Path(base_path)
    version_suffix = f"_{version.replace('-', '_')}" if version else ""
    
    data = {}
    files = {
        'districts': f'soil_support_by_district{version_suffix}.csv',
        'crops': f'crop_loss_summary{version_suffix}.csv',
        'indicators': f'key_indicators{version_suffix}.csv'
    }
    
    for key, filename in files.items():
        filepath = base / filename
        if filepath.exists():
            data[key] = load_csv_dict(filepath)
            # Convert numeric fields
            for row in data[key]:
                for k, v in row.items():
                    if k not in ('district', 'crop', 'indicator'):
                        row[k] = convert_numeric(v)
        else:
            data[key] = []
    
    return data

def compare_districts(old_data, new_data):
    """Compare district data between two datasets."""
    old_districts = {r['district']: r for r in old_data}
    new_districts = {r['district']: r for r in new_data}
    
    comparison = []
    all_districts = set(old_districts.keys()) | set(new_districts.keys())
    
    for district in sorted(all_districts):
        old = old_districts.get(district, {})
        new = new_districts.get(district, {})
        
        if not old:
            comparison.append({
                'district': district,
                'status': 'new',
                'change': 'District added in new survey'
            })
            continue
        
        if not new:
            comparison.append({
                'district': district,
                'status': 'removed',
                'change': 'District not in new survey'
            })
            continue
        
        # Calculate changes
        changes = {}
        
        # Households
        old_hh = old.get('sample_households', 0)
        new_hh = new.get('sample_households', 0)
        changes['sample_households_change'] = new_hh - old_hh
        changes['sample_households_pct_change'] = ((new_hh - old_hh) / old_hh * 100) if old_hh else None
        
        # Erosion + barrier count
        old_eb = old.get('erosion_and_barrier_n', 0)
        new_eb = new.get('erosion_and_barrier_n', 0)
        changes['erosion_barrier_change'] = new_eb - old_eb
        changes['erosion_barrier_pct_change'] = ((new_eb - old_eb) / old_eb * 100) if old_eb else None
        
        # Erosion + barrier percentage
        old_pct = old.get('erosion_and_barrier_pct', 0)
        new_pct = new.get('erosion_and_barrier_pct', 0)
        changes['erosion_barrier_pct_point_change'] = new_pct - old_pct
        
        # No extension count
        old_ne = old.get('erosion_barrier_no_extension_n', 0)
        new_ne = new.get('erosion_barrier_no_extension_n', 0)
        changes['no_extension_change'] = new_ne - old_ne
        changes['no_extension_pct_change'] = ((new_ne - old_ne) / old_ne * 100) if old_ne else None
        
        # Determine overall trend
        if changes['erosion_barrier_pct_point_change'] > 2:
            trend = 'worsening'
        elif changes['erosion_barrier_pct_point_change'] < -2:
            trend = 'improving'
        else:
            trend = 'stable'
        
        comparison.append({
            'district': district,
            'status': 'compared',
            'trend': trend,
            'old_sample': old_hh,
            'new_sample': new_hh,
            'old_erosion_barrier_n': old_eb,
            'new_erosion_barrier_n': new_eb,
            'old_erosion_barrier_pct': old_pct,
            'new_erosion_barrier_pct': new_pct,
            'old_no_extension_n': old_ne,
            'new_no_extension_n': new_ne,
            **changes
        })
    
    return comparison

def compare_crops(old_data, new_data):
    """Compare crop data between two datasets."""
    old_crops = {r['crop']: r for r in old_data}
    new_crops = {r['crop']: r for r in new_data}
    
    comparison = []
    all_crops = set(old_crops.keys()) | set(new_crops.keys())
    
    for crop in sorted(all_crops):
        old = old_crops.get(crop, {})
        new = new_crops.get(crop, {})
        
        if not old:
            comparison.append({
                'crop': crop,
                'status': 'new',
                'change': 'Crop added in new survey'
            })
            continue
        
        if not new:
            comparison.append({
                'crop': crop,
                'status': 'removed',
                'change': 'Crop not in new survey'
            })
            continue
        
        # Calculate changes
        old_records = old.get('records', 0)
        new_records = new.get('records', 0)
        old_loss_pct = old.get('aggregate_loss_pct', 0)
        new_loss_pct = new.get('aggregate_loss_pct', 0)
        
        comparison.append({
            'crop': crop,
            'status': 'compared',
            'old_records': old_records,
            'new_records': new_records,
            'records_change': new_records - old_records,
            'old_loss_pct': old_loss_pct,
            'new_loss_pct': new_loss_pct,
            'loss_pct_change': new_loss_pct - old_loss_pct,
            'trend': 'worsening' if (new_loss_pct - old_loss_pct) > 1 else 'improving' if (new_loss_pct - old_loss_pct) < -1 else 'stable'
        })
    
    return comparison

def compare_indicators(old_data, new_data):
    """Compare key indicators between two datasets."""
    old_indicators = {r['indicator']: r for r in old_data}
    new_indicators = {r['indicator']: r for r in new_data}
    
    comparison = []
    all_indicators = set(old_indicators.keys()) | set(new_indicators.keys())
    
    for indicator in sorted(all_indicators):
        old = old_indicators.get(indicator, {})
        new = new_indicators.get(indicator, {})
        
        if not old or not new:
            continue
        
        old_num = old.get('numerator', 0)
        new_num = new.get('numerator', 0)
        old_denom = old.get('denominator', 1)
        new_denom = new.get('denominator', 1)
        old_pct = old.get('pct', 0)
        new_pct = new.get('pct', 0)
        
        comparison.append({
            'indicator': indicator,
            'old_numerator': old_num,
            'new_numerator': new_num,
            'old_denominator': old_denom,
            'new_denominator': new_denom,
            'old_pct': old_pct,
            'new_pct': new_pct,
            'pct_point_change': new_pct - old_pct,
            'absolute_change': new_num - old_num,
            'trend': 'increase' if (new_pct - old_pct) > 0.5 else 'decrease' if (new_pct - old_pct) < -0.5 else 'stable'
        })
    
    return comparison

def generate_summary(district_comparison, crop_comparison, indicator_comparison, old_period, new_period):
    """Generate executive summary of changes."""
    summary = {
        'old_period': old_period,
        'new_period': new_period,
        'comparison_date': datetime.now().isoformat(),
        'districts': {
            'total_compared': len([d for d in district_comparison if d['status'] == 'compared']),
            'new': len([d for d in district_comparison if d['status'] == 'new']),
            'removed': len([d for d in district_comparison if d['status'] == 'removed']),
            'improving': len([d for d in district_comparison if d.get('trend') == 'improving']),
            'worsening': len([d for d in district_comparison if d.get('trend') == 'worsening']),
            'stable': len([d for d in district_comparison if d.get('trend') == 'stable'])
        },
        'crops': {
            'total_compared': len([c for c in crop_comparison if c['status'] == 'compared']),
            'new': len([c for c in crop_comparison if c['status'] == 'new']),
            'removed': len([c for c in crop_comparison if c['status'] == 'removed']),
            'loss_increasing': len([c for c in crop_comparison if c.get('trend') == 'worsening']),
            'loss_decreasing': len([c for c in crop_comparison if c.get('trend') == 'improving']),
            'loss_stable': len([c for c in crop_comparison if c.get('trend') == 'stable'])
        },
        'indicators': {}
    }
    
    # Add specific indicator changes
    for ind in indicator_comparison:
        key = ind['indicator'].lower().replace(' ', '_')
        summary['indicators'][key] = {
            'old': ind['old_pct'],
            'new': ind['new_pct'],
            'change': ind['pct_point_change'],
            'trend': ind['trend']
        }
    
    return summary

def generate_report(comparison_data, output_path):
    """Generate human-readable markdown report."""
    old_period = comparison_data['summary']['old_period']
    new_period = comparison_data['summary']['new_period']
    
    report = f"""# NISR Agricultural Survey Change Analysis

**Comparing:** {old_period} vs {new_period}  
**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M')}

---

## Executive Summary

### Districts
- **Compared:** {comparison_data['summary']['districts']['total_compared']} districts
- **Improving:** {comparison_data['summary']['districts']['improving']} districts (erosion+barrier rate decreased)
- **Worsening:** {comparison_data['summary']['districts']['worsening']} districts (erosion+barrier rate increased)
- **Stable:** {comparison_data['summary']['districts']['stable']} districts (minimal change)
- **New:** {comparison_data['summary']['districts']['new']} districts added
- **Removed:** {comparison_data['summary']['districts']['removed']} districts not in new survey

### Crops
- **Compared:** {comparison_data['summary']['crops']['total_compared']} crops
- **Loss Increasing:** {comparison_data['summary']['crops']['loss_increasing']} crops
- **Loss Decreasing:** {comparison_data['summary']['crops']['loss_decreasing']} crops
- **Stable:** {comparison_data['summary']['crops']['loss_stable']} crops

### Key Indicators

"""
    
    for indicator, data in comparison_data['summary']['indicators'].items():
        change_icon = '📈' if data['trend'] == 'increase' else '📉' if data['trend'] == 'decrease' else '➡️'
        report += f"- **{indicator.replace('_', ' ').title()}:** {data['old']:.2f}% → {data['new']:.2f}% ({data['change']:+.2f} pp) {change_icon}\n"
    
    report += "\n---\n\n## District-Level Changes\n\n"
    report += "### Top 10 Improving Districts\n\n"
    
    improving = [d for d in comparison_data['districts'] if d['status'] == 'compared']
    improving.sort(key=lambda x: x.get('erosion_barrier_pct_point_change', 0))
    
    for d in improving[:10]:
        report += f"**{d['district']}**\n"
        report += f"- Erosion+Barrier: {d['old_erosion_barrier_pct']:.1f}% → {d['new_erosion_barrier_pct']:.1f}% ({d['erosion_barrier_pct_point_change']:+.1f} pp)\n"
        report += f"- No Extension: {d['old_no_extension_n']} → {d['new_no_extension_n']} ({d['no_extension_change']:+d})\n\n"
    
    report += "\n### Top 10 Worsening Districts\n\n"
    
    worsening = [d for d in comparison_data['districts'] if d['status'] == 'compared']
    worsening.sort(key=lambda x: x.get('erosion_barrier_pct_point_change', 0), reverse=True)
    
    for d in worsening[:10]:
        report += f"**{d['district']}**\n"
        report += f"- Erosion+Barrier: {d['old_erosion_barrier_pct']:.1f}% → {d['new_erosion_barrier_pct']:.1f}% ({d['erosion_barrier_pct_point_change']:+.1f} pp)\n"
        report += f"- No Extension: {d['old_no_extension_n']} → {d['new_no_extension_n']} ({d['no_extension_change']:+d})\n\n"
    
    report += "\n---\n\n## Crop Loss Changes\n\n"
    
    crop_changes = [c for c in comparison_data['crops'] if c['status'] == 'compared' and c.get('loss_pct_change')]
    crop_changes.sort(key=lambda x: abs(x['loss_pct_change']), reverse=True)
    
    for c in crop_changes[:15]:
        change_icon = '⚠️' if c['loss_pct_change'] > 0 else '✅' if c['loss_pct_change'] < 0 else '➡️'
        report += f"**{c['crop']}** {change_icon}\n"
        report += f"- Loss Rate: {c['old_loss_pct']:.2f}% → {c['new_loss_pct']:.2f}% ({c['loss_pct_change']:+.2f} pp)\n"
        report += f"- Records: {c['old_records']} → {c['new_records']} ({c['records_change']:+d})\n\n"
    
    report += "\n---\n\n## Interpretation Notes\n\n"
    report += "**Percentage Point (pp) vs Percentage:**\n"
    report += "- A change from 60% to 65% is +5 percentage points\n"
    report += "- This is an 8.3% relative increase (5/60)\n\n"
    report += "**Trends:**\n"
    report += "- **Improving:** Rate decreased by >2 percentage points\n"
    report += "- **Worsening:** Rate increased by >2 percentage points\n"
    report += "- **Stable:** Change within ±2 percentage points\n\n"
    report += "**Limitations:**\n"
    report += "- Sample sizes may differ between surveys\n"
    report += "- Survey methodology may have changed\n"
    report += "- Changes may reflect better data collection, not just real changes\n"
    report += "- Always validate trends with NISR methodology notes\n\n"
    
    report += f"\n---\n\n*Generated by Ihaze Rwanda Change Analysis System*\n"
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report)
    
    return report

def main():
    parser = argparse.ArgumentParser(description='Compare NISR agricultural survey datasets')
    parser.add_argument('--base-path', default='.', help='Base path containing data files')
    parser.add_argument('--old-period', required=True, help='Old period identifier (e.g., 2016-2017)')
    parser.add_argument('--new-period', required=True, help='New period identifier (e.g., 2023-2024)')
    parser.add_argument('--output-json', default='change_analysis.json', help='Output JSON file')
    parser.add_argument('--output-report', default='change_analysis_report.md', help='Output markdown report')
    
    args = parser.parse_args()
    
    print(f"Loading {args.old_period} data...")
    old_data = load_dataset_version(args.base_path, args.old_period)
    
    print(f"Loading {args.new_period} data...")
    new_data = load_dataset_version(args.base_path, args.new_period)
    
    print("Comparing districts...")
    district_comparison = compare_districts(old_data['districts'], new_data['districts'])
    
    print("Comparing crops...")
    crop_comparison = compare_crops(old_data['crops'], new_data['crops'])
    
    print("Comparing indicators...")
    indicator_comparison = compare_indicators(old_data['indicators'], new_data['indicators'])
    
    print("Generating summary...")
    summary = generate_summary(district_comparison, crop_comparison, indicator_comparison, 
                               args.old_period, args.new_period)
    
    comparison_data = {
        'summary': summary,
        'districts': district_comparison,
        'crops': crop_comparison,
        'indicators': indicator_comparison
    }
    
    print(f"Saving JSON to {args.output_json}...")
    with open(args.output_json, 'w', encoding='utf-8') as f:
        json.dump(comparison_data, f, indent=2, ensure_ascii=False)
    
    print(f"Generating report to {args.output_report}...")
    generate_report(comparison_data, args.output_report)
    
    print("\n✅ Change analysis complete!")
    print(f"\nSummary:")
    print(f"- {summary['districts']['total_compared']} districts compared")
    print(f"- {summary['districts']['improving']} improving, {summary['districts']['worsening']} worsening")
    print(f"- {summary['crops']['total_compared']} crops compared")
    print(f"\nFiles generated:")
    print(f"- {args.output_json}")
    print(f"- {args.output_report}")

if __name__ == '__main__':
    main()
