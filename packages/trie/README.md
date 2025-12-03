<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/trie](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-trie.svg?0795a323)

[![npm version](https://img.shields.io/npm/v/@thi.ng/trie.svg)](https://www.npmjs.com/package/@thi.ng/trie)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/trie.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 211 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [TrieMap](#triemap)
  - [MultiTrie](#multitrie)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Trie-based ES6-like Map data structures with prefix search/query support.

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/associative](https://thi.ng/associative) package.

### TrieMap

[Tries](https://en.wikipedia.org/wiki/Trie) (also called Prefix maps) are useful
data structures for search based use cases, auto-complete, text indexing etc.
and provide partial key matching (prefixes), suffix iteration for a common
prefix, longest matching prefix queries etc.

The implementations here too feature ES6 Map-like API, similar to other types in
this package, with some further trie-specific additions.

```ts tangle:export/readme-1.ts
import { defTrieMap } from "@thi.ng/trie";

// construct trie from given key-value pairs (optional)
const trie = defTrieMap([
  ["hey", "en"],
  ["hello", "en"],
  ["hallo", "de"],
  ["hallo", "de-at"],
  ["hola", "es"],
  ["hold", "en"],
  ["hej", "se"],
]);

// find longest known prefix given key
console.log(trie.knownPrefix("hole"));
// "hol"

// all known keys
console.log([...trie.keys()])
// [ "hold", "hola", "hallo", "hej", "hello", "hey" ]

// all keys starting with given prefix
console.log([...trie.keys("he")])
// [ "hej", "hello", "hey" ]

// suffixes of given key only
console.log([...trie.keys("he", false)])
// [ "j", "llo", "y" ]

// values of keys starting with prefix
console.log([...trie.values("hol")]);
// [ "en", "es" ]
```

### MultiTrie

The `MultiTrie` is similar to `TrieMap`, but uses array-like keys and supports
multiple values per key. Values are stored in sets whose implementation can be
configured via ctor options (e.g. using custom ES6-like Sets with value-based
equality semantics from the [thi.ng/associative](https://thi.ng/associative)
package).

```ts tangle:export/readme-2.ts
import { defMultiTrie } from "@thi.ng/trie";
import { ArraySet } from "@thi.ng/associative";

// init w/ custom value set type (here purely for illustration)
const t = defMultiTrie<string, string>(null, { values: () => new ArraySet() });

t.add("to be or not to be".split(" "), 1);
t.add("to be or not to be".split(" "), 2);
t.add("to be and to live".split(" "), 3);

console.log(t.get("to be or not to be".split(" ")))
// Set(2) { 1, 2 }

console.log(t.knownPrefix(["to", "be", "not"]));
// [ "to", "be" ]

// suffixes for given prefix
console.log([...t.keys(["to", "be"], false)]);
// [["and", "to", "live"], ["or", "not", "to", "be"]]
```

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btrie%5D+in%3Atitle)

## Related packages

- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative) - ES Map/Set-compatible implementations with customizable equality semantics & supporting operations

## Installation

```bash
yarn add @thi.ng/trie
```

ESM import:

```ts
import * as trie from "@thi.ng/trie";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/trie"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const trie = await import("@thi.ng/trie");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.14 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/trie/)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-trie,
  title = "@thi.ng/trie",
  author = "Karsten Schmidt",
  note = "https://thi.ng/trie",
  year = 2020
}
```

## License

&copy; 2020 - 2025 Karsten Schmidt // Apache License 2.0
