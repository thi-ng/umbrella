# @thi.ng/hiccup-svg

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hiccup-svg.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-svg)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

SVG element functions for
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)
&
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom).

This package's functionality was formerly part of
[@thi.ng/hdom-components](https://github.com/thi-ng/umbrella/tree/master/packages/hdom),
but has been extracted to remain more focused.

## Installation

```
yarn add @thi.ng/hiccup-svg
```

## Usage examples

```typescript
import * as svg from "@thi.ng/hiccup-svg";
import { serialize } from "@thi.ng/hiccup";
import * as fs from "fs";

fs.writeFileSync("hello.svg",
    serialize(
        svg.svgdoc({width: 100, height: 100},
            svg.defs(svg.linearGradient("grad", 0, 0, 0, 1, [[0, "red"], [1, "blue"]])),
            svg.circle([50, 50], 50, {fill: "url(#grad)"}),
            svg.text("Hello", [50, 55], { fill: "white", "text-anchor": "middle"})
        )
    ));
```

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
