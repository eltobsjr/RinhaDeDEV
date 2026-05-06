/* global React */
const { useEffect, useRef } = React;

function MatrixRain({ enabled = true }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, cols = 0, drops = [];
    const fontSize = 14;
    const chars = "01アカサタナハマヤラワABCDEF{}<>/$_=*•".split("");

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / fontSize);
      drops = new Array(cols).fill(0).map(() => Math.random() * -h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let last = 0;
    const speed = 55; // ms per step

    const draw = (t) => {
      rafRef.current = requestAnimationFrame(draw);
      if (t - last < speed) return;
      last = t;

      // fade trail
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i];
        const ch = chars[(Math.random() * chars.length) | 0];

        // head
        ctx.fillStyle = "rgba(0, 255, 159, 0.9)";
        ctx.fillText(ch, x, y);
        // tail color
        ctx.fillStyle = "rgba(124, 58, 237, 0.35)";
        ctx.fillText(ch, x, y - fontSize);

        if (y > h && Math.random() > 0.975) {
          drops[i] = -fontSize;
        } else {
          drops[i] += fontSize;
        }
      }
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: enabled ? 0.55 : 0,
        transition: "opacity 0.6s ease",
      }}
    />
  );
}

function Hero({ matrix = true }) {
  return (
    <section style={heroStyles.section}>
      <div style={heroStyles.bgWrap}>
        <MatrixRain enabled={matrix} />
        {/* vignette */}
        <div style={heroStyles.vignette} />
        {/* grid lines */}
        <div style={heroStyles.grid} />
      </div>

      <Nav />

      <div className="container" style={heroStyles.content}>
        <div className="fade-in visible" style={{ animationDelay: "0ms" }}>
          <div style={heroStyles.metaRow}>
            <span className="chip">
              <span className="pulse" />
              SIGN-UPS OPEN
            </span>
            <span className="mono-tag">EDITION 01 · IFPI PICOS</span>
          </div>
        </div>

        <h1 style={heroStyles.title}>
          <span className="glitch h-display" data-text="RINHA" style={heroStyles.titleLine}>
            RINHA
          </span>
          <span style={heroStyles.titleSep}>
            <span style={heroStyles.titleSepBar} />
            <span style={heroStyles.titleSepLabel}>DE</span>
            <span style={heroStyles.titleSepBar} />
          </span>
          <span className="glitch h-display" data-text="DEV" style={heroStyles.titleLine}>
            DEV
          </span>
        </h1>

        <p style={heroStyles.subtitle}>
          Onde código vira combate.
        </p>

        <p style={heroStyles.lede}>
          Hackathon oficial da Fábrica de Integração — IFPI Campus Picos.
          <br />
          7 dias. Times de 4. Stack livre. Um vencedor.
        </p>

        <div style={heroStyles.ctas}>
          <a href="https://forms.gle/uwK9kgzcdAQxfKtU9" target="_blank" rel="noopener" className="btn">
            Entrar na Arena
            <span className="arrow">→</span>
          </a>
          <a href="#how" className="btn-ghost">
            <span style={{ color: "var(--accent-3)" }}>$</span>
            ver_regras.md
          </a>
        </div>

        <HeroStats />
      </div>

      <div style={heroStyles.bottomBar}>
        <span className="mono-tag">SCROLL ↓</span>
        <span className="mono-tag" style={{ color: "var(--ink-muted)" }}>
          arena.status: <span style={{ color: "var(--accent-3)" }}>online</span>
        </span>
      </div>
    </section>
  );
}

function Nav() {
  return (
    <nav style={navStyles.nav}>
      <div className="container" style={navStyles.inner}>
        <a href="#" style={navStyles.brand}>
          <span style={navStyles.brandMark}>▍</span>
          <span style={{ fontWeight: 600, letterSpacing: "0.06em" }}>RINHA::DEV</span>
          <span style={navStyles.brandTag}>v1</span>
        </a>
        <div style={navStyles.links}>
          <a href="#about" style={navStyles.link}>./sobre</a>
          <a href="#how" style={navStyles.link}>./como-funciona</a>
          <a href="#prizes" style={navStyles.link}>./premiacao</a>
          <a href="#schedule" style={navStyles.link}>./cronograma</a>
          <a href="#faq" style={navStyles.link}>./faq</a>
        </div>
        <a href="https://forms.gle/uwK9kgzcdAQxfKtU9" target="_blank" rel="noopener" className="btn" style={{ padding: "10px 16px", fontSize: 11, clipPath: "none" }}>
          inscrever_se()
          <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}

function HeroStats() {
  const items = [
    { v: "7d", l: "semana de codificação" },
    { v: "4–6", l: "devs por equipe" },
    { v: "2", l: "dias presenciais" },
    { v: "01", l: "edição inaugural" },
  ];
  return (
    <div style={heroStyles.stats}>
      {items.map((s, i) => (
        <div key={i} style={heroStyles.stat}>
          <div style={heroStyles.statV}>{s.v}</div>
          <div style={heroStyles.statL}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

const navStyles = {
  nav: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 30,
    backdropFilter: "blur(10px)",
    background: "rgba(5, 5, 5, 0.6)",
    borderBottom: "1px solid var(--line)",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--font-mono)",
    fontSize: 13,
  },
  brandMark: { color: "var(--accent)", textShadow: "0 0 10px rgba(var(--accent-rgb), 0.8)" },
  brandTag: {
    fontSize: 10,
    color: "var(--ink-muted)",
    border: "1px solid var(--line-2)",
    padding: "2px 6px",
    marginLeft: 4,
  },
  links: {
    display: "flex",
    gap: 28,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--ink-dim)",
  },
  link: { transition: "color 0.15s", padding: "6px 0" },
};

const heroStyles = {
  section: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    paddingTop: 60,
    paddingBottom: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  bgWrap: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.85) 80%)",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
  },
  content: {
    position: "relative",
    zIndex: 2,
    paddingTop: 80,
    paddingBottom: 60,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 36,
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: "clamp(72px, 14vw, 220px)",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    letterSpacing: "-0.06em",
    lineHeight: 0.85,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  titleLine: { color: "#fff" },
  titleSep: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    fontFamily: "var(--font-mono)",
    fontSize: "clamp(11px, 1.2vw, 13px)",
    fontWeight: 400,
    letterSpacing: "0.4em",
    color: "var(--ink-muted)",
    margin: "10px 0",
  },
  titleSepBar: {
    flex: 1,
    height: 1,
    background: "linear-gradient(90deg, transparent, var(--line-2), transparent)",
    maxWidth: 220,
  },
  titleSepLabel: { padding: "0 4px" },
  subtitle: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(20px, 2.4vw, 32px)",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    color: "var(--ink)",
    margin: "32px 0 14px",
  },
  lede: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    lineHeight: 1.7,
    color: "var(--ink-dim)",
    margin: "0 0 40px",
    maxWidth: 480,
  },
  ctas: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 80,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 0,
    borderTop: "1px solid var(--line)",
    borderBottom: "1px solid var(--line)",
  },
  stat: {
    padding: "20px 0",
    borderRight: "1px solid var(--line)",
  },
  statV: {
    fontFamily: "var(--font-display)",
    fontSize: 36,
    fontWeight: 600,
    color: "#fff",
    letterSpacing: "-0.03em",
    lineHeight: 1,
    marginBottom: 6,
  },
  statL: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-muted)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  bottomBar: {
    position: "absolute",
    bottom: 24,
    left: 0, right: 0,
    display: "flex",
    justifyContent: "space-between",
    padding: "0 48px",
    zIndex: 2,
  },
};

window.Hero = Hero;
