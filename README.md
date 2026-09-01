# Azuma-ya.dev

このリポジトリでは自身のポートフォリオサイトや、いくつかの関連するアプリケーションの構築をしている。

Website URL: https://azuma-ya.dev

## プロジェクト構成

このプロジェクトは以下のような構成になっている

```
├── apps/          # アプリケーション
│   ├── portfolio/ # ポートフォリオサイト
│   └── ...        # その他のアプリケーション
└── packages/      # 共有パッケージ
```

## 技術スタック

- フレームワーク: Next.js
- 言語: TypeScript
- パッケージマネージャー: Bun
- モノレポ管理: Turborepo
- デプロイ: Cloudflare

## 開発方法

### セットアップ

```bash
bun install
```

### 開発サーバーの起動

```bash
bun run dev
```

### ビルド

```bash
bun run build        # 全てのアプリケーションをビルド
# または
bun run portfolio:build  # ポートフォリオのみビルド
```

### コードチェック

```bash
bun check
```