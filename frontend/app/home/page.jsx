import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf1dc] via-[#f5f9ee] to-[#e1ead4]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <nav className="relative mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#245a3f] to-[#357b54] text-2xl text-white shadow-lg">
                ⌁
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#245a3f]">Ihaze</h1>
                <p className="text-[9px] tracking-[.4em] text-[#6d8e76]">RWANDA</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="rounded-lg bg-[#245a3f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#357b54] hover:shadow-lg"
            >
              Open Dashboard →
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-[#245a3f] shadow-sm backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
              NISR Big Data Hackathon 2026 · Agriculture Track
            </div>
            
            <h1 className="mb-6 text-5xl font-bold leading-tight text-[#245a3f] lg:text-7xl">
              Turn Agricultural Evidence into  
              <span className="bg-gradient-to-r from-[#8eac65] to-[#357b54] bg-clip-text text-transparent"> Better Support</span>
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

      {/* Stats Section */}
      <div className="relative bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { label: 'Households Analyzed', value: '16,057', icon: '🏠' },
              { label: 'Target Households', value: '1,834', icon: '🎯' },
              { label: 'Districts Covered', value: '30', icon: '📍' },
              { label: 'Without Extension', value: '72%', icon: '📊' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-[#e0e7df] bg-white p-6 shadow-sm transition hover:shadow-xl"
              >
                <div className="absolute right-4 top-4 text-4xl opacity-10 transition group-hover:scale-110 group-hover:opacity-20">
                  {stat.icon}
                </div>
                <div className="relative">
                  <p className="text-sm text-[#6e8074]">{stat.label}</p>
                  <p className="mt-2 text-4xl font-bold text-[#245a3f]">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#245a3f]">Powerful Features</h2>
          <p className="text-lg text-[#728178]">
            Everything you need to make evidence-based agricultural support decisions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: '📊',
              title: 'District Explorer',
              description: 'Compare all 30 districts with detailed erosion and barrier statistics. Sort, filter, and export data for field use.',
            },
            {
              icon: '🌾',
              title: 'Crop Loss Analysis',
              description: 'Analyze production and post-harvest losses across 23 crops in Season A and B. Identify intervention opportunities.',
            },
            {
              icon: '🎯',
              title: 'Support Planner',
              description: 'Model outreach capacity scenarios. See how many households can be reached with available resources.',
            },
            {
              icon: '💡',
              title: 'Evidence Assistant',
              description: 'Ask questions about the data and get structured evidence with full source citations and limitations.',
            },
            {
              icon: '🔬',
              title: 'Research Workspace',
              description: 'Deep dive into input use, financial access, and production comparisons across household characteristics.',
            },
            {
              icon: '📖',
              title: 'Transparent Methodology',
              description: 'Full documentation of data sources, calculations, and limitations. No black-box algorithms.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-[#e0e7df] bg-white p-8 shadow-sm transition hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4 text-5xl transition group-hover:scale-110">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-[#245a3f]">{feature.title}</h3>
              <p className="leading-relaxed text-[#728178]">{feature.description}</p>
            </div>
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
                    <span>Provides evidence-based explanations with full transparency</span>
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

      {/* Technology Stack */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#245a3f]">Built with Modern Technology</h2>
          <p className="text-lg text-[#728178]">Production-ready, transparent, and scalable</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Next.js 16', desc: 'React framework', color: 'bg-black' },
            { name: 'Python', desc: 'Backend API', color: 'bg-blue-600' },
            { name: 'Tailwind CSS', desc: 'Modern styling', color: 'bg-cyan-500' },
            { name: 'NISR Data', desc: '2016-2017 Survey', color: 'bg-[#245a3f]' },
          ].map((tech) => (
            <div
              key={tech.name}
              className="rounded-xl border border-[#e0e7df] bg-white p-6 text-center shadow-sm"
            >
              <div className={`mx-auto mb-4 h-16 w-16 rounded-full ${tech.color} flex items-center justify-center text-2xl text-white`}>
                {tech.name[0]}
              </div>
              <h3 className="mb-1 font-bold text-[#245a3f]">{tech.name}</h3>
              <p className="text-sm text-[#728178]">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-[#eaf1dc] to-[#d5eea3] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-[#245a3f]">
            Ready to Explore the Data?
          </h2>
          <p className="mb-10 text-xl text-[#526847]">
            Start making evidence-based agricultural support decisions today
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-xl bg-[#245a3f] px-10 py-5 text-lg font-semibold text-white shadow-2xl transition hover:scale-105 hover:bg-[#357b54]"
          >
            Launch Dashboard →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e0e7df] bg-white/80 py-8 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-[#728178]">
              Ihaze Rwanda · Agricultural Intelligence Platform
            </p>
            <p className="text-sm font-semibold text-[#245a3f]">
              Evidence before action.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
