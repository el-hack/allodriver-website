"use client";

import { useRef } from "react";
import { VEHICLES, filterVehicles, type Category, type SortOrder } from "@/lib/catalog";
import { formatDate } from "@/lib/booking";
import { PRIMARY_WHATSAPP_NUMBER, whatsappURL } from "@/lib/contact";
import { useRental } from "./RentalProvider";
import { VehicleCard } from "./VehicleCard";

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "Tous les modèles" },
  { value: "citadine", label: "Citadines" },
  { value: "berline", label: "Berlines" },
  { value: "suv", label: "SUV" },
  { value: "familiale", label: "Familiales" },
  { value: "premium", label: "Premium" },
];

export function VehicleCatalogue() {
  const { category, setCategory, budget, setBudget, sort, setSort, committed, openVehicle } =
    useRental();
  const firstFilter = useRef<HTMLButtonElement>(null);
  const vehicles = filterVehicles(VEHICLES, { category, maxPrice: budget, sort });
  function reset() {
    setCategory("all");
    setBudget(Infinity);
    setSort("editorial");
    firstFilter.current?.focus();
  }

  return (
    <section className="catalogue section wrap" id="vehicules" aria-labelledby="vehicles-title">
      <div className="section-heading">
        <div>
          <h2 id="vehicles-title">
            Le bon véhicule.
            <br /> Pour votre prochain départ.
          </h2>
        </div>
        <p className="section-aside">
          Le confort d’une berline, la liberté d’un SUV, la simplicité d’une citadine.
          <br /> À chaque envie, sa route.
        </p>
      </div>
      <div className="catalogue-toolbar">
        <div className="filters" role="group" aria-label="Catégorie de véhicule">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              ref={value === "all" ? firstFilter : undefined}
              type="button"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="catalogue-options">
          <label htmlFor="budget">
            Budget / jour
            <select
              id="budget"
              value={Number.isFinite(budget) ? String(budget) : "all"}
              onChange={(event) =>
                setBudget(event.target.value === "all" ? Infinity : Number(event.target.value))
              }
            >
              <option value="all">Tous les budgets</option>
              <option value="30000">Jusqu’à 30 000 FCFA</option>
              <option value="50000">Jusqu’à 50 000 FCFA</option>
              <option value="75000">Jusqu’à 75 000 FCFA</option>
            </select>
          </label>
          <label htmlFor="sort">
            Trier par
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOrder)}
            >
              <option value="editorial">Notre sélection</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </label>
        </div>
      </div>
      {committed && (
        <p className="search-summary">
          Votre recherche : {committed.place} · du {formatDate(committed.start)} au{" "}
          {formatDate(committed.end)}. Disponibilité à confirmer.
        </p>
      )}
      <div className="catalogue-status">
        <p role="status" aria-live="polite">
          {vehicles.length} modèle{vehicles.length !== 1 ? "s" : ""} à explorer
        </p>
        <p className="demo-label">
          <span aria-hidden="true">◉</span> Tarifs et disponibilité à confirmer
        </p>
      </div>
      {vehicles.length > 0 ? (
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={() => openVehicle(vehicle)} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Aucun modèle pour ce budget.</h3>
          <p>Essayez une autre catégorie ou élargissez votre budget.</p>
          <button type="button" className="button button-dark" onClick={reset}>
            Réinitialiser les filtres <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
      <p className="catalogue-disclaimer">
        Les véhicules signalés par « Tarif communiqué » sont présentés avec les photos et tarifs
        transmis pour cette page. Les autres modèles, configurations, photographies et tarifs sont
        illustratifs. Disponibilité et conditions de location à confirmer auprès d’AlloDriver.
      </p>
      <div className="catalogue-bottom">
        <span>Un besoin particulier ? On en parle.</span>
        <a
          href={whatsappURL(PRIMARY_WHATSAPP_NUMBER)}
          target="_blank"
          rel="noopener noreferrer"
          className="underlined-link"
        >
          Être accompagné <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
