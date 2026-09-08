import { useState, useEffect } from "react";
import { getLiquorImage, getDrinkImage } from "../data/images";
import { ALL_SPIRITS_EASY, ALL_SPIRITS_HARD, LIQUEURS, COMBINED, BEER_QUIZ, WINE_QUIZ } from "../data/quiz";
import { getBeerImage, getWineImage } from "../data/images";
import { RECIPES } from "../data/gunthers";

// ── Pull cocktails + shots from gunthers recipes ─────────────────────────────
// Helper: returns true if a drink has a clear dominant spirit (not a trashcan)
function hasDominantSpirit(ingredients) {
  if (!ingredients?.length) return false;
  const halfOz = ingredients.filter(i => /^0\.5 oz/i.test(i));
  if (halfOz.length >= 3) return false;
  return true;
}

// All cocktails + specialty for "Name the Cocktail" (full pool)
const ALL_COCKTAIL_ENTRIES = Object.entries(RECIPES)
  .filter(([, v]) => v.label === "Cocktail" || v.label === "Specialty")
  .map(([name, v]) => ({ name, label: v.label, ingredients: v.ingredients, instructions: v.instructions }));

// Only entries with a clear dominant spirit — used for "Identify Ingredients"
const COCKTAIL_ENTRIES = ALL_COCKTAIL_ENTRIES.filter(e => hasDominantSpirit(e.ingredients));

// Only classic (non-specialty) cocktails — used as the answer name pool
const CLASSIC_COCKTAIL_NAMES = Object.entries(RECIPES)
  .filter(([, v]) => v.label === "Cocktail")
  .map(([name]) => name);

// All shots with recipes
const SHOT_ENTRIES = Object.entries(RECIPES)
  .filter(([, v]) => v.label === "Shot")
  .map(([name, v]) => ({ name, label: v.label, ingredients: v.ingredients, instructions: v.instructions }));

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const C = {
  black: "#080604", dark: "#0e0c09", card: "#181410", border: "#332b20",
  gold: "#e0b84e", goldL: "#f5d878", goldD: "#b8904a",
  cream: "#f5f0e8", muted: "#c8b898", dim: "#887060",
  green: "#5dbd7a", red: "#e05a5a",
  purple: "#a078d4", purpleD: "#7855aa",
  teal: "#4aabaa", tealD: "#2e8080",
};

// ── Shared UI ──────────────────────────────────────────────────────────────
function ProgressBar({ index, total, score, accent = C.gold }) {
  const progress = total > 0 ? (index / total) * 100 : 0;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "#888", fontSize: 12, fontFamily: "Georgia,serif" }}>{Math.min(index + 1, total)} / {total}</span>
        <span style={{ fontSize: 12, fontFamily: "Georgia,serif" }}>
          <span style={{ color: C.green }}>✓ {score.correct}</span>{"  "}
          <span style={{ color: C.red }}>✗ {score.wrong}</span>
        </span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min(progress, 100)}%`, background: `linear-gradient(90deg,${accent}99,${accent})`, borderRadius: 999, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function DoneScreen({ score, total, onRestart, accent = C.goldD }) {
  const pct = Math.round((score.correct / total) * 100);
  const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🎯" : pct >= 50 ? "📈" : "💪";
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}55`, borderRadius: 16, padding: "48px 40px", textAlign: "center", maxWidth: 500 }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>{emoji}</div>
      <div style={{ color: C.cream, fontSize: 24, marginBottom: 8, fontFamily: "Georgia,serif" }}>Round Complete!</div>
      <div style={{ color: accent, fontSize: 14, marginBottom: 32, fontFamily: "Georgia,serif" }}>{total} questions done</div>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 28 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.green, fontSize: 36, fontWeight: "bold" }}>{score.correct}</div>
          <div style={{ color: "#888", fontSize: 11, letterSpacing: "2px", fontFamily: "Georgia,serif" }}>CORRECT</div>
        </div>
        <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.red, fontSize: 36, fontWeight: "bold" }}>{score.wrong}</div>
          <div style={{ color: "#888", fontSize: 11, letterSpacing: "2px", fontFamily: "Georgia,serif" }}>MISSED</div>
        </div>
      </div>
      <div style={{ color: C.cream, fontSize: 20, marginBottom: 24, fontFamily: "Georgia,serif" }}>{pct}% accuracy</div>
      <button onClick={onRestart} style={{ background: accent, color: "#0a0a0f", border: "none", borderRadius: 8, padding: "12px 32px", fontSize: 14, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif" }}>PLAY AGAIN</button>
    </div>
  );
}

