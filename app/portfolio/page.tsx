import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div>
        <p className="micro">Portfolio</p>
        <h1 className="serif text-3xl text-wine-900 mt-1">Our work</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {["Champagne gold dress", "Emerald suit", "Navy gown", "Silver cocktail", "Ivory bridal", "Charcoal suit"].map((label, i) => (
          <div key={i} className="bg-[#EFE0E2] h-56 rounded-lg flex items-center justify-center text-wine-700 font-bold text-sm group cursor-pointer hover:shadow-md transition">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
