/* global React */
const { useState, useEffect, useRef } = React;

/* ===================== Como Funciona ===================== */

function HowItWorks() {
  const steps = [
    { n: "01", t: "Inscrição", d: "Forme equipe ou entre solo. Sistema fecha quando o limite for atingido.", cmd: "POST /signup" },
    { n: "02", t: "Kick-off Presencial · 14/mai", d: "Equipes confirmadas, problemas anunciados. Comida e bebida no campus.", cmd: "team.assemble() // IRL" },
    { n: "03", t: "Dev Week · 14 → 21", d: "7 dias de codificação remota. Stack livre — desde que consistente e realista. Mentores on-call.", cmd: "git push origin main" },
    { n: "04", t: "Pitch + Premiação · 21/mai", d: "Presencial. 5min de demo + 3min de Q&A. Comida, bebida e o anúncio dos vencedores ao vivo.", cmd: "demo --live && winner.reveal()" },
  ];

  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.dataset.idx);
            setActive((a) => Math.max(a, i));
          }
        });
      },
      { threshold: 0.55 }
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" style={howStyles.section}>
      <div className="container">
        <div style={howStyles.head}>
          <span className="eyebrow"><span className="dot" />02 / FLUXO</span>
          <h2 style={howStyles.title}>
            Como funciona<br />
            <span style={{ color: "var(--ink-muted)" }}>// do signup ao pódio</span>
          </h2>
        </div>

        <div style={howStyles.timeline}>
          <div style={howStyles.line}>
            <div style={{ ...howStyles.lineFill, height: `${(active / (steps.length - 1)) * 100}%` }} />
          </div>

          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => (refs.current[i] = el)}
              data-idx={i}
              style={howStyles.row}
            >
              <div style={howStyles.dotWrap}>
                <div
                  style={{
                    ...howStyles.dot,
                    background: i <= active ? "var(--accent)" : "var(--bg)",
                    boxShadow:
                      i <= active
                        ? "0 0 18px rgba(var(--accent-rgb), 0.8)"
                        : "none",
                  }}
                />
              </div>
              <div style={howStyles.row2}>
                <div style={howStyles.rowHead}>
                  <span style={howStyles.rowN}>{s.n}</span>
                  <h3 style={howStyles.rowT}>{s.t}</h3>
                </div>
                <p style={howStyles.rowD}>{s.d}</p>
                <code style={howStyles.rowCmd}>
                  <span style={{ color: "var(--accent-3)" }}>›</span> {s.cmd}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const howStyles = {
  section: {
    padding: "140px 0",
    borderTop: "1px solid var(--line)",
  },
  head: { marginBottom: 70, display: "flex", flexDirection: "column", gap: 18 },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(40px, 5.5vw, 72px)",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: 1.02,
    margin: 0,
    color: "var(--ink)",
  },
  timeline: {
    position: "relative",
    paddingLeft: 32,
  },
  line: {
    position: "absolute",
    top: 8, bottom: 8, left: 8,
    width: 1,
    background: "var(--line-2)",
    overflow: "hidden",
  },
  lineFill: {
    width: "100%",
    background: "linear-gradient(to bottom, var(--accent), var(--accent-2))",
    boxShadow: "0 0 12px rgba(var(--accent-rgb), 0.6)",
    transition: "height 0.6s ease",
  },
  row: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: 28,
    paddingBottom: 56,
  },
  dotWrap: {
    position: "relative",
    width: 17,
    marginLeft: -32 + 0,
  },
  dot: {
    width: 17,
    height: 17,
    borderRadius: 999,
    border: "1px solid var(--accent)",
    transition: "all 0.4s ease",
  },
  row2: { paddingTop: -2 },
  rowHead: { display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12 },
  rowN: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--ink-muted)",
    letterSpacing: "0.06em",
  },
  rowT: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(22px, 2.4vw, 34px)",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    margin: 0,
    color: "var(--ink)",
  },
  rowD: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    lineHeight: 1.7,
    color: "var(--ink-dim)",
    margin: "0 0 14px",
    maxWidth: 560,
  },
  rowCmd: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--ink)",
    background: "var(--bg-1)",
    border: "1px solid var(--line)",
    padding: "8px 12px",
    display: "inline-block",
  },
};

