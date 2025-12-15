export default function Pricing() {
  const plans = [
    { name: "Free", price: "₹0", desc: "Limited tools & indexing" },
    { name: "Pro", price: "₹999/mo", desc: "Full SEO tools & automation" },
    { name: "Agency", price: "₹2999/mo", desc: "High volume & team access" },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-accent mb-12">Pricing</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div
              key={p.name}
              className="border rounded-xl p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-600">{p.name}</h3>
              <p className="text-3xl font-bold mb-4 text-gray-600">{p.price}</p>
              <p className="text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
