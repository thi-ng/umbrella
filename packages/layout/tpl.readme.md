<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Currently, this package features two grid layout strategies (each based on
requesting/allocating cells of a desired size), as well as more general
supporting types to define other layout types / implementations using the same
shared API.

A brief overview and comparison of the available strategies is provided further
below.

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

### GridLayout

The `GridLayout` class supports infinite nesting and column/row-based
space allocation, based on an initial configuration and supporting
multiple column/row spans.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/layout/readme-grid.png)

The code producing this layout (incl. the visualization itself):

```ts tangle:export/readme-grid.ts
import * as g from "@thi.ng/geom";
import { gridLayout, type LayoutBox } from "@thi.ng/layout";
import { writeFileSync } from "fs";

// collection of generated layout cells
const cells: g.Group[] = [];

const addRect = (id: number, box: LayoutBox, fill: string) => {
	console.log(box);
	const shape = g.rect([box.x, box.y], [box.w, box.h], { fill });
	cells.push(
		g.group({}, [
			shape,
			g.text(g.centroid(shape)!, "#" + id, {
				fill: "black",
				stroke: "none",
			}),
		])
	);
};

// create a single column layout @ position [10,10], 1000px wide
// the last values are row height and cell spacing
const layout = gridLayout(10, 10, 1000, 1, 60, 4);

// get next layout box (1st row, by default the column/row span is [1,1])
addRect(1, layout.next(), "#fec");
// { x: 10, y: 10, w: 1000, h: 60, cw: 1000, ch: 60, gap: 4, span: [ 1, 1 ] }

// 2nd row
addRect(2, layout.next(), "#fec");
// { x: 10, y: 74, w: 1000, h: 60, cw: 1000, ch: 60, gap: 4, span: [ 1, 1 ] }

// create nested 2-column layout (3rd row)
const twoCols = layout.nest(2);

addRect(3, twoCols.next(), "#cfc");
// { x: 10, y: 138, w: 498, h: 60, cw: 498, ch: 60, gap: 4, span: [ 1, 1 ] }

addRect(4, twoCols.next(), "#cfc");
// { x: 512, y: 138, w: 498, h: 60, cw: 498, ch: 60, gap: 4, span: [ 1, 1 ] }

// now nest 3-columns in the 1st column of twoCols
// (i.e. now each column is 1/6th of the main layout's width)
const inner = twoCols.nest(3);

// allocate with col/rowspan, here 1 column x 4 rows
addRect(5, inner.next([1, 4]), "#9ff");
// { x: 10, y: 202, w: 163.33, h: 252, cw: 163.33, ch: 60, gap: 4, span: [ 1, 4 ] }
addRect(6, inner.next([1, 4]), "#9ff");
// { x: 177.33, y: 202, w: 163.33, h: 252, cw: 163.33, ch: 60, gap: 4, span: [ 1, 4 ] }
addRect(7, inner.next([1, 4]), "#9ff");
// { x: 344.66, y: 202, w: 163.33, h: 252, cw: 163.33, ch: 60, gap: 4, span: [ 1, 4 ] }

// back to twoCols (2nd column)
addRect(8, twoCols.next([1, 2]), "#cfc");
// { x: 512, y: 202, w: 498, h: 124, cw: 498, ch: 60, gap: 4, span: [ 1, 2 ] }

// export as SVG
writeFileSync(
	"export/readme-grid.svg",
	g.asSvg(
		g.svgDoc(
			{
				__bleed: 10,
				font: "12px Menlo, monospace",
				align: "center",
				baseline: "middle",
			},
			...cells
		)
	)
);
```

### StackedLayout

An extension of [GridLayout](#gridlayout) which tracks individual column-based
heights and so can create more complex, irregular, packed, space-filling layout
arrangements. This layout algorithm prioritizes the column(s) with the lowest
height.

This class also provides a
[`.availableSpan()`](https://docs.thi.ng/umbrella/layout/classes/StackedLayout.html#availableSpan)
method to find available space and help equalize columns and fill/allocate any
bottom gaps.

IMPORTANT: As with GridLayout, nested layouts **MUST** be completed first before
requesting new cells (aka `LayoutBoxes`) from a parent, otherwise unintended
overlaps will occur.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/layout/readme-stacked.png)

The code producing this layout (incl. the visualization itself):

```ts tangle:export/readme-stacked.ts
import * as g from "@thi.ng/geom";
import { stackedLayout, type LayoutBox } from "@thi.ng/layout";
import { writeFileSync } from "fs";

// collection of generated layout cells
const cells: g.Group[] = [];

const addRect = (id: number, box: LayoutBox, fill: string) => {
	console.log(box);
	const shape = g.rect([box.x, box.y], [box.w, box.h], { fill });
	cells.push(
		g.group({}, [
			shape,
			g.text(g.centroid(shape)!, "#" + id, {
				fill: "black",
				stroke: "none",
			}),
		])
	);
};

// create a 4-column layout @ position [0,0], 1000px wide
// the last values are row height and cell spacing
const layout = stackedLayout(0, 0, 1000, 4, 60, 4);

// get next layout box (1st column)
addRect(1, layout.next([1, 2]), "#fec");
// { x: 0, y: 0, w: 247, h: 124, cw: 247, ch: 60, gap: 4, span: [ 1, 2 ] }

// 2nd column
addRect(2, layout.next(), "#fec");
// { x: 251, y: 0, w: 247, h: 60, cw: 247, ch: 60, gap: 4, span: [ 1, 1 ] }

// 3rd column
addRect(3, layout.next([1, 4]), "#fec");
// { x: 502, y: 0, w: 247, h: 252, cw: 247, ch: 60, gap: 4, span: [ 1, 4 ] }

// 4th column
addRect(4, layout.next([1, 1]), "#fec");
// { x: 753, y: 0, w: 247, h: 60, cw: 247, ch: 60, gap: 4, span: [ 1, 1 ] }

// 2x2 span
// (note that this will create a gap in the 2nd column)
addRect(5, layout.next([2, 2]), "#fec");
// { x: 0, y: 128, w: 498, h: 124, cw: 247, ch: 60, gap: 4, span: [ 2, 2 ] }

const inner = layout.nest(2);

addRect(6, inner.next([1, 5]), "#cfc");
// { x: 753, y: 64, w: 121.5, h: 316, cw: 121.5, ch: 60, gap: 4, span: [ 1, 5 ] }
addRect(7, inner.next([1, 5]), "#cfc");
// { x: 878.5, y: 64, w: 121.5, h: 316, cw: 121.5, ch: 60, gap: 4, span: [ 1, 5 ] }

// fill available space in the other columns
// (depending on situation, this might have to be done multiple times
// to fill all available space, please consult documentation)
addRect(8, layout.next(layout.availableSpan()), "#9ff");
// { x: 0, y: 256, w: 749, h: 124, cw: 247, ch: 60, gap: 4, span: [ 3, 2 ] }

// export as SVG
writeFileSync(
	"export/readme-stacked.svg",
	g.asSvg(
		g.svgDoc(
			{
				__bleed: 10,
				font: "12px Menlo, monospace",
				align: "center",
				baseline: "middle",
			},
			...cells
		)
	)
);
```

<!-- include ../../assets/tpl/footer.md -->
