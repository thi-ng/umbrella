<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/ecs](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-ecs.svg?9d9079ab)

[![npm version](https://img.shields.io/npm/v/@thi.ng/ecs.svg)](https://www.npmjs.com/package/@thi.ng/ecs)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/ecs.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
- [Authors](#authors)
- [License](#license)

## About

Entity Component System based around typed arrays & sparse sets.

- Entities are merely numeric identifiers
- Component types:
    - Numeric / vectors are stored as typed array views with customizable striding
    - arbitrary JS values are stored in vanilla JS arrays
- Component grouping w/ optional group ownership to allow re-ordering
  components for optimized iteration
- Systems are plain functions
- Configurable caching of component views: LRU, Unbounded, Null (no-cache)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Becs%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/ecs
```

ESM import:

```ts
import * as ecs from "@thi.ng/ecs";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/ecs"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ecs = await import("@thi.ng/ecs");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.17 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/idgen](https://github.com/thi-ng/umbrella/tree/develop/packages/idgen)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/develop/packages/malloc)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                          | Description                                  | Live demo                                     | Source                                                                     |
|:--------------------------------------------------------------------------------------------------------------------|:---------------------------------------------|:----------------------------------------------|:---------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/> | Entity Component System w/ 100k 3D particles | [Demo](https://demo.thi.ng/umbrella/soa-ecs/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/ecs/)

### Basic usage

```ts tangle:export/readme-1.ts
import { ECS } from "@thi.ng/ecs";

interface CompSpecs {
    pos: Float32Array;
    vel: Float32Array;
    color: string;
}

// init ECS w/ given max number of entities
const ecs = new ECS<CompSpecs>({ capacity: 1000 });

// define components (and their memory layout)
const pos = ecs.defComponent({
    id: "pos",
    type: "f32",
    size: 2,
})!;

const vel = ecs.defComponent({
    id: "vel",
    type: "f32",
    size: 2,
    stride: 4,
    default: () => [Math.random() * 2 - 1, Math.random() * 2 - 1],
})!;

// this component stores string values (not mem-mapped)
const color = ecs.defComponent({
    id: "color",
    default: () => ["red", "green", "blue"][(Math.random() * 3) | 0],
})!;

// define group of given components
// the group will obtain ownership of all by default, meaning
// it is allowed to re-order entities to optimize iteration performance
const group = ecs.defGroup([pos, vel, color]);

// add entities and associate them w/ different components
// if a component is part of a group, the group will be notified/updated
// entities are just numeric IDs assigned using the ECS's internal ID generator
console.log(ecs.defEntity(["pos", "vel", "color"]));
// 0

console.log(ecs.defEntity([pos, vel]));
// 1

console.log(
    ecs.defEntity({
        pos: new Float32Array([1, 2]),
        vel: new Float32Array([-1, 0]),
        color: "orange",
    })
);
// 2

// apply given function to each entity in the group
// note: entity (id=1) is NOT part of the group,
// since it doesn't have a `color` component...
group.forEach((x) => console.log(x));

// Note: The `color` and `vel`ocity of this first item are randomly assigned
// (see component default methods above)

// {
//   id: 0,
//   color: 'green',
//   vel: Float32Array [ 0.16836269199848175, -0.36699679493904114 ],
//   pos: Float32Array [ 0, 0 ]
// }

// {
//   id: 2,
//   color: "orange",
//   vel: Float32Array(2) [ -1, 0 ],
//   pos: Float32Array(2) [ 1, 2 ],
// }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-ecs,
  title = "@thi.ng/ecs",
  author = "Karsten Schmidt",
  note = "https://thi.ng/ecs",
  year = 2019
}
```

## License

&copy; 2019 - 2025 Karsten Schmidt // Apache License 2.0
