# Automatic Change Analysis System 🔄

## What is This?

Your Ihaze Rwanda platform now includes an **automatic change analysis system** that compares different NISR survey periods and shows you exactly what changed, what improved, and what got worse.

## ✅ What You Can Do Now

### 1. **Automatic Data Updates**
- Replace CSV files → Platform updates instantly
- No code changes needed
- Everything propagates automatically

### 2. **Automatic Change Analysis**  
- Run one script → Get complete trend analysis
- Compare any two survey periods
- See improvements and concerns at a glance

### 3. **Visual Change Dashboard**
- New "Change Analysis" page in dashboard
- Interactive filtering (improving/worsening/stable)
- Trend badges and color coding
- Export capabilities

## 🚀 How to Use When New NISR Data Arrives

### Step 1: Update Data Files

```cmd
# When you get new 2024 data:
cd C:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight

# Backup old data
mkdir backups\2016-2017
copy *.csv backups\2016-2017\

# Run analysis on new data
set AGRI_DATA_ROOT=C:\path\to\new\spss\files
python analysis\analyze.py
python analysis\findings.py

# Copy new aggregates (with version suffix)
copy outputs\soil_support_by_district.csv soil_support_by_district_2023-2024.csv
copy outputs\crop_loss_summary.csv crop_loss_summary_2023-2024.csv
copy outputs\key_indicators.csv key_indicators_2023-2024.csv
```

### Step 2: Run Change Analysis

```cmd
# Compare old vs new
python analysis\compare_datasets.py --old-period 2016-2017 --new-period 2023-2024

# This generates:
# - change_analysis.json (data for platform)
# - change_analysis_report.md (human-readable report)
```

### Step 3: View in Dashboard

```
# Restart servers
python -m backend.server
cd frontend && npm run dev

# Visit
http://127.0.0.1:3000/dashboard#changes
```

**That's it!** ✅ The platform now shows:
- Which districts improved
- Which districts worsened  
- Crop loss trends
- Extension coverage changes
- All with color-coded trend indicators

## 📊 What Gets Analyzed

### District-Level Changes
- ✅ Sample size changes
- ✅ Erosion + barrier rate shifts
- ✅ No-extension household changes
- ✅ Trend categorization (improving/worsening/stable)

### Crop-Level Changes
- ✅ Record count changes
- ✅ Loss rate shifts
- ✅ Production pattern changes
- ✅ New/removed crops identified

### Key Indicators
- ✅ Extension coverage trends
- ✅ Barrier distribution shifts
- ✅ Service gap changes
- ✅ Any custom indicators

## 🎯 Example Output

###Generated Automatically

**JSON (for dashboard):**
```json
{
  "summary": {
    "old_period": "2016-2017",
    "new_period": "2023-2024",
    "districts": {
      "total_compared": 30,
      "improving": 12,
      "worsening": 8,
      "stable": 10
    },
    "indicators": {
      "extension_coverage": {
        "old": 26.8,
        "new": 31.2,
        "change": 4.4,
        "trend": "increase"
      }
    }
  },
  "districts": [...]
}
```

**Markdown Report:**
```markdown
# Change Analysis: 2016-2017 vs 2023-2024

## Executive Summary

Districts:
- Improving: 12 districts (erosion+barrier rate decreased)
- Worsening: 8 districts (erosion+barrier rate increased)
- Stable: 10 districts (minimal change)

Extension Coverage: 26.8% → 31.2% (+4.4 pp) 📈

## Top 5 Improving Districts
1. Gakenke: 45.2% → 38.1% (-7.1 pp)
2. Musanze: 42.7% → 36.4% (-6.3 pp)
...
```

## 🎨 Dashboard Features

### 1. Summary Cards
- District changes overview
- Crop trends summary
- Key indicators at a glance

### 2. District Comparison Table
- Filter by trend (improving/worsening/stable/all)
- Color-coded change values
- Sortable by change magnitude
- Trend badges

### 3. Trend Indicators
- 📉 Improving (green)
- 📈 Worsening (red)
- ➡️ Stable (gray)
- ↗️ Increased (blue)
- ↘️ Decreased (green)

### 4. Interpretation Guide
- Explains percentage points vs percentages
- Survey methodology notes
- Validation reminders

## 🔧 Technical Details

### Files Created

**Analysis Script:**
```
analysis/compare_datasets.py
- Loads old and new data versions
- Compares all indicators
- Generates JSON and markdown
- Fully automated
```

**Frontend Component:**
```
frontend/components/ChangeAnalysis.jsx
- Fetches change data from API
- Displays interactive comparison
- Filtering and sorting
- Responsive design
```

**Backend Integration:**
```
backend/service.py - change_analysis() function
backend/server.py - /api/changes endpoint
```

### How It Works

