import type { usersTable } from '@/db/schema';

export type CreateUserType = Omit<typeof usersTable.$inferInsert, 'id'>;
export type UpdateUserType = Partial<Omit<typeof usersTable.$inferInsert, 'id'>>;
