# Data Update Guide - Ihaze Rwanda 📊

## Overview

Your Ihaze Rwanda platform is built to support data updates when NISR releases new agricultural surveys. This guide explains how to update the platform with new data.

## 🎯 Current Data

**Active Dataset:**
- **Source:** NISR Agricultural Household Survey
- **Period:** 2016–2017 (Agricultural Year)
- **Coverage:** 16,057 households, 30 districts
- **Format:** Pre-processed aggregate CSV files

**Data Files Currently Used:**
```
📁 Project Root
├── soil_support_by_district.csv      (District aggregates)
├── crop_loss_summary.csv             (Crop production/losses)
├── key_indicators.csv                (Summary indicators)
└── research.json                     (Research workspace data)

📁 frontend/data
├── research.json                     (Copy for frontend)
└── snapshot.json                     (Dashboard snapshot)

📁 dist
└── data.js                           (Legacy dashboard data)
```

## ✅ Yes, Data Can Be Updated!

### When to Update

**You should update when:**
- ✅ NISR releases new agricultural survey data (e.g., 2023-2024)
- ✅ You receive updated/corrected historical data
- ✅ Survey design weights become available
- ✅ Additional districts or crops are added

**Platform automatically:**
- ✅ Reads new CSV files on restart
- ✅ Updates all statistics
- ✅ Recalculates all endpoints
- ✅ Shows new data in dashboard

## 📋 Step-by-Step Update Process

### Phase 1: Obtain New Data from NISR

#### 1.1 Access NISR Microdata Portal
```
https://microdata.statistics.gov.rw/index.php/catalog
```

#### 1.2 Request Access
- Register for microdata access
- Submit research proposal (if required)
- Agree to terms and conditions
- Download authorized SPSS files

#### 1.3 Expected Files
New survey should include sections:
- S0: General household information
- S3: Extension services
- S4: Financial access
- S5: Agricultural inputs
- S6: Practices (erosion, barriers)
- S8_A/B: Production and losses
- S2: Land (for yield calculations, if available)

### Phase 2: Process New Data

#### 2.1 Set Up Analysis Environment

**Create analysis directory:**
```cmd
mkdir C:\ihaze_analysis_2024
cd C:\ihaze_analysis_2024
mkdir spss
mkdir work
mkdir outputs
```

**Install required packages:**
```cmd
pip install pandas numpy
```

#### 2.2 Place NISR Files
```
C:\ihaze_analysis_2024\
└── spss\
    ├── S0_*.sav
    ├── S3_*.sav
    ├── S4_*.sav
    ├── S5_*.sav
    ├── S6_*.sav
    ├── S8A_*.sav
    └── S8B_*.sav
```

#### 2.3 Configure Analysis Scripts

**Set environment variable:**
```cmd
set AGRI_DATA_ROOT=C:\ihaze_analysis_2024
```

**Run extraction:**
```cmd
cd C:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight

python analysis\analyze.py
```

**This creates:**
- `work/` - Intermediate pickles
- `outputs/` - Analysis results
- `outputs/data_inventory.json` - Data validation

#### 2.4 Generate Aggregates

**Run findings analysis:**
```cmd
python analysis\findings.py
```

**Run research analysis:**
```cmd
python analysis\research.py --data-root C:\ihaze_analysis_2024 --output research.json
```

**Generates:**
- `soil_support_by_district.csv`
- `crop_loss_summary.csv`
- `key_indicators.csv`
- `research.json`

### Phase 3: Update Platform Files

#### 3.1 Backup Current Data
```cmd
mkdir backup_2016-2017
copy *.csv backup_2016-2017\
copy research.json backup_2016-2017\
```

#### 3.2 Copy New Aggregates
```cmd
copy C:\ihaze_analysis_2024\outputs\soil_support_by_district.csv .
copy C:\ihaze_analysis_2024\outputs\crop_loss_summary.csv .
copy C:\ihaze_analysis_2024\outputs\key_indicators.csv .
copy C:\ihaze_analysis_2024\outputs\research.json .
```

#### 3.3 Update Frontend Data
```cmd
copy research.json frontend\data\
copy research.json frontend\public\
```

### Phase 4: Update Metadata

#### 4.1 Update Backend Metadata

**Edit `backend/service.py`:**
```python
META = {
    'period': '2023–2024',  # ← UPDATE THIS
    'weighting': 'unweighted sample descriptions',
    'validation': 'Independent SPSS extraction pending',
    'limitations': [
        'Historical, not current conditions',
        'Associations do not prove causation',
        'District comparisons are not certified prevalence rankings'
    ]
}
```

#### 4.2 Update Frontend Labels

**If needed, update Dashboard.jsx:**
```javascript
// Find and update period references
<div className="text-[10px] text-[#77867d]">
  2023–2024 AGRICULTURAL DATA  {/* ← UPDATE */}
</div>
```

