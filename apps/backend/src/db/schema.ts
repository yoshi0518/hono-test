import { pgSchema, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

const schema = pgSchema('hono-test');

export const usersTable = schema.table('t_users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  email: varchar('email', { length: 200 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const postsTable = schema.table('t_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  content: varchar('content', { length: 200 }).notNull(),
  author: varchar('author', { length: 200 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
