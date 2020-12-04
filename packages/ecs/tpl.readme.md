# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

- Entities are merely numeric identifiers
- Component types:
    - Numeric / vectors are stored as typed array views with customizable striding
    - arbitrary JS values are stored in vanilla JS arrays
- Component grouping w/ optional group ownership to allow re-ordering
  components for optimized iteration
- Systems are plain functions
- Configurable caching of component views: LRU, Unbounded, Null (no-cache)

${status}

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
