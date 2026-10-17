export type Category = "all" | "citadine" | "berline" | "suv" | "familiale" | "premium";
export type SortOrder = "editorial" | "price-asc" | "price-desc";
export interface Vehicle {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly price: number;
  readonly seats?: number;
  readonly transmission: string;
  readonly fuel?: string;
  readonly image: string;
  readonly imageAlt?: string;
  readonly additionalImages?: readonly { readonly src: string; readonly alt: string }[];
  readonly source: "provided" | "illustrative";
  readonly position: string;
  readonly description: string;
  readonly use: string;
}
export interface VehicleFilters {
  category?: Category;
  maxPrice?: number;
  sort?: SortOrder;
}

/** User-provided listings and editorial examples. Availability is always confirmed by AlloDriver. */
export const CATALOG_NOTICE =
  "Les véhicules signalés par « Tarif communiqué » utilisent les photos et prix transmis pour cette page. Les autres modèles et tarifs sont illustratifs. Disponibilité et conditions à confirmer auprès d’AlloDriver.";
export const VEHICLES: readonly Vehicle[] = Object.freeze(
  (
    [
      {
        id: "suzuki-fronx",
        name: "Suzuki Fronx",
        category: "SUV",
        tags: ["suv"],
        price: 40000,
        transmission: "Automatique",
        image: "/assets/suzuki-fronx-rear.jpg",
        imageAlt: "Vue arrière de la Suzuki Fronx noire proposée par AlloDriver",
        additionalImages: [
          {
            src: "/assets/suzuki-fronx-interior.jpg",
            alt: "Habitacle et boîte automatique de la Suzuki Fronx",
          },
        ],
        source: "provided",
        position: "50% 50%",
        description:
          "Suzuki Fronx noire avec boîte automatique. Photos du véhicule et tarif communiqués par AlloDriver.",
        use: "Un SUV compact pour vos déplacements.",
      },
      {
        id: "bestune-t55",
        name: "Bestune T55",
        category: "SUV",
        tags: ["suv"],
        price: 50000,
        transmission: "Automatique",
        image: "/assets/bestune-t55-side.jpg",
        imageAlt: "Vue de profil de la Bestune T55 noire proposée à la location",
        additionalImages: [
          { src: "/assets/bestune-t55-front.jpg", alt: "Vue avant de la Bestune T55 noire" },
          {
            src: "/assets/bestune-t55-interior.jpg",
            alt: "Habitacle et boîte automatique de la Bestune T55",
          },
        ],
        source: "provided",
        position: "50% 50%",
        description:
          "Bestune T55 noire à boîte automatique. Photos du véhicule et tarif communiqués pour cette page.",
        use: "De l’espace pour vos trajets.",
      },
      {
        id: "peugeot-208",
        name: "Peugeot 208",
        category: "Citadine",
        tags: ["citadine"],
        price: 25000,
        seats: 5,
        transmission: "Manuelle",
        fuel: "Essence",
        image: "/assets/peugeot.jpg",
        source: "illustrative",
        position: "50% 65%",
        description: "Une silhouette compacte pour les journées qui ne tiennent pas en place.",
        use: "L’essentiel, avec du caractère.",
      },
      {
        id: "toyota-rav4",
        name: "Toyota RAV4",
        category: "SUV",
        tags: ["suv", "familiale"],
        price: 45000,
        seats: 5,
        transmission: "Automatique",
        fuel: "Essence",
        image: "/assets/rav4.jpg",
        source: "illustrative",
        position: "50% 60%",
        description:
          "De l’espace pour vos proches, vos bagages et les détours qui valent le voyage.",
        use: "L’espace pour voir plus grand.",
      },
      {
        id: "mercedes-classe-c",
        name: "Mercedes Classe C",
        category: "Berline premium",
        tags: ["berline", "premium"],
        price: 70000,
        seats: 5,
        transmission: "Automatique",
        fuel: "Essence",
        image: "/assets/mercedes.jpg",
        source: "illustrative",
        position: "50% 56%",
        description: "Une présence affirmée pour donner une autre dimension à vos déplacements.",
        use: "Le sens du détail.",
      },
      {
        id: "range-rover-velar",
        name: "Range Rover Velar",
        category: "SUV premium",
        tags: ["suv", "familiale", "premium"],
        price: 90000,
        seats: 5,
        transmission: "Automatique",
        fuel: "Diesel",
        image: "/assets/velar.jpg",
        source: "illustrative",
        position: "50% 64%",
        description:
          "Des lignes épurées, une allure singulière. Pour faire du trajet un moment à part.",
        use: "Une autre idée du voyage.",
      },
    ] satisfies Vehicle[]
  ).map((vehicle) =>
    Object.freeze({
      ...vehicle,
      tags: Object.freeze(vehicle.tags),
      additionalImages: vehicle.additionalImages
        ? Object.freeze(vehicle.additionalImages.map((image) => Object.freeze(image)))
        : undefined,
    }),
  ),
);

export function filterVehicles(
  vehicles: readonly Vehicle[],
  { category = "all", maxPrice = Infinity, sort = "editorial" }: VehicleFilters = {},
): Vehicle[] {
  const selection = vehicles.filter(
    (vehicle) =>
      (category === "all" || vehicle.tags.includes(category)) && vehicle.price <= maxPrice,
  );
  if (sort === "price-asc") selection.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") selection.sort((a, b) => b.price - a.price);
  return selection;
}

export const money = (value: number) =>
  new Intl.NumberFormat("fr-CI", { maximumFractionDigits: 0 }).format(value);
