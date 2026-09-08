import { useState, useCallback, useMemo } from "react";
import { COFFEE_QUIZ } from "../data/coffee";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function getChoices(card, allCards) {
  const wrong = shuffle(allCards.filter(c => c.a !== card.a)).slice(0, 3).map(c => c.a);
  return shuffle([card.a, ...wrong]);
}

function ResultsScreen({ correct, wrong, history, onRestart }) {
  const accuracy = (correct + wrong) > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;
  const missed = history.filter(h => !h.got);
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 16, padding: "32px", textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{accuracy >= 80 ? "☕" : accuracy >= 60 ? "🌱" : "📚"}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#C9A84C", fontWeight: 700, marginBottom: 8 }}>
          {accuracy >= 80 ? "Barista-level!" : accuracy >= 60 ? "Getting there!" : "Keep studying!"}
        </div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#c8b898", marginBottom: 24 }}>{accuracy}% accuracy</div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 28 }}>
          <div style={{ background: "#6B8E3E20", border: "1px solid #6B8E3E40", borderRadius: 10, padding: "14px 24px" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 22, fontWeight: 700, color: "#6B8E3E" }}>{correct}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470" }}>Correct</div>
          </div>
          <div style={{ background: "#e05a5a20", border: "1px solid #e05a5a40", borderRadius: 10, padding: "14px 24px" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 22, fontWeight: 700, color: "#e05a5a" }}>{wrong}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5a5470" }}>Missed</div>
          </div>
        </div>
        <button onClick={onRestart} style={{ background: "#C9A84C20", border: "1px solid #C9A84C60", borderRadius: 10, padding: "12px 32px", color: "#C9A84C", fontFamily: "'DM Mono',monospace", fontSize: 13, cursor: "pointer", letterSpacing: "0.08em" }}>
          Shuffle & Retry
        </button>
      </div>
      {missed.length > 0 && (
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: "#5a5470", textTransform: "uppercase", marginBottom: 12 }}>Review — Missed Questions</div>
          {missed.map((h, i) => (
            <div key={i} style={{ background: "#0e0c14", border: "1px solid #e05a5a25", borderRadius: 10, padding: "14px 16px", marginBottom: 8 }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#c8b898", marginBottom: 8, lineHeight: 1.6 }}>Q: {h.q}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#6B8E3E", lineHeight: 1.6 }}>A: {h.a}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgressBar({ index, total, correct, wrong }) {
  const pct = total > 0 ? Math.round((index / total) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ flex: 1, height: 4, background: "#1a1825", borderRadius: 2 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #C9A84C, #D4820A)", borderRadius: 2, transition: "width 0.3s ease" }} />
      </div>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#5a5470", flexShrink: 0 }}>{index}/{total}</span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#6B8E3E", flexShrink: 0 }}>{correct}✓</span>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#e05a5a", flexShrink: 0 }}>{wrong}✗</span>
    </div>
  );
}

function FlashcardMode({ deck, onDone }) {
  const [index, setIndex]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong]     = useState(0);
  const [history, setHistory] = useState([]);
  const [done, setDone]       = useState(false);
  const card = deck[index];

  const next = useCallback((got) => {
    setHistory(h => [...h, { q: card.q, a: card.a, got }]);
    if (got) setCorrect(c => c + 1); else setWrong(w => w + 1);
    if (index + 1 >= deck.length) { setDone(true); return; }
    setIndex(i => i + 1);
    setFlipped(false);
  }, [card, index, deck.length]);

  if (done) return <ResultsScreen correct={correct} wrong={wrong} history={history} onRestart={onDone} />;

  return (
    <div>
      <ProgressBar index={index} total={deck.length} correct={correct} wrong={wrong} />
      <div key={index} onClick={() => !flipped && setFlipped(true)}
        style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 16, padding: "32px", marginBottom: 16, minHeight: 200, display: "flex", flexDirection: "column", animation: "fadeIn 0.2s ease", cursor: flipped ? "default" : "pointer", userSelect: "none" }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 16 }}>
          {flipped ? "Answer" : "Question · tap to reveal"}
        </div>
        {!flipped
          ? <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "#f0ead8", lineHeight: 1.7, margin: 0, flex: 1 }}>{card.q}</p>
          : <div style={{ animation: "flipIn 0.25s ease", flex: 1 }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "#C9A84C", lineHeight: 1.7, margin: 0 }}>{card.a}</p></div>
        }
        {!flipped && <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}><div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#3a3450", letterSpacing: "0.12em" }}>TAP TO REVEAL</div></div>}
      </div>
      {flipped && (
        <div style={{ display: "flex", gap: 10, animation: "fadeIn 0.2s ease" }}>
          <button onClick={() => next(false)} style={{ flex: 1, padding: "14px", borderRadius: 12, border: "1px solid #e05a5a40", background: "#e05a5a12", color: "#e05a5a", fontFamily: "'DM Mono',monospace", fontSize: 13, cursor: "pointer", letterSpacing: "0.05em" }}
            onMouseEnter={e => e.currentTarget.style.background = "#e05a5a20"} onMouseLeave={e => e.currentTarget.style.background = "#e05a5a12"}>✗  Missed it</button>
          <button onClick={() => next(true)} style={{ flex: 1, padding: "14px", borderRadius: 12, border: "1px solid #6B8E3E50", background: "#6B8E3E15", color: "#6B8E3E", fontFamily: "'DM Mono',monospace", fontSize: 13, cursor: "pointer", letterSpacing: "0.05em" }}
            onMouseEnter={e => e.currentTarget.style.background = "#6B8E3E25"} onMouseLeave={e => e.currentTarget.style.background = "#6B8E3E15"}>✓  Got it</button>
        </div>
      )}
      {!flipped && (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button onClick={() => { setFlipped(false); setIndex(i => i + 1 >= deck.length ? 0 : i + 1); }} style={{ background: "none", border: "none", color: "#3a3450", fontFamily: "'DM Mono',monospace", fontSize: 10, cursor: "pointer", letterSpacing: "0.1em" }}>skip →</button>
        </div>
      )}
    </div>
  );
}

