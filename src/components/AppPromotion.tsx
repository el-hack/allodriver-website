import Image from "next/image";

export function AppPromotion() {
  return (
    <section className="app-section section wrap" id="application" aria-labelledby="app-title">
      <div className="app-copy">
        <h2 id="app-title">
          La prochaine étape
          <br /> est déjà
          <br /> <em>dans votre main.</em>
        </h2>
        <p>
          Retrouvez AlloDriver sur votre téléphone. Explorez les véhicules, consultez les offres et
          poursuivez votre réservation dans l’application.
        </p>
        <div className="store-links">
          <a
            href="https://apps.apple.com/ci/app/allo-driver/id6471352377"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AlloDriver sur l’App Store, nouvel onglet"
          >
            <Image
              src="/assets/app-store.svg"
              alt="Télécharger dans l’App Store"
              width={140}
              height={46}
              loading="lazy"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.app.alloDriver&hl=fr_CA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AlloDriver sur Google Play, nouvel onglet"
          >
            <Image
              src="/assets/google-play.svg"
              alt="Disponible sur Google Play"
              width={154}
              height={46}
              loading="lazy"
            />
          </a>
        </div>
        <span className="app-availability">Disponible sur iOS et Android.</span>
      </div>
      <div className="app-visual">
        <div className="app-screenshot app-back">
          <Image
            src="/assets/app-reserve.png"
            width={392}
            height={696}
            alt="Capture officielle de présentation de l’application AlloDriver"
            loading="lazy"
          />
        </div>
        <div className="app-screenshot app-front">
          <Image
            src="/assets/app-detail.png"
            width={392}
            height={696}
            alt="Capture officielle de la liste de véhicules dans l’application AlloDriver"
            loading="lazy"
          />
        </div>
        <p>Captures officielles de l’application · visuels de présentation</p>
      </div>
    </section>
  );
}
