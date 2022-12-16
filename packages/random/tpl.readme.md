<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides the `IRandom` interface and various (mostly seedable)
pseudo-random number generator implementations, incl. `IRandom` wrappers for
`Math.random()` and `window.crypto`:

- [Crypto](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/crypto.ts)
- [SFC32](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/sfc32.ts)
- [Smush32](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/smush32.ts)
- [System](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/system.ts)
- [Xoshiro128](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/xoshiro128.ts)
- [XorShift128](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/xorshift128.ts)
- [XorWow](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/xorwow.ts)
- [XsAdd](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/xsadd.ts)

Partially ported from C implementations taken from [c.thi.ng](http://c.thi.ng).

### Random distributions

- [`exponential()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/exponential.ts)
- [`gaussian()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/gaussian.ts)
- [`geometric()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/geometric.ts)
- [`normal()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/normal.ts)
- [`uniform()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/uniform.ts)

### Other utilities

- [`coin()` / `fairCoin()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/coin.ts)
- [`pickRandom()` / `pickRandomKey()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/pick-random.ts)
- [`randomBytes()` / `randomBytesFrom()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/random-bytes.ts)
- [`randomID()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/random-id.ts)
- [`weightedRandom()` / `weightedRandomKey()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/weighted-random.ts)
- [`uniqueIndices()` / `uniqueValuesFrom()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/unique-indices.ts)
- [`uuidv4Bytes()` / `uuid()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/uuid.ts)

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

```ts
import { Smush32 } from "@thi.ng/random";

const rnd = new Smush32(0xdecafbad);

// the following methods are available for all generators

// next uint (0 .. 2^32-1)
rnd.int()
// 4022849029

// next float [0.0 .. 1.0)
rnd.float()
// 0.2698542904737066

// next normalized float (w/ opt scale)
// [-scale .. +scale)
rnd.norm(100)
// 57.70723665079737

// next float in given interval [min .. max)
rnd.minmax(10, 20)
// 15.295951807707537

rnd.minmaxInt(10, 20)
```

<!-- include ../../assets/tpl/footer.md -->
