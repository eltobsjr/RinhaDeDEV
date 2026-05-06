/* global React, ReactDOM, Boot, Hero, Terminal, OnsiteDays, Pricing, HowItWorks, Prizes, Schedule, Rules, FAQ, FinalCTA, Footer, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "purple",
  "glitch": "subtle",
  "scanlines": true,
  "matrix": true,
  "theme": "dark"
}/*EDITMODE-END*/;

const ACCENTS = {
  purple: { c: "#7c3aed", rgb: "124, 58, 237" },
  blue:   { c: "#00d4ff", rgb: "0, 212, 255" },
  green:  { c: "#00ff9f", rgb: "0, 255, 159" },
};

const GLITCH = { off: 0, subtle: 0.5, strong: 1.2 };

function App() {
  const [booted, setBooted] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    const a = ACCENTS[tweaks.accent] || ACCENTS.purple;
    root.style.setProperty("--accent", a.c);
    root.style.setProperty("--accent-rgb", a.rgb);
    root.style.setProperty("--glitch-intensity", String(GLITCH[tweaks.glitch] ?? 0.5));
    root.style.setProperty("--scanline-opacity", tweaks.scanlines ? "0.06" : "0");
    root.setAttribute("data-theme", tweaks.theme || "dark");
  }, [tweaks]);

  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}
      <div style={{ opacity: booted ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <Hero matrix={tweaks.matrix} theme={tweaks.theme} onThemeChange={(v) => setTweak("theme", v)} />
        <Terminal />
        <OnsiteDays />
        <HowItWorks />
        <Prizes />
        <Schedule />
        <Pricing />
        <Rules />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>

      <TweaksPanel title="TWEAKS">
        <TweakSection label="Tema">
          <TweakRadio
            label="Modo"
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[
              { value: "dark",  label: "Escuro" },
              { value: "light", label: "Claro" },
              { value: "hc",    label: "Alto Contraste" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Acento">
          <TweakRadio
            label="Cor"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              { value: "purple", label: "Roxo" },
              { value: "blue",   label: "Azul" },
              { value: "green",  label: "Verde" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Glitch">
          <TweakRadio
            label="Intensidade"
            value={tweaks.glitch}
            onChange={(v) => setTweak("glitch", v)}
            options={[
              { value: "off",    label: "Off" },
              { value: "subtle", label: "Sutil" },
              { value: "strong", label: "Forte" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Efeitos">
          <TweakToggle
            label="Scanlines"
            value={tweaks.scanlines}
            onChange={(v) => setTweak("scanlines", v)}
          />
          <TweakToggle
            label="Matrix rain"
            value={tweaks.matrix}
            onChange={(v) => setTweak("matrix", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
