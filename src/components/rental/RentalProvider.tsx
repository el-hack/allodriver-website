"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { addDays, dateInAbidjan, type RentalSearch } from "@/lib/booking";
import type { Category, SortOrder, Vehicle } from "@/lib/catalog";

interface RentalContextValue {
  search: RentalSearch;
  setSearch: Dispatch<SetStateAction<RentalSearch>>;
  committed: RentalSearch | null;
  setCommitted: Dispatch<SetStateAction<RentalSearch | null>>;
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
  budget: number;
  setBudget: Dispatch<SetStateAction<number>>;
  sort: SortOrder;
  setSort: Dispatch<SetStateAction<SortOrder>>;
  openVehicle: (vehicle: Vehicle) => void;
  selected: Vehicle | null;
  closeVehicle: () => void;
  today: string;
}

const RentalContext = createContext<RentalContextValue | null>(null);

export function defaultSearch(): RentalSearch {
  const today = dateInAbidjan();
  return { place: "Abidjan", start: addDays(today, 1), end: addDays(today, 4) };
}

export function scrollToCatalogue() {
  document.getElementById("vehicules")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });
}

export function RentalProvider({ children }: { children: ReactNode }) {
  // Identical server/client first render; dates are computed in Abidjan after hydration.
  const [search, setSearch] = useState<RentalSearch>({ place: "Abidjan", start: "", end: "" });
  const [today, setToday] = useState("");
  const [committed, setCommitted] = useState<RentalSearch | null>(null);
  const [category, setCategory] = useState<Category>("all");
  const [budget, setBudget] = useState(Infinity);
  const [sort, setSort] = useState<SortOrder>("editorial");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  useEffect(() => {
    setSearch(defaultSearch());
    setToday(dateInAbidjan());
  }, []);

  return (
    <RentalContext.Provider
      value={{
        search,
        setSearch,
        committed,
        setCommitted,
        category,
        setCategory,
        budget,
        setBudget,
        sort,
        setSort,
        openVehicle: setSelected,
        selected,
        closeVehicle: () => setSelected(null),
        today,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (!context) throw new Error("Rental components require RentalProvider");
  return context;
}
