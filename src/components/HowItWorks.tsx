export function HowItWorks() {
  return (
    <section className="how section wrap" id="fonctionnement" aria-labelledby="how-title">
      <div className="section-heading">
        <div>
          <h2 id="how-title">
            Une envie de partir.
            <br /> Un parcours tout simple.
          </h2>
        </div>
        <a href="#recherche" className="underlined-link">
          Préparer ma location <span aria-hidden="true">↗</span>
        </a>
      </div>
      <ol className="steps">
        <li>
          <span>01</span>
          <h3>Trouvez votre voiture.</h3>
          <p>Explorez les catégories et choisissez le modèle qui correspond à votre trajet.</p>
        </li>
        <li>
          <span>02</span>
          <h3>Précisez votre voyage.</h3>
          <p>Indiquez le lieu souhaité et vos dates de départ et de retour.</p>
        </li>
        <li>
          <span>03</span>
          <h3>Confirmez votre location.</h3>
          <p>
            Vérifiez la disponibilité, le tarif et les conditions avec l’équipe ou dans
            l’application.
          </p>
        </li>
        <li>
          <span>04</span>
          <h3>À vous la route.</h3>
          <p>Convenez des modalités de récupération. Votre prochain chapitre peut commencer.</p>
        </li>
      </ol>
      <div className="reassurance">
        <div>
          <svg aria-hidden="true">
            <use href="#phone" />
          </svg>
          <p>
            <strong>Simple à organiser.</strong>
            <span>Vos critères réunis dans une seule demande.</span>
          </p>
        </div>
        <div>
          <svg aria-hidden="true">
            <use href="#eye" />
          </svg>
          <p>
            <strong>Le choix en connaissance de cause.</strong>
            <span>Les modalités à confirmer avant de réserver.</span>
          </p>
        </div>
        <div>
          <svg aria-hidden="true">
            <use href="#chat" />
          </svg>
          <p>
            <strong>Un contact, une conversation.</strong>
            <span>L’équipe AlloDriver pour vous accompagner.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
