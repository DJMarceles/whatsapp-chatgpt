# Kollie MCP Hub

Fastify-based MCP hub responsible for multi-tenant tool orchestration, approvals, and auditing. The current scaffold exposes a placeholder health endpoint; see `SYSTEM_DESIGN.md` for upcoming capabilities.

## Scripts
- `pnpm --filter hub dev` – start development server.
- `pnpm --filter hub build` – compile TypeScript.
- `pnpm --filter hub db:migrate` – run Prisma migrations (once schema defined).
