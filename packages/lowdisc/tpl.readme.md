<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides the following n-dimensional [low-discrepancy
sequence](https://en.wikipedia.org/wiki/Low-discrepancy_sequence) generators,
partially based on the article [The Unreasonable Effectiveness of Quasirandom
Sequences](http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/)
by Martin Roberts.

### Halton

Configurable basis for each dimension:

`haltonND([2,3])`

![2D Halton(2,3) sequence](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lowdisc/ld-halton-small.gif)

### Kronecker

Configurable basis for each dimension:

`kroneckerND([1 / 2 ** 0.5, 1 / 5 ** 0.5])`

![2D Kronecker sequence (Golden ratio)](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lowdisc/ld-kronecker-small.gif)

### R<sub>2</sub> recurrence

Based on Kronecker with each dimension's base automatically derived from the
[Plastic number](https://en.wikipedia.org/wiki/Plastic_number):

`plasticND(2)`

![2D R2 recurrence sequence](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lowdisc/ld-plastic-small.gif)

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
