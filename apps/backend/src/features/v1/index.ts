import { Hono } from 'hono';

import { postsRouter } from './posts';
import { usersRouter } from './users';

export const v1Router = new Hono().route('/users', usersRouter).route('/posts', postsRouter);
