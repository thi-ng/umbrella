# @thi.ng/umbrella

Mono-repository for thi.ng TypeScript/ES6 projects.

## Projects

| Projects | Version |
|----|----|
| [`@thi.ng/api`](./packages/api) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/api.svg)](https://www.npmjs.com/package/@thi.ng/api) |
| [`@thi.ng/bitstream`](./packages/bitstream) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/bitstream.svg)](https://www.npmjs.com/package/@thi.ng/bitstream) |
| [`@thi.ng/checks`](./packages/checks) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/checks.svg)](https://www.npmjs.com/package/@thi.ng/checks) |
| [`@thi.ng/csp`](./packages/csp) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/csp.svg)](https://www.npmjs.com/package/@thi.ng/csp) |
| [`@thi.ng/dcons`](./packages/dcons) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/dcons.svg)](https://www.npmjs.com/package/@thi.ng/dcons) |
| [`@thi.ng/hiccup`](./packages/hiccup) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hiccup.svg)](https://www.npmjs.com/package/@thi.ng/hiccup) |
| [`@thi.ng/iterators`](./packages/iterators) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/iterators.svg)](https://www.npmjs.com/package/@thi.ng/iterators) |
| [`@thi.ng/rle-pack`](./packages/rle-pack) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rle-pack.svg)](https://www.npmjs.com/package/@thi.ng/rle-pack) |
| [`@thi.ng/rstream`](./packages/rstream) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream.svg)](https://www.npmjs.com/package/@thi.ng/rstream) |
| [`@thi.ng/rstream-log`](./packages/rstream-log) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log) |
| [`@thi.ng/transducers`](./packages/transducers) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/transducers.svg)](https://www.npmjs.com/package/@thi.ng/transducers) |
| [`@thi.ng/unionfind`](./packages/unionfind) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/unionfind.svg)](https://www.npmjs.com/package/@thi.ng/unionfind) |

## Building

```
git clone https://github.com/thi-ng/umbrella.git
cd umbrella
yarn install
lerna bootstrap
lerna exec yarn build --sort
```

### Testing

```
lerna exec yarn test
# or individually
lerna exec yarn test --scope @thi.ng/checks
```
