<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

- Entities are merely numeric identifiers
- Component types:
    - Numeric / vectors are stored as typed array views with customizable striding
    - arbitrary JS values are stored in vanilla JS arrays
- Component grouping w/ optional group ownership to allow re-ordering
  components for optimized iteration
- Systems are plain functions
- Configurable caching of component views: LRU, Unbounded, Null (no-cache)

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
