import React, { useMemo, useState } from "react";

/**
 * Single-page SEK <-> SGD converter (no router needed).
 * - Two inputs (SEK and SGD)
 * - Arrow button swaps direction + values
 * - Uses a fixed rate by default (replace with live rate if you want)
 */
export default function CurrencyConverterPage() {
  // Replace this with a live rate if you want:
  // 1 SEK = 0.12 SGD (example)
  const SEK_TO_SGD = 0.140056. ;

  const [direction, setDirection] = useState("SEK_TO_SGD"); // or "SGD_TO_SEK"
  const [leftValue, setLeftValue] = useState("100"); // string for easy typing
  const [rightValue, setRightValue] = useState(() =>
    (Number("100") * SEK_TO_SGD).toFixed(2)
  );

  const labels = useMemo(() => {
    return direction === "SEK_TO_SGD"
      ? { left: "SEK (Swedish krona)", right: "SGD (Singapore dollar)" }
      : { left: "SGD (Singapore dollar)", right: "SEK (Swedish krona)" };
  }, [direction]);

  const convert = (raw, dir) => {
    const n = Number(raw);
    if (!Number.isFinite(n)) return "";

    if (dir === "SEK_TO_SGD") return (n * SEK_TO_SGD).toFixed(2);
    // SGD -> SEK
    return (n / SEK_TO_SGD).toFixed(2);
  };

  const handleLeftChange = (v) => {
    setLeftValue(v);
    setRightValue(convert(v, direction));
  };

  const swap = () => {
    const newDir = direction === "SEK_TO_SGD" ? "SGD_TO_SEK" : "SEK_TO_SGD";
    setDirection(newDir);

    // swap values so the UI still makes sense
    setLeftValue(rightValue);
    setRightValue(convert(rightValue, newDir));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>SEK ⇄ SGD Converter</h1>
        <p style={styles.subtitle}>
          Using example rate: <b>1 SEK = {SEK_TO_SGD} SGD</b> (replace with live
          rate if needed)
        </p>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>{labels.left}</label>
            <input
              style={styles.input}
              inputMode="decimal"
              value={leftValue}
              onChange={(e) => handleLeftChange(e.target.value)}
              placeholder="0"
            />
          </div>

          <button
            type="button"
            onClick={swap}
            aria-label="Swap currencies"
            title="Swap"
            style={styles.swapBtn}
          >
            ↔
          </button>

          <div style={styles.field}>
            <label style={styles.label}>{labels.right}</label>
            <input
              style={{ ...styles.input, background: "#f6f6f6" }}
              value={rightValue}
              readOnly
              placeholder="0"
            />
          </div>
        </div>

        <div style={styles.hint}>
          Tip: type in the left box, press ↔ to convert the other way.
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    background: "#fafafa",
  },
  card: {
    width: "min(720px, 100%)",
    padding: 24,
    borderRadius: 16,
    background: "white",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  },
  title: { margin: 0, fontSize: 28 },
  subtitle: { marginTop: 8, marginBottom: 20, color: "#444" },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: 12,
    alignItems: "end",
  },
  field: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 13, color: "#555" },
  input: {
    height: 44,
    borderRadius: 10,
    border: "1px solid #ddd",
    padding: "0 12px",
    fontSize: 16,
    outline: "none",
  },
  swapBtn: {
    height: 44,
    width: 52,
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontSize: 18,
    lineHeight: "44px",
  },
  hint: { marginTop: 16, color: "#666", fontSize: 13 },
};