```
┌────────────────────────────────────┐
│ Old Data (2016-2017)               │
│ - soil_support_by_district.csv     │
│ - crop_loss_summary.csv            │
│ - key_indicators.csv               │
└────────────────┬───────────────────┘
                 │
                 ├─► compare_datasets.py
                 │
┌────────────────▼───────────────────┐
│ New Data (2023-2024)               │
│ - soil_support_by_district.csv     │
│ - crop_loss_summary.csv            │
│ - key_indicators.csv               │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│ Change Analysis Outputs            │
│ - change_analysis.json             │
│ - change_analysis_report.md        │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│ Dashboard Display                  │
│ - Summary cards                    │
│ - Comparison tables                │
│ - Trend visualization              │
└────────────────────────────────────┘
```

## 📋 Quick Reference

### Commands

**Run change analysis:**
```cmd
python analysis\compare_datasets.py --old-period 2016-2017 --new-period 2023-2024
```

**Custom output files:**
```cmd
python analysis\compare_datasets.py ^
  --old-period 2016-2017 ^
  --new-period 2023-2024 ^
  --output-json custom_analysis.json ^
  --output-report custom_report.md
```

**Specify base path:**
```cmd
python analysis\compare_datasets.py ^
  --base-path C:\path\to\data ^
  --old-period 2016-2017 ^
  --new-period 2023-2024
```

### API Endpoints

**Get change analysis:**
```
GET /api/changes
```

Returns full comparison data if available, or:
```json
{
  "available": false,
  "message": "No change analysis available. Run analysis/compare_datasets.py to generate."
}
```

## 🎓 Interpretation Guidelines

### Percentage Points (pp) vs Percentages

**Example:**
- Old rate: 60%
- New rate: 65%
- Change: **+5 percentage points** (pp)
- This is an 8.3% relative increase (5/60)

### Trend Categories

**Improving:** Rate decreased by >2 percentage points
- Example: Erosion+barrier rate 45% → 40% (-5 pp)
- Meaning: Fewer households face these problems

**Worsening:** Rate increased by >2 percentage points
- Example: Erosion+barrier rate 40% → 45% (+5 pp)
- Meaning: More households face these problems

**Stable:** Change within ±2 percentage points
- Example: Erosion+barrier rate 42% → 43% (+1 pp)
- Meaning: Minimal change

### Important Caveats

⚠️ **Survey methodology may change**
- Questions may be worded differently
- Sampling strategy may differ
- Response categories may change

⚠️ **Sample sizes matter**
- Larger samples = more reliable trends
- Small changes in small samples = less significant

⚠️ **Correlation ≠ Causation**
- Trends show association, not cause
- Field validation always needed
- Cross-reference with other sources

## 🌟 Benefits

### For Extension Officers
- ✅ See which districts improved (success stories!)
- ✅ Identify emerging problem areas
- ✅ Track intervention impact over time
- ✅ Justify resource allocation decisions

### For Program Managers
- ✅ Measure progress toward goals
- ✅ Identify effective strategies
- ✅ Allocate resources based on trends
- ✅ Report outcomes to stakeholders

### For Researchers
- ✅ Longitudinal data analysis
- ✅ Trend identification
- ✅ Pattern recognition
- ✅ Hypothesis generation

## 🔮 Future Enhancements

### Planned Features
- 📊 Multi-period comparison (3+ surveys)
- 📈 Trend visualization charts
- 🗺️ Geographic heat maps of change
- 📧 Automated email reports
- 🤖 AI-powered trend interpretation
- 📱 Mobile-optimized change views

### Possible Extensions
- Compare specific districts in detail
- Crop-specific deep dives
- Barrier pattern evolution
- Seasonal trend analysis

## ✅ Summary

**What You Built:**
- ✅ Automatic data update system
- ✅ Change comparison script
- ✅ Visual change dashboard
- ✅ Trend categorization
- ✅ Markdown report generation
- ✅ API integration
- ✅ Interactive filtering

**What It Does:**
- 🔄 Compares any two NISR survey periods
- 📊 Analyzes 30 districts, 20+ crops, multiple indicators
- 🎨 Shows visual trends with color coding
- 📝 Generates human-readable reports
- ⚡ Updates automatically when data changes
- 🔍 Helps identify successes and concerns

**How It Helps:**
- 💡 Evidence-based priority setting
- 📈 Progress tracking over time
- 🎯 Resource allocation decisions
- 📢 Stakeholder communication
- 🏆 Success story identification

---

**Your platform is now a complete trend analysis system!** 🎉

When NISR publishes new data, you can:
1. Update data files (2-4 hours)
2. Run comparison script (5 minutes)
3. View trends in dashboard (instant)
4. Share reports with team (PDF/markdown)

**Evidence-based decisions, powered by automatic change analysis.** 🌾📊

---

## 📞 Support

**For help:**
- See `DATA_UPDATE_GUIDE.md` for data updates
- See `AI_FEATURES_GUIDE.md` for AI features
- See `README.md` for general information

**Generated Files:**
- `change_analysis.json` - Dashboard data
- `change_analysis_report.md` - Human report
- `analysis/compare_datasets.py` - Comparison script

**🌾 Ihaze Rwanda** - Now with automatic trend analysis!
