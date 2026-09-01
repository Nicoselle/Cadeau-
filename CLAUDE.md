# CLAUDE.md — AI Assistant Guide for Cadeau-

This file provides guidance for AI assistants (Claude and others) working in this repository. It covers project context, conventions, development workflows, and important constraints.

---

## Project Overview

**Repository:** Cadeau-
**Owner:** Nicoselle
**Public product:** **Kapitaalkrant** — zelfstandige Nederlandstalige investeerderskrant
**Zusterproject:** Vesting noodvoedsel-directory op `/cadeau`
**Branch model:** Feature branches prefixed with `claude/` or `cursor/` for AI-driven work

De krant publiceert edities met stukken, een datavloer (CSV’s in `redactie/data`)
en een orakelboek. Geen beleggingsadvies. Publicatie van een nieuwe editie is
een bewuste beslissing, geen automatische feed.

Twee lagen:

- **Algemeen (open):** de krant en de nieuwsbrief. Geen client-allocatie.
- **Gespecialiseerd (dicht):** één clientlaag Safe Capital op `/safe`,
  HTTP Basic, `SAFE_PASSWORD`. Fail closed: ontbreekt of leeg het
  wachtwoord, dan 401. Geen standaardwachtwoord. Later kunnen er meer
  clients bij; nu alleen deze. Niet mergen naar productie (`koppel-zeta`).

---

## Repository Structure

```
├── src/app/                 # Next.js App Router — krant + /cadeau
│   ├── page.tsx             # Voorpagina
│   ├── stuk/[slug]/         # Stukken
│   ├── safe/                # Safe Capital, alleen ná HTTP Basic
│   ├── markten/ orakelboek/ methode/ archief/ desk/
│   └── api/v1/              # krant, stukken, markten, products
├── src/data/                # articles.ts, edition.ts, markets.ts, oracles.ts, products.ts
├── src/data/safe-capital.ts # Volglijst + mouwen A–G — niet in de open krant
├── src/middleware.ts        # /safe fail-closed
├── src/lib/series.ts        # CSV-parser en j/j-groei (alleen opgeslagen data)
├── src/components/krant/    # Masthead-hulp, tape, story-card, article-body
├── redactie/                # Bronnenstaat, dossiers, CSV-vloer, zetter.py
│   ├── INDEX.md             # Ene ingang tot de redactiemap
│   ├── data/                # FRED, Statbel, Treasury
│   └── scripts/zetter.py    # agenda / jj / dekking
└── tests/                   # newspaper, series, filtering, resilience
```

---

## Development Environment Setup

### Prerequisites

```
Node.js >= 20.x
npm >= 9.x
Python >= 3.11   # alleen voor redactie/scripts/zetter.py
```

### Initial Setup

```bash
# Clone and enter the repo
git clone <repo-url>
cd Cadeau-

# Install dependencies (update command for chosen stack)
npm install        # Node.js projects
# pip install -r requirements.txt  # Python projects
# go mod download                  # Go projects

# Copy environment template
cp .env.example .env
# Edit .env with your local values

# Run the project
npm run dev        # or equivalent
```

---

## Git Workflow

### Branch Naming

| Purpose | Pattern | Example |
|---|---|---|
| AI-driven changes | `claude/<description>-<session-id>` | `claude/add-auth-3tntr` |
| Human features | `feature/<description>` | `feature/user-dashboard` |
| Bug fixes | `fix/<description>` | `fix/login-redirect` |
| Hotfixes | `hotfix/<description>` | `hotfix/null-pointer` |

### Commit Message Convention

Use the **Conventional Commits** format:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

**Examples:**
```
feat(auth): add OAuth2 login with Google
fix(api): handle null response from payment gateway
docs: update CLAUDE.md with project structure
test(cart): add unit tests for discount calculation
```

### Push Rules

- Always push to the designated branch: `git push -u origin <branch-name>`
- Never force-push to `main` or `master`
- AI branches must follow the `claude/` prefix convention
- Open a pull request for review before merging into the main branch

---

## Development Workflows

### Running Tests

