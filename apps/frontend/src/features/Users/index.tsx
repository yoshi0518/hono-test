import Link from 'next/link';
import { honoClient } from '@/libs/hono';

export const Users = async () => {
  const response = await honoClient.api.v1.users.$get();
  if (!response.ok) return <div>Error</div>;

  const users = await response.json();
  console.log('[users]', users);

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">ユーザー</h2>
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
