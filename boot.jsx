/* global React */
const { useEffect, useState } = React;

function Boot({ onDone }) {
  const lines = [
    { t: "[ OK ] kernel: arena.boot.v1 — initializing", d: 80 },
    { t: "[ OK ] mounting /dev/ifpi/picos", d: 90 },
    { t: "[ OK ] auth.session: spectator", d: 70 },
    { t: "[ OK ] arena.ready — entering...", d: 100 },
  ];
  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;
    const total = 800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= lines.length) {
        clearInterval(id);
        setTimeout(() => onDone && onDone(), 220);
      }
    }, 180);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={bootStyles.wrap}>
      <div style={bootStyles.inner}>
        <div style={bootStyles.brand}>
          <span style={{ color: "var(--accent)" }}>▍</span>
          <span style={{ letterSpacing: "0.18em" }}>RINHA::DEV</span>
          <span style={{ color: "var(--ink-muted)" }}>v1.0.0</span>
        </div>
        <div style={bootStyles.console}>
          {lines.slice(0, shown).map((l, i) => (
            <div key={i} style={bootStyles.line}>
              <span style={{ color: "var(--accent-3)" }}>{l.t.slice(0, 6)}</span>
              <span style={{ color: "var(--ink-dim)" }}>{l.t.slice(6)}</span>
            </div>
          ))}
          {shown < lines.length && (
            <div style={bootStyles.line}>
              <span style={{ color: "var(--accent)" }}>›</span>
              <span style={{ color: "var(--ink-dim)" }}>loading...</span>
              <span className="caret" style={{ marginLeft: 2 }} />
            </div>
          )}
        </div>
        <div style={bootStyles.barWrap}>
          <div style={bootStyles.barLabel}>
            <span>BOOTING ARENA</span>
            <span>{Math.floor(progress * 100).toString().padStart(3, "0")}%</span>
          </div>
          <div style={bootStyles.barTrack}>
            <div style={{ ...bootStyles.barFill, width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const bootStyles = {
  wrap: {
    position: "fixed",
    inset: 0,
    background: "var(--bg)",
    zIndex: 100,
    display: "grid",
    placeItems: "center",
    fontFamily: "var(--font-mono)",
  },
  inner: {
    width: "min(560px, 90vw)",
    padding: "24px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 12,
    color: "#fff",
    marginBottom: 22,
    fontWeight: 500,
  },
  console: {
    fontSize: 12.5,
    lineHeight: 1.9,
    marginBottom: 24,
    minHeight: 130,
  },
  line: { display: "flex", gap: 6 },
  barWrap: { fontSize: 11, letterSpacing: "0.1em" },
  barLabel: {
    display: "flex",
    justifyContent: "space-between",
    color: "var(--ink-dim)",
    marginBottom: 8,
  },
  barTrack: {
    height: 2,
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    background: "var(--accent)",
    boxShadow: "0 0 14px rgba(var(--accent-rgb), 0.8)",
    transition: "width 60ms linear",
  },
};

window.Boot = Boot;
