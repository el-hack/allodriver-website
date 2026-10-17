import { addDays, parseDate, type RentalSearch, type SearchError } from "@/lib/booking";

interface RentalFieldsProps {
  value: RentalSearch;
  onChange: (next: RentalSearch) => void;
  today: string;
  error: SearchError | null;
  variant: "search" | "dialog";
}

/** Shared input rules keep date constraints and accessible errors consistent. */
export function RentalFields({ value, onChange, today, error, variant }: RentalFieldsProps) {
  const prefix = variant === "dialog" ? "inquiry" : "search";
  const minEnd = parseDate(value.start) !== null ? addDays(value.start, 1) : today;
  const input = (field: keyof RentalSearch) => (
    <input
      id={`${prefix}-${field}`}
      name={field}
      value={value[field]}
      required
      type={field === "place" ? "text" : "date"}
      min={field === "start" ? today : field === "end" ? minEnd : undefined}
      maxLength={field === "place" ? 100 : undefined}
      placeholder={field === "place" ? "Ville, quartier ou aéroport" : undefined}
      autoComplete={field === "place" ? "off" : undefined}
      aria-invalid={error?.field === field || undefined}
      aria-describedby={error?.field === field ? `${prefix}-error` : undefined}
      onChange={(event) => onChange({ ...value, [field]: event.target.value })}
    />
  );
  const label = (field: keyof RentalSearch, text: string) => (
    <label htmlFor={`${prefix}-${field}`}>
      {variant === "search" && (
        <svg aria-hidden="true">
          <use href={field === "place" ? "#pin" : "#calendar"} />
        </svg>
      )}
      {text}
    </label>
  );

  if (variant === "search")
    return (
      <>
        <div className="search-field place-field">
          {label("place", "Lieu de récupération souhaité")}
          {input("place")}
        </div>
        <div className="search-field">
          {label("start", "Départ")}
          {input("start")}
        </div>
        <div className="search-field">
          {label("end", "Retour")}
          {input("end")}
        </div>
      </>
    );
  return (
    <>
      <div>
        {label("place", "Lieu de récupération souhaité")}
        {input("place")}
      </div>
      <div className="dialog-dates">
        <div>
          {label("start", "Départ")}
          {input("start")}
        </div>
        <div>
          {label("end", "Retour")}
          {input("end")}
        </div>
      </div>
    </>
  );
}

export function focusInvalidField(form: HTMLFormElement, error: SearchError) {
  const input = form.elements.namedItem(error.field);
  if (input instanceof HTMLInputElement) input.focus();
}
