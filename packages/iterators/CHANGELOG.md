# @thi.ng/iterators changelog

## 3.1.0 (2017-12-12)

- Add `groupBy()`
- Add optional key fn for `frequencies()`
- Update package structure (build commands & target dirs)

## 3.0.1 (2017-07-30)

- Update readme

## 3.0.0 (2017-07-30)

- Package name change `thing-iterators` => `@thi.ng/iterators`
- Add `fork()`
- Breaking change `cached()` API (now same as `fork()`)

## 2.0.0 (2017-07-07)

- All functions are defined as sub-modules and exposed as default exports. This is an additional feature. The full library can still be imported as before.
- Function sub-modules use *Kebab case* whereas function names are in *Camel case*.
