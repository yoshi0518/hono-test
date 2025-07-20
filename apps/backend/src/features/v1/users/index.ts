import { getCurrentDt } from '@/libs/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { createUserAction, deleteUserAction, readsUserAction, readUserAction, updateUserAction } from './action';

export const usersRouter = new Hono()

  .get('/', async (c) => {
    const users = await readsUserAction();

    if (users.length === 0) return c.json({ message: 'Not Found' }, 404);

    return c.json(users);
  })

  .get('/:id', async (c) => {
    const id = c.req.param('id');
    const user = await readUserAction(Number(id));

    if (!user) return c.json({ message: 'Not Found' }, 404);

    return c.json(user);
  })

  .post(
    '/',
    zValidator(
      'json',
      z.object({
        name: z.string(),
        email: z.string(),
      }),
    ),
    async (c) => {
      await createUserAction({
        ...c.req.valid('json'),
        createdAt: getCurrentDt(),
        updatedAt: getCurrentDt(),
      });

      return new Response(null, { status: 201 });
    },
  )

  .put(
    '/:id',
    zValidator(
      'json',
      z
        .object({
          name: z.string(),
          email: z.string(),
        })
        .partial(),
    ),
    async (c) => {
      const id = c.req.param('id');
      const user = await readUserAction(Number(id));

      if (!user) return c.json({ message: 'Not Found' }, 404);

      await updateUserAction(Number(id), {
        ...c.req.valid('json'),
        updatedAt: getCurrentDt(),
      });

      return new Response(null, { status: 204 });
    },
  )

  .delete('/:id', async (c) => {
    const id = c.req.param('id');
    const user = await readUserAction(Number(id));

    if (!user) return c.json({ message: 'Not Found' }, 404);

    await deleteUserAction(Number(id));

    return new Response(null, { status: 204 });
  });
