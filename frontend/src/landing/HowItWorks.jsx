export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Submit Your URL",
      desc: "User submits a page URL from the dashboard and selects indexing options.",
    },
    {
      step: "2",
      title: "System Automation",
      desc: "LGTS Lynx updates sitemaps, pings Search Console and triggers Indexing API.",
    },
    {
      step: "3",
      title: "Google Discovery",
      desc: "Google crawlers discover URLs faster with structured indexing signals.",
    },
    {
      step: "4",
      title: "Track Status",
      desc: "Indexing status is tracked, logged, retried and monitored automatically.",
    },
  ];

  return (
    <section className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          How LGTS Lynx Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="text-accent text-3xl font-bold mb-3">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-slate-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
