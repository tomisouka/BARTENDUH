import Section from "../components/Section";
import RecipeCard from "../components/RecipeCard";
import { SPECIALTY } from "../data/specialty";

export default function SpecialtyPage() {
  return (
    <div>
      {SPECIALTY.map((cat, i) => (
        <Section key={i} title={cat.category} color={cat.color}>
          {cat.recipes.map((r, ri) => (
            <RecipeCard key={ri} recipe={r} accent={cat.color} />
          ))}
        </Section>
      ))}
    </div>
  );
}