/* ===================== Premiação ===================== */

function Prizes() {
  return (
    <section id="prizes" style={prizeStyles.section}>
      <div style={prizeStyles.bgGlow} />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={prizeStyles.head}>
          <span className="eyebrow"><span className="dot" />03 / RECOMPENSA</span>
          <h2 style={prizeStyles.title}>
            Um vencedor.<br />
            <span style={{ color: "var(--accent)" }}>tudo ou nada.</span>
          </h2>
          <p style={prizeStyles.lede}>
            Sem 2º, sem 3º. Quem entrega o melhor produto leva o troféu — e o pix.
          </p>
        </div>

        <div className="prize-split" style={prizeStyles.heroCard}>
          <div style={prizeStyles.heroLeft} className="prize-left">
            <div style={prizeStyles.placeBadge}>
              <span style={prizeStyles.placeNum}>01</span>
              <span style={prizeStyles.placeLabel}>// CHAMPION</span>
            </div>
            <div style={prizeStyles.bigPrize}>
              <span style={prizeStyles.prizeCurrency}>R$</span>
              <span style={prizeStyles.prizeNum}>50</span>
              <span style={prizeStyles.prizeCents}>,00</span>
            </div>
            <div style={prizeStyles.prizeNote}>
              <span style={{ color: "var(--accent-3)" }}>›</span>
              <span>pix transferido na hora, ao vivo, no palco</span>
            </div>
            <div style={prizeStyles.bullets}>
              <div style={prizeStyles.bullet}>
                <span style={prizeStyles.bulletK}>+</span>
                <div>
                  <div style={prizeStyles.bulletT}>Troféu impresso em 3D</div>
                  <div style={prizeStyles.bulletD}>O lendário "World's Best Dev" — peça única, impressa pela Fábrica de Integração.</div>
                </div>
              </div>
              <div style={prizeStyles.bullet}>
                <span style={prizeStyles.bulletK}>+</span>
                <div>
                  <div style={prizeStyles.bulletT}>Bragging rights vitalícios</div>
                  <div style={prizeStyles.bulletD}>Vencedor da 1ª edição. Não tem como repetir.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={prizeStyles.heroRight} className="prize-right">
            <Trophy3D />
            <div style={prizeStyles.heroRightCaption}>
              <span style={{ color: "var(--accent-3)" }}>●</span>
              <span>trophy.stl · v01 · ifpi-picos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trophy3D() {
  return (
    <div style={trophyStyles.wrap}>
      <div style={trophyStyles.scanGlow} />
      <img src="assets/trophy.png" alt="Troféu Rinha de Dev — impresso em 3D" style={trophyStyles.img} />
      <div style={trophyStyles.tag}>
        <span style={{ color: "var(--accent-3)" }}>●</span>
        <span>"World's Best Dev"</span>
      </div>
      <span style={{ ...trophyStyles.bracket, top: 0, left: 0, borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
      <span style={{ ...trophyStyles.bracket, top: 0, right: 0, borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />
      <span style={{ ...trophyStyles.bracket, bottom: 0, left: 0, borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
      <span style={{ ...trophyStyles.bracket, bottom: 0, right: 0, borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />
    </div>
  );
}

const trophyStyles = {
  wrap: {
    position: "relative",
    width: "100%",
    minHeight: 360,
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(circle at center, rgba(var(--accent-rgb), 0.18), transparent 70%)",
    border: "1px solid var(--line)",
    overflow: "hidden",
  },
  scanGlow: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(var(--accent-rgb), 0.08) 1px, transparent 1px)",
    backgroundSize: "100% 4px",
    pointerEvents: "none",
    mixBlendMode: "overlay",
  },
  img: {
    maxWidth: "75%",
    maxHeight: 320,
    filter: "drop-shadow(0 0 30px rgba(var(--accent-rgb), 0.4)) drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
    animation: "trophyFloat 4s ease-in-out infinite",
    position: "relative",
    zIndex: 1,
  },
  tag: {
    position: "absolute",
    bottom: 14,
    left: 14,
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "var(--ink-dim)",
    letterSpacing: "0.06em",
    display: "flex", gap: 6, alignItems: "center",
    background: "rgba(0,0,0,0.4)",
    padding: "4px 8px",
    border: "1px solid var(--line)",
  },
  bracket: { position: "absolute", width: 14, height: 14 },
};

if (typeof document !== "undefined" && !document.getElementById("__trophy-css")) {
  const s = document.createElement("style");
  s.id = "__trophy-css";
  s.textContent = "@keyframes trophyFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }";
  document.head.appendChild(s);
}

const prizeStyles = {
  section: { position: "relative", padding: "140px 0", borderTop: "1px solid var(--line)", overflow: "hidden" },
  bgGlow: {
    position: "absolute",
    top: "30%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900, height: 600,
    background: "radial-gradient(ellipse, rgba(var(--accent-rgb), 0.18), transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  head: { marginBottom: 64, display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(48px, 6.5vw, 88px)",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    margin: 0,
    color: "var(--ink)",
  },
  lede: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    lineHeight: 1.7,
    color: "var(--ink-dim)",
    margin: 0,
  },
  heroCard: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 0,
    border: "1px solid rgba(var(--accent-rgb), 0.4)",
    background: "linear-gradient(180deg, rgba(var(--accent-rgb), 0.08), var(--bg-2))",
    position: "relative",
  },
  heroLeft: { padding: "56px 48px", display: "flex", flexDirection: "column", gap: 24 },
  heroRight: {
    borderLeft: "1px solid var(--line)",
    background: "var(--bg-1)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  heroRightCaption: {
    padding: "14px 18px",
    borderTop: "1px solid var(--line)",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-muted)",
    letterSpacing: "0.06em",
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  placeBadge: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
  },
  placeNum: {
    fontFamily: "var(--font-display)",
    fontSize: 32,
    fontWeight: 700,
    color: "var(--accent)",
    letterSpacing: "-0.02em",
  },
  placeLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.18em",
    color: "var(--ink-dim)",
  },
  bigPrize: {
    display: "flex",
    alignItems: "baseline",
    margin: "8px 0 4px",
  },
  prizeCurrency: {
    fontFamily: "var(--font-mono)",
    fontSize: 28,
    color: "var(--accent)",
    marginRight: 10,
    fontWeight: 500,
  },
  prizeNum: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(96px, 14vw, 180px)",
    fontWeight: 700,
    color: "var(--ink)",
    letterSpacing: "-0.06em",
    lineHeight: 0.9,
    textShadow: "0 0 60px rgba(var(--accent-rgb), 0.5)",
  },
  prizeCents: {
    fontFamily: "var(--font-mono)",
    fontSize: 28,
    color: "var(--ink-dim)",
    marginLeft: 6,
  },
  prizeNote: {
    display: "flex",
    gap: 10,
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    color: "var(--ink)",
    paddingBottom: 24,
    borderBottom: "1px solid var(--line)",
  },
  bullets: { display: "flex", flexDirection: "column", gap: 18 },
  bullet: { display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start" },
  bulletK: { fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--accent)", lineHeight: 1 },
  bulletT: {
    fontFamily: "var(--font-display)",
    fontSize: 18,
    fontWeight: 500,
    color: "var(--ink)",
    letterSpacing: "-0.01em",
    marginBottom: 4,
  },
  bulletD: {
    fontFamily: "var(--font-mono)",
    fontSize: 12.5,
    color: "var(--ink-dim)",
    lineHeight: 1.6,
  },
};

/* ===================== Cronograma ===================== */

function Schedule() {
  const items = [
    { date: "14 / MAI", phase: "KICK-OFF", title: "Formação de equipes + briefing", desc: "Presencial no IFPI Picos. Times montados, problemas anunciados, cronômetro inicia.", live: true },
    { date: "14 → 21", phase: "DEV WEEK", title: "Semana de codificação", desc: "7 dias de desenvolvimento remoto. Stack livre — desde que consistente e realista. Mentores on-call no Discord." },
    { date: "21 / MAI", phase: "FINAL", title: "Apresentações + premiação", desc: "Presencial. Demos ao vivo para banca, anúncio dos vencedores e encerramento.", live: true },
  ];

  return (
    <section id="schedule" style={schedStyles.section}>
      <div className="container">
        <div style={schedStyles.head}>
          <span className="eyebrow"><span className="dot" />04 / TIMELINE</span>
          <h2 style={schedStyles.title}>
            Cronograma<br />
            <span style={{ color: "var(--accent)" }}>// 14 → 21 de maio</span>
          </h2>
        </div>

        <div style={schedStyles.table}>
          <div style={schedStyles.tableHead} className="sched-table-head">
            <div>DATA</div>
            <div>FASE</div>
            <div>EVENTO</div>
            <div style={{ textAlign: "right" }}>FORMATO</div>
          </div>
          {items.map((it, i) => (
            <div
              key={i}
              style={schedStyles.row}
              className="sched-row"
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(var(--accent-rgb), 0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={schedStyles.cellDate} className="sched-cell-date">{it.date}</div>
              <div style={schedStyles.cellPhase} className="sched-cell-phase">{it.phase}</div>
              <div className="sched-cell-event">
                <div style={schedStyles.cellTitle}>{it.title}</div>
                <div style={schedStyles.cellDesc}>{it.desc}</div>
              </div>
              <div style={schedStyles.cellStatus} className="sched-cell-status">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  color: it.live ? "var(--accent-3)" : "var(--ink-muted)",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: 999,
                    background: it.live ? "var(--accent-3)" : "var(--ink-muted)",
                    boxShadow: it.live ? "0 0 8px var(--accent-3)" : "none",
                  }} />
                  {it.live ? "presencial" : "remoto"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const schedStyles = {
  section: { padding: "120px 0", borderTop: "1px solid var(--line)" },
  head: { marginBottom: 56, display: "flex", flexDirection: "column", gap: 18 },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(40px, 5.5vw, 72px)",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: 1.02,
    margin: 0,
    color: "var(--ink)",
  },
  table: { borderTop: "1px solid var(--line-2)" },
  tableHead: {
    display: "grid",
    gridTemplateColumns: "180px 140px 1fr 140px",
    gap: 24,
    padding: "14px 16px",
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.12em",
    color: "var(--ink-muted)",
    borderBottom: "1px solid var(--line)",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "180px 140px 1fr 140px",
    gap: 24,
    padding: "26px 16px",
    borderBottom: "1px solid var(--line)",
    alignItems: "center",
    transition: "background 0.15s ease",
  },
  cellDate: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    color: "var(--ink)",
    letterSpacing: "0.04em",
  },
  cellPhase: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    color: "var(--accent)",
  },
  cellTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 18,
    fontWeight: 500,
    color: "var(--ink)",
    letterSpacing: "-0.01em",
    marginBottom: 4,
  },
  cellDesc: {
    fontFamily: "var(--font-mono)",
    fontSize: 12.5,
    color: "var(--ink-dim)",
    lineHeight: 1.6,
  },
  cellStatus: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textAlign: "right",
  },
};

/* ===================== Regras (code-block) ===================== */

function Rules() {
  const lines = [
    { t: "com", v: "// rinha-de-dev/rules.json" },
    { t: "sym", v: "{" },
    { t: "kv",  k: '"team_size"', v: '"4..6"', c: "// min 4, max 6" },
    { t: "kv",  k: '"price_per_dev"', v: '"R$ 5,00"', c: "// por membro" },
    { t: "kv",  k: '"format"', v: '"presencial + remoto"' },
    { t: "kv",  k: '"start"', v: '"2026-05-14"', c: "// kick-off presencial" },
    { t: "kv",  k: '"end"', v: '"2026-05-21"', c: "// pitch + premiação" },
    { t: "kv",  k: '"audience"', v: '"IFPI_PICOS_ONLY"' },
    { t: "kv",  k: '"stack"', v: '"livre"', c: "// consistente e realista" },
    { t: "kv",  k: '"ai_assistance"', v: "true", c: "// permitida c/ disclosure" },
    { t: "kv",  k: '"plagio"', v: "false", c: "// desqualifica" },
    { t: "kv",  k: '"entrega"', v: '"git_tag + demo_5min"' },
    { t: "kv",  k: '"juri"', v: '["código", "produto", "pitch"]' },
    { t: "kv",  k: '"empate"', v: '"voto da banca"' },
    { t: "sym", v: "}" },
  ];

  return (
    <section id="rules" style={rulesStyles.section}>
      <div className="container">
        <div style={rulesStyles.head}>
          <span className="eyebrow"><span className="dot" />05 / PROTOCOLO</span>
          <h2 style={rulesStyles.title}>
            As regras são código.<br />
            <span style={{ color: "var(--ink-muted)" }}>// leia com atenção.</span>
          </h2>
        </div>

        <div className="code" style={rulesStyles.code}>
          {lines.map((l, i) => (
            <div key={i} className="line">
              <span className="ln">{String(i + 1).padStart(2, "0")}</span>
              <span>
                {l.t === "com" && <span className="com">{l.v}</span>}
                {l.t === "sym" && <span style={{ color: "var(--ink)" }}>{l.v}</span>}
                {l.t === "kv" && (
                  <>
                    <span className="fn">{l.k}</span>
                    <span style={{ color: "var(--ink-muted)" }}>: </span>
                    {l.v.startsWith('"') || l.v.startsWith("[") ? (
                      <span className="str">{l.v}</span>
                    ) : l.v === "true" || l.v === "false" ? (
                      <span className="kw">{l.v}</span>
                    ) : (
                      <span className="num">{l.v}</span>
                    )}
                    <span style={{ color: "var(--ink-muted)" }}>,</span>
                    {l.c && <span className="com">  {l.c}</span>}
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const rulesStyles = {
  section: { padding: "120px 0", borderTop: "1px solid var(--line)" },
  head: { marginBottom: 48, display: "flex", flexDirection: "column", gap: 18 },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(40px, 5.5vw, 72px)",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: 1.02,
    margin: 0,
    color: "var(--ink)",
  },
  code: { maxWidth: 880 },
};

/* ===================== FAQ ===================== */

function FAQ() {
  const items = [
    { q: "Quando é o evento?", a: "Kick-off presencial em 14 de maio. Codificação de 14 a 21. Apresentação e premiação presencial em 21 de maio." },
    { q: "Quanto custa para participar?", a: "R$ 5,00 por membro da equipe. Times têm de 4 a 6 devs — então a inscrição da equipe sai entre R$ 20 e R$ 30 no total." },
    { q: "Qual o tamanho da equipe?", a: "Mínimo 4, máximo 6 devs. Se você se inscrever solo, é alocado em um time durante o kick-off de 14/mai." },
    { q: "Preciso já saber programar bem para participar?", a: "Sim, mas não precisa ser sênior. O foco é entrega — quem sabe trabalhar em equipe sob pressão tem vantagem sobre quem sabe muito mas trava." },
    { q: "Posso participar sozinho?", a: "Você se inscreve solo, mas competirá em equipe (4 a 6 pessoas). O matching de times solo acontece no kick-off de 14/mai." },
    { q: "Posso chamar alguém de administração para o pitch?", a: "Pode — e é opcional. Times podem incluir um membro de cursos de administração para ajudar no pitch e convencer a banca do valor do produto. Conta no limite de 6 pessoas da equipe." },
    { q: "Tenho que ser do IFPI Picos?", a: "Sim. A 1ª edição é exclusiva para alunos matriculados no IFPI Campus Picos." },
    { q: "Qual stack posso usar?", a: "Livre. Qualquer linguagem, qualquer framework — desde que a escolha seja consistente com o problema e tecnicamente realista de entregar em 7 dias." },
    { q: "Posso usar IA / assistentes de código?", a: "Pode. Mas precisa declarar o uso na apresentação. A banca avalia o que sua equipe construiu, não o que copiou." },
    { q: "E nos dias presenciais, tem comida?", a: "Sim. Comida e bebida liberadas nos dois dias presenciais (14 e 21) por conta da organização. Programa pra ficar." },
    { q: "Qual o custo da inscrição?", a: "R$ 5,00 por dev. A taxa cobre a logística dos dois dias presenciais (comida, bebida, infraestrutura). Equipe de 4 paga R$ 20; de 6, R$ 30." },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" style={faqStyles.section}>
      <div className="container">
        <div style={faqStyles.head}>
          <span className="eyebrow"><span className="dot" />06 / FAQ</span>
          <h2 style={faqStyles.title}>Perguntas que o terminal não responde.</h2>
        </div>

        <div style={faqStyles.list}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ ...faqStyles.item, borderColor: isOpen ? "rgba(var(--accent-rgb), 0.4)" : "var(--line)" }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={faqStyles.q}
                >
                  <span style={faqStyles.qIdx}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={faqStyles.qText}>{it.q}</span>
                  <span style={{
                    ...faqStyles.qIcon,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    color: isOpen ? "var(--accent)" : "var(--ink-dim)",
                  }}>+</span>
                </button>
                <div style={{
                  ...faqStyles.a,
                  maxHeight: isOpen ? 240 : 0,
                  opacity: isOpen ? 1 : 0,
                  paddingBottom: isOpen ? 22 : 0,
                }}>
                  <div style={faqStyles.aInner}>
                    <span style={{ color: "var(--accent-3)" }}>›</span>
                    <span>{it.a}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const faqStyles = {
  section: { padding: "120px 0", borderTop: "1px solid var(--line)" },
  head: { marginBottom: 56, display: "flex", flexDirection: "column", gap: 18 },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(34px, 4.5vw, 56px)",
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    margin: 0,
    color: "var(--ink)",
    maxWidth: 760,
  },
  list: { display: "flex", flexDirection: "column", gap: 0 },
  item: {
    borderTop: "1px solid var(--line)",
    transition: "border-color 0.2s ease",
  },
  q: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    gap: 24,
    alignItems: "center",
    padding: "26px 4px",
    textAlign: "left",
  },
  qIdx: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-muted)",
    letterSpacing: "0.08em",
  },
  qText: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    fontWeight: 500,
    color: "var(--ink)",
    letterSpacing: "-0.01em",
  },
  qIcon: {
    fontFamily: "var(--font-mono)",
    fontSize: 24,
    transition: "transform 0.25s ease, color 0.25s ease",
    width: 24, textAlign: "center",
  },
  a: {
    overflow: "hidden",
    transition: "max-height 0.35s ease, opacity 0.3s ease, padding-bottom 0.3s ease",
    paddingLeft: 56,
  },
  aInner: {
    display: "flex", gap: 10,
    fontFamily: "var(--font-mono)",
    fontSize: 13.5,
    lineHeight: 1.7,
    color: "var(--ink-dim)",
    maxWidth: 720,
  },
};

/* ===================== CTA Final ===================== */

function FinalCTA() {
  return (
    <section id="cta" style={ctaStyles.section}>
      <div style={ctaStyles.bgGrid} />
      <div style={ctaStyles.bgGlow} />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="cta-inner" style={ctaStyles.inner}>
          <span className="eyebrow"><span className="dot" />FINAL_BOSS</span>
          <h2 style={ctaStyles.title}>
            <span className="glitch" data-text="Você aguenta">Você aguenta</span><br />
            <span style={{ color: "var(--accent)" }}>a pressão?</span>
          </h2>
          <p style={ctaStyles.sub}>Prove na arena.</p>
          <div style={ctaStyles.ctas}>
            <a href="https://forms.gle/uwK9kgzcdAQxfKtU9" target="_blank" rel="noopener" className="btn" style={{ padding: "20px 32px", fontSize: 15 }}>
              Quero participar
              <span className="arrow">→</span>
            </a>
            <span style={ctaStyles.note}>
              <span style={{ color: "var(--accent-3)" }}>●</span> kick-off em <span style={{ color: "var(--ink)" }}>14 / MAI / 2026</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const ctaStyles = {
  section: {
    position: "relative",
    padding: "180px 0 160px",
    borderTop: "1px solid var(--line)",
    overflow: "hidden",
  },
  bgGrid: {
    position: "absolute", inset: 0,
    backgroundImage:
      "linear-gradient(rgba(var(--accent-rgb), 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb), 0.06) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    maskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
  },
  bgGlow: {
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800, height: 800,
    background:
      "radial-gradient(circle, rgba(var(--accent-rgb), 0.18), transparent 60%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  inner: { textAlign: "center", maxWidth: 900, margin: "0 auto" },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(56px, 9vw, 130px)",
    fontWeight: 700,
    letterSpacing: "-0.05em",
    lineHeight: 0.95,
    margin: "28px 0 24px",
    color: "var(--ink)",
  },
  sub: {
    fontFamily: "var(--font-mono)",
    fontSize: 16,
    color: "var(--ink-dim)",
    margin: "0 0 48px",
    letterSpacing: "0.04em",
  },
  ctas: {
    display: "flex",
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  note: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--ink-muted)",
    letterSpacing: "0.06em",
    display: "inline-flex", alignItems: "center", gap: 8,
  },
};

/* ===================== Footer ===================== */

function Footer() {
  return (
    <footer style={footStyles.footer}>
      <div className="container" style={footStyles.inner}>
        <div style={footStyles.top} className="footer-top">
          <div style={footStyles.brand}>
            <span style={{ color: "var(--accent)" }}>▍</span>
            <span style={{ fontWeight: 600, letterSpacing: "0.06em" }}>RINHA::DEV</span>
            <span style={footStyles.brandTag}>v1.0.0</span>
          </div>
          <div style={footStyles.cols} className="footer-cols">
            <div>
              <div style={footStyles.colHead}>EVENTO</div>
              <a style={footStyles.colLink} href="#about">Sobre</a>
              <a style={footStyles.colLink} href="#how">Como funciona</a>
              <a style={footStyles.colLink} href="#prizes">Premiação</a>
            </div>
            <div>
              <div style={footStyles.colHead}>INFO</div>
              <a style={footStyles.colLink} href="#schedule">Cronograma</a>
              <a style={footStyles.colLink} href="#rules">Regras</a>
              <a style={footStyles.colLink} href="#faq">FAQ</a>
            </div>
            <div>
              <div style={footStyles.colHead}>ORGANIZAÇÃO</div>
              <span style={footStyles.colLink}>Fábrica de Integração</span>
              <span style={footStyles.colLink}>IFPI Campus Picos</span>
            </div>
          </div>
        </div>
        <div style={footStyles.bottom} className="footer-bottom">
          <span>© 2026 RINHA::DEV — IFPI PICOS</span>
          <span style={{ display: "flex", gap: 18 }}>
            <span><span style={{ color: "var(--accent-3)" }}>●</span> arena online</span>
            <span>built with <span style={{ color: "var(--accent)" }}>{"</>"}</span> & caffeine</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

const footStyles = {
  footer: {
    borderTop: "1px solid var(--line-2)",
    padding: "80px 0 32px",
    background: "var(--bg-1)",
  },
  inner: { display: "flex", flexDirection: "column", gap: 64 },
  top: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60 },
  brand: {
    display: "flex", alignItems: "center", gap: 10,
    fontFamily: "var(--font-mono)", fontSize: 13,
  },
  brandTag: {
    fontSize: 10, color: "var(--ink-muted)",
    border: "1px solid var(--line-2)", padding: "2px 6px", marginLeft: 4,
  },
  cols: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 },
  colHead: {
    fontFamily: "var(--font-mono)",
    fontSize: 11, letterSpacing: "0.14em",
    color: "var(--ink-muted)", marginBottom: 14,
  },
  colLink: {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: 13, color: "var(--ink-dim)",
    padding: "5px 0", transition: "color 0.15s",
  },
  bottom: {
    display: "flex", justifyContent: "space-between",
    fontFamily: "var(--font-mono)",
    fontSize: 11, color: "var(--ink-muted)",
    paddingTop: 24, borderTop: "1px solid var(--line)",
    letterSpacing: "0.05em",
  },
};

window.HowItWorks = HowItWorks;
window.Prizes = Prizes;
window.Schedule = Schedule;
window.Rules = Rules;
window.FAQ = FAQ;
window.FinalCTA = FinalCTA;
window.Footer = Footer;
