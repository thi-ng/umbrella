<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/text-analysis](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-text-analysis.svg?b15f54da)

[![npm version](https://img.shields.io/npm/v/@thi.ng/text-analysis.svg)](https://www.npmjs.com/package/@thi.ng/text-analysis)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/text-analysis.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 213 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Code example](#code-example)
- [Authors](#authors)
- [License](#license)

## About

Text tokenization, transformation & analysis transducers, utilities, stop words, porter stemming, vector encodings, similarities.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btext-analysis%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/text-analysis
```

ESM import:

```ts
import * as ta from "@thi.ng/text-analysis";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/text-analysis"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ta = await import("@thi.ng/text-analysis");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.37 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/bidir-index](https://github.com/thi-ng/umbrella/tree/develop/packages/bidir-index)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/distance](https://github.com/thi-ng/umbrella/tree/develop/packages/distance)
- [@thi.ng/k-means](https://github.com/thi-ng/umbrella/tree/develop/packages/k-means)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/text-analysis/)

### Code example

> [!NOTE]
> For illustrative purposes only! Due to the active nature of the larger project
> repo, example results/output might vary since this code was written
> originally...

```ts tangle:export/readme-1.ts
import { files, readJSON } from "@thi.ng/file-io";
import {
    centralTerms,
    encodeAllDense,
    filterDocsIDF,
    JACCARD_DIST_DENSE,
    kmeansDense,
    sortedFrequencies,
} from "@thi.ng/text-analysis";

// read package files of all ~210 umbrella libraries
const packages = [...files("packages", "package.json")].map((file) => {
    const { name, keywords = [] } = readJSON(file);
    return { id: name, tags: keywords };
});

// remove tags from each package which are too common and don't contribute
// meaningful information (using inverse document frequency)
const filteredTags = filterDocsIDF(
    packages.map((x) => x.tags),
    // filter predicate using arbitrary threshold
    (_, idf) => idf > 1
);

// create an index of all remaining unique tags (vocab) and use this index to
// encode each package's tags as dense multi-hot vectors
const { vocab: allTags, docs: encodedPkgs } = encodeAllDense(filteredTags);

// show index/vocab size. all document vectors have this size/dimensionality
console.log("unique tags", allTags.size);
// unique tags 747

// show the top 10 tags used across all packages
console.log("top 10 tags:", centralTerms(allTags, 10, encodedPkgs));
// top 10 tags: [
//   "iterator", "canvas", "typedarray", "hiccup", "tree",
//   "graph", "parser", "codegen", "random", "vector"
// ]

// alternative approach (using a reducer) to extract top 10 tags with counts
console.log(
    "sorted freq:",
    sortedFrequencies(filteredTags.flat()).slice(0, 10)
);
// sorted freq: [
//   ["iterator", 20], ["canvas", 20], ["typedarray", 19], ["tree", 18], ["hiccup", 18],
//   ["graph", 17], ["parser", 16], ["codegen", 16], ["vector", 15], ["random", 15]
// ]

// cluster packages using k-means with Jaccard distance metric
const clusters = kmeansDense(20, encodedPkgs, { dist: JACCARD_DIST_DENSE });

// display cluster info
for (let { id, docs, items } of clusters) {
    console.log(`cluster #${id} size: ${docs.length}`);
    console.log(`top 5 tags:`, centralTerms(allTags, 5, docs));
    console.log(`pkgs:`, items.map((i) => packages[i].id).join(", "));
}

// cluster #0 size: 10
// top 5 tags: [ "color", "image", "rgb", "palette", "css" ]
// pkgs: @thi.ng/blurhash, @thi.ng/color, @thi.ng/color-palettes, @thi.ng/hdiff, @thi.ng/imago,
// @thi.ng/meta-css, @thi.ng/pixel, @thi.ng/pixel-analysis, @thi.ng/pixel-dominant-colors
// @thi.ng/porter-duff
//
// cluster #1 size: 10
// top 5 tags: [ "vector", "simulation", "time", "physics", "interpolation" ]
// pkgs: @thi.ng/boids, @thi.ng/cellular, @thi.ng/dlogic, @thi.ng/dual-algebra,
// @thi.ng/pixel-flow, @thi.ng/text-analysis, @thi.ng/timestep, @thi.ng/vclock,
// @thi.ng/vectors, @thi.ng/wasm-api-schedule
//
// cluster #2 size: 19
// top 5 tags: [ "canvas", "shader", "webgl", "shader-ast", "codegen" ]
// pkgs: @thi.ng/canvas, @thi.ng/dl-asset, @thi.ng/hdom-canvas, @thi.ng/hiccup-css,
// @thi.ng/hiccup-html-parse, @thi.ng/imgui, @thi.ng/layout, @thi.ng/mime,
// @thi.ng/rdom-canvas, @thi.ng/scenegraph, @thi.ng/shader-ast, @thi.ng/shader-ast-glsl,
// @thi.ng/shader-ast-js, @thi.ng/shader-ast-optimize, @thi.ng/wasm-api-canvas,
// @thi.ng/wasm-api-webgl, @thi.ng/webgl, @thi.ng/webgl-msdf, @thi.ng/webgl-shadertoy
// ...
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-text-analysis,
  title = "@thi.ng/text-analysis",
  author = "Karsten Schmidt",
  note = "https://thi.ng/text-analysis",
  year = 2021
}
```

## License

&copy; 2021 - 2026 Karsten Schmidt // Apache License 2.0
