<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}} Please consult these packages' READMEs for further
background information...

### General usage

As with most thi.ng/rdom components, the state (aka geometry/scenegraph) for the
canvas component is being sourced from a
[thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
subscription. The canvas redraws every time that subscription delivers a new
value. The size of the canvas can be given as a subscription too and if so will
also automatically trigger resizing of the canvas.

The geometry to rendered to the canvas is expressed as
[thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/),
specifically the flavor used by
[thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas),
which (not just coincidentally) is the same as also used by
[thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
shapes.

```ts tangle:export/readme1.ts
import { circle, group } from "@thi.ng/geom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";

// create geometry stream/subscription
const geo = fromRAF().map((t) =>
  // shape group w/ attribs (also see section in readme)
  group({ __background: "#0ff" }, [
	// create 10 circles
    ...repeatedly(
      (i) =>
        circle(
          [
            Math.sin(t * 0.01 + i * 0.5) * 150 + 300,
            Math.sin(t * 0.03 + i * 0.5) * 150 + 300
          ],
          50,
		  // colors can be given as RGBA vectors or CSS
          { fill: [i * 0.1, 0, i * 0.05] }
        ),
      10
    )
  ])
);

// create & mount canvas component (w/ fixed size)
$canvas(geo, [600, 600]).mount(document.body);
```

### Control attributes

The root shape/group support the following special attributes:

- `__background`: background color. If given, fills the canvas will given color
  before drawing
- `__clear`: clear background flag. If true clears the canvas before drawing

Also see relevant section in the [thi.ng/hiccup-canvas
README](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-canvas/README.md#special-attributes)...

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

TODO

<!-- include ../../assets/tpl/footer.md -->
