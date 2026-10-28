import Link from 'next/link';
import AIChatWidget from '../../components/AIChatWidget';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf1dc] via-[#f5f9ee] to-[#e1ead4]">
      {/* AI Chat Widget */}
      <AIChatWidget />
      {/* Navigation */}
      <nav className="border-b border-[#e0e7df] bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#245a3f] to-[#357b54] text-xl text-white shadow-lg">
                🌾
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#245a3f]">Ihaze</h1>
                <p className="text-[8px] tracking-[.4em] text-[#6d8e76]">RWANDA</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[#245a3f] transition hover:bg-white"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg bg-[#245a3f] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#357b54]"
              >
                Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-[#245a3f] lg:text-5xl">
            About Ihaze Rwanda
          </h1>
          <p className="text-xl text-[#526847]">
            Evidence-based agricultural decision support for Rwanda's extension officers
          </p>
        </div>

        <div className="space-y-8 text-[#526847]">
          {/* Mission */}
          <section className="rounded-2xl border border-[#e0e7df] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#245a3f]">Our Mission</h2>
            <p className="leading-relaxed">
              Ihaze Rwanda transforms agricultural survey data into actionable insights for extension officers and agricultural planners. We help identify which farming communities need support most urgently, enabling evidence-based resource allocation and targeted interventions toward food security and agricultural sufficiency.
            </p>
          </section>

          {/* The Problem */}
          <section className="rounded-2xl border border-[#e0e7df] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#245a3f]">The Problem We Solve</h2>
            <p className="mb-4 leading-relaxed">
              Agricultural extension services in Rwanda face a critical challenge: limited resources and personnel must be deployed effectively across 30 districts. Without data-driven prioritization, officers may miss households most in need of support.
            </p>
            <p className="leading-relaxed">
              Our analysis of 16,057 households reveals that <strong>1,834 farming families</strong> report worsening soil erosion combined with barriers preventing protection measures. Of these, <strong>72% have never received extension services</strong>.
            </p>
          </section>

          {/* Our Approach */}
          <section className="rounded-2xl border border-[#e0e7df] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#245a3f]">Our Approach</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-[#245a3f]">1. Transparent Data Analysis</h3>
                <p className="leading-relaxed">
                  We analyze official NISR Agricultural Household Survey data (2016-2017) covering 16,057 households across all 30 districts. Every calculation is documented, every source is cited, and every limitation is acknowledged.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-[#245a3f]">2. Actionable Insights</h3>
                <p className="leading-relaxed">
                  Rather than generic national averages, we provide district-level targeting information. Extension officers can see which communities report specific barriers (finance, knowledge, labor, tenure) and plan interventions accordingly.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-[#245a3f]">3. Capacity Planning Tools</h3>
                <p className="leading-relaxed">
                  Our platform allows users to model scenarios: "If we have 50 extension officers, how many households can we reach?" This enables realistic resource planning and gap analysis.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-[#245a3f]">4. Evidence-Based Recommendations</h3>
                <p className="leading-relaxed">
                  We don't prescribe solutions or predict outcomes. Instead, we surface historical evidence with full context, allowing agricultural professionals to make informed decisions based on their field expertise.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="rounded-2xl border border-[#e0e7df] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#245a3f]">Key Features</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#8eac65]">✓</span>
                <div>
                  <strong>District Explorer:</strong> Compare erosion and barrier statistics across all 30 districts with search, filter, and export capabilities.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#8eac65]">✓</span>
                <div>
                  <strong>Crop Loss Analysis:</strong> Identify post-harvest intervention opportunities across 23 crops in Season A and Season B.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#8eac65]">✓</span>
                <div>
                  <strong>Support Planner:</strong> Model capacity scenarios by district and barrier type to optimize resource allocation.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#8eac65]">✓</span>
                <div>
                  <strong>Evidence Assistant:</strong> Query the dataset with natural language questions and receive structured answers with source citations.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#8eac65]">✓</span>
                <div>
                  <strong>Research Workspace:</strong> Deep analysis of input use, financial access, and production patterns across household characteristics.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#8eac65]">✓</span>
                <div>
                  <strong>CSV Export:</strong> Download filtered data for offline field use and further analysis.
                </div>
              </li>
            </ul>
          </section>

          {/* Data Source */}
          <section className="rounded-2xl border border-[#e0e7df] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#245a3f]">Data Source</h2>
            <p className="mb-4 leading-relaxed">
              Our analysis is based on the <strong>National Institute of Statistics of Rwanda (NISR) Agricultural Household Survey</strong>, covering the 2016-2017 agricultural year.
            </p>
            <p className="mb-4 leading-relaxed">
              The survey includes comprehensive modules on household information, agricultural practices, extension services, financing, input use, and crop production across Seasons A and B.
            </p>
            <a
              href="https://microdata.statistics.gov.rw/index.php/catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#245a3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#357b54]"
            >
              Visit NISR Microdata Catalogue ↗
            </a>
          </section>

          {/* Technology */}
          <section className="rounded-2xl border border-[#e0e7df] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#245a3f]">Technology Stack</h2>
            <p className="mb-4 leading-relaxed">
              Ihaze is built with modern web technologies for performance, reliability, and ease of deployment:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <span className="rounded-lg bg-black px-3 py-1 text-xs font-semibold text-white">Next.js 16</span>
                <span>React framework for the user interface</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white">Python</span>
                <span>Backend API and data processing</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-lg bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">Tailwind CSS</span>
                <span>Modern styling and responsive design</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-lg bg-[#245a3f] px-3 py-1 text-xs font-semibold text-white">PostgreSQL</span>
                <span>Optional database for production deployment</span>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="rounded-2xl bg-gradient-to-br from-[#245a3f] to-[#357b54] p-8 text-white">
            <h2 className="mb-4 text-2xl font-bold">Ready to Explore?</h2>
            <p className="mb-6 leading-relaxed text-[#d7e5de]">
              Access the full dashboard to explore district comparisons, plan support scenarios, and query the agricultural evidence base.
            </p>
            <Link
              href="/dashboard"
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-[#245a3f] transition hover:bg-gray-50"
            >
              Open Dashboard →
            </Link>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e0e7df] bg-white/80 py-8 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
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
