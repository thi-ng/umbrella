# @thi.ng/hiccup-css

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hiccup-css.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-css)

## About

CSS as nested data structures.

## Installation

```
yarn add @thi.ng/hiccup-css
```

## Usage examples

```typescript
import { css, FORMATS } from "@thi.ng/hiccup-css";

css(["#foo",
        { background: "#eee" },
        ["h1", { "font-size": "2em" }, ["small", { color: "#999"}]],
        ["h2", "h3", [".title", { "font-weight": 700 }]]],
    FORMATS.pretty);
```

```css
#foo h1 small {
    color: #999;
}
#foo h1 {
    font-size: 2em;
}
#foo h2.title, #foo h3.title {
    font-weight: 700;
}
#foo {
    background: #eee;
}
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0