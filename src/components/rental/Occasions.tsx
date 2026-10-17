"use client";

import type { Category } from "@/lib/catalog";
import { useRental, scrollToCatalogue } from "./RentalProvider";

const occasions: { category: Category; title: string; description: string }[] = [
  {
    category: "citadine",
    title: "La ville, au quotidien.",
    description: "Citadines · Agiles, compactes, essentielles.",
  },
  {
    category: "familiale",
    title: "Les départs à plusieurs.",
    description: "SUV & familiales · De la place pour vos envies.",
  },
  {
    category: "premium",
    title: "Les moments qui comptent.",
    description: "Berlines & premium · Le plaisir du détail.",
  },
];

export function Occasions() {
  const { setCategory, setBudget } = useRental();
  function select(category: Category) {
    setCategory(category);
    setBudget(Infinity);
    scrollToCatalogue();
  }
  return (
    <section className="occasions" aria-labelledby="occasions-title">
      <div className="wrap occasions-grid">
        <div>
          <h2 id="occasions-title">
            Du lundi pressé
            <br /> au dimanche
            <br /> <em>sans programme.</em>
          </h2>
          <p>
            Il n’y a pas une seule façon de voyager.
            <br /> Il y a la vôtre.
          </p>
        </div>
        <div className="occasion-list">
          {occasions.map((occasion, index) => (
            <button key={occasion.category} type="button" onClick={() => select(occasion.category)}>
              <span className="occasion-number">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong>{occasion.title}</strong>
                <small>{occasion.description}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
