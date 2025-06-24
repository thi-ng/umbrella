<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/pixel](https://thi.ng/pixel) package.

### Dominant color extraction

The package provides several methods to extract the dominant colors from a given image:

- [`dominantColorsKmeans()`](https://docs.thi.ng/umbrella/pixel/functions/dominantColorsKmeans.html)
uses [k-means clustering](https://github.com/thi-ng/umbrella/tree/develop/packages/k-means)
- [`dominantColorsMeanCut()`](https://docs.thi.ng/umbrella/pixel/functions/dominantColorsMeanCut.html)
- [`dominantColorsMedianCut()`](https://docs.thi.ng/umbrella/pixel/functions/dominantColorsMedianCut.html)

In all cases the clustering can be configured. The functions return an array of
`{ color, area }` objects (sorted by descending area), where `color` is a
cluster's dominant color (in the format of the source image) and `area` the
normalized cluster size (number of selected pixels over total number of pixels
in the image).

Also see the [dominant colors example project & online
tool](https://demo.thi.ng/umbrella/dominant-colors/) based on this function.
Furthermore, the
[thi.ng/color-palettes](https://github.com/thi-ng/umbrella/tree/develop/packages/color-palettes)
package provides 200+ curated color themes extracted from images using this
function...

![Example image & extracted dominant colors](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/dominant-colors-01.jpg)

<small>Picture credit: [/u/kristophershinn](https://www.reddit.com/r/EarthPorn/comments/j3z0f6/fall_in_yosemite_valley_oc3186_3983/)</small>

```ts tangle:export/readme.ts
import { floatBuffer, FLOAT_RGB } from "@thi.ng/pixel";
import { dominantColors } from "@thi.ng/pixel-dominant-colors";
import { read } from "@thi.ng/pixel-io-netpbm";
import { readFileSync } from "node:fs";

// read test PPM image and convert into float RGB format
const img = floatBuffer(read(readFileSync(`test.ppm`)), FLOAT_RGB);

// extract 5 dominant color clusters
const clusters = dominantColors(img, 5);

console.log(clusters);
// [
//   {
//     color: [ 0.4000000059604645, 0.30980393290519714, 0.21176470816135406 ],
//     area: 0.3141084558823529
//   },
//   {
//     color: [ 0.21960784494876862, 0.19607843458652496, 0.1411764770746231 ],
//     area: 0.2780330882352941
//   },
//   {
//     color: [ 0.4156862795352936, 0.4745098054409027, 0.5647059082984924 ],
//     area: 0.16620710784313725
//   },
//   {
//     color: [ 0.6666666865348816, 0.7568627595901489, 0.9254902005195618 ],
//     area: 0.12385110294117647
//   },
//   {
//     color: [ 0.7176470756530762, 0.4745098054409027, 0.12941177189350128 ],
//     area: 0.11780024509803921
//   }
// ]
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
