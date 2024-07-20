<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/trie](https://media.thi.ng/umbrella/banners-20230807/thing-trie.svg?0795a323)

[![npm version](https://img.shields.io/npm/v/@thi.ng/trie.svg)](https://www.npmjs.com/package/@thi.ng/trie)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/trie.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 192 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [TrieMap](#triemap)
  - [MultiTrie](#multitrie)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

TODO.

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/associative](https://thi.ng/associative) package.

### TrieMap

[Tries](https://en.wikipedia.org/wiki/Trie) (also called Prefix maps) are useful
data structures for search based use cases, auto-complete, text indexing etc.
and provide partial key matching (prefixes), suffix iteration for a common
prefix, longest matching prefix queries etc.

The implementations here too feature ES6 Map-like API, similar to other types in
this package, with some further trie-specific additions.

```ts
import { defTrieMap } from "@thi.ng/associative";

const trie = defTrieMap([
  ["hey", "en"],
  ["hello", "en"],
  ["hallo", "de"],
  ["hallo", "de-at"],
  ["hola", "es"],
  ["hold", "en"],
  ["hej", "se"],
]);

trie.knownPrefix("hole")
// "hol"

[...trie.suffixes("he")]
// [ "j", "llo", "y" ]

// w/ prefix included
[...trie.suffixes("he", true)]
// [ "hej", "hello", "hey" ]
```

### MultiTrie

The `MultiTrie` is similar to `TrieMap`, but supports array-like keys and
multiple values per key. Values are stored in sets whose implementation can be
configured via ctor options.

```ts
import { defMultiTrie } from "@thi.ng/associative";

// init w/ custom value set type (here only for illustration)
const t = defMultiTrie<string[], string>(null, { vals: () => new ArraySet() });

t.add("to be or not to be".split(" "), 1);
t.add("to be or not to be".split(" "), 2);
t.add("to be and to live".split(" "), 3);

t.get("to be or not to be".split(" "))
// Set(2) { 1, 2 }

t.knownPrefix(["to", "be", "not"]);
// [ "to", "be" ]

// auto-complete w/ custom separator between words
[...t.suffixes(["to", "be"], false, "/")]
// [ "and/to/live", "or/not/to/be" ]
```

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btrie%5D+in%3Atitle)

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

Package sizes (brotli'd, pre-treeshake): ESM: 1.01 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

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
  year = 2024
}
```

## License

&copy; 2024 Karsten Schmidt // Apache License 2.0
