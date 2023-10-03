import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  fastify.get('/auth/:test', async (request, response) => {
    console.log(request.params);

    fastify.knex.as('xd').then;
    fastify.knex.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.string('name');
      table.timestamps();
    });

    response.send('test response');
  });
};
