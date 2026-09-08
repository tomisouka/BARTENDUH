import Section from "../components/Section";
import RecipeCard from "../components/RecipeCard";
import { CLASSICS } from "../data/classics";

export default function ClassicsPage({ accentColor }) {
  return (
    <div>
      {CLASSICS.map((cat, i) => (
        <Section key={i} title={cat.category} color={cat.color}>
          {cat.recipes.map((r, ri) => (
            <RecipeCard key={ri} recipe={r} accent={cat.color} />
          ))}
        </Section>
      ))}
    </div>
  );
}
