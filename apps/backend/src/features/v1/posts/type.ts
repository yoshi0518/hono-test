import type { postsTable } from '@/db/schema';

export type CreatePostType = Omit<typeof postsTable.$inferInsert, 'id'>;
export type UpdatePostType = Partial<Omit<typeof postsTable.$inferInsert, 'id'>>;
