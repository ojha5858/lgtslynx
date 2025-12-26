import { FaBolt, FaGoogle, FaSitemap, FaChartLine } from "react-icons/fa";
import featuresImg from "../assets/logo.png";

export default function Features() {
  const features = [
    {
      title: "Instant URL Indexing Protocol",
      icon: <FaBolt className="text-accent" />,
      desc: "Stop waiting weeks for search engines. Submit URLs once and our system triggers the Google Indexing API for rapid discovery. Ideal for new blogs, product listings, and time-sensitive news content.",
    },
    {
      title: "Automated Google API Integration",
      icon: <FaGoogle className="text-accent" />,
      desc: "Zero manual GSC work. LGTS Lynx notifies Google in real-time whenever you publish or update content. We handle the technical handshake, retries, and monitoring for maximum success.",
    },
    {
      title: "Smart Sitemap & Crawl Optimization",
      icon: <FaSitemap className="text-accent" />,
      desc: "We dynamically manage your XML sitemaps and improve internal linking. This helps bots crawl deeper pages faster, ensuring your entire site stays fresh in the search index.",
    },
    {
      title: "Competitor Ranking Intelligence",
      icon: <FaChartLine className="text-accent" />,
      desc: "Monitor how fast competitors get indexed and track their ranking gaps. Use our AI-backed insights to discover new keyword opportunities and stay ahead of the search curve.",
    },
  ];

  return (
    <section id="features" className="bg-white py-20 px-8">
      <div className="container mx-auto max-w-7xl">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Advanced <span className="text-accent italic">SEO Infrastructure</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            LGTS Lynx provides the technical bridge between your content and Google's search index.
          </p>
        </div>

        <div className="grid md:grid-cols-2 items-center gap-16">

          <div className="space-y-10">
            {features.map((f, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="mt-1 text-xl">{f.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
               <img
                src={featuresImg}
                alt="LGTS Lynx SEO Illustration"
                className="w-full max-w-[450px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}