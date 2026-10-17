import Image from "next/image";
import { WHATSAPP_CONTACTS, whatsappURL } from "@/lib/contact";
import { InfoDialog } from "./InfoDialog";

export function SiteFooter() {
  return (
    <footer id="contact">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <a className="brand" href="#accueil" aria-label="AlloDriver, retour à l’accueil">
            <Image
              src="/assets/logo.png"
              width={1345}
              height={351}
              alt="allodriver"
              loading="lazy"
            />
          </a>
          <p>
            La location de véhicules en Côte d’Ivoire.
            <br /> Votre trajet commence par un choix.
          </p>
          <span className="country">
            <i></i> Côte d’Ivoire
          </span>
        </div>
        <div>
          <h3>Votre prochaine route</h3>
          <a href="#vehicules">Explorer les véhicules</a>
          <a href="#fonctionnement">Comment ça marche</a>
          <a href="#proprietaires">Devenir propriétaire</a>
          <a href="#application">L’application AlloDriver</a>
        </div>
        <div>
          <h3>Restons en contact</h3>
          <a href="tel:+2250707709058">+225 07 07 70 90 58</a>
          {WHATSAPP_CONTACTS.map((contact) => (
            <a
              key={contact.number}
              href={whatsappURL(contact.number)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {contact.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
          <a href="tel:+2252724577807">+225 27 24 57 78 07</a>
          <p>
            Lun. – Ven. : 8 h – 20 h<br /> Samedi : 9 h – 15 h
          </p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © <span>{new Date().getFullYear()}</span> AlloDriver.
        </span>
        <InfoDialog />
        <a href="#accueil">Retour en haut ↑</a>
      </div>
    </footer>
  );
}
