"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: MouseEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 701px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("click", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("click", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="header-inner">
        <a
          className="brand"
          href="#accueil"
          aria-label="AlloDriver, accueil"
          onClick={() => setOpen(false)}
        >
          <Image src="/assets/logo.png" width={1345} height={351} alt="allodriver" />
        </a>
        <nav
          id="navigation"
          className={`navigation${open ? " is-open" : ""}`}
          aria-label="Navigation principale"
        >
          <a href="#vehicules" onClick={() => setOpen(false)}>
            Explorer les véhicules
          </a>
          <a href="#fonctionnement" onClick={() => setOpen(false)}>
            Comment ça marche
          </a>
          <a href="#proprietaires" onClick={() => setOpen(false)}>
            Devenir propriétaire
          </a>
        </nav>
        <a
          href="#recherche"
          className="button button-gold header-book"
          onClick={() => setOpen(false)}
        >
          Réserver un véhicule <span aria-hidden="true">↗</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-controls="navigation"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
