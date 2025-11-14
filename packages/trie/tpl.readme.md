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
