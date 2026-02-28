# Change Log

- **Last updated**: 2026-02-28T12:21:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.7.1) (2026-02-28)

#### ⏱ Performance improvements

- update query ops to only iterate already selected rows (if possible) ([9492ead](https://github.com/thi-ng/umbrella/commit/9492ead))
  - add QueryCtx iterable support, iterate bitfield if available
  - update all query ops to iterate via ctx/bitfield
  - add short-circuit to fail query if current op produced no results

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.7.0) (2026-02-26)

#### 🚀 Features

- update `addColumn()` logic to prefill existing rows with defaults ([2fc5887](https://github.com/thi-ng/umbrella/commit/2fc5887))
  - add `IColumn.ensureRows()`, add all impls
  - update `Table.addColumn()`
  - update `Table.validateColumnSpec()`
  - add tests for all column types

### [0.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.6.1) (2026-02-25)

#### 🩹 Bug fixes

- internal update `updateBitmap()`, use currect row keys for index ([f8a1c21](https://github.com/thi-ng/umbrella/commit/f8a1c21))
  - add `Table.load()` tests (which are using this function)

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.6.0) (2026-02-25)

#### 🚀 Features

- add `IColumn.lastIndexOf()`, add `Bitfield.last()`, update column types ([6fce8c0](https://github.com/thi-ng/umbrella/commit/6fce8c0))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.5.0) (2026-02-25)

#### 🚀 Features

- add table generics (column schema) and supporting types ([a10abba](https://github.com/thi-ng/umbrella/commit/a10abba))
  - add generics for `Table`, `SerializedTable`, `Query`, `ColumnSchema`, all column types
  - update signatures for `.getRow()`, `.getPartialRow()`
- add `rowRange()` query operator, add`BitField.fill()` ([03e6633](https://github.com/thi-ng/umbrella/commit/03e6633))
- add `valueRange()` query operator ([1c4320e](https://github.com/thi-ng/umbrella/commit/1c4320e))
  - add `IColumn.findIndex()` / `.findLastIndex()`
    - implement in for `AColumn`
  - fix null handling in `__indexOfTuple()`
  - add range clamping in various `indexOf` fns and `Bitfield.first()`
  - add/update tests
- add column type check for `valueRange()` op ([58f235f](https://github.com/thi-ng/umbrella/commit/58f235f))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.4.0) (2026-02-13)

#### 🚀 Features

- add `Bitfield.first()` ([790cb3c](https://github.com/thi-ng/umbrella/commit/790cb3c))
- add `IColumn.indexOf()`, add impls for all column types ([3901eec](https://github.com/thi-ng/umbrella/commit/3901eec))
- add `Table.indexOf()`, fix vector impl, update tests ([164c67e](https://github.com/thi-ng/umbrella/commit/164c67e))
- update `validateColumnSpec()` ([8aa82bf](https://github.com/thi-ng/umbrella/commit/8aa82bf))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.3.0) (2026-02-13)

#### 🚀 Features

- add missing vec column types, dedupe & update serialization ([203f302](https://github.com/thi-ng/umbrella/commit/203f302))
- include `__row` ID in all query results, update `Table.getRow()` ([d3abdd6](https://github.com/thi-ng/umbrella/commit/d3abdd6))
  - update `Table.getRow()`/`Table.getPartialRow()` to optionally include `__row` ID
  - update query results to include `__row` ID
  - update tests

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.2.0) (2026-02-12)

#### 🚀 Features

- add `VectorColumn` types, refactor `IColumn` & query engine ([90a6ff1](https://github.com/thi-ng/umbrella/commit/90a6ff1))
- add/update RLE handling for plain & dict columns ([16f1d1d](https://github.com/thi-ng/umbrella/commit/16f1d1d))

#### 🩹 Bug fixes

- update TypedArrayColumn.valueKey() ([7f5f430](https://github.com/thi-ng/umbrella/commit/7f5f430))

#### ♻️ Refactoring

- migrate/dedupe LIMITS, update RLE handling ([6b9f916](https://github.com/thi-ng/umbrella/commit/6b9f916))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.1.2) (2026-02-08)

#### 🩹 Bug fixes

- update `.updateBitmap()` ([a71b5e1](https://github.com/thi-ng/umbrella/commit/a71b5e1))

#### ⏱ Performance improvements

- optimize query negation ops (NAND/NOR) ([bc83a8a](https://github.com/thi-ng/umbrella/commit/bc83a8a))
  - add `QueryCtx.mergeInvMask()` to merge inverted bitmask,
    avoiding extraneous iteration via `.invertMask()` if possible
  - update query ops

#### ♻️ Refactoring

- move query term pre-check to `Query.addTerm()` ([ce06c59](https://github.com/thi-ng/umbrella/commit/ce06c59))
- rename tuple-based column types ([5111f88](https://github.com/thi-ng/umbrella/commit/5111f88))
  - rename `ArrayColumn` => `TupleColumn`
  - rename `DictArrayColumn` => `DictTupleColumn`

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/column-store@0.1.0) (2026-02-07)

#### 🚀 Features

- import as new pkg ([8d2c0fd](https://github.com/thi-ng/umbrella/commit/8d2c0fd))
- update column types/impls ([1277001](https://github.com/thi-ng/umbrella/commit/1277001))
- add Query class/engine w/ extensible operators ([f9cee7d](https://github.com/thi-ng/umbrella/commit/f9cee7d))
  - add Query, QueryCtx, QueryTerm
  - add execQueryTerm() multi-method
  - add bitmap based query term impls:
    - `or`/`nor`
    - `and`/`nand`
- add query ops for plain/non-bitmap columns ([f66a56c](https://github.com/thi-ng/umbrella/commit/f66a56c))
- major update query API & impl ([814ffd1](https://github.com/thi-ng/umbrella/commit/814ffd1))
  - migrate query related type to api.ts
  - update query ops format
  - add `matchColumn`, `matchPartialRow`, `matchRow` ops
  - add `registerQueryOp()` to register custom ops
  - add fluent API syntax sugar for built-in query ops
  - add `Table.getPartialRow()`
  - update table row getters
- minor updates Table API ([420eec7](https://github.com/thi-ng/umbrella/commit/420eec7))
  - add `.query()` syntax sugar
  - add `.addRows()`
  - minor internal `.length` refactoring
- also rebuild dictionairies in enum columns when re-indexing ([c02fd75](https://github.com/thi-ng/umbrella/commit/c02fd75))
- add `IColumn.replaceValue()` & impls ([05e8c66](https://github.com/thi-ng/umbrella/commit/05e8c66))
- update `BitmapIndex`, extract `Bitfield` wrapper ([729ab87](https://github.com/thi-ng/umbrella/commit/729ab87))
  - optimize `.replaceValue()` impls
- add `TableOpts` and support for customizable colum type impls ([c1c9cee](https://github.com/thi-ng/umbrella/commit/c1c9cee))
  - add `TableOpts`
  - update `Table` ctor and `.load()`
  - extract `defaultColumnFactory()`
- update support for customizable column types ([2c9bc7d](https://github.com/thi-ng/umbrella/commit/2c9bc7d))
  - add `ColumnTypeSpec`, `COLUMN_TYPES` registry and `registerColumnType()`
  - remove `defaultColumnFactory()`
- add FLAG_RLE and RLE (de)serialization ([041dd92](https://github.com/thi-ng/umbrella/commit/041dd92))
  - add RLE support for dict & typedarray column types
- add removeColumn(), minor refactoring ([a733f29](https://github.com/thi-ng/umbrella/commit/a733f29))

#### 🩹 Bug fixes

- update array column value encoding ([c40cf87](https://github.com/thi-ng/umbrella/commit/c40cf87))
- update column value validators ([3c430e0](https://github.com/thi-ng/umbrella/commit/3c430e0))
- update TypedArrayColumn.validate() ([d6aaeb6](https://github.com/thi-ng/umbrella/commit/d6aaeb6))
- disable FLAG_RLE for f32/f64 column types ([f2f14c3](https://github.com/thi-ng/umbrella/commit/f2f14c3))

#### ♻️ Refactoring

- make Query an iterable ([c372b29](https://github.com/thi-ng/umbrella/commit/c372b29))
- rename FLAG_ENUM and enum column types ([4bea40b](https://github.com/thi-ng/umbrella/commit/4bea40b))
- simplify row validation ([5172db2](https://github.com/thi-ng/umbrella/commit/5172db2))
  - add `IColumn.validate()`, migrate validations to column impls
  - simplify `Table.validateRow()`
  - add validation helpers
- update `Bitfield` and `BitmapIndex`, simplify `Query`, add docs ([40aebff](https://github.com/thi-ng/umbrella/commit/40aebff))
- update default value handling ([435e42b](https://github.com/thi-ng/umbrella/commit/435e42b))
- rename FLAG_ENUM => FLAG_DICT ([de9b00f](https://github.com/thi-ng/umbrella/commit/de9b00f))
- rename dict-based column types ([5a5b5ba](https://github.com/thi-ng/umbrella/commit/5a5b5ba))
- update typedarray colum value validation ([2b14435](https://github.com/thi-ng/umbrella/commit/2b14435))
