import test from "node:test";
import assert from "node:assert/strict";
import {
  parseDate,
  addDays,
  validateSearch,
  rentalDays,
  inquiryURL,
  dateInAbidjan,
} from "../src/lib/booking.ts";
import { VEHICLES, filterVehicles } from "../src/lib/catalog.ts";
import { WHATSAPP_CONTACTS, whatsappURL } from "../src/lib/contact.ts";

test("calendar validation rejects impossible, past and reversed dates", () => {
  assert.equal(parseDate("2026-02-30"), null);
  assert.equal(parseDate("invalid"), null);
  const search = { place: "Abidjan", start: "2026-10-11", end: "2026-10-14" };
  assert.equal(validateSearch(search, "2026-10-11"), null);
  assert.equal(validateSearch(search, "2026-10-12")?.field, "start");
  assert.equal(validateSearch({ ...search, end: search.start }, "2026-10-11")?.field, "end");
  assert.equal(validateSearch({ ...search, place: "   " }, "2026-10-11")?.field, "place");
});

test("duration uses calendar days across months and leap years", () => {
  assert.equal(rentalDays("2028-02-28", "2028-03-01"), 2);
  assert.equal(rentalDays("2026-10-31", "2026-11-02"), 2);
  assert.equal(rentalDays("2026-10-31", "2026-10-30"), null);
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(dateInAbidjan(new Date("2026-10-11T23:30:00Z")), "2026-10-11");
});

test("filters compose and sorting does not mutate the catalogue", () => {
  const original = VEHICLES.map((v) => v.id);
  assert.deepEqual(
    filterVehicles(VEHICLES, { category: "familiale", maxPrice: 50000 }).map((v) => v.id),
    ["toyota-rav4"],
  );
  assert.deepEqual(
    filterVehicles(VEHICLES, { category: "suv", maxPrice: 40000 }).map((v) => v.id),
    ["suzuki-fronx"],
  );
  assert.deepEqual(
    filterVehicles(VEHICLES, { category: "suv", maxPrice: 50000 }).map((v) => v.id),
    ["suzuki-fronx", "bestune-t55", "toyota-rav4"],
  );
  assert.equal(filterVehicles(VEHICLES, { category: "premium", maxPrice: 30000 }).length, 0);
  assert.deepEqual(
    filterVehicles(VEHICLES, { sort: "price-desc" }).map((v) => v.price),
    [90000, 70000, 50000, 45000, 40000, 25000],
  );
  assert.deepEqual(
    VEHICLES.map((v) => v.id),
    original,
  );
});

test("Suzuki Fronx inquiry uses the communicated daily rate without calling it a demo", () => {
  const vehicle = VEHICLES.find((item) => item.id === "suzuki-fronx");
  assert.ok(vehicle);
  assert.equal(vehicle.price, 40000);
  const url = new URL(
    inquiryURL(vehicle, { place: "Abidjan", start: "2026-10-13", end: "2026-10-15" }),
  );
  const message = url.searchParams.get("text");
  assert.match(message ?? "", /40\s?000 FCFA par jour/u);
  assert.ok(!message?.includes("catalogue de démonstration"));
});

test("Bestune T55 keeps the provided price and all three photos", () => {
  const vehicle = VEHICLES.find((item) => item.id === "bestune-t55");
  assert.ok(vehicle);
  assert.equal(vehicle.name, "Bestune T55");
  assert.equal(vehicle.price, 50000);
  assert.equal(vehicle.additionalImages?.length, 2);
  const url = new URL(
    inquiryURL(vehicle, { place: "Abidjan", start: "2026-10-13", end: "2026-10-15" }),
  );
  assert.match(url.searchParams.get("text") ?? "", /50\s?000 FCFA par jour/u);
});

test("WhatsApp draft preserves user text and discloses the illustrative catalogue", () => {
  const search = { place: "Cocody & Riviera #2", start: "2026-10-12", end: "2026-10-15" };
  const illustrativeVehicle = VEHICLES.find((item) => item.source === "illustrative");
  assert.ok(illustrativeVehicle);
  const url = new URL(inquiryURL(illustrativeVehicle, search));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/2250707709057");
  const message = url.searchParams.get("text");
  assert.ok(message?.includes(search.place));
  assert.ok(message?.includes("catalogue de démonstration"));
  assert.ok(message?.includes("tarif réel"));
  assert.equal(url.hash, "");
});

test("both WhatsApp contacts receive the same booking draft", () => {
  const vehicle = VEHICLES.find((item) => item.id === "suzuki-fronx");
  assert.ok(vehicle);
  const search = { place: "Abidjan", start: "2026-10-13", end: "2026-10-15" };
  const drafts = WHATSAPP_CONTACTS.map(
    (contact) => new URL(inquiryURL(vehicle, search, contact.number)),
  );
  assert.deepEqual(
    drafts.map((url) => url.pathname),
    ["/2250707709057", "/2250707709058"],
  );
  assert.equal(drafts[0].searchParams.get("text"), drafts[1].searchParams.get("text"));
  assert.equal(whatsappURL(WHATSAPP_CONTACTS[1].number), "https://wa.me/2250707709058");
});
