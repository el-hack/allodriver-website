"use client";

import { useState, type FormEvent } from "react";
import { validateSearch, type SearchError } from "@/lib/booking";
import { PRIMARY_WHATSAPP_NUMBER, whatsappURL } from "@/lib/contact";
import { useRental, scrollToCatalogue } from "./RentalProvider";
import { RentalFields, focusInvalidField } from "./RentalFields";

export function SearchForm() {
  const { search, setSearch, setCommitted, today } = useRental();
  const [error, setError] = useState<SearchError | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validateSearch(search);
    setError(nextError);
    if (nextError) {
      focusInvalidField(event.currentTarget, nextError);
      return;
    }
    setCommitted({ ...search, place: search.place.trim() });
    scrollToCatalogue();
  }
  return (
    <section className="search-section" id="recherche" aria-label="Préparer votre location">
      <form className="search-form wrap" noValidate onSubmit={submit}>
        <RentalFields
          value={search}
          onChange={(next) => {
            setSearch(next);
            setError(null);
          }}
          today={today}
          error={error}
          variant="search"
        />
        <button type="submit" className="button button-gold search-submit">
          Trouver un véhicule{" "}
          <svg aria-hidden="true">
            <use href="#search" />
          </svg>
        </button>
        {error && (
          <p id="search-error" className="field-error" role="alert">
            {error.message}
          </p>
        )}
      </form>
      <div className="search-caption wrap">
        <span>Votre trajet. Vos dates. Votre choix.</span>
        <span>Disponibilité et conditions à confirmer</span>
      </div>
      <noscript>
        <p className="wrap">
          Activez JavaScript pour explorer ce catalogue ou{" "}
          <a href={whatsappURL(PRIMARY_WHATSAPP_NUMBER)}>contactez AlloDriver sur WhatsApp</a>.
        </p>
      </noscript>
    </section>
  );
}
