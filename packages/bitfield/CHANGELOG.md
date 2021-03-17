# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.4.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@0.4.5...@thi.ng/bitfield@0.4.6) (2021-03-17)

**Note:** Version bump only for package @thi.ng/bitfield





## [0.4.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@0.4.4...@thi.ng/bitfield@0.4.5) (2021-03-12)

**Note:** Version bump only for package @thi.ng/bitfield





# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@0.3.30...@thi.ng/bitfield@0.4.0) (2021-02-20)


### Features

* **bitfield:** add row/column extracts, popcounts, rename factories ([0c4c112](https://github.com/thi-ng/umbrella/commit/0c4c1127cbb9bd6fb071837adef2d7b65e2de533))


### BREAKING CHANGES

* **bitfield:** rename factory fns to follow umbrella-wide naming conventions

- rename bitField() => defBitField()
- rename bitMatrix() => defBitMatrix()
- add BitMatrix.row()/column() bitfield extraction
- add BitMatrix.popCountRow/Column()
- add BitField.popCount()
- update masks in bit accessors
- update BitField ctor & accessors to allow numbers (not just booleans)





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@0.2.8...@thi.ng/bitfield@0.3.0) (2020-03-06)


### Features

* **bitfield:** add and/or/xor/not() methods, add IClear, ICopy impls ([52d3005](https://github.com/thi-ng/umbrella/commit/52d3005281c90b89d41d3b2504e3eb47cafa6e03))
* **bitfield:** add toggleAt(), setRange(), update ctor ([6ed20c1](https://github.com/thi-ng/umbrella/commit/6ed20c13768fe3bdd38990ee79c865a13775fc2d))





# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@0.1.12...@thi.ng/bitfield@0.2.0) (2019-09-21)

### Features

* **bitfield:** update BitMatrix to support non-squared sizes, update docstrings ([0fd8620](https://github.com/thi-ng/umbrella/commit/0fd8620))

# 0.1.0 (2019-02-17)

### Features

* **bitfield:** add new package ([5e17fd1](https://github.com/thi-ng/umbrella/commit/5e17fd1))
* **bitfield:** add/update resize() & setAt(), add doc strings ([f227107](https://github.com/thi-ng/umbrella/commit/f227107))
