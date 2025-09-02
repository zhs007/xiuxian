import fastify from 'fastify';
const server = fastify({ logger: true });
// Declare a route
server.get('/api/echo', (request, reply) => {
    const message = request.query.message ?? 'No message provided';
    reply.send({ echo: message });
});
// Run the server!
const start = async () => {
    try {
        await server.listen({ port: 3000 });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
void start();
//# sourceMappingURL=index.js.map