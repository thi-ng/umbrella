<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

The
package provides different buffer implementations to control blocking behaviors
and backpressure handling (aka attempting to write faster than
values are being read, essentially a memory management issue).

### Buffering behaviors

The following buffer types/behaviors are included, all accepting a max. capacity
and all implementing the
[IReadWriteBuffer](https://docs.thi.ng/umbrella/buffers/interfaces/IReadWriteBuffer.html)
interface:

- [`fifo`](https://docs.thi.ng/umbrella/buffers/functions/fifo.html): First in,
  first out ring buffer.
- [`lifo`](https://docs.thi.ng/umbrella/buffers/functions/lifo.html): Last in,
  first out. Write behavior is the same as with `fifo`, reads are in reverse
  order (as the name indicates), i.e. the last value written will be the first
  value read (i.e. stack behavior).
- [`sliding`](https://docs.thi.ng/umbrella/buffers/functions/sliding.html):
  Sliding window ring buffer. Whilst the buffer is at full capacity, new
  writes will first expunge the oldest buffered value (similar to [LRU
  cache](https://github.com/thi-ng/umbrella/blob/develop/packages/cache/README.md#lru)
  behavior). Read behavior is the same as for `fifo`.
- [`dropping`](https://docs.thi.ng/umbrella/buffers/functions/dropping.html):
  Dropping value ring buffer. Whilst the buffer is at full capacity, new writes
  will be silently ignored. Read behavior is the same as for `fifo`.

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
