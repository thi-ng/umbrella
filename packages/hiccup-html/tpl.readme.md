# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

The following type-checked factory functions are provided _so far_. All
functions take zero or more args with the first one an element specific
attribute object (see
[api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/api.ts#L116)
for common base).

### Supported elements

#### Sections

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/sections.ts)

`address`, `article`, `aside`, `footer`, `header`, `hgroup`, `main`,
`nav`, `section`

#### Text content

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/blocks.ts)

`anchor`, `blockquote`, `div`, `figure`, `figcaption`, `hr`, `para`,
`pre`, `span`

#### Forms / inputs

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/input.ts)

`inputCheck`, `inputNumber`, `inputPass`, `inputRadio`, `inputRange`,
`inputText`, `label`, `option`, `optGroup`, `select`

#### Media

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/media.ts)

`img`

${status}

The current aim is not necessarily to have wrappers for *each* possible
HTML5 element, but certainly to support the most commonly used ones. PRs
welcome!

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts
import { $compile } from "@thi.ng/hdom2020";
import { div, label, option, select } from "@thi.ng/hiccup-html";

const choices = [
    ["#f00", "Red"],
    ["#ff0", "Yellow"],
    ["#0f0", "Green"],
    ["#0ff", "Cyan"],
    ["#00f", "Blue"],
    ["#f0f", "Magenta"],
];

$compile(
    div(
        null,
        label({ for: "colors" }, "Fave color: "),
        select(
            {
                id: "colors",
                onchange: (e) => alert((<HTMLSelectElement>e.target).value),
            },
            option(null, "Please choose..."),
            ...choices.map((x) => option({ value: x[0] }, x[1]))
        )
    )
).mount(document.body);
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
