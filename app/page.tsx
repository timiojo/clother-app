export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <span className="logo serif text-5xl text-wine">Dej.<span className="block font-sans text-[10px] tracking-[0.34em] mt-2">BY AYODEJI</span></span>
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
        <span className="micro">Bespoke formalwear</span>
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

      <footer className="border-t border-line px-6 py-12 text-center">
        <span className="micro">Dej. by Ayodeji · Bespoke design · Thoughtfully made</span>
      </footer>
    </main>
  );
}
