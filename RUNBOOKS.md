# Runbooks

## 1. Tenant Onboarding Failure
1. Check wizard logs for OAuth callback errors (look for `oauth.error`).
2. Inspect Hub logs for `tenant.create` RPC errors; verify CRM credentials stored.
3. Retry OAuth flow; if vendor unavailable, instruct tenant to use mock CRM for smoke tests.
4. Validate Redis connectivity (rate limit counters) and Postgres schema creation.
5. Escalate to integrations team if vendor API outage persists.

## 2. Approval Webhook Timeout
1. Hub logs will show `approval.webhook.timeout` with request ID.
2. Verify webhook endpoint reachability (curl) and TLS certificates.
3. Requeue approval via `pnpm --filter hub approval:replay <requestId>`.
4. Notify tenant operators through wizard notification banner.

## 3. Elevated Error Rate (5xx)
1. Review OpenTelemetry traces for connector latency; identify offending tool.
2. Inspect circuit breaker state; if open, evaluate vendor status page.
3. Fail over to cached reads if safe. Apply manual rate limiting adjustments in Redis.
4. Communicate status to tenants via status page integration.

## 4. PII Erasure Request
1. Locate tenant and subject via `interaction.log` search.
2. Trigger erasure workflow: remove audit payloads, delete CRM cache entries, queue vendor erasure webhook.
3. Confirm completion in audit trail export.

## 5. Secret Rotation
1. Update secret in secret manager (e.g., Vault) and redeploy pods with Helm `--set secretVersion`.
2. Hub automatically refreshes OAuth tokens on next request; for service tokens, instruct tenant to re-auth via wizard.
3. Validate via smoke tests and audit logs.

## 6. Redis Outage
1. Hub falls back to uncached reads with warnings; monitor latency budget.
2. Restart Redis container/pod; warm caches using `pnpm --filter hub cache:warm`.
3. Clear stale idempotency keys if necessary.

## 7. Postgres Migration Failure
1. Prisma migration logs located under `apps/hub/prisma/migrations`.
2. Roll back using `pnpm --filter hub db:migrate:resolve -- --applied <migration>`.
3. Apply fix, rerun migration, ensure health probes pass.

## Incident Communication Template
- Summary, impact, timeline, mitigations, follow-up actions, customer messaging.
