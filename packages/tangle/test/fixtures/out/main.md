---
publish: out/main.md
tangle: out
---
# Tangle test

```ts
// @ts-ignore
import type { Fn } from "@thi.ng/api";

const foo: number = 42;

export const hello = "Hi, world!";

/** @internal **/
export const bar = 23;

console.log(foo + bar);
```

## Introduction


Once upon a time...

## Chapter 1


**TODO**

## Misc

```ts
// escaping tangle markers
const rgb = 0xff << 24 | (0xaabbccdd >> 8);
```

```ts
// no expansion here
<<escaped>>
```

## Credits

&copy; 2022