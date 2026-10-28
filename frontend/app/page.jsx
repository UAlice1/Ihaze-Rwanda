import Link from 'next/link';
import { WheatIcon, MapIcon, TargetIcon, LightbulbIcon, FlaskIcon, BookOpenIcon, ShieldIcon, DollarIcon, UsersIcon, BookIcon, SparklesIcon, BarChartIcon, AlertCircleIcon, FileTextIcon, TrendingUpIcon, BotIcon, CheckCircleIcon } from '../components/Icons';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import AIChatWidget from '../components/AIChatWidget';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf1dc] via-[#f5f9ee] to-[#e1ead4]">
      {/* AI Chat Widget */}
      <AIChatWidget />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #245a3f 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        
        <nav className="relative mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#245a3f] to-[#357b54] text-white shadow-lg">
                <WheatIcon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#245a3f]">Ihaze</h1>
                <p className="text-[9px] tracking-[.4em] text-[#6d8e76]">RWANDA</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-[#245a3f] transition hover:bg-white/50 sm:block"
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg bg-[#245a3f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#357b54] hover:shadow-lg"
              >
                Open Dashboard →
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-[#245a3f] shadow-sm backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
              Agricultural Intelligence Platform
            </div>
            
            <h1 className="mb-6 text-5xl font-bold leading-tight text-[#245a3f] lg:text-7xl">
              Turn Agricultural Evidence into{' '}
              <span className="bg-gradient-to-r from-[#8eac65] to-[#357b54] bg-clip-text text-transparent">Better Support</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#526847] lg:text-xl">
              Empowering Rwanda's agricultural extension officers with data-driven insights to prioritize support for 1,834 farming households facing soil erosion and protection barriers.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="rounded-xl bg-[#245a3f] px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:scale-105 hover:bg-[#357b54]"
              >
                Explore Dashboard →
              </Link>
              <a
                href="#features"
                className="rounded-xl border-2 border-[#245a3f] bg-white/50 px-8 py-4 text-base font-semibold text-[#245a3f] backdrop-blur transition hover:bg-white"
              >
                Learn More ↓
              </a>
            </div>
          </div>
        </div>
      </div>



      {/* Features Section */}
      <div id="features" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 bg-white">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#245a3f]">Powerful Features</h2>
          <p className="text-lg text-[#728178]">
            Everything you need to make evidence-based agricultural support decisions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              Icon: BarChartIcon,
              title: 'District Explorer',
              description: 'Compare all 30 districts with detailed erosion and barrier statistics. Sort, filter, and export data for field use.',
            },
            {
              Icon: WheatIcon,
              title: 'Crop Loss Analysis',
              description: 'Analyze production and post-harvest losses across 23 crops in Season A and B. Identify intervention opportunities.',
            },
            {
              Icon: TargetIcon,
              title: 'Support Planner',
              description: 'Model outreach capacity scenarios. See how many households can be reached with available resources.',
            },
            {
              Icon: LightbulbIcon,
              title: 'Evidence Assistant',
              description: 'Ask questions about the data and get structured evidence with full source citations and limitations.',
            },
            {
              Icon: FlaskIcon,
              title: 'Research Workspace',
              description: 'Deep dive into input use, financial access, and production comparisons across household characteristics.',
            },
            {
              Icon: BookOpenIcon,
              title: 'Transparent Methodology',
              description: 'Full documentation of data sources, calculations, and limitations. No black-box algorithms.',
            },
          ].map((feature) => (
            <Card
              key={feature.title}
              className="group border-gray-200 bg-white p-8 transition hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4 text-[#245a3f] transition group-hover:scale-110 group-hover:text-[#357b54]">
                <feature.Icon className="w-12 h-12" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#245a3f]">{feature.title}</h3>
              <p className="leading-relaxed text-[#728178]">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="relative bg-gradient-to-br from-[#245a3f] to-[#357b54] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">The Problem</h2>
              <div className="space-y-4 text-lg leading-relaxed text-[#d7e5de]">
                <p>
                  <strong className="text-white">1,834 farming households</strong> in Rwanda report:
                </p>
                <ul className="space-y-3 pl-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#8eac65]">▸</span>
                    <span>Worsening soil erosion (not stable, but <strong>actively worsening</strong>)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8eac65]">▸</span>
                    <span>Barriers preventing soil protection (finance, knowledge, labour, tenure)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8eac65]">▸</span>
                    <span><strong>72% have NEVER received</strong> agricultural extension services</span>
                  </li>
                </ul>
                <p className="pt-4">
                  Extension officers need to know: <strong className="text-[#8eac65]">Which communities should we visit first?</strong>
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Solution</h2>
              <div className="space-y-4 text-lg leading-relaxed text-[#d7e5de]">
                <p>
                  <strong className="text-white">Ihaze Rwanda</strong> transforms NISR's Agricultural Household Survey data (16,057 households) into actionable targeting information:
                </p>
                <ul className="space-y-3 pl-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#8eac65]">✓</span>
                    <span>Identifies households by specific barriers (finance, knowledge, labour, tenure)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8eac65]">✓</span>
                    <span>Shows which districts have the highest concentration of need</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8eac65]">✓</span>
                    <span>Models capacity scenarios: "With 50 officers, reach X households"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8eac65]">✓</span>
                    <span>AI-powered insights with full transparency and source citations</span>
                  </li>
                </ul>
                <p className="pt-4">
                  <strong className="text-white">Result:</strong> Extension officers can prioritize field visits with <strong className="text-[#8eac65]">evidence they can verify</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Intelligence Section */}
      <div className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#245a3f] to-[#357b54] px-4 py-2 text-sm text-white">
              <span className="text-xl">✧</span>
              AI-Powered Intelligence
            </div>
            <h2 className="mb-4 text-4xl font-bold text-[#245a3f]">Smart Answers, Transparent Sources</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#728178]">
              Our AI assistant transforms complex agricultural data into clear, actionable insights—always showing you the evidence behind every answer.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="border-gray-200 bg-white p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#245a3f] to-[#357b54] text-white">
                <BotIcon className="w-7 h-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#245a3f]">Ask Natural Questions</h3>
              <p className="mb-4 text-[#728178]">
                "Which districts have the highest erosion barriers?" Simply ask in plain language—no complex queries or technical jargon required.
              </p>
              <div className="rounded-lg bg-[#f0f4e9] p-3 text-xs italic text-[#526847]">
                "Tell me about extension service gaps in Gakenke district"
              </div>
            </Card>

            <Card className="border-gray-200 bg-white p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#245a3f] to-[#357b54] text-white">
                <CheckCircleIcon className="w-7 h-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#245a3f]">See the Evidence</h3>
              <p className="mb-4 text-[#728178]">
                Every AI response includes the original data sources, survey sections, and limitations—so you can verify and trust the insights.
              </p>
              <div className="flex items-start gap-2 rounded-lg bg-[#f0f4e9] p-3 text-xs text-[#526847]">
                <span className="text-green-600">✓</span>
                <span>Sources: S6 V18/V22, S3 V6<br/>Period: 2016–2017</span>
              </div>
            </Card>

            <Card className="border-gray-200 bg-white p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#245a3f] to-[#357b54] text-white">
                <TrendingUpIcon className="w-7 h-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#245a3f]">Get Recommendations</h3>
              <p className="mb-4 text-[#728178]">
                The AI suggests next steps and considerations for field work—helping you move from data to action with confidence.
              </p>
              <div className="rounded-lg bg-[#f0f4e9] p-3 text-xs text-[#526847]">
                <strong>→</strong> Consider finance-focused interventions for barrier-affected households
              </div>
            </Card>
          </div>

          <Card className="mt-12 border-2 border-gray-200 bg-white p-8 text-center shadow-lg">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#6d8e76]">
              Try It Yourself
            </p>
            <h3 className="mb-6 text-2xl font-bold text-[#245a3f]">
              Experience the AI Evidence Assistant
            </h3>
            <Link href="/dashboard#insights">
              <Button className="inline-flex items-center gap-2" size="lg">
                <span>Launch AI Assistant</span>
                <span className="text-xl">→</span>
              </Button>
            </Link>
            <p className="mt-4 text-sm text-[#88948a]">
              No login required • Privacy-focused • Source citations included
            </p>
          </Card>
        </div>
      </div>

      {/* Use Cases */}
      <div className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#245a3f]">Real-World Impact</h2>
            <p className="text-lg text-[#728178]">
              How agricultural extension officers use Ihaze Rwanda
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                role: 'District Extension Officer',
                quote: 'Ihaze Rwanda helps me prioritize which sectors need urgent support. The barrier analysis shows exactly what type of intervention each community needs.',
                useCase: 'Weekly planning sessions',
                Icon: UsersIcon,
              },
              {
                role: 'Agricultural Program Manager',
                quote: 'Finally, data that helps us allocate resources effectively. We can now justify why we focus on specific districts with clear evidence.',
                useCase: 'Resource allocation decisions',
                Icon: BarChartIcon,
              },
              {
                role: 'Field Coordinator',
                quote: 'The export feature lets me create briefings for my team in seconds. Everyone knows the evidence before we head to the field.',
                useCase: 'Team briefings and reports',
                Icon: FileTextIcon,
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="border-gray-200 bg-white p-8 transition hover:shadow-xl"
              >
                <div className="mb-4 text-[#245a3f]">
                  <testimonial.Icon className="w-10 h-10" />
                </div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#6d8e76]">
                  {testimonial.role}
                </p>
                <p className="mb-4 italic leading-relaxed text-[#526847]">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2 text-xs text-[#728178]">
                  <span className="rounded-full bg-[#eaf1dc] px-3 py-1">
                    {testimonial.useCase}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>



      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#245a3f] to-[#357b54] text-white">
                  <WheatIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#245a3f]">Ihaze Rwanda</h3>
                  <p className="text-xs text-[#6d8e76]">Agricultural Intelligence Platform</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#728178]">
                Empowering agricultural extension officers with data-driven insights for evidence-based decision making.
              </p>
            </div>
            
            <div>
              <h4 className="mb-3 font-semibold text-[#245a3f]">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="text-[#728178] transition hover:text-[#245a3f]">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard#districts" className="text-[#728178] transition hover:text-[#245a3f]">
                    District Explorer
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard#planner" className="text-[#728178] transition hover:text-[#245a3f]">
                    Support Planner
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard#insights" className="text-[#728178] transition hover:text-[#245a3f]">
                    Evidence Assistant
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-3 font-semibold text-[#245a3f]">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-[#728178] transition hover:text-[#245a3f]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard#method" className="text-[#728178] transition hover:text-[#245a3f]">
                    Methodology
                  </Link>
                </li>
                <li>
                  <a href="https://microdata.statistics.gov.rw" target="_blank" rel="noopener noreferrer" className="text-[#728178] transition hover:text-[#245a3f]">
                    NISR Data Portal ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-[#728178]">
              © 2026 Ihaze Rwanda. Built with data from the National Institute of Statistics of Rwanda.
            </p>
            <p className="mt-2 text-xs font-semibold text-[#245a3f]">
              Evidence-based agricultural decision support.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
