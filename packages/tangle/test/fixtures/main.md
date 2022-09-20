---
publish: out/main.md
tangle: out
---
# Tangle test

```ts tangle:ex01/src/index.ts
<<lib.md#imports>>

const foo: number = 42;

<<lib.md#parametric { "hello": "world" }>>

<<ex01b>>

console.log(foo + bar);
```

## Introduction

```ts id:ex01b tangle:ex01/src/bar.ts publish:no
<<internal>>
export const bar = 23;
```

Once upon a time...

## Chapter 1

```ts id:internal publish:no
/** @internal **/
```

**TODO**

## Misc

```ts id:escaped
// escaping tangle markers
const rgb = 0xff \<\< 24 | (0xaabbccdd >> 8);
```

```ts noweb:no
// no expansion here
<<escaped>>
```

## Credits

&copy; 2022
