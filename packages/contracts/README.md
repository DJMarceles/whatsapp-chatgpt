# @kollie/contracts

Canonical JSON Schemas and TypeScript types for the Kollie MCP CRM Capability Pack v1.

## Scripts
- `pnpm build` – generate compiled ESM and type declarations.
- `pnpm test` – placeholder contract tests (to be replaced with full suite).

## Usage
```ts
import { capabilityPackSchemas, ContactGetInput } from "@kollie/contracts";

const schema = capabilityPackSchemas["contact.get"];
```
