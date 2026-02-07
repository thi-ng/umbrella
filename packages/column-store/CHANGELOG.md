# Change Log

- **Last updated**: 2026-02-07T14:15:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
