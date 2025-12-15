export default function Modules() {
  const modules = [
    {
      title: "Fast Indexing Engine",
      desc: "Search Console + Google Indexing API automation.",
    },
    {
      title: "Ranking Improvement Hub",
      desc: "Content authority, topic clusters & white-hat backlinks.",
    },
    {
      title: "SEO Tools Suite",
      desc: "Sitemap, meta, speed & technical SEO tools.",
    },
    {
      title: "Mini Search Engine",
      desc: "Internal crawler + search powered by ElasticSearch.",
    },
  ];

  return (
    <section className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          One Complete SEO Ecosystem
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {modules.map((m, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
              <p className="text-slate-300">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
