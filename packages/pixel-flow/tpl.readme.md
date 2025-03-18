<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package is a TypeScript port of an old 2008 Processing project,
implementing a homemade [Optical
Flow](https://en.wikipedia.org/wiki/Optical_flow) approach created for a
gestural user interface system for Nokia retail stores.

The algorithm is only single channel and not very scalable (in terms of image
resolutions), but provides good & stable results for its intended purposes, and
without requiring a massive 12MB dependency like OpenCV. YMMV... Using the
default config, a 320x240 frame takes ~10ms to process on a MBA M1 2021.

A short 40 second video demonstration (from 2008), first showing the low-res
flow field and averaged movement vector, then adding a 3D cube being rotated via
hand movments:

https://github.com/user-attachments/assets/7929dee1-b78e-4fd2-8756-129b5db14c58

### Alogrithm description

The algorithm requires a previous and current frame. The flow field is obtained
by sampling the current frame at a given `step` distance. For each of these
sample/grid positions a kernel window is being swept/applied to compute the
differences to the previous frame. To compute these difference, the previous
frame is offset multiple times in both X/Y directions in the `[-displace,
+displace]` interval. The kernel computes the summed absolute difference for
each of these displaced window regions and selects the window with the minimum
change. The relative (displacement) position of that minimum is the flow vector
for that cell, which will then be linearly interpolated to apply temporal
smoothing of the field (configurable) and minimize jittering.

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
