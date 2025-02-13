---
title: 個人ブログを作ったので初記事を書く
createdAt: 2024-02-06
updatedAt: 2024-02-13
tags: 
    - Blog
    - Next.js
description: 個人ブログを作成して最初の記事です。ポートフォリオサイトの制作について紹介しています。
type: InternalBlog
---

## ポートフォリオサイト兼ブログを作った

個人ブログを作ったといっても、以前からポートフォリオサイトやブログ自体はすでにありました。今回はそれらのリニューアルで、サイト自体も0から作ったし、ブログも0から書いていきたいと考えています。なのでまぁ、初記事といっても差し支えないでしょう。

## Azuma-ya.life を支える技術

- [TypeScript](https://www.typescriptlang.org/)
必須です。もう型がなければ生きていけない体になってしまいました。
- [React](https://react.dev/)、[Next.js](https://nextjs.org/)
メインフレームワーク。よく使っています。
- [Cloudflare Pages](https://pages.cloudflare.com/)
デプロイ先です。
- [Contentlayer](https://contentlayer.dev/)
mdファイルの管理に使用しています。
- [unified.js](https://unifiedjs.com/)、[remark](https://github.com/remarkjs/remark?tab=readme-ov-file#syntax-tree)、[rehype](https://github.com/rehypejs/rehype)
Markdownをhtmlに変換するために利用しています。今回は[React Markdwon](https://github.com/remarkjs/react-markdown)も利用しました。

### Markdownの変換

いままでにReact Markdownを使用したことはあったのですが、今回は独自記法も採用したかったので、remark、rehypeに入門してみました。入門といっても、ほんのさわりしかしていないので、理解はしていません。

```md
                                                           react-markdown
         +----------------------------------------------------------------------------------------------------------------+
         |                                                                                                                |
         |  +----------+        +----------------+        +---------------+       +----------------+       +------------+ |
         |  |          |        |                |        |               |       |                |       |            | |
markdown-+->+  remark  +-mdast->+ remark plugins +-mdast->+ remark-rehype +-hast->+ rehype plugins +-hast->+ components +-+->react elements
         |  |          |        |                |        |               |       |                |       |            | |
         |  +----------+        +----------------+        +---------------+       +----------------+       +------------+ |
         |                                                                                                                |
         +----------------------------------------------------------------------------------------------------------------+
```

今回実装したのは上記の

- remark plugins
- remark-rehypeのhandlers
- components

です。

#### Remark plugins

ここのプラグインで独自記法を検知して、mdastに変換します。検知といっても、今回行ったのはremark directiveライブラリを利用して、カスタムディレクティブを実装したくらいです。
今後はより自分好みな記法を実装したいですね。

#### Remark-rehypeのhandlers

remark-rehypeのhandlersで、mdastをhastに変換します。独自実装したmdastを対応するhtmlの構文木に直す必要があるためです。

#### Components

remark-rehypeのhandlersで、独自記法を直接htmlに直しても大丈夫なのですが、せっかくなのでreact componentsを実装しそれを利用することにしました。

そのため、remark-rehypeのhandlersでは独自記法のMarkdownを独自のhtmlタグに直しています。

### Markdownのレンダリング

以下のページにAzuma-ya.lifeで利用できるMarkdownの記法についてまとめています。

https://azuma-ya.life/blogs/markdown

## 終わりに

頑張ってブログ投稿していきます。