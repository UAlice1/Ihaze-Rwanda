# 🌾 AgriInsight Rwanda

**An AI-Powered Agricultural Decision Support System for Rwanda**

[![NISR Big Data Hackathon 2026](https://img.shields.io/badge/NISR-Big%20Data%20Hackathon%202026-green)](https://statistics.gov.rw)
[![Track](https://img.shields.io/badge/Track-Agriculture-brightgreen)](.)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](.)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Connecting Evidence to Action: Helping 1,834 farming families protect their land**

[🎥 Watch Demo](#) | [🚀 Live App](#) | [📊 Documentation](research_report.md) | [👥 Team](#team)

---

## 🎯 The Problem

**1,834 farming households** in Rwanda face a triple challenge:
- 🌱 Experiencing worsening soil erosion
- 🚧 Face barriers to implementing soil protection (finance, knowledge, labour, or land tenure)
- ❌ **72% have never received agricultural extension services**

**Current Gap:** Agricultural extension officers lack a systematic, data-driven way to identify and prioritize these vulnerable households for targeted support.

---

## 💡 Our Solution

**AgriInsight Rwanda** transforms NISR agricultural survey data into an **actionable decision-support platform** that:

✅ **Identifies** farming households with overlapping needs (erosion + barriers + no services)  
✅ **Prioritizes** districts and communities for targeted interventions  
✅ **Matches** barrier types to appropriate support programs  
✅ **Plans** outreach capacity allocation for extension officers  
✅ **Explains** complex statistical patterns in plain language using AI

---

## 📸 Screenshots

### District Prioritization Dashboard
![Dashboard Screenshot](docs/screenshots/dashboard.png)
*Compare all 30 districts on erosion, barriers, and service coverage*

### Barrier-Specific Filtering
![Filter Screenshot](docs/screenshots/filters.png)
*Identify households by specific barrier type: finance, knowledge, labour, or tenure*

### Outreach Capacity Planner
![Planner Screenshot](docs/screenshots/planner.png)
*Model resource allocation scenarios: "If I have 50 officers, how many households can I reach?"*

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** (backend)
- **Node.js 18+** (frontend)
- **Git** (for cloning)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USERNAME/agriinsight-rwanda.git
cd agriinsight-rwanda

# 2. Install frontend dependencies
cd frontend
npm ci
npm run build
cd ..

# 3. Start backend (Terminal 1)
# Windows:
Start Backend.cmd
# Mac/Linux:
python -m backend.server

# 4. Start frontend (Terminal 2)
# Windows:
Start Next.js.cmd
# Mac/Linux:
cd frontend && npm run dev

# 5. Open browser
# Navigate to: http://127.0.0.1:3000
```

### One-Click Windows Launch

```bash
# Double-click these files in order:
1. Start Backend.cmd
2. Start Next.js.cmd
3. Open AgriInsight.cmd  # Opens browser automatically
```

---

## 📊 Data & Methodology

### Data Source
- **Survey:** NISR Agricultural Household Survey 2016-2017
- **Reference:** RWA-NISR-RAHS-2017-V0.1
- **Sample Size:** 16,057 households across 30 districts
- **Data Files:** 16 SPSS files (S0-S11 sections)
- **Catalog:** https://microdata.statistics.gov.rw/index.php/catalog/90

### Key Findings

| Indicator | Result | Insight |
|-----------|--------|---------|
| **Extension Coverage** | 26.84% | 73% service gap exists |
| **Erosion Control Practiced** | 61.26% | But 20.67% report INCREASING erosion |
| **Critical Overlap** | **1,834 HH** | Erosion + barriers + no service |
| **Finance Barrier** | 60.59% | Need credit/subsidy programs |
| **Knowledge Barrier** | 33.37% | Need training/extension |
| **Labour Barrier** | 21.85% | Need community support |
| **Tenure Barrier** | 18.18% | Need land rights advisory |

### High-Priority Districts (Sample Data)

1. **Gakenke:** 88/352 households (25.00%)
2. **Bugesera:** 136/596 households (22.82%)
3. **Rulindo:** 90/406 households (22.17%)
4. **Ngororero:** 66/309 households (21.36%)

*Note: These are unweighted sample proportions from 2016-2017 data. Not current operational targets.*

---

## 🏗️ Technical Architecture

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS 4
- **Deployment:** Vercel-ready

### Backend
- **Core:** Python 3.8+ (standard library only)
- **Optional:** FastAPI (for enhanced API features)
- **Database:** PostgreSQL support (optional, CSV default)
- **API:** RESTful endpoints with validation

### AI Integration
- **Provider:** OpenAI API (GPT-4)
- **Usage:** Optional, opt-in explanations
- **Privacy:** Only sends aggregate statistics (never raw household data)
- **Transparency:** Always shows original data alongside AI explanations

### Architecture Diagram

```
┌─────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Next.js UI    │ ───> │  Python Backend  │ ───> │  NISR Data (CSV) │
│  (Port 3000)    │ <─── │   (Port 8765)    │ <─── │   or PostgreSQL  │
└─────────────────┘      └──────────────────┘      └──────────────────┘
                                  │
                                  │ (optional)
                                  ▼
                         ┌──────────────────┐
                         │   OpenAI API     │
                         │ (Explanations)   │
                         └──────────────────┘
```

---

## 🎓 Features

### Core Modules

#### 1️⃣ Overview Dashboard
- National-level indicator summary
- Extension coverage statistics
- Erosion and barrier prevalence
- Financial access metrics

#### 2️⃣ District Comparison
- All 30 districts with key metrics
- Search and sort functionality
- Detailed drill-down views
- CSV export for analysis

#### 3️⃣ Barrier Analysis
- Filter by barrier type:
  - 💰 Finance (60.59% of affected households)
  - 📚 Knowledge (33.37%)
  - 👨‍👩‍👧 Labour (21.85%)
  - 🏡 Tenure (18.18%)
- Multiple barrier overlap analysis
- Suggested intervention mapping

#### 4️⃣ Outreach Capacity Planner
- Scenario modeling: "What if I have N officers?"
- Coverage gap calculation
- Priority household identification
- Optional: Filter to households with no prior extension contact
- Exportable planning reports

#### 5️⃣ Crop Loss Analysis
- 23 crops with ≥100 sample records
- Post-harvest loss patterns
- High-loss crops identified (e.g., tomatoes: 36.68% of records show losses)
- Training application rates

#### 6️⃣ AI Insights (Optional)
- Plain-language explanations of statistical patterns
- Source-cited responses
- Aggregate-only data sharing (privacy-safe)
- Explicit opt-in required

---

## 📖 Documentation

- **[Research Report](research_report.md)** - Full methodology, findings, and limitations
- **[Agriculture Analysis](agriculture_analysis.md)** - Initial exploratory analysis
- **[Backend Setup](BACKEND.md)** - API documentation and optional features
- **[Changelog](CHANGELOG.md)** - Version history and updates
- **[Source Notes](SOURCE_NOTES.md)** - Data validation and references

---

## 🎯 Target Users

### Primary Users
- **District Agricultural Officers** - Identify priority communities for field visits
- **Extension Coordinators** - Allocate limited staff to highest-need areas
- **Policy Makers (MINAGRI)** - Evidence-based budget allocation for soil conservation

### Secondary Users
- **NGOs** - Target agricultural development programs
- **Researchers** - Analyze agricultural service gaps
- **Donors** - Assess intervention opportunities

---

## 💪 Why AgriInsight Stands Out

| Our Approach | What We Avoid |
|-------------|---------------|
| ✅ Real NISR data (16,057 HH) | ❌ Synthetic/demo data |
| ✅ Transparent methodology | ❌ Black-box AI |
| ✅ Documented limitations | ❌ Overclaimed predictions |
| ✅ Actionable district insights | ❌ National averages only |
| ✅ Barrier-specific recommendations | ❌ Generic "needs support" flags |
| ✅ Production-ready app | ❌ Jupyter notebook only |
| ✅ Privacy-safe (aggregates only) | ❌ Exposing household microdata |
| ✅ Reproducible analysis | ❌ Undocumented calculations |

---

## 🔬 Research Integrity

### What We DO Claim:
✅ Identification of households in 2016-2017 survey reporting erosion + barriers + no services  
✅ Transparent calculation of sample proportions by district  
✅ Evidence-based framework for prioritization  

### What We DON'T Claim:
❌ Current operational household lists (data is from 2016-2017)  
❌ National prevalence estimates (sample is unweighted)  
❌ Causal proof that extension prevents erosion  
❌ Yield predictions or treatment-effect guarantees  

### Validation Status:
- ✅ Internal consistency checks passed
- ✅ Household key validation complete
- ✅ Duplicate records identified and handled
- ⏳ Independent SPSS/pyreadstat verification pending
- ⏳ Survey weight application pending
- ⏳ Field validation with agricultural officers pending

---

## 📈 Impact Potential

### Short-Term (6 months)
- 🎯 **Pilot in 3-5 districts** using updated NISR data (2024+)
- 👥 **Train 50 extension officers** on evidence-based targeting
- 🏡 **Reach 500 vulnerable households** with barrier-specific support

### Long-Term (2 years)
- 🇷🇼 **National deployment** across all 30 districts
- 🔄 **Integration with NISR data pipelines** for continuous updates
- 📊 **Expansion to other barriers**: water access, market linkages, climate risks
- 🌍 **Regional adaptation** for other East African countries

### Measurable Outcomes
1. **Targeting efficiency:** % of identified households reached vs. random selection
2. **Resource optimization:** Officer hours saved through pre-planning
3. **Impact tracking:** Changes in reported barriers in follow-up surveys
4. **Referral success:** % of households connected to appropriate programs

---

## 🔒 Data Privacy & Ethics

### Privacy Safeguards:
- ✅ **No household microdata** in public repository
- ✅ **Aggregate statistics only** exposed via API/UI
- ✅ **No personally identifiable information** (PII) displayed
- ✅ **NISR data use terms** compliance documented

### Ethical Considerations:
- 📊 **Transparent limitations:** We clearly state what data can and cannot tell us
- 🎯 **Evidence, not profiling:** We identify need based on reported barriers, not predictions
- 📖 **Open methodology:** All calculations are documented and reproducible
- 🤝 **User agency:** Officers validate findings through field assessment

---

## 🛠️ Development Setup

### Optional Advanced Features

#### Enable OpenAI Integration
```bash
# Set environment variable
export OPENAI_API_KEY="your-key-here"
export OPENAI_MODEL="gpt-4"

# Backend will detect and enable AI mode
python -m backend.server
```

#### Use FastAPI Backend
```bash
pip install fastapi uvicorn

# Run with FastAPI
python -m backend.fastapi_app
```

#### PostgreSQL Support
```bash
pip install psycopg2-binary

# Import snapshot
python -m backend.database --import

# Run with database backend
export USE_DATABASE=true
python -m backend.server
```

---

## 🧪 Testing

### Backend Tests
```bash
# Run all backend tests
cd backend
python test_service.py

# Tests include:
# ✓ District query validation
# ✓ Capacity planner arithmetic
# ✓ API endpoint responses
# ✓ OpenAI integration (mocked)
# ✓ PostgreSQL operations (mocked)
```

### Frontend Checks
```bash
cd frontend
npm run build  # Validates React components compile
```

---

## 🚀 Deployment

### Option 1: Vercel + Railway (Recommended)

**Frontend (Vercel):**
```bash
cd frontend
npx vercel --prod
```

**Backend (Railway):**
1. Push code to GitHub
2. Connect Railway to repository
3. Set start command: `python -m backend.server`
4. Add environment variables (if using AI/database)

### Option 2: Single Platform (Railway)

**Deploy both together:**
1. Add `railway.toml`:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "python -m backend.server & cd frontend && npm start"
```

### Option 3: Heroku

**Using Procfile:**
```
web: python -m backend.server
```

---

## 📦 Repository Structure

```
agriinsight-rwanda/
├── frontend/                  # Next.js React app
│   ├── app/                  # App Router pages
│   ├── components/           # React components
│   ├── data/                 # Aggregate data snapshots
│   ├── public/               # Static assets
│   └── package.json
├── backend/                   # Python API
│   ├── server.py             # Standard library HTTP server
│   ├── service.py            # Business logic
│   ├── database.py           # PostgreSQL support (optional)
│   ├── fastapi_app.py        # FastAPI adapter (optional)
│   └── test_service.py       # Unit tests
├── analysis/                  # Data processing scripts
│   ├── analyze.py            # SPSS extraction
│   ├── findings.py           # Statistical calculations
│   ├── research.py           # Expanded analysis
│   └── research_report.py    # Report generation
├── dist/                      # Legacy standalone dashboard
├── docs/                      # Documentation & screenshots
├── README.md                  # This file
├── BACKEND.md                 # API documentation
├── research_report.md         # Full research findings
├── agriculture_analysis.md    # Initial analysis
├── CHANGELOG.md               # Version history
├── SOURCE_NOTES.md            # Data validation notes
├── Start Backend.cmd          # Windows backend launcher
├── Start Next.js.cmd          # Windows frontend launcher
├── Open AgriInsight.cmd       # Windows browser launcher
├── requirements.txt           # Python dependencies (optional features)
└── LICENSE                    # MIT License
```

---

## 👥 Team

### Project Lead
**[Your Name]**  
*Full-Stack Developer & Data Analyst*  
📧 your.email@example.com  
🔗 [LinkedIn](https://linkedin.com/in/yourprofile) | [GitHub](https://github.com/yourusername)

### Team Members (if applicable)
- **[Team Member 2]** - Frontend Development
- **[Team Member 3]** - Data Analysis
- **[Team Member 4]** - UI/UX Design

---

## 🏆 Hackathon Details

**Event:** NISR Big Data Hackathon 2026  
**Track:** Agriculture  
**Date:** October 2026  
**Location:** Kigali, Rwanda 🇷🇼  

### Submission Components
- ✅ **Public Repository:** [GitHub URL]
- ✅ **Live Deployment:** [App URL]
- ✅ **Demo Video:** [3-minute video URL]
- ✅ **Documentation:** Complete (you're reading it!)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Data Attribution
Data sourced from **National Institute of Statistics of Rwanda (NISR)**  
Survey: Agricultural Household Survey 2016-2017 (RWA-NISR-RAHS-2017-V0.1)  
Catalog: https://microdata.statistics.gov.rw/index.php/catalog/90

---

## 🙏 Acknowledgments

- **NISR** for providing high-quality agricultural survey data
- **OpenAI** for Codex assistance during development (disclosed in methodology)
- **MINAGRI/RAB** for agricultural extension context
- **Hackathon organizers** for fostering data-driven innovation in Rwanda

---

## 📞 Contact & Support

**Questions about the project?**  
📧 Email: your.email@example.com  
💬 GitHub Issues: [Open an issue](https://github.com/YOUR-USERNAME/agriinsight-rwanda/issues)  

**Want to contribute?**  
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Need help deploying?**  
Check [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

---

## 🔗 Quick Links

- [🎥 Watch Demo Video](#)
- [🚀 Try Live App](#)
- [📊 Read Full Research Report](research_report.md)
- [🐛 Report Issue](https://github.com/YOUR-USERNAME/agriinsight-rwanda/issues)
- [💬 Join Discussion](https://github.com/YOUR-USERNAME/agriinsight-rwanda/discussions)
- [⭐ Star on GitHub](https://github.com/YOUR-USERNAME/agriinsight-rwanda)

---

## 🌟 Star History

If this project helps inform agricultural policy in Rwanda, please consider:
- ⭐ **Starring** the repository
- 🔄 **Sharing** with agricultural development professionals
- 🤝 **Contributing** improvements and feedback

---

<div align="center">

**Built with ❤️ for Rwanda's farming families**

*Because every household deserves the support they need to protect their land.*

🌾 🇷🇼 🌾

[⬆ Back to Top](#-agriinsight-rwanda)

</div>
