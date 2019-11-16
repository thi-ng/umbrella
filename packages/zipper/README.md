# @thi.ng/zipper

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/zipper.svg)](https://www.npmjs.com/package/@thi.ng/zipper)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/zipper.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Functional tree editing, manipulation & navigation, based on my fork and
optimizations to
[fast-zip](https://github.com/postspectacular/fast-zip), which in turn
is based on
[clojure.zip](https://clojure.github.io/clojure/clojure.zip-api.html).
https://en.wikipedia.org/wiki/Zipper_(data_structure)

## Installation

```bash
yarn add @thi.ng/zipper
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/master/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)

## Usage examples

```ts
import { arrayZip } from "@thi.ng/zipper";

const x = [1, [5, 4, 3, 2], 6];

const a = z.arrayZipper(x);
// navigate to `3` and remove it, then append `7` and apply changes
a.next().next().down().rightmost().left().remove().up().up().appendChild(7).root()
// [ 1, [ 5, 4, 2 ], 6, 7 ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2015 - 2019 Karsten Schmidt // Apache Software License 2.0
