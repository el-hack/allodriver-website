import Image from "next/image";
import { PRIMARY_WHATSAPP_NUMBER, whatsappURL } from "@/lib/contact";

export function Owners() {
  return (
    <section className="owners" id="proprietaires" aria-labelledby="owners-title">
      <div className="owner-image">
        <Image
          src="/assets/mercedes.jpg"
          width={1400}
          height={2100}
          alt="Détail d’une Mercedes, photographie d’illustration"
          loading="lazy"
        />
      </div>
      <div className="owner-content">
        <h2 id="owners-title">
          Votre voiture.
          <br /> De nouvelles
          <br /> possibilités.
        </h2>
        <p>
          Elle reste au garage ? Donnez-lui une autre utilité. Proposez votre véhicule à la location
          et rejoignez l’aventure AlloDriver.
        </p>
        <a
          className="button button-dark"
          href={whatsappURL(
            PRIMARY_WHATSAPP_NUMBER,
            "Bonjour AlloDriver, je souhaite connaître les conditions pour proposer mon véhicule à la location.",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Devenir propriétaire partenaire <span aria-hidden="true">↗</span>
        </a>
        <div className="owner-detail">
          <span>Parlons de votre véhicule.</span>
          <span>Vous gardez la main sur votre décision.</span>
        </div>
      </div>
    </section>
  );
}
