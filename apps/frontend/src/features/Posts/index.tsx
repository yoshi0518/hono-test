import Link from 'next/link';
import { honoClient } from '@/libs/hono';

export const Posts = async () => {
  const response = await honoClient.api.v1.posts.$get();
  if (!response.ok) return <div>Error</div>;

  const posts = await response.json();
  console.log('[posts]', posts);

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">投稿</h2>
      <div>
        <Link
          href="/"
          className="text-blue-500 underline underline-offset-2"
        >
          戻る
        </Link>
      </div>
    </>
  );
};
