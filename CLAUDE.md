# CLAUDE.md — AI Assistant Guide for Cadeau-

This file is the primary reference for AI assistants (Claude and others) working in this repository. It covers project context, repository state, conventions, development workflows, testing strategy, and important constraints.

> **Last updated:** 2026-03-04
> **Repository status:** Initial bootstrapping phase — no source code committed yet.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Current State & History](#current-state--history)
4. [Development Environment Setup](#development-environment-setup)
5. [Git Workflow](#git-workflow)
6. [Development Workflows](#development-workflows)
7. [Code Conventions](#code-conventions)
8. [Testing Strategy & Coverage](#testing-strategy--coverage)
9. [Security](#security)
10. [Environment Variables](#environment-variables)
11. [CI/CD](#cicd)
12. [Dependency Management](#dependency-management)
13. [AI Assistant Guidelines](#ai-assistant-guidelines)
14. [Updating This File](#updating-this-file)

---

## Project Overview

**Repository:** Cadeau-
**Owner:** Nicoselle
**Remote:** http://127.0.0.1:48983/git/Nicoselle/Cadeau-
**Branch model:** Feature branches prefixed with `claude/` for AI-driven work

> This repository is currently in its initial bootstrapping phase with no source code committed yet. This document consolidates all guidance established in previous sessions and will evolve as the project grows. Update this file whenever significant architectural or workflow decisions are made.

---

## Repository Structure

The repository currently contains only the `.claude/` configuration directory. As source code is added, the project should follow this layout:

```
Cadeau-/
├── CLAUDE.md                  # This file — AI assistant guide
├── README.md                  # Human-facing project overview (create when scaffolding)
├── .gitignore                 # Files excluded from version control
├── .env.example               # Template for environment variables (never commit .env)
├── .claude/
│   └── commands/              # Custom Claude slash commands (currently empty)
├── src/
│   ├── components/            # UI components (if frontend)
│   ├── pages/ or routes/      # Routing layer
│   ├── services/              # Business logic / external integrations
│   ├── utils/                 # Pure utility functions
│   └── types/                 # Shared type definitions (TypeScript)
├── tests/                     # Test files mirroring src/ structure
│   └── utils/format.test.ts   # Example: mirrors src/utils/format.ts
├── docs/                      # Additional documentation
└── scripts/                   # Dev/ops helper scripts
```

> Update this section with the actual structure once the project is scaffolded.

---

## Current State & History

### Committed Work (on remote branches)

| Branch | Commit | Description | Date |
|--------|--------|-------------|------|
| `claude/add-claude-documentation-3tntr` | `43e947b` | Initial CLAUDE.md for AI assistant guidance | 2026-03-03 |
| `claude/analyze-test-coverage-MRBzW` | `ee15f36` | Test coverage analysis and strategy document | 2026-03-03 |

### What Exists

- `.claude/commands/` — directory for custom Claude slash commands (currently empty)
- Foundational documentation on remote branches (not yet merged to main)
- No source code, no `package.json`, no build system configured yet

### What Needs to Be Done Next

- [ ] Scaffold source directory structure and choose tech stack
- [ ] Create `package.json` / `pyproject.toml` / `go.mod`
- [ ] Create `.gitignore` and `.env.example`
- [ ] Set up a testing framework and add test scripts
- [ ] Configure coverage reporting
- [ ] Create `README.md` with human-facing project overview
- [ ] Add CI/CD pipeline (`.github/workflows/ci.yml`)
- [ ] Merge foundational documentation branches into main

---

## Development Environment Setup

### Prerequisites

> List all tools, runtimes, and versions required here when the stack is determined. Example:

```
Node.js >= 18.x
npm >= 9.x
# or
Python >= 3.11
# or
Go >= 1.21
```

### Initial Setup

```bash
# Clone and enter the repo
git clone <repo-url>
cd Cadeau-

# Install dependencies (update command for chosen stack)
npm install                          # Node.js projects
# pip install -r requirements.txt   # Python projects
# go mod download                   # Go projects

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
|---------|---------|---------|
| AI-driven changes | `claude/<description>-<session-id>` | `claude/add-auth-3tntr` |
| Human features | `feature/<description>` | `feature/user-dashboard` |
| Bug fixes | `fix/<description>` | `fix/login-redirect` |
| Hotfixes | `hotfix/<description>` | `hotfix/null-pointer` |

**Important:** AI branches must follow the `claude/` prefix convention and include the session ID suffix. Pushes to branches not following this pattern may fail with a 403 error.

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
chore: add .gitignore and .env.example
```

### Push Rules

- Always push to the designated branch: `git push -u origin <branch-name>`
- Never force-push to `main` or `master`
- AI branches must follow the `claude/` prefix convention
- Open a pull request for review before merging into the main branch
- If push fails due to network errors, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

---

## Development Workflows

### Running Tests

```bash
# Update these commands to match the project's test runner
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Linting and Formatting

```bash
# Update for the project's linter/formatter
npm run lint            # Check for lint errors
npm run lint:fix        # Auto-fix lint errors
npm run format          # Format code (Prettier, Black, gofmt, etc.)
```

### Building for Production

```bash
npm run build           # Compile/bundle for production
npm run preview         # Preview the production build locally
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

> Establish and document naming conventions for the chosen language/framework here. Suggested defaults:

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

---

## Testing Strategy & Coverage

Testing documentation was established in `TEST_COVERAGE_ANALYSIS.md` (commit `ee15f36`). Key points are consolidated here:

### Test Types

| Type | Purpose | Tool (Node.js) | Tool (Python) |
|------|---------|---------------|---------------|
| Unit | Isolated functions with mocked deps | Jest / Vitest | pytest |
| Integration | Module interactions | Supertest | httpx / pytest |
| E2E | Critical user journeys | Playwright | – |
| Mutation | Verify test quality | Stryker | mutmut |

### Coverage Targets

| Layer | Branch Coverage Target |
|-------|------------------------|
| Core business logic | ≥ 90% |
| Data models / schemas | ≥ 85% |
| API / Service layer | ≥ 80% |
| Persistence layer | ≥ 80% |
| Utilities / helpers | ≥ 85% |
| UI components | ≥ 70% |

### Priority Areas (as code is added)

1. **Core business logic** — every business rule function needs happy path, edge case, and error path tests.
2. **Data models** — validation, serialization/deserialization, defaults and computed properties.
3. **API/Service layer** — one integration test per endpoint covering inputs → HTTP status + response shape, auth rules, and error formats (4xx, 5xx).
4. **Persistence layer** — CRUD operations, transactions/rollback, empty result sets against a test database or in-memory substitute.
5. **Utilities/helpers** — all branches, edge values, locale/i18n helpers.
6. **UI components** — smoke tests, user interactions, conditional rendering, a11y attributes.
7. **Error handling & resilience** — network failures, retry logic, fallback content.

### Test File Organization

Mirror the source directory structure:
```
src/utils/format.ts    →  tests/utils/format.test.ts
src/services/auth.ts   →  tests/services/auth.test.ts
```

### Test Quality Rules

- Tests must be **deterministic** — no random data, no reliance on live external services (use mocks/stubs).
- Write tests **alongside new code**, not retroactively.
- Add **snapshot/regression tests** for stable outputs (rendered HTML, reports, serialized configs).
- Add **property-based tests** for functions with large input spaces (formatters, parsers, calculators).
- Add **negative tests** — assert invalid operations raise the correct errors or return correct status codes.

### Enforce Coverage in CI

```yaml
# .github/workflows/ci.yml (example for a Node project)
- name: Run tests with coverage
  run: npx jest --coverage --coverageThreshold='{"global":{"branches":80}}'
```

---

## Security

- Never commit secrets, API keys, tokens, or passwords — use environment variables.
- Always add `.env` to `.gitignore`.
- Sanitize all user input before using in queries or rendering in HTML.
- Use parameterized queries — never string-interpolate SQL.
- Follow the principle of least privilege for service accounts and permissions.
- Run `npm audit` / `pip-audit` / `govulncheck` before releases.

---

## Environment Variables

> Document all required and optional environment variables here as they are added.

```bash
# .env.example — copy to .env and fill in values

# Application
# APP_ENV=development
# APP_PORT=3000
# APP_SECRET=change-me

# Database
# DB_URL=postgresql://user:password@localhost:5432/cadeau

# External Services
# API_KEY=your-api-key
```

---

## CI/CD

> Document the CI/CD pipeline here when configured. Typical checks to add:

- [ ] Lint check
- [ ] Type check (if TypeScript or other typed language)
- [ ] Unit and integration tests with coverage enforcement
- [ ] Build validation
- [ ] Security scanning (`npm audit`, `dependabot`, `pip-audit`)
- [ ] Coverage badge generation for README

---

## Dependency Management

- Pin major versions in dependency files.
- Review `npm audit` / `pip-audit` / `govulncheck` output before releasing.
- Do not add dependencies for tasks that can be done with a few lines of standard library code.
- When removing a dependency, also remove any associated configuration files and references.

---

## AI Assistant Guidelines

### What Claude Should Do

- Read the relevant files before making any changes.
- Make only the changes explicitly requested or clearly necessary.
- Follow the conventions in this document and existing code patterns.
- Commit with descriptive messages using Conventional Commits format.
- Update this CLAUDE.md when architectural or workflow decisions change.
- Prefer editing existing files over creating new ones.
- Keep solutions focused and minimal — do not add extra features, abstractions, or "improvements" beyond scope.
- Always develop on the designated `claude/` branch for the current session.

### What Claude Should NOT Do

- Push to `main`/`master` without explicit permission.
- Delete files, branches, or database tables without confirmation.
- Add features, refactors, or "improvements" beyond the requested scope.
- Add comments, docstrings, or type annotations to code that wasn't changed.
- Create unnecessary abstractions or utilities for one-time operations.
- Introduce secrets or hardcoded credentials into any file.
- Use `--no-verify` to skip git hooks.
- Use `--force` for git push without explicit user approval.
- Brute-force past failing tests or hooks — investigate and fix root causes instead.

### Risky Actions Requiring Confirmation

Before performing any of the following, stop and ask the user to confirm:

- Deleting files, directories, or branches
- `git reset --hard`, `git rebase`, or force-push operations
- Modifying CI/CD pipelines or deployment configuration
- Any action that affects production systems or shared state
- Running database migrations

---

## Updating This File

This file should be updated whenever:

- A new tool, framework, or major dependency is adopted
- The directory structure changes significantly
- New code conventions are established or existing ones change
- New environment variables are added
- CI/CD pipelines are created or modified
- Onboarding steps change
- A new `claude/` session establishes decisions that affect future sessions

Keep this document **accurate** and **concise** — it is the primary reference for any AI assistant working in this codebase.
