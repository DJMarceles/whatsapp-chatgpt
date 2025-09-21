# Kollie MCP Quickstart

## Requirements
- Node.js 20+
- pnpm 9+
- Docker & Docker Compose
- Python 3.11 (for adapter kit)

## Setup
```bash
pnpm install
pnpm -r build
```

## Local Environment
1. Copy `.env.example` to `.env.dev` and populate required values (mock defaults provided).
2. Start services:
   ```bash
   docker compose up -d
   ```
3. Run Prisma migrations:
   ```bash
   pnpm --filter hub db:migrate
   ```
4. Access the onboarding wizard at http://localhost:3000 to complete CRM OAuth (mock CRM by default), select capability packs, configure mappings, and allow tools.
5. Execute automated smoke tests from the wizard to confirm connectivity.

## Voice Demo
1. Export `OPENAI_API_KEY` (and SIP credentials if available).
2. Start the demo:
   ```bash
   pnpm --filter voice-demo start
   ```
3. The script opens a Realtime session, discovers MCP tools, and executes lead follow-up plus CSAT survey flows.

## Testing
- Contract tests: `pnpm --filter contracts test`
- Mapper tests: `pnpm --filter mapper test`
- E2E tests: `pnpm --filter tests-e2e test`
- Load tests (optional): `pnpm --filter tests-load run`

## Cleanup
```bash
docker compose down -v
```
