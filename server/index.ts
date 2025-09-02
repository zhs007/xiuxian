import fastify from 'fastify';

const server = fastify({ logger: true });

interface EchoQuery {
  message?: string;
}

// Declare a route
server.get<{ Querystring: EchoQuery }>('/api/echo', (request, reply) => {
  const message = request.query.message ?? 'No message provided';
  reply.send({ echo: message });
});

// Run the server!
const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void start();
