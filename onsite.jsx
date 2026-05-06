/* global React */
const { useEffect, useRef, useState } = React;

/* ===================== Onsite — dias presenciais ===================== */

function OnsiteDays() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="onsite" style={onsiteStyles.section} ref={ref}>
      <div style={onsiteStyles.bgGrid} />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={onsiteStyles.head}>
          <div>
            <span className="eyebrow"><span className="dot" />03 / IRL</span>
            <h2 style={onsiteStyles.title}>
              Os dias presenciais<br />
              <span style={{ color: "var(--accent)" }}>são por conta da casa.</span>
            </h2>
          </div>
          <p style={onsiteStyles.lede}>
            Kick-off em <span style={onsiteStyles.b}>14/mai</span> e final em <span style={onsiteStyles.b}>21/mai</span>, no IFPI Campus Picos. Comida, bebida e ambiente para codar e celebrar.
          </p>
        </div>

        <div style={onsiteStyles.grid}>
          <DayCard
            phase="DAY 01"
            date="14 / MAI"
            title="Kick-off"
            time="08:00 → 22:00"
            badge="presencial"
            active={active}
            delay={0}
            highlights={["Briefing dos problemas", "Formação de equipes", "lanches"]}
          />
          <FoodAnimation active={active} />
          <DayCard
            phase="DAY 07"
            date="21 / MAI"
            title="Pitch + Premiação"
            time="14:00 → 22:00"
            badge="presencial"
            active={active}
            delay={400}
            highlights={["Apresentações ao vivo", "Banca técnica + Q&A", "Coquetel de encerramento"]}
          />
        </div>

        <FuelTicker active={active} />
      </div>
    </section>
  );
}

