<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package already covers ~80-90% of the HTML Canvas2D features and provides
some additional drawing utilities to minimize boilerplate & WASM/JS cross-calling.

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

### Zig bindings

- [api.zig](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-canvas/zig/api.zig)
- [lib.zig](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-canvas/zig/lib.zig)

### Minimal example

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/wasm-api-canvas/readme.png)

```zig
const canvas2d = @import("wasm-api-canvas");
const dom = @import("wasm-api-dom");

// ...

const canvas = dom.createCanvas(&.{
    .width = 320,
    .height = 320,
    .parent = dom.body,
    .index = 0,
});

// start using this canvas
canvas2d.beginCtx(canvas);

// set fill color (any CSS color)
canvas2d.setFill("#f0f");

// draw a triangle
canvas2d.beginPath();
canvas2d.moveTo(250, 50);
canvas2d.moveTo(150, 250);
canvas2d.moveTo(50, 100);
canvas2d.fill();

// (could also be shortened via this helper:)
// canvas2d.polyline(&.{ .{ 250, 50 }, .{ 150, 250 }, .{ 50, 100 } }, true);

// pre-define gradient
const gradient = canvas2d.createLinearGradient(0, 0, 0, 100, &.{
    .{ .pos = 0.0, .color = "#ff0" },
    .{ .pos = 1.0, .color = "#0ff" },
});
// use gradient as fill color
canvas2d.setGradientFill(gradient);

// configure & draw text
canvas2d.setFont("100px Menlo");
canvas2d.setTextBaseline(.top);
canvas2d.fillText("HELLO", 10, 10, 0);

// create a bitmap pattern (ABGR pixel format)
const pixels = [4]u32{ 0xff000000, 0, 0, 0xff000000 };
const pattern = canvas2d.createPattern(&pixels, 2, 2, .repeat);
// use pattern as fill color
canvas2d.setPatternFill(pattern);
canvas2d.fillText("WORLD", 10, 120, 0);
```

<!-- include ../../assets/tpl/footer.md -->
