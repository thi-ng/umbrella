<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