function DayCard({ phase, date, title, time, badge, highlights, active, delay }) {
  return (
    <div
      className="card"
      style={{
        ...onsiteStyles.card,
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div style={onsiteStyles.cardTop}>
        <span style={onsiteStyles.cardPhase}>{phase}</span>
        <span className="chip" style={{ borderColor: "rgba(var(--accent-3-rgb), 0.4)", color: "var(--accent-3)" }}>
          <span className="pulse" />
          {badge}
        </span>
      </div>
      <div style={onsiteStyles.cardDate}>{date}</div>
      <div style={onsiteStyles.cardTitle}>{title}</div>
      <div style={onsiteStyles.cardTime}>
        <span style={{ color: "var(--accent-3)" }}>›</span> {time}
      </div>
      <div style={onsiteStyles.cardSep} />
      <div style={onsiteStyles.cardList}>
        {highlights.map((h, i) => (
          <div key={i} style={onsiteStyles.cardItem}>
            <span style={{ color: "var(--accent)" }}>+</span>
            <span>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* center column — animated food/drink loop */
function FoodAnimation({ active }) {
  return (
    <div style={onsiteStyles.foodWrap}>
      <div style={onsiteStyles.foodInner}>
        {/* steam */}
        <Steam active={active} />
        {/* coffee cup */}
        <CoffeeCup active={active} />
        {/* pizza slice */}
        <PizzaSlice active={active} />
        {/* soda can */}
        <SodaCan active={active} />
        {/* burger */}
        <Burger active={active} />

        {/* center label */}
        <div style={onsiteStyles.foodLabel}>
          <div style={onsiteStyles.foodLabelLine}>
            <span style={{ color: "var(--accent-3)" }}>●</span>
            <span>FUEL.SUPPLY</span>
          </div>
          <div style={onsiteStyles.foodLabelBig}>
            ON THE<br />HOUSE
          </div>
          <div style={onsiteStyles.foodLabelSub}>
            comida e bebida liberadas<br />nos 2 dias presenciais
          </div>
        </div>

        {/* orbital ring */}
        <div style={{ ...onsiteStyles.ring, animationPlayState: active ? "running" : "paused" }} />
        <div style={{ ...onsiteStyles.ring2, animationPlayState: active ? "running" : "paused" }} />
      </div>
    </div>
  );
}

function CoffeeCup({ active }) {
  return (
    <div style={{
      ...onsiteStyles.iconAbs,
      top: "12%", left: "10%",
      animation: active ? "floatA 5s ease-in-out infinite" : "none",
    }}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="10" y="20" width="32" height="26" rx="2" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M42 26 L48 26 Q52 26 52 30 L52 34 Q52 38 48 38 L42 38" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
        <line x1="14" y1="46" x2="38" y2="46" stroke="var(--accent-3)" strokeWidth="2"/>
        <line x1="16" y1="14" x2="16" y2="18" stroke="var(--ink-dim)" strokeWidth="1"/>
        <line x1="22" y1="10" x2="22" y2="18" stroke="var(--ink-dim)" strokeWidth="1"/>
        <line x1="28" y1="14" x2="28" y2="18" stroke="var(--ink-dim)" strokeWidth="1"/>
      </svg>
      <div style={onsiteStyles.iconLabel}>./coffee</div>
    </div>
  );
}

function PizzaSlice({ active }) {
  return (
    <div style={{
      ...onsiteStyles.iconAbs,
      top: "8%", right: "8%",
      animation: active ? "floatB 6s ease-in-out infinite" : "none",
    }}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M30 8 L52 50 L8 50 Z" stroke="var(--accent-2)" strokeWidth="1.5" fill="rgba(0, 212, 255, 0.06)"/>
        <circle cx="26" cy="30" r="3" fill="var(--accent)"/>
        <circle cx="36" cy="34" r="2.5" fill="var(--accent)"/>
        <circle cx="22" cy="42" r="2" fill="var(--accent-3)"/>
        <circle cx="38" cy="44" r="2" fill="var(--accent-3)"/>
        <circle cx="30" cy="38" r="1.5" fill="#ffb86b"/>
      </svg>
      <div style={onsiteStyles.iconLabel}>./pizza</div>
    </div>
  );
}

function SodaCan({ active }) {
  return (
    <div style={{
      ...onsiteStyles.iconAbs,
      bottom: "10%", left: "12%",
      animation: active ? "floatC 5.5s ease-in-out infinite" : "none",
    }}>
      <svg width="44" height="60" viewBox="0 0 44 60" fill="none">
        <rect x="10" y="8" width="24" height="44" rx="2" stroke="var(--accent-3)" strokeWidth="1.5" fill="rgba(0, 255, 159, 0.05)"/>
        <line x1="10" y1="14" x2="34" y2="14" stroke="var(--accent-3)" strokeWidth="1"/>
        <rect x="14" y="22" width="16" height="2" fill="var(--accent)" opacity="0.7"/>
        <rect x="14" y="28" width="12" height="1" fill="var(--ink-dim)"/>
        <rect x="14" y="32" width="14" height="1" fill="var(--ink-dim)"/>
        <circle cx="22" cy="11" r="2" fill="var(--bg)" stroke="var(--accent-3)" strokeWidth="0.8"/>
      </svg>
      <div style={onsiteStyles.iconLabel}>./soda</div>
    </div>
  );
}

function Burger({ active }) {
  return (
    <div style={{
      ...onsiteStyles.iconAbs,
      bottom: "14%", right: "10%",
      animation: active ? "floatD 6.5s ease-in-out infinite" : "none",
    }}>
      <svg width="64" height="50" viewBox="0 0 64 50" fill="none">
        <path d="M6 18 Q6 6 32 6 Q58 6 58 18 Z" stroke="#ffb86b" strokeWidth="1.5" fill="rgba(255, 184, 107, 0.08)"/>
        <circle cx="20" cy="13" r="0.8" fill="#ffb86b"/>
        <circle cx="32" cy="11" r="0.8" fill="#ffb86b"/>
        <circle cx="44" cy="13" r="0.8" fill="#ffb86b"/>
        <rect x="6" y="20" width="52" height="3" fill="var(--accent-3)"/>
        <rect x="6" y="25" width="52" height="4" fill="var(--accent)" opacity="0.6"/>
        <rect x="6" y="31" width="52" height="3" fill="#ffb86b" opacity="0.6"/>
        <path d="M6 36 Q6 44 32 44 Q58 44 58 36 Z" stroke="#ffb86b" strokeWidth="1.5" fill="rgba(255, 184, 107, 0.08)"/>
      </svg>
      <div style={onsiteStyles.iconLabel}>./burger</div>
    </div>
  );
}

function Steam({ active }) {
  return (
    <svg style={{
      position: "absolute", top: "0%", left: "50%",
      transform: "translateX(-50%)",
      opacity: active ? 0.5 : 0,
      transition: "opacity 1s ease 0.6s",
    }} width="80" height="60" viewBox="0 0 80 60" fill="none">
      <path d="M20 55 Q15 40 25 30 Q30 20 22 8" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0.1;0.6;0.1" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M40 55 Q35 40 45 30 Q50 20 42 8" stroke="var(--accent-2)" strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M60 55 Q55 40 65 30 Q70 20 62 8" stroke="var(--accent-3)" strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/>
      </path>
    </svg>
  );
}

function FuelTicker({ active }) {
  const items = ["CAFÉ DA MANHÃ", "ALMOÇO", "JANTAR", "LANCHES", "ÁGUA", "REFRIGERANTE", "CAFÉ EXPRESSO", "ENERGÉTICO", "PIZZA", "DOCES"];
  return (
    <div style={{
      ...onsiteStyles.ticker,
      opacity: active ? 1 : 0,
      transition: "opacity 0.8s ease 0.8s",
    }}>
      <div style={onsiteStyles.tickerLabel}>// menu.txt</div>
      <div style={onsiteStyles.tickerTrack}>
        <div style={onsiteStyles.tickerInner}>
          {[...items, ...items, ...items].map((it, i) => (
            <span key={i} style={onsiteStyles.tickerItem}>
              <span style={{ color: "var(--accent-3)" }}>●</span> {it}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* keyframes injected globally */
const __onsiteCSS = `
@keyframes floatA { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
@keyframes floatB { 0%,100% { transform: translateY(0) rotate(3deg); } 50% { transform: translateY(-16px) rotate(-3deg); } }
@keyframes floatC { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-14px) rotate(2deg); } }
@keyframes floatD { 0%,100% { transform: translateY(0) rotate(2deg); } 50% { transform: translateY(-10px) rotate(-2deg); } }
@keyframes spinSlow { from { transform: translate(-50%, -50%) rotate(0); } to { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes spinSlower { from { transform: translate(-50%, -50%) rotate(0); } to { transform: translate(-50%, -50%) rotate(-360deg); } }
@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
`;
if (typeof document !== "undefined" && !document.getElementById("__onsite-css")) {
  const s = document.createElement("style");
  s.id = "__onsite-css";
  s.textContent = __onsiteCSS;
  document.head.appendChild(s);
}

const onsiteStyles = {
  section: {
    position: "relative",
    padding: "140px 0 120px",
    borderTop: "1px solid var(--line)",
    overflow: "hidden",
  },
  bgGrid: {
    position: "absolute", inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
    backgroundSize: "80px 80px",
    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
  },
  head: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    alignItems: "end",
    marginBottom: 60,
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(40px, 5.5vw, 72px)",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: 1.02,
    margin: "16px 0 0",
    color: "var(--ink)",
  },
  lede: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    lineHeight: 1.7,
    color: "var(--ink-dim)",
    maxWidth: 460,
    margin: 0,
  },
  b: { color: "var(--ink)" },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr 1fr",
    gap: 18,
    alignItems: "stretch",
  },
  card: {
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minHeight: 360,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  cardPhase: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    color: "var(--ink-muted)",
  },
  cardDate: {
    fontFamily: "var(--font-display)",
    fontSize: 56,
    fontWeight: 700,
    color: "var(--ink)",
    letterSpacing: "-0.04em",
    lineHeight: 1,
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 500,
    color: "var(--accent)",
    letterSpacing: "-0.01em",
    marginBottom: 6,
  },
  cardTime: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    color: "var(--ink-dim)",
    marginBottom: 18,
  },
  cardSep: {
    height: 1,
    background: "var(--line)",
    margin: "0 0 18px",
  },
  cardList: { display: "flex", flexDirection: "column", gap: 10 },
  cardItem: {
    display: "flex",
    gap: 10,
    fontFamily: "var(--font-mono)",
    fontSize: 12.5,
    color: "var(--ink)",
    lineHeight: 1.5,
  },
  foodWrap: {
    position: "relative",
    minHeight: 360,
    border: "1px solid var(--line)",
    background: "linear-gradient(180deg, var(--bg-1), var(--bg-2))",
    overflow: "hidden",
  },
  foodInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 360,
  },
  iconAbs: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  iconLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "var(--ink-muted)",
    letterSpacing: "0.06em",
  },
  foodLabel: {
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 3,
  },
  foodLabelLine: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.16em",
    color: "var(--ink-dim)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
  },
  foodLabelBig: {
    fontFamily: "var(--font-display)",
    fontSize: 36,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: 0.95,
    color: "var(--ink)",
    marginBottom: 12,
  },
  foodLabelSub: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    lineHeight: 1.6,
    color: "var(--ink-muted)",
    letterSpacing: "0.04em",
  },
  ring: {
    position: "absolute",
    top: "50%", left: "50%",
    width: 220, height: 220,
    border: "1px dashed rgba(var(--accent-rgb), 0.25)",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    animation: "spinSlow 30s linear infinite",
    pointerEvents: "none",
  },
  ring2: {
    position: "absolute",
    top: "50%", left: "50%",
    width: 280, height: 280,
    border: "1px dashed rgba(var(--accent-2-rgb), 0.15)",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    animation: "spinSlower 50s linear infinite",
    pointerEvents: "none",
  },
  ticker: {
    marginTop: 32,
    border: "1px solid var(--line)",
    background: "var(--bg-1)",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "120px 1fr",
  },
  tickerLabel: {
    padding: "14px 18px",
    borderRight: "1px solid var(--line)",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-muted)",
    letterSpacing: "0.08em",
    display: "flex",
    alignItems: "center",
  },
  tickerTrack: {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  tickerInner: {
    display: "flex",
    gap: 36,
    padding: "14px 0",
    whiteSpace: "nowrap",
    animation: "tickerScroll 40s linear infinite",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--ink)",
    letterSpacing: "0.06em",
  },
  tickerItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
};

window.OnsiteDays = OnsiteDays;
