/* global React */
const { useState, useEffect, useRef } = React;

function Terminal() {
  const sequence = [
    { type: "cmd", text: "cat ./sobre.md" },
    { type: "out", text: "" },
    { type: "h", text: "# Rinha de Dev — uma arena, não um curso." },
    { type: "out", text: "" },
    { type: "p", text: "Hackathon onde alunos do IFPI Picos competem em" },
    { type: "p", text: "equipe para resolver um problema técnico real." },
    { type: "out", text: "" },
    { type: "p", text: "Sem slides. Sem teoria. Apenas:" },
    { type: "out", text: "" },
    { type: "li", text: "→ 7 dias de codificação (14 → 21 maio)" },
    { type: "li", text: "→ kick-off e final presenciais c/ comida" },
    { type: "li", text: "→ stack livre, entrega funcionando ou nada" },
    { type: "out", text: "" },
    { type: "cmd", text: "./run --mode=combat" },
  ];

  const [step, setStep] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            setStep(0);
            setCharIdx(0);
            setDone(false);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (done) return;
    if (step >= sequence.length) { setDone(true); return; }
    const cur = sequence[step];
    const target = cur.text || "";
    if (cur.type === "out" || charIdx >= target.length) {
      const delay = cur.type === "cmd" ? 320 : cur.type === "h" ? 200 : 80;
      const t = setTimeout(() => {
        setStep((s) => s + 1);
        setCharIdx(0);
      }, delay);
      return () => clearTimeout(t);
    }
    const speed = cur.type === "cmd" ? 28 : 12;
    const t = setTimeout(() => setCharIdx((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [step, charIdx, done]);

  const renderLine = (item, i, fullText) => {
    const text = fullText ?? item.text;
    if (item.type === "cmd")
      return (
        <div key={i} style={termStyles.line}>
          <span style={{ color: "var(--accent-3)" }}>arena</span>
          <span style={{ color: "var(--ink-muted)" }}>:</span>
          <span style={{ color: "var(--accent-2)" }}>~/picos</span>
          <span style={{ color: "var(--ink-muted)", marginRight: 8 }}>$</span>
          <span style={{ color: "var(--ink)" }}>{text}</span>
        </div>
      );
    if (item.type === "h")
      return <div key={i} style={{ ...termStyles.line, color: "var(--accent)", fontWeight: 500 }}>{text}</div>;
    if (item.type === "li")
      return <div key={i} style={{ ...termStyles.line, color: "var(--ink)" }}>{text}</div>;
    if (item.type === "out") return <div key={i} style={termStyles.line}>&nbsp;</div>;
    return <div key={i} style={{ ...termStyles.line, color: "var(--ink-dim)" }}>{text}</div>;
  };

  return (
    <section id="about" style={termStyles.section} ref={ref}>
      <div className="container">
        <div style={termStyles.head}>
          <span className="eyebrow"><span className="dot" />01 / SOBRE</span>
          <span className="mono-tag">cat ./sobre.md</span>
        </div>

        <div style={termStyles.frame}>
          <div style={termStyles.frameBar}>
            <div style={termStyles.dots}>
              <span style={{ ...termStyles.dot, background: "#ff5f56" }} />
              <span style={{ ...termStyles.dot, background: "#ffbd2e" }} />
              <span style={{ ...termStyles.dot, background: "#27c93f" }} />
            </div>
            <div style={termStyles.frameTitle}>arena — bash — 96×24</div>
            <div style={termStyles.frameRight}>
              <span style={{ color: "var(--accent-3)" }}>●</span>
              <span style={{ color: "var(--ink-muted)" }}>connected</span>
            </div>
          </div>
          <div style={termStyles.body}>
            {sequence.slice(0, step).map((it, i) => renderLine(it, i))}
            {step < sequence.length && (
              <div style={termStyles.line}>
                {renderLine(
                  sequence[step],
                  "cur",
                  sequence[step].text.slice(0, charIdx)
                )}
              </div>
            )}
            {!done && <span className="caret" />}
          </div>
        </div>

        <div style={termStyles.callouts}>
          <Callout n="01" label="REAL" text="Problemas reais, propostos por professores e parceiros do IFPI." />
          <Callout n="02" label="WEEK" text="14 a 21 de maio. Codificação remota entre os dois dias presenciais." />
          <Callout n="03" label="ADMIN" text="Pode incluir 1 colega de Administração no time pro pitch — ajuda a vender o produto pra banca. Opcional." />
          <Callout n="04" label="JURI" text="Banca técnica avalia código, produto e apresentação." />
        </div>
      </div>
    </section>
  );
}

function Callout({ n, label, text }) {
  return (
    <div className="card" style={termStyles.callout}>
      <div style={termStyles.calloutHead}>
        <span style={{ color: "var(--ink-muted)" }}>{n}</span>
        <span style={{ color: "var(--accent)" }}>// {label}</span>
      </div>
      <div style={termStyles.calloutText}>{text}</div>
    </div>
  );
}

const termStyles = {
  section: {
    position: "relative",
    padding: "140px 0 120px",
    borderTop: "1px solid var(--line)",
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  frame: {
    background: "var(--bg-1)",
    border: "1px solid var(--line-2)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(var(--accent-rgb), 0.08)",
  },
  frameBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    borderBottom: "1px solid var(--line)",
    background: "rgba(255,255,255,0.02)",
  },
  dots: { display: "flex", gap: 7 },
  dot: { width: 11, height: 11, borderRadius: 999, opacity: 0.8 },
  frameTitle: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-muted)",
    letterSpacing: "0.04em",
  },
  frameRight: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  body: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    lineHeight: 1.85,
    padding: "26px 24px",
    minHeight: 360,
    color: "var(--ink)",
  },
  line: { display: "flex", gap: 4, alignItems: "baseline", whiteSpace: "pre-wrap" },
  callouts: {
    marginTop: 64,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  callout: { padding: 22 },
  calloutHead: {
    display: "flex",
    gap: 10,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.08em",
    marginBottom: 14,
  },
  calloutText: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    lineHeight: 1.65,
    color: "var(--ink-dim)",
  },
};

window.Terminal = Terminal;
