import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { posts as originPosts } from './data';

let posts = originPosts;

export const postsRouter = new Hono();

postsRouter.get('/', (c) => {
  if (posts.length === 0) return c.json({ message: 'Not Found' }, 404);

  return c.json(posts);
});

postsRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  const post = posts.find((post) => post.id === Number(id));

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
  (c) => {
    const { title, content, author } = c.req.valid('json');
    const post = {
      id: posts.length + 1,
      title,
      content,
      author,
    };
    posts.push(post);

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
  (c) => {
    const id = c.req.param('id');
    const post = posts.find((post) => post.id === Number(id));

    if (!post) return c.json({ message: 'Not Found' }, 404);

    const { title, content, author } = c.req.valid('json');

    posts = posts.map((post) => {
      if (post.id === Number(id)) {
        return {
          id: post.id,
          title: title ?? post.title,
          content: content ?? post.content,
          author: author ?? post.author,
        };
      } else {
        return post;
      }
    });

    return new Response(null, { status: 204 });
  },
);

postsRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  const post = posts.find((post) => post.id === Number(id));

  if (!post) return c.json({ message: 'Not Found' }, 404);

  posts = posts.filter((post) => post.id !== Number(id));

  return new Response(null, { status: 204 });
});
