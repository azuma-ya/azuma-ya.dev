---
title: 'Markdownのすすめ'
createdAt: '2024-02-06'
tags: 
    - 'Blog'
    - 'Markdown'
description: 'Azuma-ya.lifeが使用できるMarkdownの記法と使い方をまとめてみました。'
type: 'InternalBlog'
---

## 1. 見出し
Markdown では `#` を使って見出しを作成できます。

```md
# H1 見出し
## H2 見出し
### H3 見出し
#### H4 見出し
##### H5 見出し
###### H6 見出し
```

---

## 2. 強調
テキストを強調するには `*` または `_` を使用します。

```md
*斜体* または _斜体_
**太字** または __太字__
~~取り消し線~~
```

*斜体* または _斜体_  
**太字** または __太字__  
~~取り消し線~~

---

## 3. リスト

### 3.1. 箇条書きリスト（Unordered List）
```md
- リスト項目 1
  - ネストされた項目 1-1
  - ネストされた項目 1-2
- リスト項目 2
```

- リスト項目 1
  - ネストされた項目 1-1
  - ネストされた項目 1-2
- リスト項目 2

---

### 3.2. 番号付きリスト（Ordered List）
```md
1. 項目 1
2. 項目 2
   1. サブ項目 2-1
   2. サブ項目 2-2
3. 項目 3
```

1. 項目 1
2. 項目 2
   1. サブ項目 2-1
   2. サブ項目 2-2
3. 項目 3

---

## 4. テーブル
```md
| 名前  | 年齢 | 職業 |
|------|----|----|
| 太郎  | 25 | エンジニア |
| 花子  | 30 | デザイナー |
| 次郎  | 28 | マーケター |
```

| 名前  | 年齢 | 職業 |
|------|----|----|
| 太郎  | 25 | エンジニア |
| 花子  | 30 | デザイナー |
| 次郎  | 28 | マーケター |

---

## 5. コードブロック

### 5.1. インラインコード
```md
これは `console.log("Hello World!");` という JavaScript のコードです。
```

これは `console.log("Hello World!");` という JavaScript のコードです。

---

### 5.2. シンタックスハイライト付きコードブロック

#### JavaScript
```js
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("World"));
```

#### Python
```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

#### HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>サンプルページ</title>
</head>
<body>
    <h1>こんにちは、世界！</h1>
</body>
</html>
```

#### SQL
```sql
SELECT name, age, job
FROM users
WHERE age >= 25
ORDER BY age DESC;
```

#### C言語
```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

---

## 6. 引用（Blockquote）
```md
> これは引用です。
> Markdown では `>` を使って記述できます。
```

> これは引用です。  
> Markdown では `>` を使って記述できます。

---

## 7. リンクと画像

### 7.1. リンク
```md
[Google](https://www.google.com)
```
[Google](https://www.google.com)

### 7.2. 画像
```md
![Azuma-ya](/asset/blog/markdown/image.webp)
```
![Azuma-ya](/asset/blog/markdown/image.webp)

---

## 8. タスクリスト（To-Do リスト）
```md
- [x] タスク 1
- [ ] タスク 2
- [ ] タスク 3
    - [ ] タスク 4
    - [ ] タスク 5
```

- [x] タスク 1
- [ ] タスク 2
- [ ] タスク 3
    - [ ] タスク 4
    - [ ] タスク 5

---

## 9. Block Math

```latex
$$
\begin{align*}
    H(X) &= - \sum_{x \in \mathcal{X}} p(x) \log p(x)\\
    H(X, Y) &= - \sum_{x \in \mathcal{X}} \sum_{y \in \mathcal{Y}} p(x, y) \log p(x, y)\\
    H(Y | X) & = \sum_{x \in \mathcal{X}} p(x) H(Y | X = x)                                      \\
		         & = - \sum_{x \in \mathcal{X}} p(x) \sum_{y \in \mathcal{Y}} p(y | x) \log p(y | x) \\
		         & = - \sum_{x \in \mathcal{X}} \sum_{y \in \mathcal{Y}} p(x, y) \log p(y | x)       \\
		         & = -E \log p(Y|X)\\
    H(X, Y) &= H(X) + H(Y | X)
\end{align*}
$$
```

$$
\begin{align*}
    H(X) &= - \sum_{x \in \mathcal{X}} p(x) \log p(x)\\
    H(X, Y) &= - \sum_{x \in \mathcal{X}} \sum_{y \in \mathcal{Y}} p(x, y) \log p(x, y)\\
    H(Y | X) & = \sum_{x \in \mathcal{X}} p(x) H(Y | X = x)                                      \\
		         & = - \sum_{x \in \mathcal{X}} p(x) \sum_{y \in \mathcal{Y}} p(y | x) \log p(y | x) \\
		         & = - \sum_{x \in \mathcal{X}} \sum_{y \in \mathcal{Y}} p(x, y) \log p(y | x)       \\
		         & = -E \log p(Y|X)\\
    H(X, Y) &= H(X) + H(Y | X)
\end{align*}
$$

---

## 10. Inline Math

```latex
エントロピーのチェイン則とは、$X$ と $Y$ の曖昧さ$H(X, Y)$は、$X$ の知ることの曖昧さ$H(X)$に、$X$ を知ったうえで、$Y$ の知ることの曖昧さ $H(Y | X)$を足したものと言うことである。
```
エントロピーのチェイン則とは、$X$ と $Y$ の曖昧さ $H(X, Y)$ は、$X$ の知ることの曖昧さ $H(X)$に、$X$ を知ったうえで、$Y$ の知ることの曖昧さ $H(Y | X)$ を足したものと言うことである。

---

## 11. Flex
```md
:::flex
![Azuma-ya](/asset/blog/markdown/image.webp)
Flexコンテナは要素を横並びに配置できます。画像やテキストを効率的にレイアウトする際に便利です。

このように、複数の要素を等間隔で配置することができます。レスポンシブデザインにも対応しています。
:::
```

:::flex 
![Azuma-ya](/asset/blog/markdown/image.webp)
Flexコンテナは要素を横並びに配置できます。画像やテキストを効率的にレイアウトする際に便利です。

このように、複数の要素を等間隔で配置することができます。レスポンシブデザインにも対応しています。
:::