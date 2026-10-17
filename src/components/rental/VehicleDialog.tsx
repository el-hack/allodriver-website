"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  inquiryURL,
  rentalDays,
  validateSearch,
  type RentalSearch,
  type SearchError,
} from "@/lib/booking";
import { money, type Vehicle } from "@/lib/catalog";
import { WHATSAPP_CONTACTS } from "@/lib/contact";
import { Modal } from "../Modal";
import { defaultSearch, useRental } from "./RentalProvider";
import { RentalFields, focusInvalidField } from "./RentalFields";

export function VehicleDialog({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const { search, setSearch, setCommitted, today } = useRental();
  const [draft, setDraft] = useState<RentalSearch>(() =>
    validateSearch(search) ? defaultSearch() : { ...search },
  );
  const [error, setError] = useState<SearchError | null>(null);
  const [readySearch, setReadySearch] = useState<RentalSearch | null>(null);
  const whatsapp = useRef<HTMLAnchorElement>(null);
  const days = rentalDays(draft.start, draft.end);
  const valid = !validateSearch(draft);
  useEffect(() => {
    if (readySearch) whatsapp.current?.focus();
  }, [readySearch]);

  function change(next: RentalSearch) {
    setDraft(next);
    setError(null);
    setReadySearch(null);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validateSearch(draft);
    setError(nextError);
    if (nextError) {
      focusInvalidField(event.currentTarget, nextError);
      return;
    }
    const confirmed = { ...draft, place: draft.place.trim() };
    setSearch(confirmed);
    setCommitted(confirmed);
    setReadySearch(confirmed);
  }

  return (
    <Modal
      id="vehicle-dialog"
      titleId="dialog-title"
      closeLabel="Fermer la fiche véhicule"
      onClose={onClose}
    >
      <div className="dialog-layout">
        <div
          className={`dialog-images${vehicle.additionalImages?.length ? " has-additional" : ""}`}
        >
          <Image
            src={vehicle.image}
            width={1000}
            height={1400}
            sizes="(max-width: 700px) 95vw, 440px"
            alt={vehicle.imageAlt ?? `${vehicle.name}, photographie d’illustration`}
            style={{ objectPosition: vehicle.position }}
          />
          {vehicle.additionalImages?.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              width={1280}
              height={960}
              sizes="(max-width: 700px) 95vw, 440px"
              alt={image.alt}
            />
          ))}
        </div>
        <div className="dialog-content">
          <h2 id="dialog-title">{vehicle.name}</h2>
          <p id="dialog-description">{vehicle.description}</p>
          <p className="dialog-specs">
            {[
              vehicle.category,
              vehicle.seats && `${vehicle.seats} places`,
              vehicle.transmission,
              vehicle.fuel,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <div className="dialog-rate">
            <strong>{money(vehicle.price)}</strong>
            <span>
              FCFA / jour ·{" "}
              {vehicle.source === "provided" ? "tarif communiqué" : "tarif illustratif"}
            </span>
          </div>
          <form id="inquiry-form" noValidate onSubmit={submit}>
            <RentalFields
              value={draft}
              onChange={change}
              today={today}
              error={error}
              variant="dialog"
            />
            {error && (
              <p id="inquiry-error" className="field-error" role="alert">
                {error.message}
              </p>
            )}
            <div className="estimate" aria-live="polite">
              <span>
                {days && valid
                  ? `${days} jour${days > 1 ? "s" : ""} · simulation`
                  : "Choisissez des dates valides"}
              </span>
              <strong>{days && valid ? `${money(days * vehicle.price)} FCFA` : "—"}</strong>
              <small>
                Simulation de location, hors frais éventuels. Aucun montant à payer ici.
              </small>
            </div>
            <p className="dialog-notice">
              {vehicle.source === "provided"
                ? "Tarif communiqué pour cette page. Disponibilité et conditions de location à confirmer avec AlloDriver."
                : "Modèle de démonstration. Le véhicule, son prix réel et sa disponibilité restent à confirmer avec AlloDriver."}
            </p>
            {!readySearch && (
              <button type="submit" className="button button-gold dialog-submit">
                Préparer ma demande <span aria-hidden="true">↗</span>
              </button>
            )}
          </form>
          {readySearch && (
            <div id="inquiry-ready">
              <p>
                Votre demande est prête. Choisissez un numéro, puis relisez le message dans WhatsApp
                avant de l’envoyer.
              </p>
              <div className="whatsapp-options">
                {WHATSAPP_CONTACTS.map((contact, index) => (
                  <a
                    key={contact.number}
                    ref={index === 0 ? whatsapp : undefined}
                    className="button button-dark whatsapp-option"
                    href={inquiryURL(vehicle, readySearch, contact.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp {contact.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          <a href="#application" className="dialog-app-link" onClick={onClose}>
            Ou découvrir l’application AlloDriver →
          </a>
        </div>
      </div>
    </Modal>
  );
}

export function RentalDialog() {
  const { selected, closeVehicle } = useRental();
  return selected ? (
    <VehicleDialog key={selected.id} vehicle={selected} onClose={closeVehicle} />
  ) : null;
}
