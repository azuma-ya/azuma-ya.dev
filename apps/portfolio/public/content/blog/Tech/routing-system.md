---
title: Azuma-ya.devのブログシステム
createdAt: 2025-05-15
updatedAt: 2025-05-15
tags: 
    - Blog
description: Azuma-ya.devのブログシステム（ルーティングシステム）について紹介します。
type: InternalBlog
---

このブログはMarkdownファイルを使用し、githubを用いて管理しています。ブログはpublicのblogディレクトリはいかに配置されており、ファイル名が、URLに対応するように実装されています。今回は、そのblogディレクトリ配下におけるルーティングシステムについて紹介します。

## 要件

- ファイル名が、URLのSlugに対応させたい。
- 階層構造のあるカテゴリを実装したい。
- サブページを持たせたい。
- コンテンツの管理として、グルーピングできるようにしたい。（表示には影響なし）

## ルーティングシステムの仕組み

当ブログでは、コンテンツの整理と管理が容易になるルーティングシステムを独自に実装しています。ディレクトリ構造はコンテンツの整理に役立ちますが、URLには反映されません。サブページのみがURLの階層構造を形成します。

### カテゴリ（ディレクトリ名）

カテゴリはディレクトリ名に対応しています。ディレクトリ構造は階層カテゴリの役割を果たし、同じ名前のカテゴリでも、親カテゴリによって異なる意味を持ちます。例えば、`Frontend/React`と`Backend/React`は同じ`React`という名前でも、それぞれフロントエンドとバックエンドの文脈で異なるカテゴリとして扱われます。

```
/content/blog/Tech/programming.md → /blogs/programming
/content/blog/Life/travel.md → /blogs/travel
```

階層化されたディレクトリ構造はコンテンツの整理に重要です：

```
/content/blog/Tech/Frontend/react-hooks.md → /blogs/react-hooks
/content/blog/Tech/Backend/express-middleware.md → /blogs/express-middleware
```

上記の例では、`Frontend`カテゴリと`Backend`カテゴリによってコンテンツが明確に区別され、整理されています。これにより、コンテンツの管理が容易になります。なお、これらのディレクトリ構造はURLには反映されません。

### サブページ（ドット区切りのファイル名）

サブページはファイル名をドット（.）で区切ることで表現します。これにより、一つのトピックに関連する複数のページを論理的にグループ化でき、URLも階層化されます。

例：
```
/content/blog/Tech/nextjs.md → /blogs/nextjs
/content/blog/Tech/nextjs.setup.md → /blogs/nextjs/setup
/content/blog/Tech/nextjs.advanced.md → /blogs/nextjs/advanced
```

この例では、`nextjs.setup.md`と`nextjs.advanced.md`は`nextjs`の関連ページとして扱われ、URLでは`/nextjs/setup`と`/nextjs/advanced`というパスになります。ディレクトリ名（`Tech`）はURLに反映されていません。

### グルーピング（丸括弧で囲ったディレクトリ）

グルーピングは、丸括弧（）で囲ったディレクトリを使用します。これはURLには影響せず、純粋にコンテンツの管理・整理のための機能です。

例：
```
/content/blog/Tech/(React)/component.md → /blogs/component
/content/blog/Tech/(React)/hooks.md → /blogs/hooks
```

この例では、`(React)`ディレクトリは単にファイルシステム上でのグループ化のために使用され、URLには一切反映されません。

## 複合的な例

これらのルールを組み合わせることで、柔軟なコンテンツ構造を実現できます：

```
/content/blog/Tech/(Frontend)/react.basics.md → /blogs/react/basics
/content/blog/Tech/(Frontend)/react.hooks.md → /blogs/react/hooks
/content/blog/Tech/(Backend)/(Database)/mysql.setup.md → /blogs/mysql/setup
```

