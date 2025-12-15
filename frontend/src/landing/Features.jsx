import featuresImg from "../assets/logo.png"
export default function Features() {
  const features = [
    {
      title: "Instant URL Indexing (Minutes, Not Days)",
      desc: "Stop waiting for search engines to find your pages. Submit your URLs once and our system automatically generates sitemaps, triggers Google Indexing API, and pushes your content for rapid discovery. Ideal for new websites, updated pages, blogs, product listings, and news content that requires instant visibility on Google.",
    },
    {
      title: "Fully Automated Google Indexing API",
      desc: "No manual Search Console submissions. Our platform integrates directly with Google Indexing API to notify Google in real time whenever a new or updated URL is published. Every request is logged, monitored, and retried automatically to ensure the highest possible indexing success rate.",
    },
    {
      title: "Smart Sitemap Generation & Internal Linking",
      desc: "We dynamically generate and update XML sitemaps based on your submitted URLs. Intelligent internal linking helps search engine bots crawl deeper pages faster, improving crawl budget usage, page discovery, and long-term SEO performance.",
    },
    {
      title: "Competitor Indexing & Ranking Intelligence",
      desc: "Track how fast your competitors’ pages get indexed, which keywords they are targeting, and how their content performs over time. Discover ranking gaps, uncover new keyword opportunities, and make data-backed SEO decisions to stay ahead of the competition.",
    },
  ];



  return (
    <section id="features" className="bg-white/95 py-10 px-8">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-3">
            Powerful SEO Features
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Everything you need to rank faster, smarter, and more securely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 items-center gap-10">

          <div className="space-y-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className=""
              >
                <h3 className="text-lg font-semibold mb-1 text-gray-600">
                  {f.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden md:flex justify-center">
            <img
              src={featuresImg}
              alt="SEO Features Illustration"
              className="w-full max-w-[590px] rounded-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
