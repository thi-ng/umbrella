# Change Log

- **Last updated**: 2023-06-29T08:54:28Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.4.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.10) (2023-06-29)

#### 🩹 Bug fixes

- temporarily disable `WasmLibOpts.out` due to Zig build updates ([cf63c04](https://github.com/thi-ng/umbrella/commit/cf63c04))

#### ♻️ Refactoring

- Zig v0.11-dev syntax updates ([83a1c7b](https://github.com/thi-ng/umbrella/commit/83a1c7b))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.0) (2023-02-17)

#### 🚀 Features

- add build script for Zig v0.11.0-dev ([4c8abcb](https://github.com/thi-ng/umbrella/commit/4c8abcb))

#### ♻️ Refactoring

- update build-v0.11.zig build script ([fe7c24c](https://github.com/thi-ng/umbrella/commit/fe7c24c))
  - single source of truth for core module names
  - rename .mode => .optimize (as per new zig nomenclature)
  - add autodoc generation option

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.3.0) (2023-02-05)

#### 🚀 Features

- add ManagedIndex.initCapacity() ([788dfa2](https://github.com/thi-ng/umbrella/commit/788dfa2))
- add WasmType.instanceArray(), add docs ([2adf65f](https://github.com/thi-ng/umbrella/commit/2adf65f))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.2.0) (2022-12-01)

#### 🚀 Features

- add build script for user projects ([7164f5e](https://github.com/thi-ng/umbrella/commit/7164f5e))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.1.0) (2022-11-28)

#### 🚀 Features

- update panic handler, add event support ([ab940d9](https://github.com/thi-ng/umbrella/commit/ab940d9))
  - update panic handler to broadcast event w/ panic message
  - only throw Panic error if no listeners could be notified
  - add `EVENT_PANIC` constant

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.0.0) (2022-11-23)

#### 🛑 Breaking changes

- remove codegen parts ([188f56b](https://github.com/thi-ng/umbrella/commit/188f56b))
- BREAKING CHANGE: all codegen parts migrated to new pkg: [@thi.ng/wasm-api-bindgen](https://github.com/thi-ng/umbrella/tree/main/packages/wasm-api-bindgen)
  - remove all obsolete types, deps & files
  - see [2c02dc674](https://github.com/thi-ng/umbrella/commit/2c02dc674) for start of new pkg

#### 🚀 Features

- add hexdump methods ([95c91ed](https://github.com/thi-ng/umbrella/commit/95c91ed))
  - add printHexdump()/hexdump()
- add/update printHexdump() ([65efaf4](https://github.com/thi-ng/umbrella/commit/65efaf4))
  - migrate printHexdump() to WASM core API
- add WasmStringSlice.setAlloc() ([b0f6f9d](https://github.com/thi-ng/umbrella/commit/b0f6f9d))
- add function pointer & i/usize codegen support ([2e67bc5](https://github.com/thi-ng/umbrella/commit/2e67bc5))
  - add FuncPointer top-level type for codegen
  - add isize/usize type aliases
  - extend/refactor all codegens
  - update WasmTarget & presets
- add opaque pointer support ([83d4b94](https://github.com/thi-ng/umbrella/commit/83d4b94))
- add optional pointer support ([92a28e7](https://github.com/thi-ng/umbrella/commit/92a28e7))
  - update ZIG codegen
- add codegen IDs, conditionally skip code generation ([7146cae](https://github.com/thi-ng/umbrella/commit/7146cae))
  - add ICodeGen.id & update codegens
  - add TopLevelType.skip option to suppress generation for some langs
  - update generateTypes()
- update & rename pkg (formerly wasm-api-timer) ([668f3dd](https://github.com/thi-ng/umbrella/commit/668f3dd))
  - rename types form `TimerXXX` => `ScheduleXXX`
  - add WASM auto-initializer hook
  - update readmes
- update string handling & default string type ([86dee41](https://github.com/thi-ng/umbrella/commit/86dee41))
  - update WasmStringSlice & WasmStringPtr
  - update .setAlloc() impls
  - update Zig code gen to use `[:0]const u8` as default string format
    for easier interop and compatibility w/ `extern struct`s
- update generated types & string handling ([686f867](https://github.com/thi-ng/umbrella/commit/686f867))
  - switch to extern structs for generated types
  - switch to zero-terminated pointers for string values
  - update/rename/simplify API methods, remove obsolete
  - fix string attrib handling/alloc sizes
- add JSON schema for codegen typedefs ([1291c5c](https://github.com/thi-ng/umbrella/commit/1291c5c))
- switch to `extern struct/union` only, add slice polyfills ([ca65edc](https://github.com/thi-ng/umbrella/commit/ca65edc))
  - [zig] emit only `extern` structs/unions
  - [zig] remove (somewhat obsolete) support for packed structs/unions (KISS)
    - remove `.tag` option from `Struct`/`Union`
  - [zig/c] update codegens preludes
    - add declarations of `XXSlice`/`XXMutSlice` type aliases
  - rename `Field.tag`: `scalar` => `single`
  - [ts] add `Field.skip` to suppress codegen for individual fields
  - update JSON schema
  - set default `string` impl to `ptr` (previously `slice`)
  - add internal `clasifyField()` helper to simplify conditionals in codegens
  - add/update various internal type predicates
  - update CodeGenOpts.pre/post to support string arrays
- use new backend in all codegens ([33fc814](https://github.com/thi-ng/umbrella/commit/33fc814))
  - update slice handling using auto-generated wrapper structs
  - add support for multi-item pointers
  - add support for enum pointers/arrays/slices
  - add slice types to wasmapi.h & types.zig
  - add more cases to FieldClass
  - update classifyField()
  - update all codegens to use new classifier based code templates
  - add/update codegen tests/fixtures
- add Pointer64 (still unused) ([f1eef25](https://github.com/thi-ng/umbrella/commit/f1eef25))

#### 🩹 Bug fixes

- update CLI type checks ([1d4cc59](https://github.com/thi-ng/umbrella/commit/1d4cc59))
- re-add missing optional type `?` prefix [zig] ([3e3b4cd](https://github.com/thi-ng/umbrella/commit/3e3b4cd))
- fix user code handling in TS codegen prelude ([c435caa](https://github.com/thi-ng/umbrella/commit/c435caa))

#### ♻️ Refactoring

- update WasmStringSlice.setSlice() ([f278cfd](https://github.com/thi-ng/umbrella/commit/f278cfd))
- rename _printStr0() => printStrZ() ([666546c](https://github.com/thi-ng/umbrella/commit/666546c))
- update/extract C types & core API ([9eb827e](https://github.com/thi-ng/umbrella/commit/9eb827e))
- migrate JSON schema, update readme & pkg ([a6d9c3a](https://github.com/thi-ng/umbrella/commit/a6d9c3a))

### [0.18.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.18.1) (2022-11-01)

#### 🩹 Bug fixes

- fix TS code gen array mem mapping ([a0e7132](https://github.com/thi-ng/umbrella/commit/a0e7132))
  - use correct type size for array mem mapping
  - update test fixtures

## [0.18.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.18.0) (2022-10-31)

#### 🚀 Features

- update WasmBridge & child API module specs ([6773494](https://github.com/thi-ng/umbrella/commit/6773494))
  - update IWasmAPI interface to declare import ID & module dependencies
  - update WasmBridge ctor (array instead of object of sub-modules)
  - update WasmBridge.init() to initialize modules in dependency order
  - replace illegalArgs() with assert()
  - add [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays) as dependency, update pkg

### [0.17.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.17.3) (2022-10-31)

#### ♻️ Refactoring

- restructure/rename zig files, update readdme ([c63ca10](https://github.com/thi-ng/umbrella/commit/c63ca10))
  - enforce uniform project structure for all `[@thi.ng/wasm-api-](https://github.com/thi-ng/umbrella/tree/main/packages/wasm-api-)*` packages
  - rename /zig/wasmapi.zig => /zig/lib.zig
  - update readme w/ further info

### [0.17.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.17.1) (2022-10-30)

#### ♻️ Refactoring

- update zig codegen to ignore uppercase enum config ([3258f91](https://github.com/thi-ng/umbrella/commit/3258f91))
  - idiomatic zig enums are lowercase
  - update config docs

## [0.17.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.17.0) (2022-10-29)

#### 🚀 Features

- update default value format & handling ([c7752fb](https://github.com/thi-ng/umbrella/commit/c7752fb))
  - update Field.default to support lang-specific alts
  - add defaultValue() helper
  - update zig codegen

#### 🩹 Bug fixes

- fix idempotence checks for self-referential types ([2c3f670](https://github.com/thi-ng/umbrella/commit/2c3f670))
  - update prepareType()

## [0.16.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.16.0) (2022-10-28)

#### 🚀 Features

- update docstring & user code codegen config ([68694ba](https://github.com/thi-ng/umbrella/commit/68694ba))
  - allow doc strings & user codes to be given as string array (lines)
  - add InjectedBody type to support multiple injection sites
    (e.g. TS interface declarations vs. wrapper impls)
  - update TS & Zig codegens
  - add internal ensureLines() helper
- update IWasmMemoryAccess & impls ([bb8a3ca](https://github.com/thi-ng/umbrella/commit/bb8a3ca))
  - add MemorySlice tuple to describe a memory region
  - update allocate() & free() to use MemorySlice, migrate to IWasmMemoryAccess
  - migrate growMemory() to IWasmMemoryAccess
  - add MemorySlice to default imports in TS codegen
- update TS docstring generator ([5a060b6](https://github.com/thi-ng/umbrella/commit/5a060b6))
  - include native/WASM type in docstring (use Zig type sigs)
  - update ensureLines() helper
  - update test fixtures

#### 🩹 Bug fixes

- fix ensureLines(), update tests & fixtures ([f8a4668](https://github.com/thi-ng/umbrella/commit/f8a4668))

## [0.15.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.15.0) (2022-10-26)

#### 🚀 Features

- add WasmTarget codegen opt & usize support ([62c049b](https://github.com/thi-ng/umbrella/commit/62c049b))
- add/update codegen alignment logic ([9c19ad9](https://github.com/thi-ng/umbrella/commit/9c19ad9))
  - add AlignmentStrategy & impls
  - update alignOf(), sizeOf(), prepareType()
  - extract DEFAULT_CODEGEN_OPTS
  - add Struct.align config option
- add codegen support for union types ([bbc1f98](https://github.com/thi-ng/umbrella/commit/bbc1f98))
  - add Union type, update TopLevelType
  - update all codegens (C,TS,Zig)
  - update alignOf(), sizeOf()
  - update selectAlignment()
- import ManagedIndex, migrate Zig API ([d8bb3ee](https://github.com/thi-ng/umbrella/commit/d8bb3ee))
  - migrate ManagedIndex from [@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/tree/main/packages/wasm-api-dom)
  - move all Zig sources from /include => /zig
  - update pkg

#### 🩹 Bug fixes

- fix padding in Zig packed structs ([8d70cf6](https://github.com/thi-ng/umbrella/commit/8d70cf6))
  - since packed structs can't contain `[n]u8` types,
    generate padding as potentially multiple `uXXX` fields
- fix i64/u64 handling in sizeof() ([825add3](https://github.com/thi-ng/umbrella/commit/825add3))
- update CLI wrapper to allow unions ([904716c](https://github.com/thi-ng/umbrella/commit/904716c))

#### ♻️ Refactoring

- minor updates C & Zig codegens ([a94e1cc](https://github.com/thi-ng/umbrella/commit/a94e1cc))
- rename types, use predicates ([4148e1e](https://github.com/thi-ng/umbrella/commit/4148e1e))
  - rename StructField => Field
  - update codegens to use more predicates instead of inline checks

## [0.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.14.0) (2022-10-17)

#### 🚀 Features

- update IWasmMemoryAccess ([28bfff6](https://github.com/thi-ng/umbrella/commit/28bfff6))
  - add IWasmMemoryAccess.ensureMemory()
  - update WasmBridge.setString() to ensure memory
- ensure memory in WasmStringSlice/Ptr ([c55c6f0](https://github.com/thi-ng/umbrella/commit/c55c6f0))
- add Zig Slice & String wrappers ([28d057e](https://github.com/thi-ng/umbrella/commit/28d057e))
  - allows expressing & converting slices for `extern struct`s
- add ptrCast() zig helper ([72a9406](https://github.com/thi-ng/umbrella/commit/72a9406))

## [0.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.13.0) (2022-10-04)

#### 🚀 Features

- add WasmStringSlice.setSlice() ([50cc798](https://github.com/thi-ng/umbrella/commit/50cc798))
- update C11 code gen ([ff8037f](https://github.com/thi-ng/umbrella/commit/ff8037f))
  - add `#ifdef __cplusplus` guards to pre/post

#### ⏱ Performance improvements

- lazy eval log message args ([3e13397](https://github.com/thi-ng/umbrella/commit/3e13397))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.12.0) (2022-10-03)

#### 🚀 Features

- add doc string word wrapping ([c0b8e15](https://github.com/thi-ng/umbrella/commit/c0b8e15))
  - update prefixLines(), add target line width arg
  - update ICodeGen & CodeGenOpts
  - update all codegens
  - update deps
- add default value support for Zig codegen ([3c37ae7](https://github.com/thi-ng/umbrella/commit/3c37ae7))
- add ReadonlyWasmString, update impls ([240a148](https://github.com/thi-ng/umbrella/commit/240a148))
- add support for sentinels & user type body injection ([d240046](https://github.com/thi-ng/umbrella/commit/d240046))
  - update sizeOf() to include sentinels
  - add TopLevelType.body for extra user code
  - update Zig codegen to:
    - support array/slice sentinels
    - add optional user code injection
    - add `std` import header
- update CLI ([98d2414](https://github.com/thi-ng/umbrella/commit/98d2414))
  - add optional type analytics JSON output
  - add support for including user code via `@`-file references
  - update config `@`-file refs to resolve relative to config file

#### 🩹 Bug fixes

- minor fix word wrap line width ([053ba0f](https://github.com/thi-ng/umbrella/commit/053ba0f))
- update zig panic handler sig for latest zig master version ([cb51bf6](https://github.com/thi-ng/umbrella/commit/cb51bf6))
  - see https://github.com/ziglang/zig/commit/694fab484805088030fa36efe3e6b6e7ee385852

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.11.0) (2022-09-21)

#### 🚀 Features

- update core API & bindings ([b185ea5](https://github.com/thi-ng/umbrella/commit/b185ea5))
  - add _panic(), timer(), epoch() core API fns
  - update printI/U64() fns to accept bigint
  - update C & Zig bindings
  - update tests
  - add clang-format
- add WasmString wrappers ([18d8fcb](https://github.com/thi-ng/umbrella/commit/18d8fcb))
  - still unused (to be added to TS codegen)
- WasmString codegen integration ([97fc318](https://github.com/thi-ng/umbrella/commit/97fc318))
  - update TS codegen to wrap strings using new `WasmString` or `WasmStringPtr`
  - update global codegen options handling, now passed to each codegen
  - update TSOpts & ZigOpts to include custom pre/post
- major update codegens, string & pointer handling ([4f02295](https://github.com/thi-ng/umbrella/commit/4f02295))
  - update/fix string wrappers (`WasmStringSlice/Ptr`)
  - add generic `Pointer` wrapper
  - add `const` field type support
  - add applyIndents() formatter fn, simplify all codegens
  - major update TS & Zig codegens
- update CodeGenOpts ([b9fd7ff](https://github.com/thi-ng/umbrella/commit/b9fd7ff))
- update TS codegen (array pointers) ([30360f2](https://github.com/thi-ng/umbrella/commit/30360f2))
- add C11 support, update codegens & config ([590311e](https://github.com/thi-ng/umbrella/commit/590311e))
  - add preliminary C11 codegen
  - add optional `tag` field for structs (extern/packed)
  - add support for auto-labeled padding fields
    - i.e. defined via unnamed fields with `pad` value
  - move debug config option to global `CodeGenOpts`
- update codegen CLI ([435ad2b](https://github.com/thi-ng/umbrella/commit/435ad2b))
  - add C11 support
  - add support for padding fields (in `validateTypeRefs()`)
  - add CLI arg for forcing string type impl
  - update deps
- update/fix codegens & config ([87def23](https://github.com/thi-ng/umbrella/commit/87def23))
  - add global `CodeGenOpts.uppercaseEnums` option (migrate from TSOpts)
  - set `i32` as enum default tag (for C compatibility)
  - update C11 codegen, add `typePrefix` option
  - fix C11 enum codegen (use `typedef enum`)
  - add internal enumName() helper
  - minor updates Zig codegen
- refactor CodeGenOpts, update CLI config handling ([fa2e30f](https://github.com/thi-ng/umbrella/commit/fa2e30f))
  - extract CodeGenOptsBase interface for common pre/post config
  - update CLI config loading to support loading pre/post contents
    from separate files (if value given as `@path/to-file.ext`)

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.10.0) (2022-08-24)

#### 🚀 Features

- add events, update allocator handling ([89416b1](https://github.com/thi-ng/umbrella/commit/89416b1))
  - add INotify impl for WasmBridge
  - emit event when WASM memory has changed (e.g. to recreate user views)
  - reverse logic so that NO allocator is used by default and instead must
    be explicitly enabled (rather than disabled)
  - update Zig & C bindings
  - add/update docstrings

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.9.0) (2022-08-23)

#### 🚀 Features

- add debug() core API function ([ca01978](https://github.com/thi-ng/umbrella/commit/ca01978))

#### 🩹 Bug fixes

- update setString() return value ([116dd0b](https://github.com/thi-ng/umbrella/commit/116dd0b))
  - always only return num bytes written w/o sentinel

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.8.0) (2022-08-16)

#### 🚀 Features

- add preliminary string handling support ([3da4efe](https://github.com/thi-ng/umbrella/commit/3da4efe))
  - update/rename IWasmMemoryAccess (add string getter/setter)
  - update StructField.type (add `string`)
  - add CodeGenOpts.stringType option
  - update codegen fns
  - update TS & Zig codegen impls

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.7.0) (2022-08-15)

#### 🚀 Features

- update helper predicates ([65b23d4](https://github.com/thi-ng/umbrella/commit/65b23d4))
- update TSOpts & TS codegen ([4f6bbbf](https://github.com/thi-ng/umbrella/commit/4f6bbbf))
  - add `uppercaseEnum` option to force UC enum IDs
- add CLI wrapper for codegens ([683a560](https://github.com/thi-ng/umbrella/commit/683a560))

#### 🩹 Bug fixes

- correct TS __mapArray codegen ([289b137](https://github.com/thi-ng/umbrella/commit/289b137))
- allow signed ints for enum tags ([78d0822](https://github.com/thi-ng/umbrella/commit/78d0822))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.6.0) (2022-08-15)

#### 🚀 Features

- update allocate/free() fns, update Zig core API ([8a55989](https://github.com/thi-ng/umbrella/commit/8a55989))
  - add _wasm_free() Zig impl
  - add printFmt() Zig fn
  - update WasmBridge.allocate() (add clear option)
  - update WasmBridge.free()
  - ensure memory in WasmBridge.getString()
  - add/update docstrings
- add bindings code generator framework ([17ee06f](https://github.com/thi-ng/umbrella/commit/17ee06f))
  - add/update deps
  - add preliminary codegens for Zig & TS
  - add supporting types & utils
  - add generateTypes() codegen facade fn
- update codegens, add opts, fix alignments ([5c1fec5](https://github.com/thi-ng/umbrella/commit/5c1fec5))
  - add global CodeGenOpts
  - update generateTypes() to consider new opts
  - add global USIZE type (for pointer sizes & codegens)
  - add options for Zig codegen (extra debug helpers)
  - simplify TS codegen
  - fix sizeOf() for struct fields
  - make prepareType() idempotent
- add C11 header/include file, update WasmBridge ([a67dc00](https://github.com/thi-ng/umbrella/commit/a67dc00))
  - migrate headers/includes to /include
  - rename "core" import section => "wasmapi"
  - rename WasmBridge.core => WasmBridge.api
  - update pkg file

#### ♻️ Refactoring

- extract WasmMemViews interface, update test WASM ([4c73e65](https://github.com/thi-ng/umbrella/commit/4c73e65))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.5.0) (2022-08-08)

#### 🚀 Features

- add memory allocation ([980c1f2](https://github.com/thi-ng/umbrella/commit/980c1f2))
  - add WasmBridge.allocate()/free()
  - add WasmBridge.growMemory()
  - extract WasmBridge.ensureMemory()
  - update WasmExports
  - update Zig bindings (configurable allocator, GPA as default)

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.4.0) (2022-08-07)

#### 🚀 Features

- use named import objects ([4965f20](https://github.com/thi-ng/umbrella/commit/4965f20))
  - switch to name import objects to avoid merging into flat namespace
  - update externs in core.zig
  - update docstrings

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.3.0) (2022-08-04)

#### 🚀 Features

- major update WasmBridge, add types ([47aa222](https://github.com/thi-ng/umbrella/commit/47aa222))
  - add WasmExports base interface
  - add generics for WasmBridge & IWasmAPI
  - update WasmBridge.init() arg (full WASM exports, not just mem)
  - add WasmBridge.exports field to store WASM module exports
  - add naming conflict check in WasmBridge.getImports()
- add WasmBridge.instantiate, add/update accessors ([0698bae](https://github.com/thi-ng/umbrella/commit/0698bae))
  - add WasmBridge.instantiate() boilerplate
  - add setters for typed scalars & arrays
  - rename derefXX() => getXX() getters
  - update tests
- add i64/u64 support/accessors ([768c8bd](https://github.com/thi-ng/umbrella/commit/768c8bd))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.2.0) (2022-08-01)

#### 🚀 Features

- fix zig slice pointer handling, use named child modules ([bd7905a](https://github.com/thi-ng/umbrella/commit/bd7905a))
- major update ObjectIndex ([4547f1f](https://github.com/thi-ng/umbrella/commit/4547f1f))
  - add ObjectIndexOpts ctor options
  - add IDGen for internal ID generation/recycling
  - add iterators
  - rename existing methods

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.1.0) (2022-08-01)

#### 🚀 Features

- import as new pkg ([eda4840](https://github.com/thi-ng/umbrella/commit/eda4840))
