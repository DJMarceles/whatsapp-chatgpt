# Kollie MCP System Design

## Functional Requirements
- Expose canonical MCP tools for CRM workflows (leads, contacts, cases, appointments, survey, notifications, consent, audit).
- Support multi-tenant onboarding, tool governance, and approval routing.
- Integrate with Salesforce, Dynamics 365, and HubSpot via resilient connectors.
- Provide adapter kits for customer-hosted MCP servers behind firewalls.
- Offer onboarding wizard guiding CRM OAuth, mapping, allowlists, and smoke tests.
- Deliver voice demo showcasing end-to-end tool execution through OpenAI Realtime API and SIP telephony.

## Non-Functional Requirements
- Latency overhead ≤ 300 ms per tool invocation.
- High availability via stateless Hub nodes with Postgres + Redis backing services.
- Observability through OpenTelemetry traces, structured logs with PII redaction, and aggregated metrics.
- Security posture emphasizing tenant isolation, ephemeral tokens, and approval audits.

## Architecture Layers
1. **Presentation**
   - Wizard (Next.js 14) for onboarding workflows.
   - Voice demo CLI/scripts for telephony flows.
2. **Application**
   - MCP Hub (Fastify) orchestrating authentication, authorization, approvals, caching, auditing, and connector dispatch.
   - Adapter kits implementing MCP server semantics in customer-controlled environments.
3. **Integration**
   - Connectors for Salesforce, Dynamics 365, HubSpot utilizing shared mapper DSL, OAuth credential management, and resilient HTTP clients.
   - Mock CRM services for testing and demos.
4. **Data**
   - Postgres for tenant configuration, tokens (encrypted), audit logs, approvals.
   - Redis for caching, rate-limiting counters, idempotency keys, session tokens.
   - Object storage / export endpoints for audit trail offloading (future extension).

## Component Interactions
- **Wizard ↔ Hub**: Wizard requests tenant creation, triggers OAuth flows, fetches schema metadata, updates mappings, and initiates smoke tests via JSON-RPC calls.
- **Hub ↔ Connectors**: Hub loads tenant connector credentials, transforms payloads using mapper DSL, executes vendor API calls with retry/backoff, and logs telemetry.
- **Hub ↔ Adapter Kit**: Remote MCP servers communicate over JSON-RPC HTTP(S) + SSE to expose local resources while respecting centralized approval policies.
- **Voice Demo ↔ Hub**: Voice demo obtains short-lived auth tokens, calls list_tools, and orchestrates tool invocations while streaming transcripts and approvals.

## Data Model Highlights
- Tenants, Users, ServiceTokens, ToolPolicies, ApprovalRequests, AuditEvents stored in Postgres using Prisma ORM.
- Redis caches canonical resource snapshots (e.g., contact profiles) with TTL and invalidation hooks.
- Schema registry maintained via contracts package; versioned by capability pack release.

## Scaling Considerations
- Stateless Hub nodes behind load balancer; horizontal scaling based on CPU and latency metrics.
- Connector clients use connection pooling and concurrency controls to respect vendor rate limits.
- SSE multiplexing via Fastify + EventSource polyfills with heartbeat pings for long-lived sessions.
- Background workers (BullMQ) for asynchronous approval notifications and heavy transformations.

## Deployment Model
- Docker images built via pnpm/turbo pipeline.
- Helm charts provide Kubernetes manifests with configurable environment secrets, autoscaling, and service meshes (optional).
- GitHub Actions orchestrate linting, tests, security scans, image builds, cosign signatures, and release packaging.

## Testing Strategy Overview
- Contract tests verify schema validity and TypeScript type generation.
- Mapper tests assert canonical ↔ vendor transformations including edge cases.
- E2E flows simulate voice agent executing tools against mock CRM with approval scenarios.
- Load tests (k6) exercise 50 calls per second, measuring latency and error budgets.

## Future Enhancements
- Additional connectors (Zendesk, ServiceNow), self-service schema editor, advanced approval UX, and analytics dashboards.
