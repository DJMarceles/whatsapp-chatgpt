# Security Architecture

## Principles
- **Least Privilege**: Per-tenant scopes and per-tool allowlists restrict capabilities. Tokens are scoped, short-lived, and revocable.
- **Defense in Depth**: Authentication (OIDC/OAuth), authorization layers (tenant policies, approval hooks), encrypted storage, network segmentation, and observability with tamper-evident logging.
- **Zero Trust**: All requests authenticate, including internal service-to-service traffic. SSE streams include token rotation and heartbeat validation.
- **Privacy by Design**: PII redaction in logs, configurable retention windows, purpose-limited processing flags, and user-driven erasure hooks.

## Identity & Access Management
- Hub validates OIDC ID tokens for operators and service tokens for automated agents.
- Tenants manage CRM OAuth credentials; secrets stored encrypted with envelope keys. Rotation supported via wizard prompts.
- Approval workflows integrate with webhook endpoints and wizard UI. Sensitive tools can require human approval before execution.

## Data Protection
- Postgres connections enforce TLS and row-level security or schema segregation per tenant.
- Redis namespaces isolate cached data; key TTLs prevent stale PII retention.
- Request payloads hashed (args-hash) for audit without storing raw PII.
- Optional customer-managed keys for field-level encryption of sensitive attributes.

## Network Security
- All external traffic served over HTTPS/TLS 1.2+. Mutual TLS available for adapter kit deployments.
- Helm charts expose network policies (Kubernetes) restricting ingress/egress. Docker compose uses internal bridge networks by default.
- SIP integration relies on secure RTP (SRTP) where supported; fallback logged with warnings.

## Secret Management
- `.env.example` documents required environment variables. No static secrets committed.
- Integration with cloud secret stores (AWS Secrets Manager, HashiCorp Vault) described in runbooks.
- Fallback to local `.env` only for development.

## Monitoring & Incident Response
- OpenTelemetry traces feed SIEM dashboards with anomaly detection for tool usage spikes.
- Audit logs exported to tenant-specific storage for compliance.
- Runbooks define procedures for suspected compromise, credential rotation, and privacy requests.

## Compliance Considerations
- Data minimization and erasure workflows enable GDPR/CCPA alignment.
- Consent tools (consent.get/set) enforce capture of legal basis references.
- Interaction logs include purpose metadata for regulatory audits.
