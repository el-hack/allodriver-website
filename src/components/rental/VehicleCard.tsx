import Image from "next/image";
import { money, type Vehicle } from "@/lib/catalog";

export function VehicleCard({ vehicle, onSelect }: { vehicle: Vehicle; onSelect: () => void }) {
  return (
    <article className="vehicle-card">
      <button
        className="vehicle-photo"
        type="button"
        aria-label={`Découvrir ${vehicle.name}`}
        onClick={onSelect}
      >
        <Image
          src={vehicle.image}
          width={1000}
          height={740}
          sizes="(max-width: 700px) 90vw, (max-width: 1150px) 45vw, 25vw"
          alt={vehicle.imageAlt ?? `${vehicle.name}, photographie d’illustration`}
          style={{ objectPosition: vehicle.position }}
        />
        <span className="vehicle-category">{vehicle.category}</span>
        <span className="photo-action" aria-hidden="true">
          ↗
        </span>
      </button>
      <div className="vehicle-heading">
        <h3>{vehicle.name}</h3>
      </div>
      <p className="vehicle-use">{vehicle.use}</p>
      <ul className="vehicle-specs">
        {vehicle.seats && <li>{vehicle.seats} places</li>}
        <li>{vehicle.transmission}</li>
        {vehicle.fuel && <li>{vehicle.fuel}</li>}
      </ul>
      <div className="vehicle-bottom">
        <p>
          <strong>{money(vehicle.price)}</strong>
          <span>
            {" "}
            FCFA <small>/ jour</small>
          </span>
        </p>
        <button
          className="vehicle-details"
          type="button"
          aria-label={`Voir le modèle ${vehicle.name}`}
          onClick={onSelect}
        >
          Voir le modèle <span aria-hidden="true">↗</span>
        </button>
      </div>
      <span className="illustrative-rate">
        {vehicle.source === "provided" ? "Tarif communiqué" : "Tarif illustratif"}
      </span>
    </article>
  );
}
