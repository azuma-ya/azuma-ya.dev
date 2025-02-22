# Azuma-ya.life

このリポジトリでは自身のポートフォリオサイトや、いくつかの関連するアプリケーションの構築をしています。構築には[Turborepo](https://turborepo.org/)を使用しており、[Cloudflare](https://cloudflare.com/)でデプロイしています。

Website URL: https://azuma-ya.life

## プロジェクト構成

このプロジェクトは以下のような構成になっています：

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

### 必要要件

- Node.js >= 20.0.0
- Bun 1.1.37以上

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