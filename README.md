# 🌾 Ihaze Rwanda

**An AI-Powered Agricultural Decision Support System for Rwanda**

*"Ihaze" means "enough" or "sufficient" in Kinyarwanda - ensuring Rwanda has enough food and agricultural resources for all communities.*

[![NISR Big Data Hackathon 2026](https://img.shields.io/badge/NISR-Big%20Data%20Hackathon%202026-green)](https://statistics.gov.rw)
[![Track](https://img.shields.io/badge/Track-Agriculture-brightgreen)](.)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](.)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=flat&logo=python)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-06B6D4?style=flat&logo=tailwindcss)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=flat)

> **Connecting Evidence to Action: Helping 1,834 farming families protect their land**

[🚀 Live App](#) | [📊 Full Research Report](research_report.md) | [🎥 Demo Video](#)

---

## 🎯 The Problem

**1,834 farming households** in Rwanda face a triple challenge:
- 🌱 Experiencing worsening soil erosion
- 🚧 Face barriers to implementing soil protection (finance, knowledge, labour, or land tenure)
- ❌ **72% have never received agricultural extension services**

**Current Gap:** Agricultural extension officers lack a systematic, data-driven way to identify and prioritize these vulnerable households for targeted support.

---

## 💡 Our Solution

**Ihaze Rwanda** transforms NISR agricultural survey data into an **actionable decision-support platform** that:

✅ **Identifies** farming households with overlapping needs (erosion + barriers + no services)  
✅ **Prioritizes** districts and communities for targeted interventions  
✅ **Matches** barrier types to appropriate support programs  
✅ **Plans** outreach capacity allocation for extension officers  
✅ **Explains** complex statistical patterns in plain language using AI

---

## ✨ Key Features

### Core Analytical Modules

- **🤖 AI Chat Assistant**: Floating chat widget powered by Groq AI for instant Q&A about agricultural data
- **🗺️ District Explorer**: Search and compare all 30 districts with detailed barrier analysis
- **🌾 Crop Loss Analysis**: Compare seasonal losses across 23 crops with statistical breakdowns
- **🎯 Support Planner**: Capacity-based planning with barrier-specific filtering
- **💡 Evidence Assistant**: AI-powered evidence lookup with source references and citations
- **🔬 Research Workspace**: Deep-dive analysis of input use, loans, and production patterns
- **📊 Data Export**: Generate briefings and CSV reports for field teams

### Modern User Experience

- **🎨 Modern UI**: Built with shadcn/ui components for a polished, professional interface
- **⚡ Fast AI Responses**: Groq-powered AI for quick, intelligent answers
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🔒 Privacy-First**: Only aggregate statistics shared, no household microdata exposed

---

## 📊 Data & Key Findings

### Data Source
- **Survey:** NISR Agricultural Household Survey 2016-2017
- **Reference:** RWA-NISR-RAHS-2017-V0.1
- **Sample Size:** 16,057 households across 30 districts
- **Catalog:** https://microdata.statistics.gov.rw/index.php/catalog/90
- **Survey Sections:** S0-S11 (household, plot, crop, inputs, barriers)

All displayed data are aggregate statistics. Raw microdata are not included in this repository. The platform ships with pre-computed district and crop tables.

### Key Findings from Analysis

| Indicator | Result | Insight |
|-----------|--------|---------|
| **Critical Overlap** | **1,834 HH** | Erosion + barriers + no service |
| **Extension Coverage** | 26.84% | 73% service gap exists |
| **Unserved from Critical Group** | 72% (1,320 HH) | High priority for targeting |
| **Finance Barrier** | 60.59% | Need credit/subsidy programs |
| **Knowledge Barrier** | 33.37% | Need training/extension |
| **Labour Barrier** | 21.85% | Need community support |
| **Tenure Barrier** | 18.18% | Need land rights advisory |
| **Erosion Control Practiced** | 61.26% | Yet 20.67% report INCREASING erosion |

### High-Priority Districts (Sample Data)

1. **Gakenke:** 88/352 households (25.00%)
2. **Bugesera:** 136/596 households (22.82%)
3. **Rulindo:** 90/406 households (22.17%)
4. **Ngororero:** 66/309 households (21.36%)

*Note: These are unweighted sample proportions from 2016-2017 data. Not current operational targets. Independent validation ongoing.*

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** (backend)
- **Node.js 16+** and npm (frontend)
- **Git** (for cloning)
- **Groq API Key** (optional - free tier available at https://console.groq.com)

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd ihaze

# 2. Install frontend dependencies
cd frontend
npm install
cd ..

# 3. Install Python dependencies (optional for enhanced features)
pip install python-dotenv

# 4. Configure AI (Optional but Recommended)
# Create a .env file in the root directory:
# GROQ_API_KEY=your_groq_api_key_here
# GROQ_MODEL=llama-3.1-70b-versatile
# Get your free API key from: https://console.groq.com/keys
```

### Run Locally

1. **Start the backend** (Python API):
   ```cmd
   python -m backend.server
   ```
   Backend runs at http://127.0.0.1:8765

2. **Start the frontend** (Next.js) in a new terminal:
   ```cmd
   cd frontend
   npm run dev
   ```
   Frontend runs at http://127.0.0.1:3000

3. **Open in browser**: Navigate to http://127.0.0.1:3000

### Quick Launch (Windows)

Double-click these files in order:
1. `Start Backend.cmd` - Starts Python API server
2. `Start Next.js.cmd` - Starts React frontend
3. Open http://127.0.0.1:3000 in your browser

### Verify Installation

Check if everything is running:
```bash
# Check backend
curl http://127.0.0.1:8765/api/health

# Should return: {"status": "ok", "ai_configured": true}
```

---

## 🏗️ Technical Architecture

### System Overview

```
┌─────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Next.js UI    │ ───> │  Python Backend  │ ───> │  NISR Data (CSV) │
│  (Port 3000)    │ <─── │   (Port 8765)    │ <─── │   or PostgreSQL  │
└─────────────────┘      └──────────────────┘      └──────────────────┘
                                  │
                                  │ (optional)
                                  ▼
                         ┌──────────────────┐
                         │    Groq API      │
                         │ (AI Explanations)│
                         └──────────────────┘
```

### Frontend
- **Framework**: Next.js 16 with React 19 (App Router)
- **UI Library**: shadcn/ui components with Tailwind CSS 4.3
- **Features**: 
  - Server-side rendering for fast initial load
  - Responsive design for all screen sizes
  - Interactive data visualizations
  - Floating AI chat widget
  - Real-time API integration
- **Location**: `frontend/` directory

### Backend
- **Core**: Python standard library (zero dependencies for basic use)
- **AI Integration**: Groq API for fast AI responses (OpenAI also supported)
- **Optional Enhancements**: 
  - FastAPI for automatic API documentation
  - PostgreSQL for data persistence
- **CORS**: Configured for local and production deployment
- **API**: RESTful endpoints with validation
- **Location**: `backend/` directory

### AI Integration (Optional)
- **Primary Provider**: Groq AI (fast, free tier available)
- **Alternative**: OpenAI API (requires paid account)
- **Model**: Llama 3.1 70B Versatile (Groq) or GPT-3.5/4 (OpenAI)
- **Privacy**: Only aggregate statistics sent, never household microdata
- **Features**:
  - Natural language question answering
  - Context-aware responses
  - Evidence-based explanations
  - Source citations for transparency

---

## 🎓 Feature Modules

### 1️⃣ Landing Page
- Modern hero section with impact metrics
- Feature showcase
- Floating AI chat assistant

### 2️⃣ Overview Dashboard
- National-level indicator summary
- Extension coverage statistics
- Erosion and barrier prevalence
- Financial access metrics

### 3️⃣ District Explorer
- All 30 districts with key metrics
- Search and sort functionality
- Detailed drill-down views
- CSV export for field teams

### 4️⃣ Barrier Analysis
- Filter by barrier type:
  - 💰 Finance (60.59% of affected households)
  - 📚 Knowledge (33.37%)
  - 👨‍👩‍👧 Labour (21.85%)
  - 🏡 Tenure (18.18%)
- Multiple barrier overlap analysis
- Suggested intervention mapping

### 5️⃣ Outreach Capacity Planner
- Scenario modeling: "What if I have N officers?"
- Coverage gap calculation
- Priority household identification
- Optional: Filter to households with no prior extension contact
- Exportable planning reports

### 6️⃣ Crop Loss Analysis
- 23 crops with ≥100 sample records
- Post-harvest loss patterns by season
- High-loss crops identified (e.g., tomatoes: 36.68%)
- Training application rates

### 7️⃣ AI Insights (Optional)
- Plain-language explanations of patterns
- Source-cited responses
- Aggregate-only data sharing (privacy-safe)
- Explicit opt-in required

### 8️⃣ Research Workspace
- Deep-dive input use analysis
- First-loan outcome patterns
- Production quantity trends

### 9️⃣ About Page
- Platform information
- Methodology documentation
- Limitations and disclaimers

---

## 📖 Available Workflows

1. **🏠 Landing Page**: Modern interface with key metrics and AI chat widget
2. **💬 AI Chat Assistant**: Instant Q&A about agricultural data patterns
3. **📊 Historical Overview**: Key barrier indicators and service coverage
4. **🗺️ District Analysis**: Filter, sort, and export district-level aggregates
5. **🌾 Crop Comparisons**: Seasonal loss analysis for 23 crops
6. **🎯 Capacity Planning**: Scenario-based support allocation
7. **💡 Evidence Lookup**: Deterministic queries with optional AI explanations
8. **🔬 Research Explorer**: Input use, loan outcomes, production quantities
9. **📄 Text Export**: Generate briefings for stakeholders
10. **ℹ️ About Page**: Platform information and methodology

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

## 💪 Why Ihaze Rwanda Stands Out

| Ihaze Rwanda's Approach | What We Avoid |
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
- ⏳ Independent statistical verification pending
- ⏳ Survey weight application pending
- ⏳ Field validation with agricultural officers pending

**Important Notes:**
- All percentages are **unweighted** sample descriptions
- Do not interpret as certified national prevalence
- Designed weights and skip patterns remain under validation
- Associations are descriptive, not causal

See `agriculture_analysis.md` and `research_report.md` for detailed methodology and limitations.

---

## 📈 Impact Potential

### Short-Term (6 months)
- 🎯 **Pilot in 3-5 districts** using updated NISR data (2024+)
- 👥 **Train 50 extension officers** on evidence-based targeting
- 🏡 **Reach 500 vulnerable households** with barrier-specific support

### Medium-Term (1 year)
- 🔄 **Integration with NISR data pipelines** for continuous updates
- 📊 **Expansion to other barriers**: water access, market linkages
- 🌍 **Regional knowledge sharing** with other East African countries

### Long-Term (2+ years)
- 🇷🇼 **National deployment** across all 30 districts
- 📊 **Multi-year trend analysis** with successive survey rounds
- 🌍 **Climate adaptation module** with weather integration
- 🔗 **API integration** with existing MINAGRI systems

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

### AI Transparency & Security

#### AI Assistant Features
- **🔒 Privacy-First**: No personal data sent to AI services
- **📊 Evidence-Based**: AI only explains aggregate data, never invents facts
- **🔍 Transparent Sources**: All responses include data sources and limitations
- **⚡ Fast Responses**: Groq AI provides near-instant answers
- **💬 Natural Language**: Ask questions in plain English or Kinyarwanda

#### API Key Security
⚠️ **IMPORTANT**: Never share API keys in:
- Code repositories (they're in `.gitignore`)
- Chat conversations or screenshots
- Public documentation or forums
- Email or messaging apps

If an API key is accidentally exposed:
1. **Immediately revoke it** at the provider's console
2. Generate a new key
3. Update your `.env` file locally

---

## 📦 Project Structure

```
ihaze-rwanda/
├── frontend/                    # Next.js application
│   ├── app/                    # Pages and routing
│   │   ├── page.jsx           # Landing page
│   │   ├── about/             # About page
│   │   ├── dashboard/         # Main dashboard
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── card.jsx      # Card component
│   │   │   └── button.jsx    # Button component
│   │   ├── AIChatWidget.jsx  # AI chat widget
│   │   ├── Dashboard.jsx     # Dashboard components
│   │   ├── Research.jsx      # Research module
│   │   └── Icons.jsx         # Icon components
│   ├── lib/                  # Utilities
│   │   └── utils.js         # shadcn utilities
│   ├── data/                # Aggregate data files
│   ├── package.json         # Dependencies
│   ├── jsconfig.json        # Path aliases
│   └── .env.local          # Frontend environment variables
├── backend/                 # Python API
│   ├── server.py           # Standard library server with CORS
│   ├── service.py          # Business logic with Groq/OpenAI
│   ├── fastapi_app.py      # Optional FastAPI adapter
│   ├── database.py         # Optional PostgreSQL
│   └── test_service.py     # Unit tests
├── analysis/                # Data processing scripts
│   ├── analyze.py          # Initial extraction from SPSS
│   ├── findings.py         # Exploratory analysis
│   ├── research.py         # Research workspace generation
│   └── research_report.py  # Report generation
├── dist/                    # Legacy standalone dashboard
├── docs/                    # Documentation & resources
├── .env                     # Environment variables (create this!)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── Start Backend.cmd        # Windows backend launcher
└── Start Next.js.cmd       # Windows frontend launcher
```

---

## 🛠️ API Endpoints

| Method | Endpoint | Purpose | AI-Powered |
|--------|----------|---------|------------|
| GET | `/api/health` | Server status and AI configuration | - |
| GET | `/api/metadata` | Dataset period and limitations | - |
| GET | `/api/indicators` | Descriptive statistics | - |
| GET | `/api/districts` | Filter and sort districts (supports `?q=` and `?sort=`) | - |
| GET | `/api/crops` | Crop-season loss aggregates | - |
| GET | `/api/research` | Expanded research workspace data | - |
| POST | `/api/plan` | Generate support scenarios (capacity + filters) | - |
| POST | `/api/ask` | Evidence lookup with optional AI mode | ✅ |

### AI Chat Endpoint

**POST** `/api/ask`

Request:
```json
{
  "question": "What are the main barriers in Gakenke?",
  "mode": "ai"  // or "lookup" for non-AI responses
}
```

Response:
```json
{
  "data": null,
  "metadata": {...},
  "sources": ["S6 V18/V22", "S3 V6"],
  "mode": "ai",
  "answer": "AI-generated explanation here...",
  "approved_evidence": "Raw data here...",
  "supported": true
}
```

All responses include metadata, sources, and limitations.

---

## 🧪 Testing

### Verify Installation

Check if everything is running:
```bash
# Check backend
curl http://127.0.0.1:8765/api/health
# Should return: {"status": "ok", "ai_configured": true}
```

### Run Backend Tests
```cmd
python -m unittest backend.test_service -v
```

Tests include:
- ✓ District query validation
- ✓ Capacity planner arithmetic
- ✓ API endpoint responses
- ✓ Groq/OpenAI integration (mocked)
- ✓ PostgreSQL operations (mocked)

### Frontend Build Check
```cmd
cd frontend
npm run build
```

Validates that all React components compile correctly.

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

Deploy both together with `railway.toml`:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "python -m backend.server & cd frontend && npm start"
```

---

## 📚 Documentation

- **[README.md](README.md)** - This file (project overview and setup)
- **[research_report.md](research_report.md)** - Full methodology, findings, and limitations
- **[agriculture_analysis.md](agriculture_analysis.md)** - Initial exploratory analysis
- **[BACKEND.md](BACKEND.md)** - API documentation and optional features
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Detailed deployment instructions
- **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)** - 3-minute presentation script

---

## 🧑‍💻 Development Credits

### AI Assistance Disclosure
AI tools (Claude, GPT-4) assisted with:
- Code generation and optimization
- Documentation writing
- Interface design suggestions
- Debugging and troubleshooting

All AI-generated code was reviewed, tested, and validated by human developers.

---

## 👥 Team

**Project Lead:** [Your Name]  
**Contact:** [Your Email]  
**Location:** Rwanda 🇷🇼

### Team Roles
- **Full-Stack Development** - Application architecture and implementation
- **Data Analysis** - NISR data processing and statistical validation
- **UI/UX Design** - Interface design and user experience

---

## 🏆 NISR Big Data Hackathon 2026

**Event:** NISR Big Data Hackathon 2026  
**Track:** Agriculture  
**Submission Date:** October 30, 2026  
**Location:** Kigali, Rwanda 🇷🇼

### Submission Components
- ✅ **Public Repository:** [GitHub URL - to be added]
- ✅ **Live Deployment:** [App URL - to be added]
- ✅ **Demo Video:** [Video URL - to be added]
- ✅ **Documentation:** Complete (you're reading it!)
- ✅ **Data Citation:** NISR Agricultural Household Survey 2016-2017

---

## 📜 License & Attribution

### Data Attribution
**Data Source:** National Institute of Statistics of Rwanda (NISR)  
**Survey:** Agricultural Household Survey 2016-2017  
**Reference:** RWA-NISR-RAHS-2017-V0.1  
**Catalog:** https://microdata.statistics.gov.rw/index.php/catalog/90  
**Usage:** Subject to NISR terms and conditions

### Application License
This project code is available for educational and research purposes.  
Contact project maintainers for commercial use inquiries.

---

## 🙏 Acknowledgments

- **NISR** - For providing high-quality agricultural survey data
- **MINAGRI/RAB** - For agricultural extension context
- **Groq AI** - For fast, accessible AI infrastructure
- **NISR Hackathon Organizers** - For fostering data-driven innovation in Rwanda
- **Rwanda's Farming Communities** - The inspiration behind this work

---

## 📞 Contact & Support

**Questions about the project?**  
📧 Email: [Your Email]  
💬 GitHub Issues: https://github.com/YOUR-USERNAME/ihaze-rwanda/issues

**Want to collaborate?**  
We welcome partnerships with:
- Agricultural extension officers
- MINAGRI/RAB policy makers
- NGOs working in agricultural development
- Researchers in food security

---

## 🔗 Quick Links

- [🎥 Watch Demo Video](#) *(to be added)*
- [🚀 Try Live App](#) *(to be added)*
- [📊 Read Full Research Report](research_report.md)
- [📖 Backend API Documentation](BACKEND.md)
- [🚀 Deployment Guide](DEPLOYMENT_GUIDE.md)
- [🎤 Demo Script](DEMO_SCRIPT.md)

---

<div align="center">

**Built with ❤️ for Rwanda's farming families**

*Because every household deserves the support they need to protect their land.*

🌾 🇷🇼 🌾

**Ihaze Rwanda** - Connecting Evidence to Action

[⬆ Back to Top](#-ihaze-rwanda)

</div>
