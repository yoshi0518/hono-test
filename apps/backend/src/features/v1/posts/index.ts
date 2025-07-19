import { getCurrentDt } from '@/libs/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { createPostAction, deletePostAction, readPostAction, readsPostAction, updatePostAction } from './action';

export const postsRouter = new Hono();

postsRouter.get('/', async (c) => {
  const posts = await readsPostAction();

  if (posts.length === 0) return c.json({ message: 'Not Found' }, 404);

  return c.json(posts);
});

postsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const post = await readPostAction(Number(id));

  if (!post) return c.json({ message: 'Not Found' }, 404);

  return c.json(post);
});

postsRouter.post(
  '/',
  zValidator(
    'json',
    z.object({
      title: z.string(),
      content: z.string(),
      author: z.string(),
    }),
  ),
  async (c) => {
    await createPostAction({
      ...c.req.valid('json'),
      createdAt: getCurrentDt(),
      updatedAt: getCurrentDt(),
    });

    return new Response(null, { status: 201 });
  },
);

postsRouter.put(
  '/:id',
  zValidator(
    'json',
    z
      .object({
        title: z.string(),
        content: z.string(),
        author: z.string(),
      })
      .partial(),
  ),
  async (c) => {
    const id = c.req.param('id');
    const post = await readPostAction(Number(id));

    if (!post) return c.json({ message: 'Not Found' }, 404);

    await updatePostAction(Number(id), {
      ...c.req.valid('json'),
      updatedAt: getCurrentDt(),
    });

    return new Response(null, { status: 204 });
  },
);

postsRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const post = await readPostAction(Number(id));

  if (!post) return c.json({ message: 'Not Found' }, 404);

  await deletePostAction(Number(id));

  return new Response(null, { status: 204 });
});
