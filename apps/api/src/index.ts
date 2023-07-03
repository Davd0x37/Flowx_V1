import 'dotenv/config';
import Fastify from 'fastify';

import Plugins from './plugins';
import Routes from './routes';

const fastify = Fastify({
  logger: true,
});

Plugins.forEach((plugin) => {
  fastify.register(plugin, {
    client: 'better-sqlite3',
    connection: {
      filename: process.env.DATABASE_SQLITE_FILE as string,
    },
  });
});

Routes.forEach((route) => {
  fastify.register(route);
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

(async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
