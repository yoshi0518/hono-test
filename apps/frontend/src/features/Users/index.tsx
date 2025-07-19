import Link from 'next/link';

export const Users = () => (
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
