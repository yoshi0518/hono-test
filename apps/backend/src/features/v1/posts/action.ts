'use server';

import { postsTable } from '@/db/schema';
import { env } from '@/env';
import { db } from '@/libs/neon';
import { eq } from 'drizzle-orm';

import type { CreatePostType, UpdatePostType } from './type';

export const readsPostAction = async () => {
  const response = await db.select().from(postsTable).orderBy(postsTable.id);

  if (env.DEBUG) console.log('[posts] 取得結果', response);

  return response;
};

export const readPostAction = async (id: number) => {
  const response = await db.select().from(postsTable).where(eq(postsTable.id, id));

  if (env.DEBUG) console.log('[post] 取得結果', response);

  return response;
};

export const createPostAction = async (data: CreatePostType) => {
  const response = await db.insert(postsTable).values(data).returning({ id: postsTable.id });

  if (env.DEBUG) console.log('[post] 登録結果', response);
};

export const updatePostAction = async (id: number, data: UpdatePostType) => {
  const response = await db.update(postsTable).set(data).where(eq(postsTable.id, id)).returning({ id: postsTable.id });

  if (env.DEBUG) console.log('[post] 更新結果', response);
};

export const deletePostAction = async (id: number) => {
  const response = await db.delete(postsTable).where(eq(postsTable.id, id));

  if (env.DEBUG) console.log('[post] 削除結果', response);
};