function MultipleChoiceMode({ deck, onDone }) {
  const [index, setIndex]       = useState(0);
  const [correct, setCorrect]   = useState(0);
  const [wrong, setWrong]       = useState(0);
  const [history, setHistory]   = useState([]);
  const [done, setDone]         = useState(false);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const card = deck[index];
  const choices = useMemo(() => getChoices(card, deck), [index]);

  const pick = (choice) => { if (revealed) return; setSelected(choice); setRevealed(true); };

  const next = () => {
    const got = selected === card.a;
    setHistory(h => [...h, { q: card.q, a: card.a, got }]);
    if (got) setCorrect(c => c + 1); else setWrong(w => w + 1);
    if (index + 1 >= deck.length) { setDone(true); return; }
    setIndex(i => i + 1);
    setSelected(null);
    setRevealed(false);
  };

  if (done) return <ResultsScreen correct={correct} wrong={wrong} history={history} onRestart={onDone} />;

  const isCorrect = selected === card.a;

  return (
    <div>
      <ProgressBar index={index} total={deck.length} correct={correct} wrong={wrong} />

      <div key={index} style={{ background: "#0e0c14", border: "1px solid #2a2535", borderRadius: 16, padding: "28px 28px 24px", marginBottom: 14, animation: "fadeIn 0.2s ease" }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 14 }}>Question {index + 1}</div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: "#f0ead8", lineHeight: 1.7, margin: 0 }}>{card.q}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {choices.map((choice, i) => {
          const isThis  = selected === choice;
          const isRight = choice === card.a;
          let bg = "#0e0c14", border = "#2a2535", color = "#c8b898";
          if (revealed) {
            if (isRight)     { bg = "#6B8E3E18"; border = "#6B8E3E60"; color = "#6B8E3E"; }
            else if (isThis) { bg = "#e05a5a18"; border = "#e05a5a60"; color = "#e05a5a"; }
          } else if (isThis) { bg = "#C9A84C15"; border = "#C9A84C60"; color = "#C9A84C"; }

          return (
            <button key={i} onClick={() => pick(choice)}
              style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 16px", cursor: revealed ? "default" : "pointer", textAlign: "left", display: "flex", alignItems: "flex-start", gap: 12, transition: "all 0.15s", width: "100%" }}
              onMouseEnter={e => { if (!revealed) { e.currentTarget.style.background = "#C9A84C0a"; e.currentTarget.style.borderColor = "#C9A84C40"; }}}
              onMouseLeave={e => { if (!revealed) { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = border; }}}
            >
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: revealed ? border : "#5a5470", flexShrink: 0, marginTop: 2, width: 18 }}>
                {revealed ? (isRight ? "✓" : isThis ? "✗" : "·") : String.fromCharCode(65 + i)}
              </span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color, lineHeight: 1.6 }}>{choice}</span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          <div style={{ background: isCorrect ? "#6B8E3E12" : "#e05a5a12", border: `1px solid ${isCorrect ? "#6B8E3E40" : "#e05a5a40"}`, borderRadius: 10, padding: "12px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>{isCorrect ? "✓" : "✗"}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: isCorrect ? "#6B8E3E" : "#e05a5a", lineHeight: 1.5 }}>
              {isCorrect ? "Correct!" : `Correct answer: ${card.a}`}
            </span>
          </div>
          <button onClick={next}
            style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid #C9A84C40", background: "#C9A84C15", color: "#C9A84C", fontFamily: "'DM Mono',monospace", fontSize: 13, cursor: "pointer", letterSpacing: "0.05em" }}
            onMouseEnter={e => e.currentTarget.style.background = "#C9A84C25"} onMouseLeave={e => e.currentTarget.style.background = "#C9A84C15"}>
            {index + 1 >= deck.length ? "See Results →" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function CoffeeQuizPage() {
  const [mode, setMode] = useState("mc");
  const [deck, setDeck] = useState(() => shuffle(COFFEE_QUIZ));
  const [key, setKey]   = useState(0);

  const restart = () => { setDeck(shuffle(COFFEE_QUIZ)); setKey(k => k + 1); };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flipIn { from { opacity: 0; transform: rotateX(-15deg) scale(0.97); } to { opacity: 1; transform: rotateX(0) scale(1); } }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: "#5a5470", textTransform: "uppercase", marginBottom: 8 }}>Coffee · Study</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#C9A84C", fontWeight: 700, margin: "0 0 8px" }}>Coffee Quiz</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7a748e", lineHeight: 1.7, margin: 0 }}>{COFFEE_QUIZ.length} questions · origins, processing, brewing, espresso</p>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#0e0c14", borderRadius: 10, padding: 4, border: "1px solid #2a2535", width: "fit-content" }}>
        {[["mc", "Multiple Choice"], ["flash", "Flashcards"]].map(([id, label]) => (
          <button key={id} onClick={() => { setMode(id); restart(); }}
            style={{ padding: "8px 18px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: mode === id ? 600 : 400, background: mode === id ? "#C9A84C20" : "transparent", color: mode === id ? "#C9A84C" : "#5a5470", transition: "all 0.15s", borderBottom: mode === id ? "2px solid #C9A84C" : "2px solid transparent" }}>
            {label}
          </button>
        ))}
      </div>

      {mode === "mc"
        ? <MultipleChoiceMode key={`mc-${key}`} deck={deck} onDone={restart} />
        : <FlashcardMode      key={`fl-${key}`} deck={deck} onDone={restart} />
      }
    </>
  );
}