### Phase 5: Database Update (If Using PostgreSQL)

#### 5.1 Import New Data
```cmd
set AGRI_DATABASE_URL=postgresql://user:pass@host:5432/ihaze
python -m backend.database
```

**This will:**
- Create new dataset version (e.g., `agricultural-2024-v1`)
- Upsert district, crop, and indicator tables
- Preserve old versions

#### 5.2 Verify Import
```sql
SELECT DISTINCT dataset_version FROM districts;
-- Should show: agricultural-2017-v1, agricultural-2024-v1
```

### Phase 6: Rebuild & Test

#### 6.1 Rebuild Frontend
```cmd
cd frontend
npm run build
```

#### 6.2 Restart Servers

**Backend:**
```cmd
python -m backend.server
```

**Frontend:**
```cmd
cd frontend
npm run dev
```

#### 6.3 Verification Checklist

**Visit Dashboard and check:**
- [ ] Overview shows new period (e.g., "2023–2024")
- [ ] Statistics reflect new data
- [ ] District Explorer has updated numbers
- [ ] Crop losses show new survey data
- [ ] Support Planner calculations work
- [ ] AI Assistant references new period
- [ ] No errors in browser console

### Phase 7: Documentation Updates

#### 7.1 Update README.md
```markdown
## Data

The platform uses NISR agricultural survey data covering the 2023-2024 period:
- X,XXX household records  ← UPDATE
- 30 districts analyzed
- XX crops tracked
```

#### 7.2 Update Analysis Documentation

**Create new findings report:**
```cmd
python analysis\research_report.py research.json research_report_2024.md
```

#### 7.3 Version Documentation
```markdown
# CHANGELOG.md

## Version 2.0 - 2026-11-01
- Updated to NISR 2023-2024 Agricultural Survey data
- X,XXX households (up from 16,057)
- New districts/crops added (if applicable)
- Updated all aggregate statistics
```

## 🔄 Comparison: Old vs New Data

### What Changes Automatically

When you update data files, these update automatically:
- ✅ All statistics and percentages
- ✅ District comparisons
- ✅ Crop loss figures
- ✅ Barrier distributions
- ✅ Extension coverage rates
- ✅ Support planner calculations
- ✅ Research workspace data
- ✅ AI evidence base

### What You Must Update Manually

- 📝 Period labels (backend `META` dictionary)
- 📝 Frontend period displays
- 📝 Documentation (README, guides)
- 📝 Analysis methodology notes
- 📝 Changelog entries

## 🔍 Data Validation

### Before Going Live

**Run these checks:**

#### 1. Data Integrity
```python
# Check district count
import pandas as pd
df = pd.read_csv('soil_support_by_district.csv')
print(f"Districts: {len(df)}")  # Should be 30

# Check for nulls
print(df.isnull().sum())

# Verify percentages
assert (df['erosion_and_barrier_pct'] >= 0).all()
assert (df['erosion_and_barrier_pct'] <= 100).all()
```

#### 2. API Endpoints
```bash
# Test health endpoint
curl http://127.0.0.1:8765/api/health

# Test districts
curl http://127.0.0.1:8765/api/districts

# Test crops
curl http://127.0.0.1:8765/api/crops

# Test indicators
curl http://127.0.0.1:8765/api/indicators
```

#### 3. Manual Verification

**Open dashboard and verify:**
- Total household count matches expectations
- Top 5 districts make sense
- Extension coverage percentage is reasonable
- No "NaN" or "undefined" values displayed

## 📊 Handling Multiple Datasets

### Option 1: Replace (Recommended for Updates)
- Remove old data files
- Add new data files
- Platform shows only new data

### Option 2: Keep Both (For Comparison)
- Rename old files: `soil_support_by_district_2017.csv`
- Keep new files: `soil_support_by_district.csv`
- Platform uses new by default
- Old available for manual comparison

### Option 3: Database Versioning (Advanced)
```sql
-- Query specific version
SELECT * FROM districts 
WHERE dataset_version = 'agricultural-2024-v1';

-- Compare versions
SELECT d1.district, 
       d1.erosion_and_barrier_n as count_2017,
       d2.erosion_and_barrier_n as count_2024
FROM districts d1
JOIN districts d2 ON d1.district = d2.district
WHERE d1.dataset_version = 'agricultural-2017-v1'
  AND d2.dataset_version = 'agricultural-2024-v1';
```

## ⚠️ Important Considerations

### Survey Methodology Changes

**If NISR changes survey design:**
- ❗ Question wording may differ
- ❗ Response categories may change
- ❗ New districts may be added
- ❗ Crops may be recoded

**You must:**
1. Review new questionnaire
2. Map old codes to new codes
3. Update analysis scripts if needed
4. Document methodology changes

