export function Faq() {
  return (
    <section className="faq-section section wrap" aria-labelledby="faq-title">
      <div className="faq-intro">
        <h2 id="faq-title">
          Avant <br /> de partir.
        </h2>
        <p>
          Besoin d’un conseil pour votre location ?<br /> Parlons-en simplement.
        </p>
        <a href="tel:+2250707709058" className="underlined-link">
          +225 07 07 70 90 58 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="faq-list">
        <details>
          <summary>
            Comment réserver un véhicule ?<span aria-hidden="true">+</span>
          </summary>
          <p>
            Préparez vos dates et votre lieu de récupération, puis ouvrez la fiche d’un modèle pour
            préparer votre demande. Vous pourrez vérifier les disponibilités avec l’équipe
            AlloDriver sur WhatsApp ou poursuivre dans l’application. La demande de renseignement ne
            constitue pas une réservation confirmée.
          </p>
        </details>
        <details>
          <summary>
            Les véhicules et les prix affichés sont-ils disponibles ?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Les véhicules signalés par « Tarif communiqué » utilisent les photos et prix transmis
            pour cette page. Les autres modèles et tarifs sont illustratifs. L’équipe AlloDriver
            doit confirmer la disponibilité, le tarif applicable et les conditions avant toute
            réservation.
          </p>
        </details>
        <details>
          <summary>
            Quels documents et conditions faut-il prévoir ?<span aria-hidden="true">+</span>
          </summary>
          <p>
            Demandez à l’équipe les documents requis et les conditions applicables au véhicule
            choisi : permis, identité, caution, assurance, kilométrage et modalités d’annulation.
            Ces éléments sont à vérifier avant de vous engager.
          </p>
        </details>
        <details>
          <summary>
            Où récupérer et restituer le véhicule ?<span aria-hidden="true">+</span>
          </summary>
          <p>
            Indiquez votre lieu souhaité dans la recherche. Le lieu exact, les horaires et les
            éventuels frais de livraison ou de restitution sont à convenir avec AlloDriver lors de
            la confirmation.
          </p>
        </details>
        <details>
          <summary>
            Comment mettre mon véhicule en location ?<span aria-hidden="true">+</span>
          </summary>
          <p>
            Utilisez le bouton « Devenir propriétaire partenaire » pour contacter AlloDriver.
            L’équipe vous présentera les conditions et les démarches nécessaires pour proposer votre
            voiture.
          </p>
        </details>
      </div>
    </section>
  );
}
