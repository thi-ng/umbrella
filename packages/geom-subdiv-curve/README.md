<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-subdiv-curve](https://media.thi.ng/umbrella/banners-20230807/thing-geom-subdiv-curve.svg?3e6600db)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-subdiv-curve.svg)](https://www.npmjs.com/package/@thi.ng/geom-subdiv-curve)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-subdiv-curve.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 199 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Available subdivision schemes](#available-subdivision-schemes)
    - [Chaikin subdivision](#chaikin-subdivision)
    - [Cubic subdivision](#cubic-subdivision)
    - [Dyn-Levin-Gregory subdivision](#dyn-levin-gregory-subdivision)
    - [Displacement subdivision](#displacement-subdivision)
    - [Split at midpoints](#split-at-midpoints)
    - [Split at thirds](#split-at-thirds)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Freely customizable, iterative nD subdivision curves for open / closed geometries. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

Based in principle on:

- [Generating subdivision curves with L−systems on a
  GPU](http://algorithmicbotany.org/papers/subgpu.sig2003.pdf)
- Clojure version [thi.ng/geom-clj](http://thi.ng/geom-clj).

### Available subdivision schemes

The following schemes are available as presets and their effects illustrated.

#### Chaikin subdivision

[`SUBDIV_CHAIKIN`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_CHAIKIN.html) is supported for open & closed geometries.

![SUBDIV_CHAIKIN preset on open geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-chaikin-open.png)

![SUBDIV_CHAIKIN preset on closed geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-chaikin-closed.png)

#### Cubic subdivision

[`SUBDIV_CUBIC`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_CUBIC.html)
is only supported for closed geometries (at current).

![SUBDIV_CUBIC preset on closed geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-cubic-closed.png)

#### Dyn-Levin-Gregory subdivision

[`SUBDIV_DLG`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_DLG.html)
is only supported for closed geometries (at current).

![SUBDIV_DLG preset on closed geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-dlg-closed.png)

#### Displacement subdivision

[`SUBDIV_DISPLACE`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_DISPLACE.html) is a higher order, customizable subdivision and supported for open & closed geometries.

![SUBDIV_DISPLACE preset on open geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-displace-open.png)

![SUBDIV_DISPLACE preset on closed geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-displace-closed.png)

#### Split at midpoints

[`SUBDIV_MID`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_MID.html) is supported for open & closed geometries.

![SUBDIV_MID preset on open geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-mid-open.png)

![SUBDIV_MID preset on closed geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-mid-closed.png)

#### Split at thirds

[`SUBDIV_THIRDS`](https://docs.thi.ng/umbrella/geom-subdiv-curve/variables/SUBDIV_THIRDS.html) is supported for open & closed geometries.

![SUBDIV_THIRDS preset on open geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-thirds-open.png)

![SUBDIV_THIRDS preset on closed geometry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-subdiv-curve/subdiv-thirds-closed.png)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-subdiv-curve%5D+in%3Atitle)

## Related packages

- [@thi.ng/geom-splines](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-splines) - nD cubic & quadratic curve analysis, conversion, interpolation, splitting

## Installation

```bash
yarn add @thi.ng/geom-subdiv-curve
```

ESM import:

```ts
import * as gsc from "@thi.ng/geom-subdiv-curve";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-subdiv-curve"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gsc = await import("@thi.ng/geom-subdiv-curve");
```

Package sizes (brotli'd, pre-treeshake): ESM: 801 bytes

## Dependencies

- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-subdiv-curve/)

```ts
import * as gsc from "@thi.ng/geom-subdiv-curve";

gsc.subdivide([[0,0], [100,0], [100,100], [0,100]], [gsc.SUBDIV_CHAIKIN], true);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-subdiv-curve,
  title = "@thi.ng/geom-subdiv-curve",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-subdiv-curve",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
