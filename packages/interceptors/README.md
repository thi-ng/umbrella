# @thi.ng/interceptors

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/interceptors.svg)](https://www.npmjs.com/package/@thi.ng/interceptors)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Interceptor based event, side effect & immutable state handling.

## Installation

```bash
yarn add @thi.ng/interceptors
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/master/packages/paths)

## Usage examples

```ts
import * as interceptors from "@thi.ng/interceptors";
```

### Event bus, interceptors, side effects

Description forthcoming. Please check the detailed commented source code
and examples for now:

- [/src/event-bus.ts](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors/src/event-bus.ts)

Introductory:

- [/examples/interceptor-basics](https://github.com/thi-ng/umbrella/tree/master/examples/interceptor-basics) | [live demo](https://demo.thi.ng/umbrella/interceptor-basics)
- [/examples/async-effect](https://github.com/thi-ng/umbrella/tree/master/examples/async-effect) | [live demo](https://demo.thi.ng/umbrella/async-effect)

Advanced:

- [/examples/rstream-dataflow](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-dataflow) | [live demo](https://demo.thi.ng/umbrella/rstream-dataflow)
- [/examples/rstream-grid](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-grid) | [live demo](https://demo.thi.ng/umbrella/rstream-grid)
- [/examples/router-basics](https://github.com/thi-ng/umbrella/tree/master/examples/router-basics) | [live demo](https://demo.thi.ng/umbrella/router-basics)
- [/examples/svg-waveform](https://github.com/thi-ng/umbrella/tree/master/examples/svg-waveform) | [live demo](https://demo.thi.ng/umbrella/svg-waveform)

- [create-hdom-app](https://github.com/thi-ng/create-hdom-app) Yarn project generator. Uses: @thi.ng/atom + hdom + interceptors + router

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
