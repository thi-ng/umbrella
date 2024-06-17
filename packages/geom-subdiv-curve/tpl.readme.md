<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

```ts
import * as gsc from "@thi.ng/geom-subdiv-curve";

gsc.subdivide([[0,0], [100,0], [100,100], [0,100]], [gsc.SUBDIV_CHAIKIN], true);
```

<!-- include ../../assets/tpl/footer.md -->
