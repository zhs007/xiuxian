import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

// Register the CORS plugin
await server.register(cors, {
  // In a real production app, you'd want to restrict this to your frontend's domain
  origin: "*",
});

interface EchoQuery {
  message?: string;
}

// Declare a route
server.get<{ Querystring: EchoQuery }>("/api/echo", (request, reply) => {
  const message = request.query.message ?? "No message provided";
  reply.send({ echo: message });
});

// Health check route
server.get("/healthz", (_request, reply) => {
  reply.send({ status: "ok" });
});

// Run the server!
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "3000", 10);
    const host = process.env.HOST || "0.0.0.0";
    await server.listen({ port, host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  server.log.info(`Received ${signal}, shutting down gracefully...`);
  await server.close();
  process.exit(0);
};

process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));

void start();
