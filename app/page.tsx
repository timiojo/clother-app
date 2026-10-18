export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <span className="logo serif text-5xl text-wine">Clother.</span>
          <nav className="flex gap-6 mt-4 text-sm font-semibold">
            <a href="/services" className="hover:text-wine-700">Services</a>
            <a href="/portfolio" className="hover:text-wine-700">Portfolio</a>
            <a href="#" className="text-wine-700">Book a consultation</a>
            <button className="rounded-sm border border-wine-700 px-5 py-2 text-sm font-semibold text-wine-700 hover:bg-wine-700 hover:text-card transition">
              Sign in
            </button>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="micro">Dej. by Ayodeji · Bespoke formalwear</span>
        <h1 className="font-display text-4xl md:text-5xl text-wine-900 mt-3">
          Commissioned pieces, clearly managed.
        </h1>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          Dresses and suits, made for your occasion. Brief, consult, accept a quote,
          pay, and follow your project — all in one place.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button className="rounded-sm bg-wine-700 px-7 py-3 text-sm font-semibold text-card hover:bg-wine-900 transition">
            Start a request
          </button>
          <button className="rounded-sm border border-line px-7 py-3 text-sm font-semibold text-wine-700 hover:bg-wine-100 transition">
            Browse services
          </button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 border-y border-line">
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div>
            <div className="w-10 h-10 rounded-sm bg-wine-100 flex items-center justify-center mb-4">
              <span className="text-wine-700 font-bold text-lg">📝</span>
            </div>
            <h3 className="font-display text-xl text-wine-900 mb-2">Structured brief</h3>
            <p className="text-sm text-muted">Garment, occasion, budget, deadline — everything the studio needs to quote accurately.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-sm bg-wine-100 flex items-center justify-center mb-4">
              <span className="text-wine-700 font-bold text-lg">💬</span>
            </div>
            <h3 className="font-display text-xl text-wine-900 mb-2">Project chat</h3>
            <p className="text-sm text-muted">Decisions live against the project, not lost in messaging apps.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-sm bg-wine-100 flex items-center justify-center mb-4">
              <span className="text-wine-700 font-bold text-lg">🧾</span>
            </div>
            <h3 className="font-display text-xl text-wine-900 mb-2">Itemised quotes</h3>
            <p className="text-sm text-muted">Scope, price, timeline and terms — accept explicitly before paying.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-12 text-center">
        <span className="micro">Clother · Bespoke design · Thoughtfully made</span>
      </footer>
    </main>
  );
}
