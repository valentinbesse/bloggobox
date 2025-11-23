# Bloggobox — Monorepo

Bloggobox est un projet full-stack moderne conçu pour apprendre, expérimenter et maîtriser :
→ SvelteKit, Hono, TypeScript strict, Drizzle ORM, PostgreSQL, TDD, CI/CD GitHub Actions, et Docker.

Il propose un blog public (SSR) et une interface d’administration, ainsi qu’une API entièrement séparée.

## ✨ Fonctionnalités

### 📰 Blog (Frontend)
- Pages SSR (liste des articles, pages d’article)
- Formulaire de commentaire (géré via API backend)
- Tracking analytics léger (page views + sessionId)

### 🔐 Admin (Frontend + Backend)
- Auth admin simple (email + mot de passe hashé en env)
- Création / édition / suppression d’articles
- Modération des commentaires (pending | approved | rejected)
- Dashboard statistiques

### ⚙️ Backend (API REST)
- API Hono rapide et typée
- Drizzle ORM + PostgreSQL
- Auth avec cookies signés
- Endpoints :
  - '/articles'
  - '/comments'
  - '/auth/login'
  - '/analytics/events'
- Validation stricte (Zod ou Valibot recommandé)

## 🧱 Architecture du monorepo

``` tree
/bloggobox
  /frontend              → SvelteKit (SSR + pages + admin UI)
    src/
      routes/
      lib/
        api/            → wrappers fetch vers backend
        auth/
        types/
  /backend               → API Hono + Drizzle ORM
    src/
      app.ts            → définition API
      routes/
      lib/
        db/             → Drizzle config + schema
        auth/
        utils/
  /packages              → libs partagées (types, schemas)
  /infra                 → Docker, compose, CI/CD
  package.json           → pnpm workspace
  README.md


```

## ⚙️ Stack technique

### 🎨 Frontend (UI)
- SvelteKit
- SSR activé
- Pages public + admin
- Fetch API vers backend
- TypeScript strict

### ⚡ Backend (API)
- Hono (framework ultra-rapide)
- Endpoints REST
- Validation (Zod/Valibot)
- Cookies signés pour la session admin

### 🗄 Base de données
- PostgreSQL
- Drizzle ORM
  - Migrations type-safe
  - Typed queries
  - Schemas dans `/backend/src/lib/db/schema.ts`

### 🧪 Tests
- Vitest (unit)
- Playwright (E2E léger)
- Backend testé séparément (unit + integration)

### 🔄 CI/CD
- GitHub Actions :
  - Lint
  - Tests (Vitest + Playwright)
  - Build frontend
  - Build backend
  - Build images Docker
  - Push GHCR
- Déploiement : Render / Railway

### 🐳 Conteneurs
- `docker-compose.dev`
  - frontend
  - backend
  - postgres
  - pgAdmin
- `Dockerfile.frontend` (prod)
- `Dockerfile.backend` (prod)

## 🚀 Démarrer le projet

### 1) Installer les dépendances
``` bash
pnpm install
```

### 2) Lancer l’environnement de développement
``` bash
docker compose up --build
```

Services disponibles :
- Frontend → http://localhost:5173
- Backend → http://localhost:3001
- Postgres → port 5432
- pgAdmin → port 5050

## 🔐 Configuration

### Frontend `.env` (dans /frontend)
``` ini
PUBLIC_BACKEND_URL=http://localhost:3001
```

### Backend `.env` (dans /backend)
``` ini
DATABASE_URL=postgres://postgres:password@postgres:5432/bloggobox
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=$argon2id$...
COOKIE_SECRET=long-random-string
```

Générer un hash :
``` bash
pnpm dlx bunx argon2-cli "monmotdepasse"
```

## 📦 Base de données & Migrations

Depuis `/backend` :
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

## 🧪 Lancer les tests
Tests unitaires
``` bash
pnpm test
```

Tests E2E (Playwright)
``` bash
pnpm exec playwright test
``` 

## 🌐 API (Backend)

Exemple d’endpoint Hono
``` ts
app.get('/articles', async (c) => {
  const list = await db.select().from(articles)
  return c.json(list)
})
```

Exemple frontend : appel API
``` ts
const res = await fetch(`${PUBLIC_BACKEND_URL}/articles`)
const articles = await res.json()
```

## 🚢 CI/CD GitHub Actions (résumé)

### 1). CI
- pnpm install
- pnpm lint
- pnpm test
- pnpm build frontend
- pnpm build backend
- build images Docker

### 2). CD
- push vers GHCR
- déploiement Railway/Render

## 🛣️ Roadmap perso

- [ ] Auth admin par token plus robuste
- [ ] Ajout du brouillon/draft pour articles
- [ ] Dashboard analytics amélioré
- [ ] Recherche d’articles full-text (PG trigram)
- [ ] Système de tags/catégories
- [ ] Réécriture CLI pour importer/exporter données
- [ ] Monitoring via Grafana