### Weights & Sampling

**If design weights become available:**
```python
# Update analysis/findings.py to use weights
df['weighted_pct'] = (df['count'] * df['weight']).sum() / df['weight'].sum()
```

**Update platform:**
```python
# backend/service.py
META = {
    'weighting': 'Design weights applied',  # ← UPDATE
    ...
}
```

### Data Quality Issues

**If you find issues:**
1. Document in `data_quality_notes.md`
2. Add warnings to dashboard
3. Update AI evidence base
4. Inform users in methodology section

## 🚀 Quick Update Checklist

**For routine updates (when NISR releases new data):**

- [ ] 1. Obtain new NISR SPSS files
- [ ] 2. Run `python analysis/analyze.py`
- [ ] 3. Run `python analysis/findings.py`
- [ ] 4. Run `python analysis/research.py`
- [ ] 5. Backup old CSV files
- [ ] 6. Copy new CSV files to root
- [ ] 7. Copy `research.json` to frontend/data
- [ ] 8. Update `META` period in `backend/service.py`
- [ ] 9. Update period labels in frontend
- [ ] 10. Rebuild frontend (`npm run build`)
- [ ] 11. Restart both servers
- [ ] 12. Test all dashboard sections
- [ ] 13. Update README.md
- [ ] 14. Update CHANGELOG.md
- [ ] 15. Create new findings report

**Time estimate:** 2-4 hours (depending on data size)

## 📞 Getting New NISR Data

### Official Channels

**NISR Microdata Portal:**
- Website: https://microdata.statistics.gov.rw
- Email: info@statistics.gov.rw
- Phone: +250 252 571 035

**Request Process:**
1. Create account on microdata portal
2. Find relevant agricultural survey
3. Submit access request with:
   - Research purpose
   - Organization affiliation
   - Data usage agreement
4. Wait for approval (can take 1-4 weeks)
5. Download authorized files

### Survey Schedule

**NISR typically conducts:**
- **Agricultural surveys:** Every 3-4 years
- **Census:** Every 10 years
- **Interim updates:** Annually (limited scope)

**Recent surveys:**
- 2013-2014: Comprehensive Agriculture Survey
- 2016-2017: Agriculture Survey (current in platform)
- 2020-2021: Seasonal Agricultural Survey
- 2023-2024: Comprehensive Agriculture Survey (expected)

## 🔮 Future-Proofing

### Design Decisions That Help

**Your platform is already designed for updates:**
- ✅ CSV-based aggregates (easy to replace)
- ✅ Metadata dictionary (one place to update period)
- ✅ Analysis scripts are reproducible
- ✅ Clear separation: raw data → processing → aggregates → platform
- ✅ Version control ready

### Recommendations

**For easier updates in future:**

1. **Document your process**
   - Keep notes on data processing
   - Record any manual adjustments
   - Document code/variable mappings

2. **Automate where possible**
   - Create `update_data.bat` script
   - Automate CSV copying
   - Script metadata updates

3. **Test with synthetic data first**
   - Create fake "2024" dataset
   - Practice update process
   - Catch issues before real update

4. **Communicate with users**
   - Announce update schedule
   - Explain what changes
   - Provide comparison with old data

## 📝 Example Update Announcement

```markdown
# Data Update Notice 📊

**Effective Date:** November 1, 2026

Ihaze Rwanda has been updated with the latest NISR 
Agricultural Survey data.

**New Dataset:**
- Period: 2023–2024 Agricultural Year
- Households: 18,543 (up from 16,057)
- Districts: 30 (unchanged)
- Crops: 25 (added 2 new crops)

**Key Changes:**
- Extension coverage increased to 31.2% (from 26.8%)
- Finance barrier remains primary constraint (62.3%)
- New data on climate adaptation practices

**What This Means:**
- All statistics now reflect 2023-2024 conditions
- Support planner uses current household patterns
- AI assistant trained on latest evidence

**Old Data:**
- 2016-2017 data archived and available on request
- Comparison reports available in documentation

Questions? See DATA_UPDATE_GUIDE.md
```

## 🎓 Summary

**Your platform is update-ready!**

✅ **Designed for easy updates** - Just replace CSV files  
✅ **Automatic propagation** - New data flows through system  
✅ **Clear documentation** - This guide walks you through it  
✅ **Minimal manual changes** - Update 2-3 metadata strings  
✅ **Fast process** - Can update in 2-4 hours  

**When NISR releases new data:**
1. Download new SPSS files
2. Run analysis scripts
3. Replace CSV files
4. Update period labels
5. Restart servers
6. Done! ✅

Your 2016-2017 data is solid for now, but you're ready for 2024+ whenever NISR publishes it.

---

**🌾 Ihaze Rwanda** - Built for the future, ready for updates