```bash
# Update these commands to match the project's test runner
npm test               # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Linting and Formatting

```bash
# Update for the project's linter/formatter
npm run lint           # Check for lint errors
npm run lint:fix       # Auto-fix lint errors
npm run format         # Format code (Prettier, Black, gofmt, etc.)
```

### Building for Production

```bash
npm run build          # Compile/bundle for production
npm run preview        # Preview the production build locally
```

---

## Code Conventions

### General Principles

1. **Simplicity first** — prefer the simplest solution that satisfies the requirement; avoid over-engineering.
2. **No dead code** — remove unused variables, imports, and functions rather than commenting them out.
3. **Fail loudly at boundaries** — validate inputs at system edges (user input, external APIs); trust internal code.
4. **No backward-compat hacks** — if something is removed, delete it; don't add shims or aliases.
5. **Three similar lines before abstracting** — avoid premature abstractions; duplicate is fine until a pattern is clear.

### Naming Conventions

> Establish and document naming conventions for the chosen language/framework here.

**Suggested defaults (adjust for your stack):**

- **Files:** `kebab-case.ts` for TypeScript/JS modules; `snake_case.py` for Python
- **Components (React/Vue/Svelte):** `PascalCase.tsx`
- **Functions/methods:** `camelCase` (JS/TS), `snake_case` (Python/Go)
- **Constants:** `SCREAMING_SNAKE_CASE`
- **Types/interfaces:** `PascalCase`
- **CSS classes:** `kebab-case` or BEM (`block__element--modifier`)

### Error Handling

- Handle errors at the point where recovery is possible, not everywhere.
- Never silently swallow errors — at minimum, log them.
- Prefer explicit error returns over exceptions where idiomatic (Go, Rust).
- Do not add error handling for impossible states.

### Security

- Never commit secrets, API keys, tokens, or passwords — use environment variables.
- Always add `.env` to `.gitignore`.
- Sanitize all user input before using in queries or rendering in HTML.
- Use parameterized queries — never string-interpolate SQL.
- Follow the principle of least privilege for service accounts and permissions.

---

## Testing Conventions

- **Unit tests:** Test individual functions/components in isolation with mocked dependencies.
- **Integration tests:** Test the interaction between modules.
- **E2E tests:** Test critical user journeys through the full stack.
- Test files should mirror the source directory structure (e.g., `src/utils/format.ts` → `tests/utils/format.test.ts`).
- Aim for meaningful coverage of business logic, not 100% line coverage for its own sake.
- Tests should be deterministic — no random data, no reliance on external services unless mocked.

---

## AI Assistant Guidelines

### What Claude Should Do

- Read the relevant files before making any changes.
- Make only the changes explicitly requested or clearly necessary.
- Follow the conventions in this document and existing code patterns.
- Commit with descriptive messages using Conventional Commits format.
- Update this CLAUDE.md when architectural or workflow decisions change.
- Prefer editing existing files over creating new ones.
- Keep solutions focused and minimal.

### What Claude Should NOT Do

- Push to `main`/`master` without explicit permission.
- Delete files, branches, or database tables without confirmation.
- Add features, refactors, or "improvements" beyond the requested scope.
- Add comments, docstrings, or type annotations to code that wasn't changed.
- Create unnecessary abstractions or utilities for one-time operations.
- Introduce secrets or hardcoded credentials into any file.
- Use `--no-verify` to skip git hooks.
- Use `--force` for git push without explicit user approval.

### Risky Actions Requiring Confirmation

Before performing any of the following, ask the user to confirm:

- Deleting files, directories, or branches
- `git reset --hard`, `git rebase`, or force-push operations
- Modifying CI/CD pipelines or deployment configuration
- Any action that affects production systems or shared state
- Running database migrations

---

## Environment Variables

> Document all required and optional environment variables here as they are added.

```bash
# NEXT_PUBLIC_SITE_URL=https://kapitaalkrant.example

# Safe Capital (/safe). Leeg of ontbrekend = 401. Geen default.
# SAFE_PASSWORD=
```

Geen geheimen in git. Marktcijfers van de open krant komen uit `redactie/data`
of uit de bron-URL’s van de conjunctuur-brief. De clientlaag staat niet in
de open JSON.

### Redactieregels

1. Begin in `redactie/INDEX.md`. Twee versies: de index wijst de geldende aan.
2. Kerninflatie België = **3,13%** (Statbel: excl. energie en onbewerkte voeding).
   3,67% is de eurozone-stijl maat — etiket erbij.
3. Centenindex is **wet sinds 01-06-2026**; 2% is cumulatief; €2.000 geldt ook pensioenen.
4. Seizoensgecorrigeerde reeks nooit alleen duiden (M2SL naast M2NS).
5. Headlines (ECB-homepage) zijn geen reeks.
6. Alleen Nico duwt een nieuwe **macro-editie** door. De open nieuwsbrief
   heeft twee slots, Europe/Brussels: **8:00** ochtend, **15:00** namiddag
   (`src/lib/desk-clock.ts`). Geen cijfer van na het slot.
7. **Lokaal is vraaggestuurd en automatisch:** abonnees kiezen gemeenten;
   alleen die plaatsen worden afgezocht. Ondernemersverhalen gaan door
   `moderateIntake` en verschijnen uitsluitend waar vraag is. Geen
   redacteur die een stad kiest. Gevonden berichten: titel, bron, link.

---

## CI/CD

> Document the CI/CD pipeline here when configured. Typical checks to add:

- Lint check
- Type check (if TypeScript/typed language)
- Unit and integration tests
- Build validation
- Security scanning (e.g., `npm audit`, `dependabot`)

---

## Dependency Management

- Pin major versions in dependency files.
- Review `npm audit` / `pip-audit` / `govulncheck` output before releasing.
- Do not add dependencies for tasks that can be done with a few lines of standard library code.
- When removing a dependency, also remove any associated configuration files.

---

## Updating This File

This file should be updated whenever:

- A new tool, framework, or major dependency is adopted
- The directory structure changes significantly
- New code conventions are established or existing ones change
- New environment variables are added
- CI/CD pipelines are created or modified
- Onboarding steps change

Keep this document accurate and concise — it is the primary reference for any AI assistant working in this codebase.
