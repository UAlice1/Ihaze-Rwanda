# Ihaze Rwanda - NISR Big Data Hackathon 2026 Submission Checklist

**Track:** Agriculture  
**Team:** [YOUR TEAM NAME]  
**Date:** October 23, 2026

---

## ✅ CRITICAL (Must Complete)

### 1. Data Citation & Compliance
- [ ] Add exact NISR survey citation: "Rwanda Agricultural Household Survey 2016-2017 (RWA-NISR-RAHS-2017-V0.1)"
- [ ] Verify data usage terms from https://microdata.statistics.gov.rw/index.php/catalog/90
- [ ] Confirm household microdata is NOT exposed in public repo (✓ already done - only aggregates)
- [ ] Add data license/attribution to README

### 2. Public Repository Setup
- [ ] Create public GitHub repository
- [ ] Push complete codebase (without raw SPSS files)
- [ ] Add comprehensive README with:
  - Problem statement
  - Solution overview
  - Installation instructions
  - Demo screenshots
  - Team information
- [ ] Add LICENSE file (recommend MIT or Apache 2.0)

### 3. Demo Video (≤3 minutes)
**Suggested structure:**
- **0:00-0:30** - Problem introduction (erosion + barriers + no extension = 1,834 households)
- **0:30-1:00** - Solution overview (district prioritization dashboard)
- **1:00-2:00** - Live demo:
  - District comparison view
  - Filter by barrier type (finance/knowledge/labour/tenure)
  - Outreach capacity planner
  - AI-powered insights (if enabled)
- **2:00-2:45** - Impact potential (targeted extension, evidence-based policy)
- **2:45-3:00** - Call to action & next steps

**Tools:** OBS Studio, Loom, or Windows Game Bar for screen recording

### 4. Public Deployment
- [ ] Deploy to Vercel (Next.js frontend) + Railway/Render (Python backend)
- [ ] OR use single platform like Railway for both
- [ ] Test live deployment URL
- [ ] Add deployment URL to README

**Quick Deployment Options:**
```bash
# Option 1: Vercel (easiest for Next.js)
cd frontend
npx vercel

# Option 2: Railway
# Push to GitHub first, then connect Railway to repo
```

### 5. Team & Eligibility Documentation
- [ ] Team member names and roles
- [ ] Contact information
- [ ] Eligibility confirmation (age, location, etc.)
- [ ] Declaration of originality
- [ ] AI assistance disclosure (already documented ✓)

---

## 🚀 HIGH IMPACT (Strongly Recommended)

### 6. Visual Polish
- [ ] Add hero image/banner to README
- [ ] Create dashboard screenshots for documentation
- [ ] Add favicon to Next.js app
- [ ] Ensure mobile responsiveness (Tailwind already handles this)

### 7. Data Validation Enhancements
- [ ] Run independent validation with pyreadstat (if time permits)
- [ ] Add confidence intervals to district rankings
- [ ] Include weighted estimates alongside unweighted counts
- [ ] Document any data quality issues found

### 8. Impact Quantification
Create a **one-page impact summary**:
```
POTENTIAL IMPACT OF IHAZE RWANDA

TARGET POPULATION: 1,834 households with erosion + barriers
- 71.97% (1,320 HH) received NO extension services

BARRIERS IDENTIFIED:
✓ Finance: 60.59% → Link to credit programs
✓ Knowledge: 33.37% → Deploy training programs  
✓ Labour: 21.85% → Community support schemes
✓ Tenure: 18.18% → Land rights advisory

HIGH-PRIORITY DISTRICTS (sample data):
1. Gakenke: 88/352 households (25.00%)
2. Bugesera: 136/596 households (22.82%)
3. Rulindo: 90/406 households (22.17%)

ESTIMATED REACH:
- If 100 extension officers use this tool
- Each prioritizes top 20 households per district
- = 2,000 households reached with targeted support
```

### 9. Live AI Configuration (Optional but Impressive)
- [ ] Set up OpenAI API key in backend
- [ ] Test live AI explanations
- [ ] Add rate limiting to prevent abuse
- [ ] Document AI usage clearly in UI

---

## 📊 NICE-TO-HAVE (If Time Permits)

### 10. Additional Features
- [ ] Add district-level map visualization (use Rwanda GeoJSON)
- [ ] Export filtered results as PDF report
- [ ] Add comparison mode (compare 2 districts side-by-side)
- [ ] Include crop loss insights (tomato 36.68% loss rate)

### 11. Testing & Documentation
- [ ] Add API endpoint documentation (Swagger/OpenAPI)
- [ ] Write basic unit tests for critical functions
- [ ] Add code comments for complex logic
- [ ] Create CONTRIBUTING.md for future developers

### 12. Accessibility & Performance
- [ ] Run Lighthouse audit (aim for >90 scores)
- [ ] Test with screen reader
- [ ] Add alt text to all images
- [ ] Optimize loading times

---

## 🎬 Presentation Strategy

### Your Winning Narrative:
1. **Hook:** "1,834 farming families in Rwanda face worsening soil erosion but can't protect their land. 72% receive no agricultural support. We found them."

2. **Evidence:** "Using NISR's 2016-2017 Agricultural Household Survey with 16,057 households, we identified the exact overlap of need + barriers + service gaps."

3. **Solution:** "Ihaze Rwanda helps extension officers prioritize who needs help most urgently, with which specific barrier (finance, knowledge, labour, tenure)."

4. **Impact:** "This isn't prediction. This is evidence-based targeting. Every household in our dashboard is a real family from NISR data who needs support."

5. **Differentiation:** "We don't overclaim. No black-box AI. No fake yields. Just transparent, actionable evidence from Rwanda's own data."

### Key Messages:
- ✅ **Evidence-based** (16,057 households analyzed)
- ✅ **Actionable** (district-level prioritization)
- ✅ **Transparent** (no black boxes, sources cited)
- ✅ **Scalable** (works with newer NISR data)
- ✅ **Responsible** (documents limitations clearly)

---

## 📋 Submission Checklist Summary

**Before you submit, confirm:**
- [ ] Public GitHub repo live
- [ ] Public deployment accessible
- [ ] Demo video uploaded (<3 min)
- [ ] Data citation complete
- [ ] Team information documented
- [ ] README has screenshots
- [ ] All CMD files work on Windows
- [ ] No sensitive data exposed

---

## 🆘 Quick Fixes if Running Out of Time

**Minimum Viable Submission (4 hours):**
1. Hour 1: Record demo video
2. Hour 2: Create GitHub repo + push code
3. Hour 3: Deploy to Vercel/Railway
4. Hour 4: Polish README + submit

**Priority order:** Demo video > Public repo > Deployment > Documentation

---

## 📞 Contact & Resources

**NISR Catalog:** https://microdata.statistics.gov.rw/index.php/catalog/90  
**Your App:** [ADD DEPLOYMENT URL]  
**GitHub:** [ADD REPO URL]  
**Team Contact:** [ADD EMAIL]

---

**Good luck! Your analysis is excellent. Now make sure the judges see it! 🚀**
