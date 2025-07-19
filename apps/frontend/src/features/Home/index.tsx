import Link from 'next/link';

export const Home = () => (
  <>
    <h2 className="mb-2 text-xl font-bold">Index</h2>
    <div className="space-y-2">
      <div>
        <Link
          href="/users"
          className="text-blue-500 underline underline-offset-2"
        >
          ユーザー
        </Link>
      </div>
      <div>
        <Link
          href="/posts"
          className="text-blue-500 underline underline-offset-2"
        >
          投稿
        </Link>
      </div>
    </div>
  </>
);
