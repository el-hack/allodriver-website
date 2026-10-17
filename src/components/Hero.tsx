import Image from "next/image";

export function Hero() {
  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="hero-photo">
        <Image
          src="/assets/velar.jpg"
          width={2000}
          height={1333}
          preload
          alt="Range Rover Velar blanc sur une route bordée de palmiers, photographie d’illustration"
        />
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content wrap">
        <h1 id="hero-title">
          À vous
          <br /> la <span>route.</span>
        </h1>
        <p className="hero-description">
          Trouvez le véhicule idéal pour vos déplacements à Abidjan et partout en Côte d’Ivoire.
        </p>
        <a href="#vehicules" className="hero-explore">
          Votre prochaine destination commence ici. <span aria-hidden="true">↓</span>
        </a>
      </div>
      <span className="photo-note">Photographie d’illustration</span>
    </section>
  );
}
