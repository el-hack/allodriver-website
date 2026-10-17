"use client";

import { useState } from "react";
import { Modal } from "./Modal";

export function InfoDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button id="open-info" type="button" onClick={() => setOpen(true)}>
        Informations & crédits
      </button>
      {open && (
        <Modal
          id="info-dialog"
          titleId="info-title"
          closeLabel="Fermer les informations"
          onClose={() => setOpen(false)}
        >
          <div className="info-content">
            <h2 id="info-title">Informations & crédits</h2>
            <p>
              Cette page est une proposition de refonte AlloDriver. Elle ne confirme aucune
              disponibilité et n’encaisse aucun paiement.
            </p>
            <p>
              Les véhicules signalés par « Tarif communiqué » sont présentés avec les photographies
              et prix transmis pour cette page. Les autres modèles, configurations et tarifs sont
              illustratifs. Toute réservation doit être confirmée par AlloDriver. Les conditions
              contractuelles et les documents légaux officiels ne sont pas fournis sur cette page.
            </p>
            <h3>Sources et photographies</h3>
            <p>
              Logo et coordonnées :{" "}
              <a href="https://allodriver.ci/" target="_blank" rel="noopener noreferrer">
                site officiel AlloDriver
              </a>
              . Captures :{" "}
              <a
                href="https://apps.apple.com/ci/app/allo-driver/id6471352377"
                target="_blank"
                rel="noopener noreferrer"
              >
                App Store AlloDriver
              </a>
              .
            </p>
            <p>
              Photographies automobiles issues d’Unsplash : Captain Car’s (Range Rover), Vlad
              Kutepov (Toyota), Dhiva Krishna (Mercedes) et photographie Peugeot. Les lieux
              photographiés ne représentent pas une agence AlloDriver.
            </p>
            <p>
              Les photographies des véhicules signalés par « Tarif communiqué » ont été fournies par
              l’utilisateur.
            </p>
            <p>
              Aucune donnée n’est transmise lorsque vous préparez votre recherche sur cette page. Le
              bouton WhatsApp ouvre un brouillon à vérifier et envoyer vous-même.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
