const SWATCHES = [
  ["paper", "#F6F1E8"],
  ["card", "#FDFBF7"],
  ["line", "#E5DACA"],
  ["wine-900", "#3E1522"],
  ["wine-700", "#4B1F2E"],
  ["ink", "#2B1D21"],
  ["muted", "#97878A"],
];

export default function DesignPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="micro-label">Dej. by Ayodeji · Design tokens · v0.2</p>
      <h1 className="font-display text-3xl text-wine-900">Tokens (from invoice)</h1>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SWATCHES.map(([name, hex]) => (
          <div key={name} className="overflow-hidden rounded-md border border-line bg-card">
            <div className="h-16" style={{ background: hex }} />
            <div className="p-2 text-xs">
              <b>{name}</b>
              <br />
              <code>{hex}</code>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 font-display text-2xl text-wine-900">Champagne gold bespoke couture dress</p>
      <p className="mt-2 text-sm">
        Body Inter/system · micro-labels 11px / 0.14em uppercase · radius 4/10/18.
      </p>
    </main>
  );
}
