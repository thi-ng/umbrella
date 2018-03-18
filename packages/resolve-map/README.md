# @thi.ng/resolve-map

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/resolve-map.svg)](https://www.npmjs.com/package/@thi.ng/resolve-map)

## About

DAG resolution of vanilla objects & arrays with internally linked
values.

It's common practice to use nested JS objects for configuration
purposes. Frequently some values in the object are copies or
derivatives of other values, which can lead to mistakes during
refactoring and/or duplication of effort.

To avoid these issues, this library provides the ability to define
single sources of truth, create references (links) to these values and a
provide a resolution mechanism to recursively expand their real values
and/or compute derived values. Both absolute & relative references are
supported.

See
[source](https://github.com/thi-ng/umbrella/tree/master/packages/resolve-map/src/index.ts#L8)
&
[tests](https://github.com/thi-ng/umbrella/tree/master/packages/resolve-map/test/index.ts)
for further details.

## Installation

```
yarn add @thi.ng/resolve-map
```

## Usage examples

```typescript
import { resolveMap } from "@thi.ng/resolve-map";

resolveMap({
    colors: {
        bg: "white",
        text: "black",
        selected: "red",
    },
    main: {
        fontsizes: [12, 16, 20]
    },
    button: {
        bg: "->/colors.text",
        label: "->/colors.bg",
        fontsize: (resolve) => `${resolve("main.fontsizes.0")}px`,
    },
    buttonPrimary: {
        bg: "->/colors.selected",
        label: "->/button.label",
        fontsize: (resolve) => `${resolve("main.fontsizes.2")}px`,
    }
})
// {
//     colors: {
//         bg: "white",
//         text: "black",
//         selected: "red"
//     },
//     main: {
//         fontsizes: [ 12, 16, 20 ]
//     },
//     button: {
//         "bg": "black",
//         "label": "white",
//         "fontsize": "12px"
//     },
//     buttonPrimary: {
//         bg: "red",
//         label: "black",
//         fontsize: "20px"
//     }
// }
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
