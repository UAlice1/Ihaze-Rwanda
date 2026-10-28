# AI Features Guide - Ihaze Rwanda 🤖

## Overview

Ihaze Rwanda includes an intelligent AI-powered Evidence Assistant that helps you explore agricultural data through natural language questions. The AI provides conversational explanations while maintaining full transparency about sources and limitations.

## 🌟 Key Features

### 1. **Natural Language Questions**
Ask questions in plain language:
- "Which districts have the highest erosion barriers?"
- "Tell me about extension service gaps"
- "What are the main financial barriers to soil protection?"
- "Show me tomato crop losses"

### 2. **Dual Modes**

#### Evidence Lookup Mode (Default)
- ✅ Works immediately (no API key needed)
- ✅ Instant responses
- ✅ Direct from approved evidence base
- ✅ Perfect for quick facts

#### AI Explanation Mode (Optional)
- 🤖 Conversational, easy-to-understand answers
- 🤖 Contextual recommendations
- 🤖 Actionable next steps
- 🤖 Requires OpenAI API key

### 3. **Complete Transparency**
Every answer includes:
- 📚 Original data sources (e.g., "S6 V18/V22, S3 V6")
- 📅 Time period (2016-2017)
- ⚠️ Limitations and caveats
- 🔍 Link to approved evidence for verification

## 🚀 Enabling AI Mode

### Step 1: Get an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-...`)

### Step 2: Configure the Backend

**On Windows (CMD):**
```cmd
set OPENAI_API_KEY=sk-your-key-here
set OPENAI_MODEL=gpt-4o-mini
python -m backend.server
```

**On Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY = "sk-your-key-here"
$env:OPENAI_MODEL = "gpt-4o-mini"
python -m backend.server
```

**On Linux/Mac:**
```bash
export OPENAI_API_KEY=sk-your-key-here
export OPENAI_MODEL=gpt-4o-mini
python -m backend.server
```

### Step 3: Verify Configuration

1. Open http://127.0.0.1:3000
2. Navigate to Dashboard → Evidence Assistant
3. Look for the **"AI Ready"** badge at the top
4. Enable the "Use AI to explain the evidence" checkbox

## 💬 Using the Evidence Assistant

### Quick Start

1. **Go to Evidence Assistant**
   - From homepage: Click "Launch AI Assistant"
   - From dashboard: Navigate to "Evidence assistant" in sidebar

2. **Try a Quick Question**
   - Click any of the suggested question chips:
     - 🛡️ Soil protection barriers
     - 📚 Extension gaps
     - 🍅 Tomato losses
     - 💧 Irrigation use
     - 💰 Finance barriers

3. **Enable AI Mode** (if configured)
   - Check the "Use AI to explain the evidence" box
   - The AI badge will show "Active"

4. **Ask Your Question**
   - Type in the input field (up to 1000 characters)
   - Click "Ask Question" or press Enter
   - Wait 5-15 seconds for AI analysis

### Example Questions

**Good Questions:**
- ✅ "What are the main barriers to soil protection in Gakenke district?"
- ✅ "How many households have never received extension services?"
- ✅ "Compare tomato losses between seasons"
- ✅ "What percentage of households use irrigation?"

**Questions to Avoid:**
- ❌ "What should I do?" (too vague)
- ❌ "Tell me about 2024 data" (only 2016-2017 available)
- ❌ Personal information or confidential details
- ❌ Questions about crops not in the dataset

## 🎯 AI Response Features

### What You'll See

#### 1. **Response Header**
- 🤖 AI mode indicator
- ✓ Verified badge
- Response type (AI explanation or Evidence lookup)

#### 2. **Main Answer**
- Clear, conversational explanation
- Key numbers highlighted
- Recommendations included

#### 3. **Data Sources**
- Survey sections referenced (e.g., S6 V18/V22)
- Time period reminder (2016-2017)
- Unweighted sample disclaimer

#### 4. **Approved Evidence** (AI mode)
- Expandable section
- Original evidence used by AI
- Allows verification of AI response

### Example AI Response

```
Question: "What barriers prevent soil protection?"

