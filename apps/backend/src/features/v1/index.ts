import { usersRouter } from '@/features/v1/users';
import { Hono } from 'hono';

export const v1Router = new Hono();

v1Router.route('/users', usersRouter);