// ── Core quiz engine: show brand → click correct liquor type ───────────────
function BrandToLiquorQuiz({ dataset, accent, questionCount }) {
  const liquorTypes = [...new Set(dataset.map(b => b.liquor))].sort();
  const total = questionCount ?? dataset.length;
  const buildDeck = () => shuffle([...dataset]).slice(0, total);

  const [deck, setDeck] = useState(() => buildDeck());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);

  const question = deck[index];
  const answered = selected !== null;
  const pickedCorrect = answered && selected === question?.liquor;

  const handleSelect = (liquor) => {
    if (answered) return;
    setSelected(liquor);
    setScore(s => ({ correct: s.correct + (liquor === question.liquor ? 1 : 0), wrong: s.wrong + (liquor !== question.liquor ? 1 : 0) }));
  };

  const handleNext = () => {
    if (index + 1 >= total) { setDone(true); return; }
    setIndex(i => i + 1);
    setSelected(null);
  };

  const handleRestart = () => {
    setDeck(buildDeck()); setIndex(0); setSelected(null);
    setScore({ correct: 0, wrong: 0 }); setDone(false);
  };

  if (done) return <DoneScreen score={score} total={total} onRestart={handleRestart} accent={accent} />;

  const img = getLiquorImage(question.brand);

  return (
    <div style={{ width: "100%", maxWidth: 640 }}>
      <ProgressBar index={index} total={total} score={score} accent={accent} />

      <div style={{
        background: answered ? (pickedCorrect ? "rgba(93,189,122,0.06)" : "rgba(224,90,90,0.06)") : "rgba(255,255,255,0.03)",
        border: `1px solid ${answered ? (pickedCorrect ? "rgba(93,189,122,0.35)" : "rgba(224,90,90,0.35)") : `${accent}40`}`,
        borderRadius: 20, overflow: "hidden",
      }}>

        {answered && (
          <div style={{ padding: "12px 24px", background: pickedCorrect ? "rgba(93,189,122,0.12)" : "rgba(224,90,90,0.12)", borderBottom: `1px solid ${pickedCorrect ? "rgba(93,189,122,0.2)" : "rgba(224,90,90,0.2)"}`, display: "flex", alignItems: "center", gap: 10, animation: "fadeReveal 0.2s ease both" }}>
            <span style={{ fontSize: 20 }}>{pickedCorrect ? "✓" : "✗"}</span>
            <div>
              <div style={{ color: pickedCorrect ? C.green : C.red, fontSize: 15, fontFamily: "Georgia,serif", fontWeight: "bold" }}>
                {pickedCorrect ? "Correct!" : `Not quite — that's a ${question.liquor}`}
              </div>
              {!pickedCorrect && <div style={{ color: "#888", fontSize: 12, fontFamily: "Georgia,serif", marginTop: 2 }}>You picked: {selected}</div>}
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center" }}>
          {img && (
            <div style={{ width: 110, flexShrink: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 12px", alignSelf: "stretch" }}>
              <img src={img} alt={question.brand} style={{ maxWidth: "100%", maxHeight: 120, objectFit: "contain" }} />
            </div>
          )}
          <div style={{ flex: 1, padding: "28px 28px 20px", textAlign: img ? "left" : "center" }}>
            <div style={{ fontSize: 11, letterSpacing: "4px", color: "#555", textTransform: "uppercase", marginBottom: 8, fontFamily: "Georgia,serif" }}>What type of liquor is this?</div>
            <div style={{ fontSize: "clamp(24px,4vw,36px)", color: C.cream, fontFamily: "Georgia,serif", lineHeight: 1.2 }}>{question.brand}</div>
            {question.note && <div style={{ fontSize: 12, color: C.dim, fontStyle: "italic", fontFamily: "Georgia,serif", marginTop: 6 }}>{question.note}</div>}
          </div>
        </div>

        <div style={{ padding: "4px 20px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
          {liquorTypes.map(liquor => {
            const isCorrect = liquor === question.liquor;
            const isSelected = selected === liquor;
            let bg = "rgba(255,255,255,0.04)", border = "1px solid rgba(255,255,255,0.1)", color = C.cream;
            if (answered) {
              if (isCorrect)       { bg = "rgba(93,189,122,0.18)";  border = "1px solid rgba(93,189,122,0.55)";  color = C.green; }
              else if (isSelected) { bg = "rgba(224,90,90,0.18)";   border = "1px solid rgba(224,90,90,0.55)";   color = C.red;   }
              else                 { bg = "rgba(255,255,255,0.015)"; border = "1px solid rgba(255,255,255,0.05)"; color = "#444";  }
            }
            return (
              <button key={liquor} onClick={() => handleSelect(liquor)} disabled={answered}
                style={{ background: bg, border, borderRadius: 10, padding: "11px 10px", color, fontSize: 13, cursor: answered ? "default" : "pointer", fontFamily: "Georgia,serif", textAlign: "center", lineHeight: 1.3, transition: "all 0.15s" }}>
                {isCorrect && answered && "✓ "}{liquor}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ padding: "0 20px 20px" }}>
            <button onClick={handleNext} style={{ background: "transparent", border: `1px solid ${accent}66`, color: accent, borderRadius: 10, padding: "11px 32px", fontSize: 13, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif", width: "100%" }}>NEXT →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Spirits tab: Easy / Hard toggle ───────────────────────────────────────
function SpiritsMode({ accent = C.goldD }) {
  const [difficulty, setDifficulty] = useState(null);
  const [questionCount, setQuestionCount] = useState(20);
  const [quizKey, setQuizKey] = useState(0);

  const poolSize = difficulty === "hard" ? ALL_SPIRITS_HARD.length : ALL_SPIRITS_EASY.length;

  const handleDifficulty = (key) => {
    setDifficulty(key);
    const pool = key === "hard" ? ALL_SPIRITS_HARD.length : ALL_SPIRITS_EASY.length;
    setQuestionCount(Math.min(questionCount, pool));
    setQuizKey(k => k + 1);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Difficulty toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { key: "easy", label: "⭐ Easy",   sub: "Vodka · Gin · Rum · Tequila · Whiskey · Scotch · Cognac",  accent: C.goldD   },
          { key: "hard", label: "🔥 Hard",   sub: "Blanco · Reposado · London Dry · White Rum · Bourbon · ...", accent: "#e06060" },
        ].map(({ key, label, sub, accent: a }) => (
          <button key={key} onClick={() => handleDifficulty(key)} style={{
            background: difficulty === key ? `${a}22` : "rgba(255,255,255,0.02)",
            border: `1px solid ${difficulty === key ? a : C.border}`,
            borderRadius: 10, padding: "12px 20px",
            color: difficulty === key ? a : C.muted,
            cursor: "pointer", fontFamily: "Georgia,serif", textAlign: "center", transition: "all 0.2s", minWidth: 160,
          }}>
            <div style={{ fontSize: 14, fontWeight: difficulty === key ? "bold" : "normal" }}>{label}</div>
            <div style={{ fontSize: 10, opacity: 0.55, marginTop: 3, lineHeight: 1.4 }}>{sub}</div>
          </button>
        ))}
      </div>

      {difficulty && (
        <QuizSetup poolSize={poolSize} value={questionCount} onChange={(n) => { setQuestionCount(n); setQuizKey(k => k + 1); }} accent={difficulty === "hard" ? "#e06060" : C.goldD} />
      )}

      {!difficulty && (
        <div style={{ color: C.dim, fontSize: 13, textAlign: "center", maxWidth: 380, lineHeight: 1.9 }}>
          <div><strong style={{ color: C.goldD }}>Easy</strong> — broad categories. Vodka is Vodka, Tequila is Tequila, Whiskey is Whiskey.</div>
          <div style={{ marginTop: 6 }}><strong style={{ color: "#e06060" }}>Hard</strong> — sub-types. Blanco vs Reposado, London Dry vs Scottish, White vs Spiced Rum, Bourbon vs Rye vs Tennessee vs Irish...</div>
        </div>
      )}

      {difficulty === "easy" && <BrandToLiquorQuiz key={`easy-${quizKey}`} dataset={ALL_SPIRITS_EASY} accent={C.goldD} questionCount={questionCount} />}
      {difficulty === "hard" && <BrandToLiquorQuiz key={`hard-${quizKey}`} dataset={ALL_SPIRITS_HARD} accent="#e06060" questionCount={questionCount} />}
    </div>
  );
}

// ── Liqueurs: 4-choice (unchanged) ────────────────────────────────────────
function LiqueursMode({ accent = C.purpleD }) {
  const liquorTypes = [...new Set(LIQUEURS.map(b => b.liquor))];
  const [questionCount, setQuestionCount] = useState(20);
  const [quizKey, setQuizKey] = useState(0);
  const [started, setStarted] = useState(false);

  if (!started) return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <QuizSetup poolSize={LIQUEURS.length} value={questionCount} onChange={setQuestionCount} accent={accent} />
      <button onClick={() => setStarted(true)} style={{ background: `${accent}22`, border: `1px solid ${accent}66`, color: accent, borderRadius: 10, padding: "11px 32px", fontSize: 13, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif" }}>START →</button>
    </div>
  );

  return <LiqueursQuiz key={quizKey} total={questionCount} accent={accent} liquorTypes={liquorTypes}
    onRestart={() => { setQuizKey(k => k + 1); }} />;
}

function LiqueursQuiz({ total, accent, liquorTypes, onRestart }) {
  const generateQ = () => {
    const entry = LIQUEURS[Math.floor(Math.random() * LIQUEURS.length)];
    const wrongTypes = shuffle(liquorTypes.filter(l => l !== entry.liquor)).slice(0, 3);
    return { brand: entry.brand, liquor: entry.liquor, note: entry.note, choices: shuffle([entry.liquor, ...wrongTypes]) };
  };

  const [question, setQuestion] = useState(() => generateQ());
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  const handleSelect = (choice) => {
    if (selected !== null) return;
    setSelected(choice);
    setScore(s => ({ correct: s.correct + (choice === question.liquor ? 1 : 0), wrong: s.wrong + (choice !== question.liquor ? 1 : 0) }));
  };

  const handleNext = () => {
    if (count + 1 >= total) { setDone(true); return; }
    setCount(c => c + 1); setSelected(null); setQuestion(generateQ());
  };

  const handleRestart = () => { onRestart(); };

  if (done) return <DoneScreen score={score} total={total} onRestart={handleRestart} accent={accent} />;

  const answered = selected !== null;
  const pickedCorrect = answered && selected === question.liquor;
  const img = getLiquorImage(question.brand);

  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      <ProgressBar index={count} total={total} score={score} accent={accent} />
      <div style={{
        background: answered ? (pickedCorrect ? "rgba(93,189,122,0.06)" : "rgba(224,90,90,0.06)") : "rgba(255,255,255,0.03)",
        border: `1px solid ${answered ? (pickedCorrect ? "rgba(93,189,122,0.35)" : "rgba(224,90,90,0.35)") : `${accent}40`}`,
        borderRadius: 20, overflow: "hidden",
      }}>
        {answered && (
          <div style={{ padding: "12px 24px", background: pickedCorrect ? "rgba(93,189,122,0.12)" : "rgba(224,90,90,0.12)", borderBottom: `1px solid ${pickedCorrect ? "rgba(93,189,122,0.2)" : "rgba(224,90,90,0.2)"}`, display: "flex", alignItems: "center", gap: 10, animation: "fadeReveal 0.2s ease both" }}>
            <span style={{ fontSize: 20 }}>{pickedCorrect ? "✓" : "✗"}</span>
            <div>
              <div style={{ color: pickedCorrect ? C.green : C.red, fontSize: 15, fontFamily: "Georgia,serif", fontWeight: "bold" }}>
                {pickedCorrect ? "Correct!" : `Not quite — that's a ${question.liquor}`}
              </div>
              {!pickedCorrect && <div style={{ color: "#888", fontSize: 12, fontFamily: "Georgia,serif", marginTop: 2 }}>You picked: {selected}</div>}
            </div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          {img && (
            <div style={{ width: 100, flexShrink: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 10px", alignSelf: "stretch" }}>
              <img src={img} alt={question.brand} style={{ maxWidth: "100%", maxHeight: 100, objectFit: "contain" }} />
            </div>
          )}
          <div style={{ flex: 1, padding: "24px 24px 16px", textAlign: img ? "left" : "center" }}>
            <div style={{ fontSize: 11, letterSpacing: "4px", color: "#555", textTransform: "uppercase", marginBottom: 8, fontFamily: "Georgia,serif" }}>What type of liquor is this?</div>
            <div style={{ fontSize: "clamp(20px,4vw,30px)", color: C.cream, fontFamily: "Georgia,serif", lineHeight: 1.2 }}>{question.brand}</div>
            {question.note && <div style={{ fontSize: 12, color: C.dim, fontStyle: "italic", fontFamily: "Georgia,serif", marginTop: 6 }}>{question.note}</div>}
          </div>
        </div>
        <div style={{ padding: "4px 20px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {question.choices.map(choice => {
            const isCorrect = choice === question.liquor, isSelected = selected === choice;
            let bg = "rgba(255,255,255,0.04)", border = "1px solid rgba(255,255,255,0.1)", color = C.cream;
            if (answered) {
              if (isCorrect)       { bg = "rgba(93,189,122,0.18)";  border = "1px solid rgba(93,189,122,0.55)";  color = C.green; }
              else if (isSelected) { bg = "rgba(224,90,90,0.18)";   border = "1px solid rgba(224,90,90,0.55)";   color = C.red;   }
              else                 { bg = "rgba(255,255,255,0.015)"; border = "1px solid rgba(255,255,255,0.05)"; color = "#444";  }
            }
            return (
              <button key={choice} onClick={() => handleSelect(choice)} disabled={answered}
                style={{ background: bg, border, borderRadius: 10, padding: "13px 12px", color, fontSize: 13, cursor: answered ? "default" : "pointer", fontFamily: "Georgia,serif", textAlign: "center", lineHeight: 1.3, transition: "all 0.15s" }}>
                {isCorrect && answered && "✓ "}{choice}
              </button>
            );
          })}
        </div>
        {answered && (
          <div style={{ padding: "0 20px 20px" }}>
            <button onClick={handleNext} style={{ background: "transparent", border: `1px solid ${accent}66`, color: accent, borderRadius: 10, padding: "11px 32px", fontSize: 13, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif", width: "100%" }}>NEXT →</button>
          </div>
        )}
      </div>
    </div>
  );
}


// ── Async cocktail image loader ────────────────────────────────────────────
function CocktailImage({ name, style = {} }) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    let cancelled = false;
    getDrinkImage(name).then(url => { if (!cancelled) setImg(url); });
    return () => { cancelled = true; };
  }, [name]);
  if (!img) return null;
  return (
    <div style={{ width: 110, flexShrink: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 12px", alignSelf: "stretch", ...style }}>
      <img src={img} alt={name} style={{ maxWidth: "100%", maxHeight: 110, objectFit: "contain", borderRadius: 6 }} />
    </div>
  );
}

// ── Cocktails: Identify Ingredients ───────────────────────────────────────
function CocktailIngredientsQuiz({ accent, questionCount }) {
  const total = questionCount ?? COCKTAIL_ENTRIES.length;

  const extractSpirit = (ingredients) => {
    if (!ingredients?.length) return null;
    return ingredients[0].replace(/^\d[\d./ ]*oz\s*/i, "").replace(/\(.*\)/, "").trim();
  };

  const generateChoices = (q) => {
    const correct = extractSpirit(q.ingredients);
    const wrongs = shuffle(
      COCKTAIL_ENTRIES.filter(c => c.name !== q.name)
        .map(c => extractSpirit(c.ingredients))
        .filter(Boolean)
        .filter((v, i, arr) => arr.indexOf(v) === i && v !== correct)
    ).slice(0, 3);
    return { correct, choices: shuffle([correct, ...wrongs]) };
  };

  const [deck] = useState(() => shuffle([...COCKTAIL_ENTRIES]).slice(0, total));
  const [index, setIndex] = useState(0);
  const [qData, setQData] = useState(() => generateChoices(shuffle([...COCKTAIL_ENTRIES])[0]));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);

  const question = deck[index];
  const answered = selected !== null;
  const pickedCorrect = answered && selected === qData.correct;

  const handleSelect = (choice) => {
    if (answered) return;
    setSelected(choice);
    setScore(s => ({ correct: s.correct + (choice === qData.correct ? 1 : 0), wrong: s.wrong + (choice !== qData.correct ? 1 : 0) }));
  };

  const handleNext = () => {
    if (index + 1 >= total) { setDone(true); return; }
    const next = deck[index + 1];
    setIndex(i => i + 1);
    setSelected(null);
    setQData(generateChoices(next));
  };

  const handleRestart = () => {
    setIndex(0); setSelected(null); setScore({ correct: 0, wrong: 0 }); setDone(false);
    setQData(generateChoices(deck[0]));
  };

  if (done) return <DoneScreen score={score} total={total} onRestart={handleRestart} accent={accent} />;

  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      <ProgressBar index={index} total={total} score={score} accent={accent} />
      <div style={{
        background: answered ? (pickedCorrect ? "rgba(93,189,122,0.06)" : "rgba(224,90,90,0.06)") : "rgba(255,255,255,0.03)",
        border: `1px solid ${answered ? (pickedCorrect ? "rgba(93,189,122,0.35)" : "rgba(224,90,90,0.35)") : `${accent}40`}`,
        borderRadius: 20, overflow: "hidden",
      }}>
        {answered && (
          <div style={{ padding: "12px 24px", background: pickedCorrect ? "rgba(93,189,122,0.12)" : "rgba(224,90,90,0.12)", borderBottom: `1px solid ${pickedCorrect ? "rgba(93,189,122,0.2)" : "rgba(224,90,90,0.2)"}`, display: "flex", alignItems: "center", gap: 10, animation: "fadeReveal 0.2s ease both" }}>
            <span style={{ fontSize: 20 }}>{pickedCorrect ? "✓" : "✗"}</span>
            <div>
              <div style={{ color: pickedCorrect ? C.green : C.red, fontSize: 15, fontFamily: "Georgia,serif", fontWeight: "bold" }}>
                {pickedCorrect ? "Correct!" : `Not quite — it's made with ${qData.correct}`}
              </div>
              {!pickedCorrect && <div style={{ color: "#888", fontSize: 12, fontFamily: "Georgia,serif", marginTop: 2 }}>You picked: {selected}</div>}
            </div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <CocktailImage name={question.name} />
          <div style={{ flex: 1, padding: "28px 24px 8px", textAlign: "left" }}>
            <div style={{ fontSize: 11, letterSpacing: "4px", color: "#555", textTransform: "uppercase", marginBottom: 10, fontFamily: "Georgia,serif" }}>What's the main spirit in a...</div>
            <div style={{ fontSize: "clamp(22px,4vw,32px)", color: C.cream, fontFamily: "Georgia,serif", lineHeight: 1.2 }}>{question.name}</div>
            <div style={{ fontSize: 11, color: C.dim, fontFamily: "Georgia,serif", marginTop: 4 }}>{question.label}</div>
          </div>
        </div>
        {answered && (
          <div style={{ margin: "12px 20px 0", padding: "14px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 11, letterSpacing: "2px", color: "#555", textTransform: "uppercase", marginBottom: 8, fontFamily: "Georgia,serif" }}>Full Recipe</div>
            {question.ingredients.map((ing, i) => (
              <div key={i} style={{ fontSize: 12, color: C.muted, fontFamily: "Georgia,serif", marginBottom: 3 }}>• {ing}</div>
            ))}
          </div>
        )}
        <div style={{ padding: "16px 20px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {qData.choices.map(choice => {
            const isCorrect = choice === qData.correct, isSelected = selected === choice;
            let bg = "rgba(255,255,255,0.04)", border = "1px solid rgba(255,255,255,0.1)", color = C.cream;
            if (answered) {
              if (isCorrect)       { bg = "rgba(93,189,122,0.18)";  border = "1px solid rgba(93,189,122,0.55)";  color = C.green; }
              else if (isSelected) { bg = "rgba(224,90,90,0.18)";   border = "1px solid rgba(224,90,90,0.55)";   color = C.red;   }
              else                 { bg = "rgba(255,255,255,0.015)"; border = "1px solid rgba(255,255,255,0.05)"; color = "#444";  }
            }
            return (
              <button key={choice} onClick={() => handleSelect(choice)} disabled={answered}
                style={{ background: bg, border, borderRadius: 10, padding: "13px 10px", color, fontSize: 12, cursor: answered ? "default" : "pointer", fontFamily: "Georgia,serif", textAlign: "center", lineHeight: 1.3, transition: "all 0.15s" }}>
                {isCorrect && answered && "✓ "}{choice}
              </button>
            );
          })}
        </div>
        {answered && (
          <div style={{ padding: "0 20px 20px" }}>
            <button onClick={handleNext} style={{ background: "transparent", border: `1px solid ${accent}66`, color: accent, borderRadius: 10, padding: "11px 32px", fontSize: 13, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif", width: "100%" }}>NEXT →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Cocktails: Name the Cocktail ──────────────────────────────────────────
function CocktailNameQuiz({ accent, questionCount }) {
  const total = questionCount ?? ALL_COCKTAIL_ENTRIES.length;

  const generateChoices = (q) => {
    // Answer pool: always classic names so variants don't swamp choices
    // But always include the correct answer even if it's a specialty
    const pool = CLASSIC_COCKTAIL_NAMES.includes(q.name)
      ? CLASSIC_COCKTAIL_NAMES
      : [...CLASSIC_COCKTAIL_NAMES, q.name];
    const wrongs = shuffle(pool.filter(n => n !== q.name)).slice(0, 3);
    return shuffle([q.name, ...wrongs]);
  };

  const [deck] = useState(() => shuffle([...ALL_COCKTAIL_ENTRIES]).slice(0, total));
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState(() => generateChoices(shuffle([...ALL_COCKTAIL_ENTRIES])[0]));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);

  const question = deck[index];
  const answered = selected !== null;
  const pickedCorrect = answered && selected === question.name;

  const handleSelect = (choice) => {
    if (answered) return;
    setSelected(choice);
    setScore(s => ({ correct: s.correct + (choice === question.name ? 1 : 0), wrong: s.wrong + (choice !== question.name ? 1 : 0) }));
  };

  const handleNext = () => {
    if (index + 1 >= total) { setDone(true); return; }
    const next = deck[index + 1];
    setIndex(i => i + 1);
    setSelected(null);
    setChoices(generateChoices(next));
  };

  const handleRestart = () => {
    setIndex(0); setSelected(null); setScore({ correct: 0, wrong: 0 }); setDone(false);
    setChoices(generateChoices(deck[0]));
  };

  if (done) return <DoneScreen score={score} total={total} onRestart={handleRestart} accent={accent} />;

  return (
    <div style={{ width: "100%", maxWidth: 540 }}>
      <ProgressBar index={index} total={total} score={score} accent={accent} />
      <div style={{
        background: answered ? (pickedCorrect ? "rgba(93,189,122,0.06)" : "rgba(224,90,90,0.06)") : "rgba(255,255,255,0.03)",
        border: `1px solid ${answered ? (pickedCorrect ? "rgba(93,189,122,0.35)" : "rgba(224,90,90,0.35)") : `${accent}40`}`,
        borderRadius: 20, overflow: "hidden",
      }}>
        {answered && (
          <div style={{ padding: "12px 24px", background: pickedCorrect ? "rgba(93,189,122,0.12)" : "rgba(224,90,90,0.12)", borderBottom: `1px solid ${pickedCorrect ? "rgba(93,189,122,0.2)" : "rgba(224,90,90,0.2)"}`, display: "flex", alignItems: "center", gap: 10, animation: "fadeReveal 0.2s ease both" }}>
            <span style={{ fontSize: 20 }}>{pickedCorrect ? "✓" : "✗"}</span>
            <div>
              <div style={{ color: pickedCorrect ? C.green : C.red, fontSize: 15, fontFamily: "Georgia,serif", fontWeight: "bold" }}>
                {pickedCorrect ? "Correct!" : `That's a ${question.name}`}
              </div>
              {!pickedCorrect && <div style={{ color: "#888", fontSize: 12, fontFamily: "Georgia,serif", marginTop: 2 }}>You picked: {selected}</div>}
            </div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <CocktailImage name={question.name} />
          <div style={{ flex: 1, padding: "24px 20px 8px" }}>
            <div style={{ fontSize: 11, letterSpacing: "4px", color: "#555", textTransform: "uppercase", marginBottom: 10, fontFamily: "Georgia,serif", textAlign: "left" }}>What cocktail uses these ingredients?</div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px" }}>
              {question.ingredients.map((ing, i) => (
                <div key={i} style={{ fontSize: 12, color: C.muted, fontFamily: "Georgia,serif", marginBottom: i < question.ingredients.length - 1 ? 4 : 0 }}>• {ing}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 20px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {choices.map(choice => {
            const isCorrect = choice === question.name, isSelected = selected === choice;
            let bg = "rgba(255,255,255,0.04)", border = "1px solid rgba(255,255,255,0.1)", color = C.cream;
            if (answered) {
              if (isCorrect)       { bg = "rgba(93,189,122,0.18)";  border = "1px solid rgba(93,189,122,0.55)";  color = C.green; }
              else if (isSelected) { bg = "rgba(224,90,90,0.18)";   border = "1px solid rgba(224,90,90,0.55)";   color = C.red;   }
              else                 { bg = "rgba(255,255,255,0.015)"; border = "1px solid rgba(255,255,255,0.05)"; color = "#444";  }
            }
            return (
              <button key={choice} onClick={() => handleSelect(choice)} disabled={answered}
                style={{ background: bg, border, borderRadius: 10, padding: "13px 10px", color, fontSize: 13, cursor: answered ? "default" : "pointer", fontFamily: "Georgia,serif", textAlign: "center", lineHeight: 1.3, transition: "all 0.15s" }}>
                {isCorrect && answered && "✓ "}{choice}
              </button>
            );
          })}
        </div>
        {answered && (
          <div style={{ padding: "0 20px 20px" }}>
            <button onClick={handleNext} style={{ background: "transparent", border: `1px solid ${accent}66`, color: accent, borderRadius: 10, padding: "11px 32px", fontSize: 13, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif", width: "100%" }}>NEXT →</button>
          </div>
        )}
      </div>
    </div>
  );
}


// ── Shots Quiz: show ingredients → name the shot ──────────────────────────
// Smart wrong-choice logic: avoid picking shots with near-identical first ingredients
function ShotsMode({ accent = "#d4884a" }) {
  const [questionCount, setQuestionCount] = useState(Math.min(15, SHOT_ENTRIES.length));
  const [quizKey, setQuizKey] = useState(0);
  const [started, setStarted] = useState(false);

  if (!started) return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <QuizSetup poolSize={SHOT_ENTRIES.length} value={questionCount} onChange={setQuestionCount} accent={accent} />
      <button onClick={() => setStarted(true)} style={{ background: `${accent}22`, border: `1px solid ${accent}66`, color: accent, borderRadius: 10, padding: "11px 32px", fontSize: 13, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif" }}>START →</button>
    </div>
  );

  return <ShotsQuiz key={quizKey} total={questionCount} accent={accent} onRestart={() => setQuizKey(k => k + 1)} />;
}

function ShotsQuiz({ total, accent, onRestart }) {
  const allNames = SHOT_ENTRIES.map(s => s.name);

  // Build a map of first-ingredient fingerprint so we avoid putting too-similar shots as wrong choices
  const fingerprint = (entry) => {
    const first = entry.ingredients?.[0] || "";
    return first.replace(/^[\d./ ]*oz\s*/i, "").replace(/\(.*\)/, "").toLowerCase().trim().slice(0, 20);
  };

  const generateChoices = (q) => {
    const correctFp = fingerprint(q);
    // Prefer wrong choices that don't share the same first ingredient fingerprint
    const differentPool = SHOT_ENTRIES.filter(s => s.name !== q.name && fingerprint(s) !== correctFp);
    const samePool      = SHOT_ENTRIES.filter(s => s.name !== q.name && fingerprint(s) === correctFp);
    // Take from different pool first, fall back to same if needed
    const wrongs = shuffle([...differentPool, ...samePool]).slice(0, 3).map(s => s.name);
    return shuffle([q.name, ...wrongs]);
  };

  const [deck] = useState(() => shuffle([...SHOT_ENTRIES]).slice(0, total));
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState(() => generateChoices(shuffle([...SHOT_ENTRIES])[0]));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);

  const question = deck[index];
  const answered = selected !== null;
  const pickedCorrect = answered && selected === question.name;

  const handleSelect = (choice) => {
    if (answered) return;
    setSelected(choice);
    setScore(s => ({ correct: s.correct + (choice === question.name ? 1 : 0), wrong: s.wrong + (choice !== question.name ? 1 : 0) }));
  };

  const handleNext = () => {
    if (index + 1 >= total) { setDone(true); return; }
    const next = deck[index + 1];
    setIndex(i => i + 1);
    setSelected(null);
    setChoices(generateChoices(next));
  };

  const handleRestart = () => { onRestart(); };

  if (done) return <DoneScreen score={score} total={total} onRestart={handleRestart} accent={accent} />;

  return (
    <div style={{ width: "100%", maxWidth: 540 }}>
      <ProgressBar index={index} total={total} score={score} accent={accent} />

      <div style={{
        background: answered ? (pickedCorrect ? "rgba(93,189,122,0.06)" : "rgba(224,90,90,0.06)") : "rgba(255,255,255,0.03)",
        border: `1px solid ${answered ? (pickedCorrect ? "rgba(93,189,122,0.35)" : "rgba(224,90,90,0.35)") : `${accent}40`}`,
        borderRadius: 20, overflow: "hidden",
      }}>

        {answered && (
          <div style={{ padding: "12px 24px", background: pickedCorrect ? "rgba(93,189,122,0.12)" : "rgba(224,90,90,0.12)", borderBottom: `1px solid ${pickedCorrect ? "rgba(93,189,122,0.2)" : "rgba(224,90,90,0.2)"}`, display: "flex", alignItems: "center", gap: 10, animation: "fadeReveal 0.2s ease both" }}>
            <span style={{ fontSize: 20 }}>{pickedCorrect ? "✓" : "✗"}</span>
            <div>
              <div style={{ color: pickedCorrect ? C.green : C.red, fontSize: 15, fontFamily: "Georgia,serif", fontWeight: "bold" }}>
                {pickedCorrect ? "Correct!" : `That's a ${question.name}`}
              </div>
              {!pickedCorrect && <div style={{ color: "#888", fontSize: 12, fontFamily: "Georgia,serif", marginTop: 2 }}>You picked: {selected}</div>}
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "stretch" }}>
          <CocktailImage name={question.name} />
          <div style={{ flex: 1, padding: "20px 20px 8px" }}>
            <div style={{ fontSize: 11, letterSpacing: "4px", color: "#555", textTransform: "uppercase", marginBottom: 10, fontFamily: "Georgia,serif" }}>What shot uses these ingredients?</div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px" }}>
              {question.ingredients.map((ing, i) => (
                <div key={i} style={{ fontSize: 12, color: C.muted, fontFamily: "Georgia,serif", marginBottom: i < question.ingredients.length - 1 ? 4 : 0 }}>• {ing}</div>
              ))}
            </div>
          </div>
        </div>

        {/* After answering, show instructions */}
        {answered && question.instructions && (
          <div style={{ margin: "10px 20px 0", padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 11, letterSpacing: "2px", color: "#555", textTransform: "uppercase", marginBottom: 6, fontFamily: "Georgia,serif" }}>How to Make It</div>
            <div style={{ fontSize: 12, color: C.dim, fontFamily: "Georgia,serif", lineHeight: 1.6 }}>{question.instructions}</div>
          </div>
        )}

        <div style={{ padding: "14px 20px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {choices.map(choice => {
            const isCorrect = choice === question.name, isSelected = selected === choice;
            let bg = "rgba(255,255,255,0.04)", border = "1px solid rgba(255,255,255,0.1)", color = C.cream;
            if (answered) {
              if (isCorrect)       { bg = "rgba(93,189,122,0.18)";  border = "1px solid rgba(93,189,122,0.55)";  color = C.green; }
              else if (isSelected) { bg = "rgba(224,90,90,0.18)";   border = "1px solid rgba(224,90,90,0.55)";   color = C.red;   }
              else                 { bg = "rgba(255,255,255,0.015)"; border = "1px solid rgba(255,255,255,0.05)"; color = "#444";  }
            }
            return (
              <button key={choice} onClick={() => handleSelect(choice)} disabled={answered}
                style={{ background: bg, border, borderRadius: 10, padding: "13px 10px", color, fontSize: 13, cursor: answered ? "default" : "pointer", fontFamily: "Georgia,serif", textAlign: "center", lineHeight: 1.3, transition: "all 0.15s" }}>
                {isCorrect && answered && "✓ "}{choice}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ padding: "0 20px 20px" }}>
            <button onClick={handleNext} style={{ background: "transparent", border: `1px solid ${accent}66`, color: accent, borderRadius: 10, padding: "11px 32px", fontSize: 13, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif", width: "100%" }}>NEXT →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Cocktails tab: sub-mode toggle ────────────────────────────────────────
function CocktailsMode({ accent = C.tealD }) {
  const [subMode, setSubMode] = useState(null);
  const [key, setKey] = useState(0);
  const [questionCount, setQuestionCount] = useState(15);

  const poolSize = subMode === "ingredients" ? COCKTAIL_ENTRIES.length : ALL_COCKTAIL_ENTRIES.length;

  const handleSubMode = (k) => {
    setSubMode(k);
    setKey(n => n + 1);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 10, padding: 4 }}>
        {[["ingredients", "Identify Ingredients"], ["name", "Name the Cocktail"]].map(([k, label]) => (
          <button key={k} onClick={() => handleSubMode(k)}
            style={{ background: subMode === k ? `${accent}cc` : "transparent", border: "none", borderRadius: 7, padding: "8px 18px", color: subMode === k ? "#0a0a0f" : C.muted, cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 13, transition: "all 0.2s" }}>
            {label}
          </button>
        ))}
      </div>
      {subMode && (
        <QuizSetup poolSize={poolSize} value={Math.min(questionCount, poolSize)} onChange={(n) => { setQuestionCount(n); setKey(k => k + 1); }} accent={accent} />
      )}
      {!subMode && <div style={{ color: C.dim, fontSize: 13, textAlign: "center", maxWidth: 360, lineHeight: 1.9 }}>
        <div><strong style={{ color: accent }}>Identify Ingredients</strong> — cocktail name shown, pick the main spirit.</div>
        <div style={{ marginTop: 4 }}><strong style={{ color: accent }}>Name the Cocktail</strong> — ingredients shown, pick which drink it is.</div>
      </div>}
      {subMode === "ingredients" && <CocktailIngredientsQuiz key={`ing-${key}`} accent={accent} questionCount={Math.min(questionCount, COCKTAIL_ENTRIES.length)} />}
      {subMode === "name"        && <CocktailNameQuiz        key={`nm-${key}`}  accent={accent} questionCount={Math.min(questionCount, ALL_COCKTAIL_ENTRIES.length)} />}
    </div>
  );
}


// ── Question count slider ──────────────────────────────────────────────────
function QuizSetup({ poolSize, value, onChange, accent }) {
  const min = Math.min(5, poolSize);
  const max = poolSize;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ width: "100%", maxWidth: 400, marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: C.muted, letterSpacing: "1px" }}>QUESTIONS</span>
        <span style={{ fontFamily: "Georgia,serif", fontSize: 16, color: accent, fontWeight: "bold" }}>{value}</span>
      </div>
      <div style={{ position: "relative", height: 32, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: accent, borderRadius: 2, transition: "width 0.1s" }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", width: "100%", height: "100%",
            opacity: 0, cursor: "pointer", margin: 0, padding: 0,
          }}
        />
        <div style={{
          position: "absolute",
          left: `calc(${pct}% - 10px)`,
          width: 20, height: 20, borderRadius: "50%",
          background: accent, border: "3px solid #0e0c09",
          boxShadow: `0 0 12px ${accent}80`,
          transition: "left 0.1s",
          pointerEvents: "none",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontFamily: "Georgia,serif", fontSize: 10, color: C.dim }}>{min}</span>
        <span style={{ fontFamily: "Georgia,serif", fontSize: 10, color: C.dim }}>{max}</span>
      </div>
    </div>
  );
}

// ── Beer / Wine quiz ─────────────────────────────────────────────────────
// Same 4-choice engine, but for beer style / wine type identification
function BeerWineQuiz({ dataset, accent, questionCount, questionText, correctField }) {
  const subtypes = [...new Set(dataset.map(b => b[correctField]))].sort();
  const total = questionCount ?? dataset.length;
  const buildDeck = () => shuffle([...dataset]).slice(0, total);

  const [deck, setDeck] = useState(() => buildDeck());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);
  const [img, setImg] = useState(null);

  const question = deck[index];
  const answered = selected !== null;
  const pickedCorrect = answered && selected === question?.[correctField];

  useEffect(() => {
    if (!question) return;
    setImg(null);
    const fetch = correctField === "style" || correctField === "subtype"
      ? getBeerImage
      : getWineImage;
    fetch(question.brand).then(setImg);
  }, [question, correctField]);

  const handleSelect = (val) => {
    if (answered) return;
    const correct = question[correctField];
    setSelected(val);
    setScore(s => ({ correct: s.correct + (val === correct ? 1 : 0), wrong: s.wrong + (val !== correct ? 1 : 0) }));
  };

  const handleNext = () => {
    if (index + 1 >= total) { setDone(true); return; }
    setIndex(i => i + 1);
    setSelected(null);
  };

  const handleRestart = () => {
    setDeck(buildDeck()); setIndex(0); setSelected(null);
    setScore({ correct: 0, wrong: 0 }); setDone(false);
  };

  if (done) return <DoneScreen score={score} total={total} onRestart={handleRestart} accent={accent} />;

  const correct = question?.[correctField];

  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <ProgressBar index={index} total={total} score={score} accent={accent} />

      <div style={{
        background: answered ? (pickedCorrect ? "rgba(93,189,122,0.06)" : "rgba(224,90,90,0.06)") : "rgba(255,255,255,0.03)",
        border: `1px solid ${answered ? (pickedCorrect ? "rgba(93,189,122,0.35)" : "rgba(224,90,90,0.35)") : `${accent}40`}`,
        borderRadius: 20, overflow: "hidden",
      }}>
        {answered && (
          <div style={{ padding: "12px 24px", background: pickedCorrect ? "rgba(93,189,122,0.12)" : "rgba(224,90,90,0.12)", borderBottom: `1px solid ${pickedCorrect ? "rgba(93,189,122,0.2)" : "rgba(224,90,90,0.2)"}`, display: "flex", alignItems: "center", gap: 10, animation: "fadeReveal 0.2s ease both" }}>
            <span style={{ fontSize: 20 }}>{pickedCorrect ? "✓" : "✗"}</span>
            <div>
              <div style={{ color: pickedCorrect ? C.green : C.red, fontSize: 15, fontFamily: "Georgia,serif", fontWeight: "bold" }}>
                {pickedCorrect ? "Correct!" : `Nope — that's ${correct}`}
              </div>
              {!pickedCorrect && <div style={{ color: "#888", fontSize: 12, fontFamily: "Georgia,serif", marginTop: 2 }}>You picked: {selected}</div>}
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center" }}>
          {img && (
            <div style={{ width: 100, flexShrink: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 10px", alignSelf: "stretch" }}>
              <img src={img} alt={question.brand} style={{ maxWidth: "100%", maxHeight: 110, objectFit: "contain" }} />
            </div>
          )}
          <div style={{ flex: 1, padding: "24px 24px 16px", textAlign: img ? "left" : "center" }}>
            <div style={{ fontSize: 11, letterSpacing: "4px", color: "#555", textTransform: "uppercase", marginBottom: 8, fontFamily: "Georgia,serif" }}>{questionText}</div>
            <div style={{ fontSize: "clamp(20px,4vw,30px)", color: C.cream, fontFamily: "Georgia,serif", lineHeight: 1.2 }}>{question.brand}</div>
            {question.note && <div style={{ fontSize: 11, color: C.dim, fontStyle: "italic", fontFamily: "Georgia,serif", marginTop: 5 }}>{question.note}</div>}
          </div>
        </div>

        <div style={{ padding: "4px 20px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
          {subtypes.map(val => {
            const isCorrect = val === correct;
            const isSelected = selected === val;
            let bg = "rgba(255,255,255,0.04)", border = "1px solid rgba(255,255,255,0.1)", color = C.cream;
            if (answered) {
              if (isCorrect)       { bg = "rgba(93,189,122,0.18)";  border = "1px solid rgba(93,189,122,0.55)";  color = C.green; }
              else if (isSelected) { bg = "rgba(224,90,90,0.18)";   border = "1px solid rgba(224,90,90,0.55)";   color = C.red;   }
              else                 { bg = "rgba(255,255,255,0.015)"; border = "1px solid rgba(255,255,255,0.05)"; color = "#444";  }
            }
            return (
              <button key={val} onClick={() => handleSelect(val)} disabled={answered}
                style={{ background: bg, border, borderRadius: 10, padding: "11px 10px", color, fontSize: 12, cursor: answered ? "default" : "pointer", fontFamily: "Georgia,serif", textAlign: "center", lineHeight: 1.3, transition: "all 0.15s" }}>
                {isCorrect && answered && "✓ "}{val}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ padding: "0 20px 20px" }}>
            <button onClick={handleNext} style={{ background: "transparent", border: `1px solid ${accent}66`, color: accent, borderRadius: 10, padding: "11px 32px", fontSize: 13, letterSpacing: "2px", cursor: "pointer", fontFamily: "Georgia,serif", width: "100%" }}>NEXT →</button>
          </div>
        )}
      </div>
    </div>
  );
}

function BeerMode({ accent = "#D4820A" }) {
  const [difficulty, setDifficulty] = useState(null);
  const [questionCount, setQuestionCount] = useState(20);
  const [quizKey, setQuizKey] = useState(0);

  const handleDifficulty = (key) => {
    setDifficulty(key);
    setQuizKey(k => k + 1);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { key: "style",   label: "⭐ Easy",  sub: "Lager · Ale · Cider · Hard Seltzer",  accent: accent },
          { key: "subtype", label: "🔥 Hard",  sub: "IPA · Stout · Bock · Wheat · Seltzer...", accent: "#e06060" },
        ].map(({ key, label, sub, accent: a }) => (
          <button key={key} onClick={() => handleDifficulty(key)} style={{
            background: difficulty === key ? `${a}22` : "rgba(255,255,255,0.02)",
            border: `1px solid ${difficulty === key ? a : C.border}`,
            borderRadius: 10, padding: "12px 20px",
            color: difficulty === key ? a : C.muted,
            cursor: "pointer", fontFamily: "Georgia,serif", textAlign: "center", transition: "all 0.2s", minWidth: 160,
          }}>
            <div style={{ fontSize: 14, fontWeight: difficulty === key ? "bold" : "normal" }}>{label}</div>
            <div style={{ fontSize: 10, opacity: 0.55, marginTop: 3 }}>{sub}</div>
          </button>
        ))}
      </div>

      {difficulty && (
        <QuizSetup poolSize={BEER_QUIZ.length} value={Math.min(questionCount, BEER_QUIZ.length)} onChange={(n) => { setQuestionCount(n); setQuizKey(k => k + 1); }} accent={difficulty === "subtype" ? "#e06060" : accent} />
      )}

      {!difficulty && (
        <div style={{ color: C.dim, fontSize: 13, textAlign: "center", maxWidth: 380, lineHeight: 1.9 }}>
          <div><strong style={{ color: accent }}>Easy</strong> — broad category. Is it a Lager, Ale, Cider, or Hard Seltzer?</div>
          <div style={{ marginTop: 6 }}><strong style={{ color: "#e06060" }}>Hard</strong> — exact style. IPA, Stout, Bock, Wheat, Pilsner, Porter, Seltzer...</div>
        </div>
      )}

      {difficulty === "style"   && <BeerWineQuiz key={`beer-easy-${quizKey}`}   dataset={BEER_QUIZ} accent={accent}    questionCount={Math.min(questionCount, BEER_QUIZ.length)} questionText="What category of beer is this?" correctField="style"   />}
      {difficulty === "subtype" && <BeerWineQuiz key={`beer-hard-${quizKey}`}   dataset={BEER_QUIZ} accent="#e06060"   questionCount={Math.min(questionCount, BEER_QUIZ.length)} questionText="What style of beer is this?" correctField="subtype" />}
    </div>
  );
}

function WineMode({ accent = "#8B1A35" }) {
  const [difficulty, setDifficulty] = useState(null);
  const [questionCount, setQuestionCount] = useState(15);
  const [quizKey, setQuizKey] = useState(0);

  const handleDifficulty = (key) => {
    setDifficulty(key);
    setQuizKey(k => k + 1);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { key: "style",   label: "⭐ Easy",  sub: "Red · White · Rosé · Sparkling",       accent: accent },
          { key: "subtype", label: "🔥 Hard",  sub: "Cab · Merlot · Chardonnay · Prosecco...", accent: "#e06060" },
        ].map(({ key, label, sub, accent: a }) => (
          <button key={key} onClick={() => handleDifficulty(key)} style={{
            background: difficulty === key ? `${a}22` : "rgba(255,255,255,0.02)",
            border: `1px solid ${difficulty === key ? a : C.border}`,
            borderRadius: 10, padding: "12px 20px",
            color: difficulty === key ? a : C.muted,
            cursor: "pointer", fontFamily: "Georgia,serif", textAlign: "center", transition: "all 0.2s", minWidth: 160,
          }}>
            <div style={{ fontSize: 14, fontWeight: difficulty === key ? "bold" : "normal" }}>{label}</div>
            <div style={{ fontSize: 10, opacity: 0.55, marginTop: 3 }}>{sub}</div>
          </button>
        ))}
      </div>

      {difficulty && (
        <QuizSetup poolSize={WINE_QUIZ.length} value={Math.min(questionCount, WINE_QUIZ.length)} onChange={(n) => { setQuestionCount(n); setQuizKey(k => k + 1); }} accent={difficulty === "subtype" ? "#e06060" : accent} />
      )}

      {!difficulty && (
        <div style={{ color: C.dim, fontSize: 13, textAlign: "center", maxWidth: 380, lineHeight: 1.9 }}>
          <div><strong style={{ color: accent }}>Easy</strong> — broad type. Red, White, Rosé, or Sparkling?</div>
          <div style={{ marginTop: 6 }}><strong style={{ color: "#e06060" }}>Hard</strong> — exact varietal. Cabernet vs Merlot, Chardonnay vs Pinot Grigio...</div>
        </div>
      )}

      {difficulty === "style"   && <BeerWineQuiz key={`wine-easy-${quizKey}`}  dataset={WINE_QUIZ} accent={accent}    questionCount={Math.min(questionCount, WINE_QUIZ.length)} questionText="What type of wine is this?" correctField="style"   />}
      {difficulty === "subtype" && <BeerWineQuiz key={`wine-hard-${quizKey}`}  dataset={WINE_QUIZ} accent="#e06060"   questionCount={Math.min(questionCount, WINE_QUIZ.length)} questionText="What varietal is this?" correctField="subtype" />}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
const TABS = [
  { key: "spirits",   label: "🥃 Spirits",   sub: `${ALL_SPIRITS_EASY.length} brands · Easy & Hard`,  accent: C.goldD   },
  { key: "liqueurs",  label: "🍬 Liqueurs",  sub: `${LIQUEURS.length} brands`,                         accent: C.purpleD },
  { key: "beer",      label: "🍺 Beer",      sub: `${BEER_QUIZ.length} brands · Style & Subtype`,      accent: "#D4820A"  },
  { key: "wine",      label: "🍷 Wine",      sub: `${WINE_QUIZ.length} brands · Type & Varietal`,      accent: "#8B1A35"  },
  { key: "cocktails", label: "🍹 Cocktails", sub: `${ALL_COCKTAIL_ENTRIES.length} drinks`,              accent: C.tealD   },
  { key: "shots",     label: "🔥 Shots",     sub: `${SHOT_ENTRIES.length} shots`,                      accent: "#d4884a"  },
];

export default function LiquorQuiz() {
  const [tab, setTab] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: C.black, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Georgia,serif", padding: "24px 16px", position: "relative", overflow: "hidden" }}>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 20% 50%,rgba(180,130,60,0.07) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(100,60,180,0.06) 0%,transparent 60%)" }} />

      <div style={{ textAlign: "center", marginBottom: 32, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, letterSpacing: "4px", color: C.goldD, textTransform: "uppercase", marginBottom: 8 }}>Gunthers Bar · Houston TX</div>
        <h1 style={{ fontSize: "clamp(22px,4vw,30px)", color: C.cream, margin: "0 0 4px", fontWeight: "normal", letterSpacing: 1 }}>Spirit Identifier</h1>
        <div style={{ fontSize: 12, color: C.dim }}>{ALL_SPIRITS_EASY.length + LIQUEURS.length} spirits · {BEER_QUIZ.length} beers · {WINE_QUIZ.length} wines · {ALL_COCKTAIL_ENTRIES.length} cocktails</div>
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap", justifyContent: "center" }}>
          {TABS.map(({ key, label, sub, accent }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              background: tab === key ? `${accent}22` : "rgba(255,255,255,0.02)",
              border: `1px solid ${tab === key ? accent : C.border}`,
              borderRadius: 10, padding: "12px 20px", color: tab === key ? accent : C.muted,
              cursor: "pointer", fontFamily: "Georgia,serif", textAlign: "center", transition: "all 0.2s", minWidth: 120,
            }}>
              <div style={{ fontSize: 14, fontWeight: tab === key ? "bold" : "normal" }}>{label}</div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{sub}</div>
            </button>
          ))}
        </div>

        {!tab && (
          <div style={{ color: C.dim, fontSize: 13, textAlign: "center", maxWidth: 400, lineHeight: 2 }}>
            {TABS.map(({ key, label, accent }) => (
              <div key={key}><strong style={{ color: accent }}>{label}</strong></div>
            ))}
          </div>
        )}

        {tab === "spirits"   && <SpiritsMode   key="spirits"   />}
        {tab === "liqueurs"  && <LiqueursMode  key="liqueurs"  />}
        {tab === "beer"      && <BeerMode      key="beer"      />}
        {tab === "wine"      && <WineMode      key="wine"      />}
        {tab === "cocktails" && <CocktailsMode key="cocktails" />}
        {tab === "shots"     && <ShotsMode     key="shots"     />}
      </div>

      <style>{`
        @keyframes fadeReveal{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        button:not(:disabled):hover{opacity:0.85}
      `}</style>
    </div>
  );
}