---
title: 独自メールアドレスを作った
createdAt: 2025-03-11
updatedAt: 2025-04-28
tags:
  - Blog
description: CloudflareのサービスとGmailを利用して独自メールアドレスを作ったので、備忘録。
type: InternalBlog
---

独自メールアドレスって、良いですよね。

そこで利用するのがCloudflareの[Email Routing](https://www.cloudflare.com/ja-jp/developer-platform/products/email-routing/)です。

またGmailと組み合わせて、送受信できるようにします。

基本的に以下の二つの記事を参考にしました。というよりこの記事を見たらできます。が、自身の備忘録としても残しておきます。

https://qiita.com/ikotome/items/3c8fd3d341f1ae072dca

https://zenn.dev/the_exile/articles/cloudflare-gmail-resend

## 前提

- Cloudflareでのドメイン管理
- Gmailアカウントの保持

※　Resendをさらに組み合わせて、より法人向けに利用することもできますが、今はまだ個人利用の域なので省略。

## 手順

### Cloudflareの設定

1. アカウントホームでEmailに利用したいドメインを選択する
2. サイドバーからメールアドレスを選択
3. タブのルーティングルールを選択
4. アドレスの作成

> ![Cloudflare](/asset/blog/create-own-email-address/1.webp)

5. カスタムアドレス > 使用したいローカルパート
6. アクション > メールに送信
7. 宛先 > 転送先のGmailアドレス
8. 保存

:::flex
すると、転送先のGmailに確認メールが届きます。`Verify email address`を押すことで、Cloudflareの画面のGmailのステータスが`確認済み`になります。

> ![Cloudflare](/asset/blog/create-own-email-address/2.webp)
> :::

### Gmailの設定

GmailとCloudflareを連携するのにアプリパスワードを生成する必要があります。アプリパスワードはそのGoogleアカウントで作成しますが、2FAを有効にしていない場合は作成できないので、先に有効にする必要があります。有効にしたら、次にアプリパスワードを生成します。

1. サイドバーからセキュリティを選択
2. 二段階認証プロセスを選択

> ![Gmail](/asset/blog/create-own-email-address/3.webp)

3. 下の方にアプリパスワードを生成するボタンがあるので押す
4. アプリ名は適当でOK
5. 作成する

ここで作成されたアプリパスワードは、二度と表示出来ないので忘れずにメモしてください。

次にGmailを開きます。

:::flex

1. 歯車ボタンを押す
2. すべての設定を表示

> ![Gmail](/asset/blog/create-own-email-address/4.webp)
> ::: 3. アカウントとインポート 4. 名前のところにある**他のメールアドレスを追加**を押す

> ![Gmail](/asset/blog/create-own-email-address/5.webp)

:::flex

5. 名前 > 任意（メールをやり取りする際に表示される）

> ![Gmail](/asset/blog/create-own-email-address/6.webp)
> :::

6. メールアドレス > Cloudflareで作成したメールアドレス
7. エイリアスとして扱う > チェックする
8. 次のステップ
9. 以下の値を入力する

:::flex

| 入力欄       | 入力値           |
| ------------ | ---------------- |
| SMTPサーバー | smtp.gmail.com   |
| ユーザー名   | Googleアカウント |
| パスワード   | アプリパスワード |

> ![Gmail](/asset/blog/create-own-email-address/7.webp)
> ※　ユーザー名はGoogleアカウントのメールアドレスです！

:::

10. アカウントの追加

確認コードがGmailに転送設定した独自ドメインメールに届くので、そのメールにあるリンクをクリックしてください。
