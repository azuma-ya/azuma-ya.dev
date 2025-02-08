---
title: 'Second Blog Post'
createdAt: '2024-02-06'
tags: ['blog', 'second']
description: 'This is my second blog post'
type: 'InternalBlog'

---

# Second Blog Post

This is my second blog post content.

```ts
const a = 1;
console.log(a);
```

```python 
a = 1
print(a)
```

```ts
import React from "react";
import uniquePropHOC from "./lib/unique-prop-hoc";

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

class Expire extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: props.children }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                component: null
            });
        }, this.props.time || this.props.seconds * 1000);
    }
    render() {
        return this.state.component;
    }
}

export default uniquePropHOC(["time", "seconds"])(Expire);
```

| Column A | Column B |
| -------- | -------- |
| Item A1  | Item B1  |
| Item A2  | Item B2  |

![Alt text](/asset/blog/first-blog/icon.jpg)