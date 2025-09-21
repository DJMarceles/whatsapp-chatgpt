import Fastify from "fastify";

export async function createServer() {
  const app = Fastify({ logger: true });
  app.get("/health", async () => ({ status: "ok" }));
  return app;
}

const entryUrl = process.argv[1] ? new URL(process.argv[1], "file://").toString() : undefined;
if (entryUrl && import.meta.url === entryUrl) {
  createServer()
    .then((app) => app.listen({ port: Number(process.env.PORT) || 8080, host: "0.0.0.0" }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
