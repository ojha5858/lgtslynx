export default function Security() {
  const rules = [
    "100% White-hat SEO practices",
    "Google Search Console compliant",
    "No forced indexing or ranking guarantees",
    "Rate-limited & safe API usage",
    "Scalable & ethical architecture",
  ];

  return (
    <section id="security" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-accent mb-6">
          Built on Trust & Ethics
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          LGTS Lynx does not manipulate Google. It improves crawl efficiency,
          authority signals, and user trust in a safe & compliant way.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          {rules.map((r, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-6 text-left"
            >
              ✔ {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
