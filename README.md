# Bloggobox — Monorepo

Bloggobox est un projet personnel visant à créer un blog moderne accompagné d’une interface d’administration permettant :
- de publier, modifier et supprimer des articles ;
- de modérer des commentaires ;
- d’obtenir des statistiques personnalisées ;
- d’apprendre et pratiquer le TypeScript, TDD, la CI/CD et la conteneurisation.

Ce dépôt utilise une architecture monorepo pour regrouper le backend, le frontend, et des packages partagés.

## 🗂️ Structure du monorepo

``` tree
bloggobox/
├── backend/
│   ├── src/
│   │   ├── app/               # Services, usecases
│   │   ├── domain/            # Entités, modèles, interfaces
│   │   ├── infra/             # DB, API externes, adapters
│   │   └── main.ts            # Entrée applicative
│   ├── tests/                 # Tests unitaires
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   ├── tests/
│   └── package.json
│
├── shared/                    # Code partagé entre front et back
│   ├── models/                # Types communs (Post, Comment…)
│   ├── utils/                 # Fonctions réutilisables
│   ├── schemas/               # Validation (ex: Zod)
│   └── package.json
│
├── infra/                     # Scripts et configuration d'infrastructure
│   ├── docker/
│   ├── scripts/
│   └── ci/
│
├── .github/
│   └── workflows/             # GitHub Actions (CI/CD)
│
├── package.json               # Config racine (ESLint, Prettier…)
├── pnpm-workspace.yaml        # Configuration monorepo (pnpm)
├── docker-compose.yml         # Stack de développement
└── README.md

```

## 🧰 Technologies principales

### Backend
- TypeScript
- Framework au choix (Express, Hono, Deno Fresh, à définir)
- Architecture modulaire (domain / app / infra)
- Tests unitaires (TDD)

### Frontend
- Framework au choix (Next.js, SvelteKit ou autre)
- UI minimaliste et sobre
- Tests frontend

### Shared
- Typescript partagé
- Modèles, DTO, schémas (Zod recommandé)

- Outils
- pnpm workspaces pour une gestion monorepo rapide et efficace
- Docker pour un environnement reproductible
- GitHub Actions pour CI/CD
- ESLint + Prettier pour garder un code propre
- TDD-first pour encourager la qualité logicielle

## 🚀 Installation

1️⃣ Installer les dépendances
``` bash
pnpm install
```

2️⃣ Lancer le backend
``` bash
pnpm --filter backend dev
```

3️⃣ Lancer le frontend
``` bash
pnpm --filter frontend dev
```

4️⃣ Lancer tous les tests
``` bash
pnpm -w test
```

## 🧪 TDD & Tests

La philosophie du projet est d’intégrer les tests dès le début :
- chaque module est isolé pour être facilement testable ;
- des dossiers dédiés (tests/) existent dans chaque package ;
- exécution test globale via : pnpm -w test.

## 🛠️ Scripts utiles

Dans `package.json` racine :
``` json
{
  "scripts": {
    "dev": "echo \"Lancer chaque app individuellement\"",
    "test": "pnpm -r test",
    "lint": "eslint ."
  }
}
````

## 📦 Conteneurisation
Le fichier `docker-compose.yml` facilite :
- le lancement de l’environnement backend ;
- la base de données ;
- potentiellement un reverse proxy ou un service de storage local.

## 📈 CI/CD
Dans `.github/workflows` :
- build et test pour chaque package ;
- pipeline optimisée par workspace ;
- déploiement séparé du front et du back (à venir).

## 📝 Roadmap
- [ ] Implémentation backend (CRUD articles, modération)
- [ ] UI administration minimaliste
- [ ] Page publique du blog
- [ ] Analytics custom
- [ ] Pipeline CI/CD complète
- [ ] Déploiement Docker