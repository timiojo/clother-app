export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line px-6 py-10">
        <p className="font-display text-5xl text-wine-700">
          Dej.<span className="mt-2 block font-sans text-[10px] tracking-[0.34em]">BY AYODEJI</span>
        </p>
        <p className="micro-label mt-6">Bespoke formalwear · Dresses · Suits · Occasion</p>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl text-wine-900">Commissioned pieces, clearly managed.</h1>
        <p className="mt-3">
          Browse services, request a bespoke piece, book a consultation, accept a quote and
          follow your project — all in one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/design" className="rounded-sm bg-wine-700 px-6 py-3 text-sm font-semibold text-card">
            View design tokens
          </a>
          <button className="rounded-sm border border-wine-700 px-6 py-3 text-sm font-semibold text-wine-700">
            Book consultation
          </button>
        </div>
        <p className="micro-label mt-10">Bespoke design · Thoughtfully made</p>
      </section>
    </main>
  );
}
