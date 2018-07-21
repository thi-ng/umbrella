# @thi.ng/range-coder

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/range-coder.svg)](https://www.npmjs.com/package/@thi.ng/range-coder)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Range encoder / decoder for binary data, based on [Java implementation
by Joe Halliwell](https://www.winterwell.com/software/compressor.php).

## Installation

```bash
yarn add @thi.ng/range-coder
```

## Dependencies

- [@thi.ng/bitstream](https://github.com/thi-ng/umbrella/tree/master/packages/bitstream)

## API

```ts
import * as rc "@thi.ng/range-coder";
```

```ts
// prepare dummy data
src = new Uint8Array(1024);
src.set([1,1,1,1,1,2,2,2,2,3,3,3,4,4,5,4,4,3,3,3,2,2,2,2,1,1,1,1,1], 512);

// pack data
packed = rc.encodeBytes(src);

packed.length
// 146

packed.length/src.length
// 0.142578125

// unpack
dest = rc.decodeBytes(packed);
```

## Authors

- Karsten Schmidt

## License

&copy; 2017 Karsten Schmidt // Apache Software License 2.0
