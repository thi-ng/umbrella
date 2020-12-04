# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

${status}

#### HIC SUNT DRACONES

This is still a young project. Even though most of the overall approach,
component lifecycle and API are fairly stable by now (after ~70 commits
over several months), so far there's only sparing documentation and only
a handful of public examples. After some more user feedback, there's
likely going to be further refactoring required here and there, none of
which is _expected_ to cause breaking changes in this core package and
will likely come in the form of additions or alternatives to existing
control structures (unless they would be entirely subsuming current
features/approaches)...

#### @thi.ng/atom integration

For the sake of deduplication of functionality and to keep the number of
dependencies to a minimum, direct
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
integration has been removed in favor of using relevant
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
constructs, which can be used as lightweight adapters, i.e.:

- [`fromAtom()`](https://github.com/thi-ng/umbrella/blob/develop/packages/rstream/src/from/atom.ts)
- [`fromView()`](https://github.com/thi-ng/umbrella/blob/develop/packages/rstream/src/from/view.ts)

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

TODO

Currently, documentation only exists in the form of small examples and
various doc strings (incomplete). I'm working to alleviate this
situation ASAP... In that respect, PRs are welcome as well!

```ts
import { $compile } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { cycle, map } from "@thi.ng/transducers";

// reactive value
const bg = reactive("gray");

// color options (infinite iterable)
const colors = cycle(["magenta", "yellow", "cyan"]);

// event handler
const nextColor = () => bg.next(<string>colors.next().value);

// define component tree in hiccup syntax, compile & mount component.
// each time `bg` value changes, only subscribed bits will be updated
// i.e. title, the button's `style.background` and its label

// Note: instead of direct hiccup syntax, you could also use the
// element functions provided by https://thi.ng/hiccup-html
$compile([
    "div",
    {},
    // transformed color as title (aka derived view)
    ["h1", {}, bg.transform(map((col) => `Hello, ${col}!`))],
    [
        // tag with Emmet-style ID & classes
        "button#foo.w4.pa3.bn",
        {
            // reactive CSS background property
            style: { background: bg },
            onclick: nextColor,
        },
        // reactive button label
        bg,
    ],
]).mount(document.body);
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
