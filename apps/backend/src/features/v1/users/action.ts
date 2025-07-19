'use server';

import { usersTable } from '@/db/schema';
import { env } from '@/env';
import { db } from '@/libs/neon';
import { eq } from 'drizzle-orm';

import type { CreateUserType, UpdateUserType } from './type';

export const readsUserAction = async () => {
  const response = await db.select().from(usersTable).orderBy(usersTable.id);

  if (env.DEBUG) console.log('[users] 取得結果', response);

  return response;
};

export const readUserAction = async (id: number) => {
  const response = await db.select().from(usersTable).where(eq(usersTable.id, id));

  if (env.DEBUG) console.log('[user] 取得結果', response);

  return response;
};

export const createUserAction = async (data: CreateUserType) => {
  const response = await db.insert(usersTable).values(data).returning({ id: usersTable.id });

  if (env.DEBUG) console.log('[user] 登録結果', response);
};

export const updateUserAction = async (id: number, data: UpdateUserType) => {
  const response = await db.update(usersTable).set(data).where(eq(usersTable.id, id)).returning({ id: usersTable.id });

  if (env.DEBUG) console.log('[user] 更新結果', response);
};

export const deleteUserAction = async (id: number) => {
  const response = await db.delete(usersTable).where(eq(usersTable.id, id));

  if (env.DEBUG) console.log('[user] 削除結果', response);
};
