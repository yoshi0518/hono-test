# Backend

## 開発環境準備

```bash
# ディレクトリ移動
$ cd apps/backend

# .envファイル作成、内容を追記・修正
$ cp .env.sample .env

# パッケージをインストール
$ pnpm i
```

## スクリプト実行方法

```bash
# Type Check
$ pnpm typecheck

# Lint
$ pnpm lint:fix

# Format
$ pnpm fmt:fix

# Dev Server
$ pnpm dev

# Build
$ pnpm build

# Preview
$ pnpm start
```