AI Response:
Among the 3,075 households that reported barriers to soil 
protection, the data shows a clear pattern:

💰 Financial Resources (60.59%)
The majority of households cite lack of financial resources 
as their primary barrier. This suggests interventions around 
microfinance or agricultural loans could be highly impactful.

📚 Knowledge Gaps (33.37%)
One-third report knowledge limitations, indicating a need 
for training and extension services focused on soil 
protection techniques.

👨‍👩‍👧‍👦 Family Labour (21.85%)
Labour constraints affect about 1 in 5 households, which 
could indicate aging farmers or migration patterns.

📜 Land Tenure (18.18%)
Nearly one-fifth face tenure insecurity, which may 
discourage long-term soil investments.

⚠️ Important Notes:
- Multiple barriers often overlap (households could report 
  more than one)
- These are 2016-2017 figures; current conditions may differ
- This shows correlation, not causation

💡 Recommended Next Steps:
1. Assess which barrier is most prevalent in your target 
   district
2. Consider combined interventions (e.g., loans + training)
3. Validate with local agricultural officers before planning

Sources: S6 V22/V23/V25/V27
Period: 2016–2017
```

## 🔒 Privacy & Security

### What Gets Sent to OpenAI

**When AI mode is enabled:**
- ✅ Your question text
- ✅ Aggregate statistical evidence (e.g., "1,834 households...")
- ✅ Survey metadata (sources, period, limitations)

**What is NEVER sent:**
- ❌ Raw household-level data
- ❌ Personal identifying information
- ❌ Individual farmer details
- ❌ Your API key (stored only on server)

### Privacy Settings

- `store: false` parameter used (OpenAI policy)
- No personal data should be entered in questions
- Questions are processed individually (no history stored)
- Backend validates questions before sending to AI

### Best Practices

1. **Don't include:**
   - Names of individuals
   - Phone numbers or addresses
   - Confidential operational details
   - Sensitive government information

2. **Focus on:**
   - General patterns ("districts with high barriers")
   - Statistical queries ("percentage of households...")
   - Trend analysis ("compare seasons A and B")
   - Strategic planning ("households without extension")

## 🆚 When to Use Each Mode

### Use Evidence Lookup When:
- ✅ You need instant answers
- ✅ You want raw statistics
- ✅ AI is not configured
- ✅ You need exact numbers for reports
- ✅ You're verifying AI responses

### Use AI Mode When:
- 🤖 You want conversational explanations
- 🤖 You need recommendations
- 🤖 You're exploring unfamiliar topics
- 🤖 You want context and interpretation
- 🤖 You're preparing presentations or briefings

## 📊 Cost Considerations

### OpenAI API Costs (Approximate)

For **gpt-4o-mini** (recommended):
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens
- Average query cost: **$0.01 - $0.03**

For **gpt-4o**:
- Input: ~$2.50 per 1M tokens
- Output: ~$10.00 per 1M tokens
- Average query cost: **$0.10 - $0.25**

### Managing Costs

1. **Use Evidence Lookup for simple questions**
   - Free and instant
   - Perfect for quick facts

2. **Enable AI for complex analysis**
   - Only when you need explanations
   - Toggle on/off as needed

3. **Set Usage Limits in OpenAI Dashboard**
   - Monthly budget caps
   - Usage alerts
   - Per-project limits

## 🛠️ Troubleshooting

### "AI is not configured"

**Problem:** Backend doesn't have OpenAI credentials

**Solutions:**
1. Set `OPENAI_API_KEY` environment variable
2. Set `OPENAI_MODEL` environment variable
3. Restart the backend server
4. Verify credentials in OpenAI dashboard

---

### "Request timed out"

**Problem:** AI took too long to respond

**Solutions:**
1. Try Evidence Lookup mode instead
2. Simplify your question
3. Check internet connection
4. Verify OpenAI API status

---

### "AI service unavailable"

**Problem:** OpenAI API error or network issue

**Solutions:**
1. Check OpenAI status page
2. Verify API key is valid
3. Check API usage limits
4. Try again in a few moments
5. Use Evidence Lookup as fallback

---

### AI response seems incorrect

**Always verify:**
1. Check the "Approved Evidence" section
2. Compare AI answer with source data
3. Review survey limitations
4. Cross-reference with Evidence Lookup mode

---

## 📚 Advanced Tips

### Getting Better Answers

1. **Be Specific**
   - ❌ "Tell me about farming"
   - ✅ "What percentage of households in Musanze use irrigation?"

2. **One Topic at a Time**
   - ❌ "Tell me about soil, crops, loans, and irrigation"
   - ✅ "What are the main soil protection barriers?"

3. **Use District Names**
   - ✅ "Extension gaps in Gakenke"
   - ✅ "Crop losses in Nyagatare"

4. **Specify Crops**
   - ✅ "Tomato production losses"
   - ✅ "Maize season A vs season B"

### Power User Features

- **Chain questions:** Start broad, then drill down
- **Compare modes:** Try both Lookup and AI for comparison
- **Export answers:** Copy for reports or presentations
- **Verify everything:** Always check approved evidence

### Integration with Other Tools

1. **Use with District Explorer:**
   - Ask AI about specific districts
   - Then navigate to District Explorer for detailed tables

2. **Use with Support Planner:**
   - Ask about barrier types
   - Then model scenarios in Support Planner

3. **Use with Research Workspace:**
   - Get high-level insights from AI
   - Then explore detailed comparisons in Research

## 📖 Sample Workflows

### Workflow 1: Planning District Visit

1. Ask AI: "Which districts have high erosion and low extension coverage?"
2. Review recommended districts
3. Navigate to District Explorer
4. Filter for top districts
5. Export CSV for field team
6. Use Support Planner to model capacity

### Workflow 2: Preparing Presentation

1. Ask AI: "Summarize main agricultural barriers"
2. Copy AI response for slides
3. Verify with Evidence Lookup
4. Navigate to Overview for charts
5. Export briefing document
6. Include source citations

### Workflow 3: Investigating Crop Issues

1. Ask AI: "What crops have the highest losses?"
2. Review AI recommendations
3. Navigate to Crop Analysis
4. Filter specific crops
5. Export detailed CSV
6. Cross-reference with Research data

## 🎓 Learning Resources

- **NISR Microdata Portal:** [https://microdata.statistics.gov.rw](https://microdata.statistics.gov.rw)
- **Survey Documentation:** Check `agriculture_analysis.md`
- **Methodology:** See Dashboard → Data & Methodology
- **Research Findings:** See `research_report.md`

## ⚖️ Ethical Use Guidelines

### Do:
- ✅ Use for evidence-based planning
- ✅ Verify AI responses against sources
- ✅ Acknowledge data limitations
- ✅ Cite sources in reports
- ✅ Validate with field officers

### Don't:
- ❌ Treat AI as infallible
- ❌ Use for individual household targeting without validation
- ❌ Make causal claims beyond data
- ❌ Ignore the 2016-2017 time limitation
- ❌ Skip verification steps

## 📞 Support

For questions about:
- **Data:** See `agriculture_analysis.md` and `research_report.md`
- **Backend:** See `BACKEND.md`
- **OpenAI:** Visit [OpenAI Documentation](https://platform.openai.com/docs)
- **General:** See `README.md`

---

**Remember:** The AI is a tool to help you understand and communicate the data. Always verify responses, check sources, and use your professional judgment when making decisions that affect farming communities.

🌾 **Ihaze Rwanda** - Toward food security and sufficiency in Rwanda
