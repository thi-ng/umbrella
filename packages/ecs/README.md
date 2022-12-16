<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/ecs](https://media.thi.ng/umbrella/banners-20220914/thing-ecs.svg?3a60ea80)

[![npm version](https://img.shields.io/npm/v/@thi.ng/ecs.svg)](https://www.npmjs.com/package/@thi.ng/ecs)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/ecs.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic concepts](#basic-concepts)
- [Authors](#authors)
- [License](#license)

## About

Entity Component System based around typed arrays & sparse sets

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

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/ecs"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const ecs = await import("@thi.ng/ecs");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.86 KB

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
- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                          | Description                                  | Live demo                                     | Source                                                                     |
|:--------------------------------------------------------------------------------------------------------------------|:---------------------------------------------|:----------------------------------------------|:---------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/> | Entity Component System w/ 100k 3D particles | [Demo](https://demo.thi.ng/umbrella/soa-ecs/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/ecs/)

### Basic concepts

```ts
import { ECS } from "@thi.ng/ecs";

interface ComSpecs {
    pos: Float32Array;
    vel: Float32Array;
    color: string;
}

// init ECS w/ given max number of entities
const ecs = new ECS<CompSpecs>(1000);

// define components (and their memory layout)
const pos = ecs.defComponent({
    id: "pos",
    type: Type.F32,
    size: 2
});

const vel = ecs.defComponent({
    id: "vel",
    type: Type.F32,
    size: 2,
    stride: 4
    default: () => [Math.random()*2-1, Math.random()*2-1]
});

// this component stores string values (not mem-mapped)
const color = ecs.defComponent({
    id: "color",
    default: () => ["red","green","blue"][(Math.random()*3)|0]
});

// define group of given components
// the group will obtain ownership of all by default, meaning
// it is allowed to re-order entities to optimize iteration performance
const group = ecs.defGroup([pos, vel, color]);

// add entities and associate them w/ different components
// if a component is part of a group, the group will be notified/updated
ecs.defEntity(["pos", "vel", "color"]);

ecs.defEntity([pos, vel]);

ecs.defEntity({
    pos: [1, 2],
    vel: [-1, 0],
    color: "red"
});

// apply given function to each entity in the group
// note: entity (id=1) is NOT part of the group,
// since it doesn't have a `color` component...
group.forEach((x) => console.log(x));
// {
//   id: 0,
//   color: 'green',
//   vel: Float32Array [ 0.16836269199848175, -0.36699679493904114 ],
//   pos: Float32Array [ 0, 0 ]
// }
// {
//   id: 2,
//   color: 'blue',
//   vel: Float32Array [ -0.7642428278923035, -0.43176573514938354 ],
//   pos: Float32Array [ 0, 0 ]
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

&copy; 2019 - 2022 Karsten Schmidt // Apache License 2.0
