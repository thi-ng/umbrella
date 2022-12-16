<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Attempts to determine display pixel density via `window.devicePixelRatio`
(default 1.0) and resizes canvas accordingly. I.e. If DPR != 1.0, attaches
explicit `width` and `height` CSS properties to force canvas to given CSS pixel
size, and resizes canvas pixel buffer itself based on DPR (e.g. 2x size).

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
import { adaptDPI, isHighDPI } from "@thi.ng/adapt-dpi";

const canvas = document.createElement("canvas");

adaptDPI(canvas, 640, 480);

if (isHighDPI()) {
    // ...
}
```

<!-- include ../../assets/tpl/footer.md -->
