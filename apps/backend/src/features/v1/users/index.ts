import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { users as originUsers } from './data';

let users = originUsers;

export const usersRouter = new Hono();

usersRouter.get('/', (c) => {
  if (users.length === 0) return c.json({ message: 'Not Found' }, 404);

  return c.json(users);
});

usersRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  const user = users.find((user) => user.id === Number(id));

  if (!user) return c.json({ message: 'Not Found' }, 404);

  return c.json(user);
});

usersRouter.post(
  '/',
  zValidator(
    'json',
    z.object({
      name: z.string(),
      email: z.string(),
    }),
  ),
  (c) => {
    const { name, email } = c.req.valid('json');
    const user = {
      id: users.length + 1,
      name,
      email,
    };
    users.push(user);

    return new Response(null, { status: 201 });
  },
);

usersRouter.put(
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
  (c) => {
    const id = c.req.param('id');
    const user = users.find((user) => user.id === Number(id));

    if (!user) return c.json({ message: 'Not Found' }, 404);

    const { name, email } = c.req.valid('json');

    users = users.map((user) => {
      if (user.id === Number(id)) {
        return {
          id: user.id,
          name: name ?? user.name,
          email: email ?? user.email,
        };
      } else {
        return user;
      }
    });

    return new Response(null, { status: 204 });
  },
);

usersRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  const user = users.find((user) => user.id === Number(id));

  if (!user) return c.json({ message: 'Not Found' }, 404);

  users = users.filter((user) => user.id !== Number(id));

  return new Response(null, { status: 204 });
});
