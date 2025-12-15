import { useState } from "react";
import LandingPage from "./landing/LandingPage";
import SEOPlatform from "./dashboard/SEOPlatform";

export default function App() {
  const [mode, setMode] = useState("landing");

  return (
    <>
      {mode === "landing" && (
        <LandingPage onLaunch={() => setMode("dashboard")} />
      )}

      {mode === "dashboard" && <SEOPlatform />}
    </>
  );
}
