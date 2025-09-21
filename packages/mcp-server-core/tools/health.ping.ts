export const ping = {
  name: "health.ping",
  description: "Health check",
  input_schema: { type: "object", properties: { request_id: { type: "string" } }, required: ["request_id"], additionalProperties: false },
  handler: async ({ request_id }: { request_id: string }) => ({ ok: true, request_id, ts: new Date().toISOString() })
};
