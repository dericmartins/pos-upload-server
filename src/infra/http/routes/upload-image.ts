import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        body: z.object({
          name: z.string(),
        }),

        response: {
          201: z.object({ uploadId: z.string() }),
          409: z.object({ message: z.string() }).describe('Conflict error'),
        },
      },
    },
    async (request, reply) => {
      await db.insert(schema.uploads).values({
        name: 'teste1.png',
        remoteKey: 'fake-remote-key',
        remoteUrl: 'https://example.com/fake-image.jpg',
      })

      return reply.status(201).send({ uploadId: 'fake-upload-id' })
    }
  )
}
