# Kollie MCP

Kollie MCP is a multi-tenant mediation layer that standardizes CRM workflows for AI agents via the Model Context Protocol (MCP). The platform delivers canonical tool contracts, resilient connectors, onboarding workflows, and sample voice integrations.

## Project Layout
See `ARCHITECTURE.md` and `SYSTEM_DESIGN.md` for an in-depth overview.

```
kollie-mcp/
├─ apps/
│  ├─ hub/                      # Fastify MCP Hub
│  ├─ wizard/                   # Next.js onboarding wizard
│  └─ voice-demo/               # Realtime + SIP demo
├─ packages/
│  ├─ contracts/                # Canonical schemas + types
│  ├─ mapper/                   # Declarative mapping DSL
│  ├─ connectors/               # CRM connectors (Salesforce, Dynamics 365, HubSpot)
│  ├─ mcp-server-core/          # Shared MCP server utilities
│  ├─ adapter-kit-node/         # Reference adapter (Node.js)
│  └─ adapter-kit-py/           # Reference adapter (Python)
├─ infra/
│  ├─ docker/
│  ├─ helm/
│  └─ terraform/
├─ tests/
│  ├─ contract/
│  ├─ e2e/
│  └─ load/
├─ docs/
└─ .github/workflows/
```

## Getting Started
Follow the steps in `QUICKSTART.md` to install dependencies, launch the dev stack, and exercise the voice demo.

## Documentation
- `ARCHITECTURE.md`: High-level architecture.
- `SYSTEM_DESIGN.md`: Detailed component design.
- `SECURITY.md`: Security principles and controls.
- `RUNBOOKS.md`: Operational runbooks for common incidents.
- `docs/`: Docusaurus site (to be implemented).

## Contributing
1. Install pnpm 9+.
2. Run `pnpm install` at repo root.
3. Use `pnpm turbo` pipelines for lint, test, and build commands.
4. Ensure CI (`.github/workflows/ci.yml`) passes before opening pull requests.

## License
Apache 2.0 – see `LICENSE`.
