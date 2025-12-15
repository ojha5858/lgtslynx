export default function Hero() {
  return (
    <section className="pt-32 pb-32 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Smart SEO Intelligence <br />
          <span className="text-accent italic">for modern business</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
          LGTS Lynx helps you index faster, analyze competitors, and improve rankings with automation, security, and precision.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a href="#get-started" className="bg-accent text-black px-6 py-3 rounded-xl font-semibold">
            Start Free
          </a>
          <a href="#features" className="px-6 py-3 rounded-xl border border-white/20">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
