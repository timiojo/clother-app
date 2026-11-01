import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div>
        <p className="micro">Services</p>
        <h1 className="serif text-3xl text-wine-900 mt-1">Our services</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Bespoke evening dress", type: "Couture", price: "₦120,000", desc: "Design, fabric sourcing, production and fittings." },
          { title: "Tailored two-piece suit", type: "Tailoring", price: "₦180,000", desc: "Cut, construction, two fittings and finishing." },
          { title: "Cocktail dress", type: "Ready-to-wear", price: "₦95,000", desc: "Evening cocktail dresses with optional fittings." },
          { title: "Bridal formal gown", type: "Couture", price: "₦296,900", desc: "Full-service bridal gown with consultations." },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-line rounded-lg p-6 flex flex-col">
            <h3 className="serif text-xl text-wine-900 font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-muted mb-3 flex-1">{s.desc}</p>
            <div className="mt-auto flex items-baseline gap-1">
              <span className="serif font-bold text-xl text-wine-900">{s.price}</span>
              <span className="text-xs micro ml-1">{s.type}</span>
            </div>
            <Link href="/request" className="mt-4 inline-block bg-wine text-card px-5 py-2 rounded-sm font-bold text-sm text-center hover:bg-[#3E1522] transition">
              Request this
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
