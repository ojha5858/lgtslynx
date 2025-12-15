import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center">
          <img src={logo} alt="LGTS Lynx Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold tracking-wide text-gray-600">
            LGTS <span className="italic text-accent">Lynx</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-gray-600">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#security" className="hover:text-primary">Security</a>
          <a href="#pricing" className="hover:text-primary">Pricing</a>
        </nav>

        <a href="#get-started" className="bg-accent text-black px-6 py-3 rounded-xl font-semibold">
          Get Started
        </a>
      </div>
    </header>
  );
}
