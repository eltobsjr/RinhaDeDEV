/* global React */
const { useState } = React;

function Pricing() {
  const [size, setSize] = useState(4);
  const PRICE = 5;
  const total = size * PRICE;

  return (
    <section id="pricing" style={pStyles.section}>
      <div className="container">
        <div style={pStyles.head}>
          <span className="eyebrow"><span className="dot" />05 / TICKET</span>
          <h2 style={pStyles.title}>
            Inscrição barata.<br />
            <span style={{ color: "var(--accent)" }}>compromisso real.</span>
          </h2>
          <p style={pStyles.lede}>
            R$ 5,00 por dev. A taxa cobre a logística dos dois dias presenciais —
            espaço, energia, lanches e bebida. Sem taxa, sem furada de combinado.
          </p>
        </div>

        <div style={pStyles.grid}>
          {/* terminal-style price calc */}
          <div className="card" style={pStyles.calcCard}>
            <div style={pStyles.calcHead}>
              <span style={{ color: "var(--accent-3)" }}>›</span>
              <span style={{ color: "var(--ink-dim)" }}>./calc-team-fee</span>
              <span className="caret" />
            </div>

            <div style={pStyles.calcLine}>
              <span style={pStyles.calcLabel}>price_per_dev</span>
              <span style={pStyles.calcVal}>R$ {PRICE},00</span>
            </div>

            <div style={pStyles.calcLine}>
              <span style={pStyles.calcLabel}>team_size</span>
              <div style={pStyles.stepper}>
                <button
                  style={{ ...pStyles.stepBtn, opacity: size <= 4 ? 0.3 : 1, cursor: size <= 4 ? "not-allowed" : "pointer" }}
                  onClick={() => setSize((s) => Math.max(4, s - 1))}
                  disabled={size <= 4}
                >
                  −
                </button>
                <span style={pStyles.stepVal}>{size}</span>
                <button
                  style={{ ...pStyles.stepBtn, opacity: size >= 6 ? 0.3 : 1, cursor: size >= 6 ? "not-allowed" : "pointer" }}
                  onClick={() => setSize((s) => Math.min(6, s + 1))}
                  disabled={size >= 6}
                >
                  +
                </button>
              </div>
            </div>

            <div style={pStyles.calcRule} />

            <div style={pStyles.totalLine}>
              <span style={pStyles.totalLabel}>// total da equipe</span>
              <div>
                <span style={pStyles.totalCurrency}>R$</span>
                <span style={pStyles.totalNum}>{total}</span>
                <span style={pStyles.totalCents}>,00</span>
              </div>
            </div>

            <div style={pStyles.calcFoot}>
              <span style={{ color: "var(--accent-3)" }}>●</span>
              <span>{size} × R$ {PRICE},00 = R$ {total},00</span>
            </div>
          </div>

          {/* rules */}
          <div style={pStyles.rules}>
            <RuleItem
              n="01"
              k="MIN"
              v="4 devs"
              d="Time abaixo de 4 não larga. Se inscrever solo é OK — você é alocado no kick-off."
            />
            <RuleItem
              n="02"
              k="MAX"
              v="6 devs"
              d="Acima de 6 desorganiza. Mantenha enxuto, todos com função clara."
            />
            <RuleItem
              n="03"
              k="WHEN"
              v="até 14/mai"
              d="Pagamento confirmado antes do kick-off. Sem confirmação, sem entrada na arena."
              last
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RuleItem({ n, k, v, d, last }) {
  return (
    <div style={{ ...pStyles.rule, borderBottom: last ? "none" : "1px solid var(--line)" }}>
      <div style={pStyles.ruleTop}>
        <span style={pStyles.ruleN}>{n}</span>
        <span style={pStyles.ruleK}>{k}</span>
        <span style={pStyles.ruleV}>{v}</span>
      </div>
      <div style={pStyles.ruleD}>{d}</div>
    </div>
  );
}

const pStyles = {
  section: { padding: "120px 0", borderTop: "1px solid var(--line)" },
  head: { marginBottom: 56, display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(40px, 5.5vw, 72px)",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: 1.02,
    margin: 0,
    color: "var(--ink)",
  },
  lede: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    lineHeight: 1.7,
    color: "var(--ink-dim)",
    margin: 0,
    maxWidth: 540,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: 24,
    alignItems: "start",
  },
  calcCard: {
    padding: 32,
    background:
      "linear-gradient(180deg, rgba(var(--accent-rgb), 0.06), var(--bg-2))",
    borderColor: "rgba(var(--accent-rgb), 0.3)",
  },
  calcHead: {
    display: "flex",
    gap: 10,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    marginBottom: 28,
    paddingBottom: 16,
    borderBottom: "1px solid var(--line)",
  },
  calcLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 0",
  },
  calcLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    color: "var(--ink-dim)",
    letterSpacing: "0.04em",
  },
  calcVal: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    color: "var(--ink)",
    fontWeight: 500,
  },
  stepper: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    border: "1px solid var(--line-2)",
  },
  stepBtn: {
    width: 32, height: 32,
    fontFamily: "var(--font-mono)",
    fontSize: 16,
    color: "var(--accent)",
    background: "transparent",
    transition: "background 0.15s",
  },
  stepVal: {
    width: 40,
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    color: "var(--ink)",
    textAlign: "center",
    borderLeft: "1px solid var(--line-2)",
    borderRight: "1px solid var(--line-2)",
    padding: "8px 0",
  },
  calcRule: {
    height: 1,
    background: "var(--line)",
    margin: "12px 0 8px",
  },
  totalLine: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    padding: "16px 0 8px",
  },
  totalLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-muted)",
    letterSpacing: "0.1em",
  },
  totalCurrency: {
    fontFamily: "var(--font-mono)",
    fontSize: 18,
    color: "var(--accent)",
    marginRight: 6,
  },
  totalNum: {
    fontFamily: "var(--font-display)",
    fontSize: 64,
    fontWeight: 700,
    color: "var(--ink)",
    letterSpacing: "-0.04em",
    lineHeight: 1,
  },
  totalCents: {
    fontFamily: "var(--font-mono)",
    fontSize: 18,
    color: "var(--ink-dim)",
    marginLeft: 4,
  },
  calcFoot: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--ink-dim)",
    marginTop: 12,
    paddingTop: 16,
    borderTop: "1px solid var(--line)",
  },
  rules: {
    border: "1px solid var(--line)",
    background: "var(--bg-1)",
  },
  rule: { padding: "26px 28px" },
  ruleTop: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    marginBottom: 8,
  },
  ruleN: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-muted)",
    letterSpacing: "0.1em",
  },
  ruleK: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--accent)",
    letterSpacing: "0.14em",
    fontWeight: 500,
  },
  ruleV: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 600,
    color: "var(--ink)",
    letterSpacing: "-0.02em",
    marginLeft: "auto",
  },
  ruleD: {
    fontFamily: "var(--font-mono)",
    fontSize: 12.5,
    color: "var(--ink-dim)",
    lineHeight: 1.65,
  },
};

window.Pricing = Pricing;
