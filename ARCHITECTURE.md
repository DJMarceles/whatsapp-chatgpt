# Kollie MCP Architecture Overview

## Vision
Kollie MCP provides a standardized mediation layer between conversational AI agents and enterprise CRMs. The platform unifies tool contracts, governance, and observability across tenants while remaining extensible for bespoke enterprise integrations.

## High-Level Components
- **MCP Hub**: Multi-tenant Fastify service exposing JSON-RPC + SSE endpoints for tool discovery and invocation. Handles authentication, authorization, approval workflows, caching, idempotency, and auditing.
- **CRM Connectors**: Vendor-specific packages (Salesforce, Dynamics 365, HubSpot) implementing the canonical capability pack via declarative mappings, resilient transport, and rate-limit aware batching.
- **Mapper DSL**: Shared package defining transformation primitives to translate between canonical payloads and vendor object schemas.
- **Adapter Kits**: Reference MCP server implementations (Node.js and Python) enabling customer-hosted deployments behind firewalls with file-based configuration and plugin approval policies.
- **Onboarding Wizard**: Next.js application orchestrating CRM OAuth, capability pack selection, field mapping, tool allowlists, and smoke testing.
- **Voice Demo**: Node-based example that drives the OpenAI Realtime API and SIP gateways to showcase remote MCP sessions executing CRM workflows.
- **Shared Contracts**: JSON Schemas and TypeScript types for every canonical tool, enabling cross-language validation and test coverage.
- **Infrastructure & CI/CD**: Docker images, Helm charts, Terraform placeholders, and GitHub Actions pipelines for consistent deployment and release automation.

## Data Flow Summary
1. An AI voice agent (via the voice demo or external client) negotiates a Realtime session, receives remote MCP configuration, and authenticates with the Hub.
2. The Hub resolves tenant configuration, enforces tool allowlists/approvals, and proxies tool calls to the appropriate connector or adapter kit instance.
3. Connectors map canonical requests to vendor APIs, applying retry/circuit-breaker policies, caching, and idempotency keys.
4. Responses propagate back through the Hub, with audit and telemetry events emitted to OpenTelemetry collectors and persisted for compliance.

## Multi-Tenancy Model
- Tenants are isolated via Postgres schema-per-tenant (or row-level security) and Redis key namespacing.
- Service tokens and OAuth credentials are stored encrypted per tenant.
- Tool policies, approvals, and audit logs are scoped to tenant and use-case pack.

## Observability
- OpenTelemetry instrumentation across HTTP, JSON-RPC, and connector calls.
- Structured logging with PII redaction filters applied at ingestion.
- Metrics for latency budgets (≤300 ms overhead), approval turnaround, retry counts, and cache efficiency.

## Security Posture
- Zero static secrets in source; configuration via environment variables, sealed secrets, or secret stores.
- Just-in-time scoped tokens for voice sessions and connector access.
- Auditability via interaction logs, webhook approvals, and exportable audit trails.

## Extensibility
- Capability packs are defined via schema bundles; new tools only require schema + mapper additions.
- Adapter kits support plugin mappers and approval hooks, enabling customer-specific logic without modifying the Hub.
- Connectors leverage shared DSL, enabling additional CRM integrations with minimal boilerplate.
