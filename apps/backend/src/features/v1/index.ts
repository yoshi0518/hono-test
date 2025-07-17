import { Hono } from 'hono';

import { postsRouter } from './posts';
import { usersRouter } from './users';

export const v1Router = new Hono();

v1Router.route('/users', usersRouter);
v1Router.route('/posts', postsRouter);
