# AlloDriver — Next.js

Projet source complet de la landing page AlloDriver, avec le design arrondi : orange et logo d’origine, photos automobiles, catalogue interactif, recherche, fiches et FAQ.

## Stack

- Next.js 16, App Router.
- React 19 et TypeScript en mode strict.
- CSS classique, responsive et animations respectant la réduction des mouvements.
- `next/image` pour les images et `next/font/local` pour Manrope.
- Tests unitaires avec le runner natif de Node.js.

Le projet utilise exclusivement NPM. Les versions exactes installées sont verrouillées
dans `package-lock.json`.

## Lancer le projet

Node.js 24 LTS est requis (`.nvmrc` fourni), avec NPM 11. Les installations effectuées
avec une autre version sont volontairement refusées afin de garder des builds identiques
en local, en CI et en production.

```sh
npm ci
npm run dev
```

Ouvrir http://localhost:3000, ou l’adresse indiquée dans le terminal. Aucun fichier `.env` ni compte externe n’est requis pour la démonstration.

## Vérifier et compiler

```sh
npm run typecheck
npm test
npm run build
npm start
```

`npm start` sert la compilation de production. Il faut exécuter `npm run build` auparavant. Les fichiers générés se trouvent dans `.next/`, qui n’est pas inclus dans l’archive source.

```sh
npm run format
npm run format:check
```

## Structure

```text
allodriver-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Métadonnées, langue, police locale
│   │   ├── page.tsx         # Composition de la page
│   │   └── globals.css     # Design et responsive
│   ├── components/
│   │   ├── Hero.tsx, Owners.tsx, Faq.tsx, ...
│   │   ├── SiteHeader.tsx  # Menu mobile accessible
│   │   ├── Modal.tsx       # Dialogue natif, focus et portail
│   │   └── rental/
│   │       ├── RentalProvider.tsx
│   │       ├── RentalFields.tsx
│   │       ├── SearchForm.tsx
│   │       ├── VehicleCatalogue.tsx
│   │       ├── VehicleCard.tsx
│   │       ├── VehicleDialog.tsx
│   │       └── Occasions.tsx
│   └── lib/
│       ├── catalog.ts      # Catalogue typé, filtres et tri
│       └── booking.ts      # Dates, validation, simulation et lien WhatsApp
├── public/assets/          # Images, logo, captures et polices
├── tests/booking.test.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .nvmrc
├── .gitignore
├── .prettierrc.json
├── ASSETS.md
└── README.md
```

## Architecture

`page.tsx` et les sections de présentation sont des Server Components. Le menu, les formulaires, les filtres et les dialogues sont des Client Components. Un contexte React limité au parcours de location partage les critères et le véhicule sélectionné ; le catalogue filtré et l’estimation sont dérivés de cet état.

Les règles métier sont des fonctions pures TypeScript, séparées du DOM et testées. Les formulaires réutilisent les mêmes champs et la même validation. Les dates par défaut sont initialisées après l’hydratation pour rester justes au jour de consultation, sans divergence entre le HTML initial et React.

Les dialogues natifs gèrent le confinement du focus. Leur portail évite les effets des styles du footer. Échap, clic sur le fond et fermeture restaurent le focus sur le déclencheur. Les effets ajoutant des événements sont nettoyés au démontage.

Aucun HTML saisi par le visiteur n’est injecté : React échappe le contenu, et le texte du brouillon est encodé dans son URL.

## Modifier le contenu

- Titres, textes et liens : composants de présentation dans `src/components/`.
- Couleurs et arrondis : variables de `src/app/globals.css`.
- Catalogue, catégories, tarifs et photos : `src/lib/catalog.ts`.
- Dates, validation et numéro WhatsApp du brouillon : `src/lib/booking.ts`.
- Logo, images et polices : `public/assets/`.
- Titre de la page, description et indexation : `src/app/layout.tsx`.

## Fonctionnalités

- Recherche par lieu, dates et validation de la chronologie.
- Filtres combinés, budgets, tri et remise à zéro après un résultat vide.
- Fiche de véhicule avec simulation selon les jours calendaires.
- Brouillon WhatsApp à relire et envoyer manuellement ; modifier un champ invalide le brouillon précédent.
- Menu mobile, FAQ, informations et accès aux stores officiels.

## Catalogue de démonstration

Les modèles, configurations et tarifs sont illustratifs. Les photographies ne représentent pas un stock vérifié. Le site ne vérifie aucune disponibilité, ne confirme aucune réservation et n’encaisse aucun paiement. Les indications de démonstration sont conservées dans le catalogue, les fiches et le brouillon.

Une utilisation commerciale avec réservation nécessite un inventaire, une API et les règles contractuelles réelles d’AlloDriver. Aucun backend de réservation fictif n’est fourni. Les métadonnées restent en `noindex` tant que ces éléments ne sont pas intégrés.

## Déploiement

Ce projet peut être déployé sur Vercel ou sur un hébergement Node.js 24 compatible avec
Next.js. Utiliser `npm ci`, puis `npm run build` et `npm start`. La configuration courante
utilise le runtime Next.js et son optimisation d’images. Elle ne correspond pas à un simple
dossier statique à déposer par FTP.

La livraison de cette archive ne remplace pas la version de démonstration déjà hébergée avec Sites. Les ressources sont locales ; aucun appel réseau à Google Fonts n’est nécessaire au lancement ou à la compilation.

Documentation officielle : https://nextjs.org/docs/app/getting-started/installation.
Sources et licences des ressources : voir `ASSETS.md`.
