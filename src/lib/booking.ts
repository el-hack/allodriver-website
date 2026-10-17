import type { Vehicle } from "./catalog.ts";
import { PRIMARY_WHATSAPP_NUMBER, whatsappURL, type WhatsAppNumber } from "./contact.ts";

export interface RentalSearch {
  place: string;
  start: string;
  end: string;
}
export interface SearchError {
  field: keyof RentalSearch;
  message: string;
}

const DAY_MS = 86400000;

export function dateInAbidjan(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Abidjan",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)!.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value
    ? timestamp
    : null;
}

export function addDays(value: string, days: number) {
  const timestamp = parseDate(value);
  if (timestamp === null) throw new TypeError("Invalid calendar date");
  return new Date(timestamp + days * DAY_MS).toISOString().slice(0, 10);
}

export function validateSearch(
  { place, start, end }: RentalSearch,
  today = dateInAbidjan(),
): SearchError | null {
  if (!place.trim() || place.trim().length > 100)
    return {
      field: "place",
      message: "Indiquez un lieu de récupération (100 caractères maximum).",
    };
  if (parseDate(start) === null)
    return { field: "start", message: "Choisissez une date de départ valide." };
  if (start < today)
    return { field: "start", message: "La date de départ ne peut pas être passée." };
  if (parseDate(end) === null || end <= start)
    return { field: "end", message: "Le retour doit être au moins un jour après le départ." };
  return null;
}

export function rentalDays(start: string, end: string) {
  const first = parseDate(start);
  const last = parseDate(end);
  if (first === null || last === null || last <= first) return null;
  return (last - first) / DAY_MS;
}

export function formatDate(value: string) {
  const timestamp = parseDate(value);
  if (timestamp === null) return "";
  return new Intl.DateTimeFormat("fr-CI", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(timestamp);
}

/** Opens a draft only. The visitor reviews and sends it from WhatsApp. */
export function inquiryURL(
  vehicle: Vehicle,
  search: RentalSearch,
  number: WhatsAppNumber = PRIMARY_WHATSAPP_NUMBER,
) {
  const message = [
    "Bonjour AlloDriver, je souhaite me renseigner sur une location.",
    `Modèle souhaité : ${vehicle.name}${vehicle.source === "illustrative" ? " (vu dans le catalogue de démonstration, ou véhicule similaire)" : ""}.`,
    `Lieu souhaité : ${search.place.trim()}.`,
    `Dates : du ${search.start} au ${search.end}.`,
    vehicle.source === "provided"
      ? `Tarif indiqué : ${new Intl.NumberFormat("fr-CI").format(vehicle.price)} FCFA par jour. Pouvez-vous me confirmer la disponibilité et les conditions de location ?`
      : "Pouvez-vous me confirmer les disponibilités, le tarif réel et les conditions de location ?",
  ].join("\n");
  return whatsappURL(number, message);
}
