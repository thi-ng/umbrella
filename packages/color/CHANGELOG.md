# Change Log

- **Last updated**: 2023-10-30T14:31:56Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [5.5.27](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.5.27) (2023-10-27)

#### ♻️ Refactoring

- update vector imports ([95f1d64](https://github.com/thi-ng/umbrella/commit/95f1d64))

### [5.5.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.5.19) (2023-09-19)

#### ♻️ Refactoring

- update hiccup/SVG generators ([37c532f](https://github.com/thi-ng/umbrella/commit/37c532f))

### [5.5.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.5.5) (2023-07-14)

#### ♻️ Refactoring

- update swatches() return type ([ba73557](https://github.com/thi-ng/umbrella/commit/ba73557))

## [5.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.5.0) (2023-04-19)

#### 🚀 Features

- add TypedColor.xyz 3-channel accessor, update all impls ([c62e0ee](https://github.com/thi-ng/umbrella/commit/c62e0ee))
- add mostSimilar() ([8cfc36d](https://github.com/thi-ng/umbrella/commit/8cfc36d))

## [5.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.4.0) (2023-03-02)

#### 🚀 Features

- add oklch mode impl/support ([3e77420](https://github.com/thi-ng/umbrella/commit/3e77420))
  - add oklch() factory & class decl
  - add oklab<>oklch conversions
  - update analog() & rotate()
- add CSS Level4 oklab/oklch support ([137d322](https://github.com/thi-ng/umbrella/commit/137d322))
  - update parseCss() to support oklab/oklch colors
  - add oklab/oklch CSS serializers
  - update css() to optionally support CSS Color Module L4
  - add CSS_LEVEL3 / CSS_LEVEL4 conversions
- update color() to accept CSS color strings ([0d5b3e9](https://github.com/thi-ng/umbrella/commit/0d5b3e9))

#### 🩹 Bug fixes

- update oklab LMS matrices ([6e2cb75](https://github.com/thi-ng/umbrella/commit/6e2cb75))
  - according to @bottosson they were already updated in 01/2021
- update parseCss()/parseHex() ([dbbdc7d](https://github.com/thi-ng/umbrella/commit/dbbdc7d))
  - fix support for percentages
  - fix channel scale factors
  - fix alpha-channel handling in parseHex()
  - rename internal helpers
  - add/update tests

#### ⏱ Performance improvements

- refactor distLch() ([fa2d4e0](https://github.com/thi-ng/umbrella/commit/fa2d4e0))
  - use Law of Cosines impl to avoid 1x cos and 2x sin ops

#### ♻️ Refactoring

- update oklab/oklch channel ranges, add docs ([d87b30d](https://github.com/thi-ng/umbrella/commit/d87b30d))
- update (ok)lab/lch CSS serializers ([8492f5e](https://github.com/thi-ng/umbrella/commit/8492f5e))
  - extract internal helpers
  - update/fix channel scale factors

## [5.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.3.0) (2023-02-10)

#### 🚀 Features

- add hue() function ([c5c3dd5](https://github.com/thi-ng/umbrella/commit/c5c3dd5))
- add distLch() ([f1b509d](https://github.com/thi-ng/umbrella/commit/f1b509d))

#### 🩹 Bug fixes

- fix invert() for HSL ([84d0640](https://github.com/thi-ng/umbrella/commit/84d0640))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.2.0) (2022-09-21)

#### 🚀 Features

- add WCAG2 contrast() fn ([a132107](https://github.com/thi-ng/umbrella/commit/a132107))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.1.0) (2022-06-09)

#### 🚀 Features

- update multiColorGradient() ([f47a59d](https://github.com/thi-ng/umbrella/commit/f47a59d))
  - add support for automatic conversion to packed ARGB/ABGR ints
    (for use with indexed color models in [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/main/packages/pixel))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.0.0) (2022-03-11)

#### 🛑 Breaking changes

- rename color matrix fns ([00fdc31](https://github.com/thi-ng/umbrella/commit/00fdc31))
- BREAKING CHANGE: rename color matrix fns
  - add `Mat` suffix, e.g. `grayscale()` => `grayscaleMat()`

#### 🚀 Features

- update ChannelSpec and hue-based modes ([01d93dc](https://github.com/thi-ng/umbrella/commit/01d93dc))
  - add `hue` flag for channel spec
  - update `.clamp()` impl to wrap hue in [0..1] interval
  - add/update LCH conversion paths
- add/update color ops ([33cb4a1](https://github.com/thi-ng/umbrella/commit/33cb4a1))
  - add `invert()`, `isRgbGamut()`, `lighten()`, `rotate()` ops
  - add `tint()`, `tone()`, `shade()` ops
  - update impls for `isBlack/Gray/White()`
  - add/re-use internal multimethod dispatch fns
- add max chroma LCH fns ([ab4e67a](https://github.com/thi-ng/umbrella/commit/ab4e67a))
- add variations() generator ([91d760f](https://github.com/thi-ng/umbrella/commit/91d760f))
- add color theme strategies ([22057e5](https://github.com/thi-ng/umbrella/commit/22057e5))
  - add strategy fns:
    - `complementaryStrategy()`
    - `splitComplementaryStrategy()`
    - `monochromeStrategy()`
    - `triadicStrategy()`
    - `tetradicStrategy()`
    - `squareStrategy()`

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@4.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [4.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@4.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@4.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### 🚀 Features

- add mandatory toRgb conversions ([6c4c13b](https://github.com/thi-ng/umbrella/commit/6c4c13b))
  - due to defColor() dynamically registering related conversions for
    a given color mode, deep imports might not make conversion routes
    available
  - new mandatory `toRgb` key in  ColorSpec offers a fallback solution
- Int32/ABGR/ARGB updates/fixes ([d20e77c](https://github.com/thi-ng/umbrella/commit/d20e77c))
  - update TypedColor (add IEqualsDelta, Iterable parents)
  - add shared Int32.eqDelta() impl
  - add ARGB/ABGR normalized channel value accessors
  - fix various bugs in defInt() factory
    - return correct type if no args given
    - update return type in .mapBuffer()
  - add internal __scale8bit() helper fn

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([1736278](https://github.com/thi-ng/umbrella/commit/1736278))
- update imports ([00188f4](https://github.com/thi-ng/umbrella/commit/00188f4))
- update imports ([c642082](https://github.com/thi-ng/umbrella/commit/c642082))
- update imports (transducers) ([0bc002c](https://github.com/thi-ng/umbrella/commit/0bc002c))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- sideeffect-free defmulti specs ([9909909](https://github.com/thi-ng/umbrella/commit/9909909))
- restructure package ([bf9edcb](https://github.com/thi-ng/umbrella/commit/bf9edcb))
  - migrate/lift `/src/ops` source files to `/src` for easier use
- rename/migrate internal fns ([5faa747](https://github.com/thi-ng/umbrella/commit/5faa747))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@3.2.0) (2021-08-04)

#### 🚀 Features

- add/update swatch functions ([391ae4a](https://github.com/thi-ng/umbrella/commit/391ae4a))
  - add dotsH/V()
  - update swatchesH/V(), add `gap` arg

### [3.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@3.1.12) (2021-04-03)

#### ♻️ Refactoring

- minor updates ([7575146](https://github.com/thi-ng/umbrella/commit/7575146))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@3.1.0) (2021-02-24)

#### 🚀 Features

- add .toString() impl ([cc65bf0](https://github.com/thi-ng/umbrella/commit/cc65bf0))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@3.0.1) (2021-02-22)

#### 🩹 Bug fixes

- update compileThemePart() ([b8ceed6](https://github.com/thi-ng/umbrella/commit/b8ceed6))
  - don't mutate original theme part if given as object

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@3.0.0) (2021-02-20)

#### 🛑 Breaking changes

- new parseCSS(), add SRGBA, update conversions ([f748d65](https://github.com/thi-ng/umbrella/commit/f748d65))
- BREAKING CHANGE: parseCSS() now returns wrapped color types,
  not raw RGBA arrays as previously
  - parseCSS() now returns SRGBA, HSLA, LAB or LCH color types and supports more CSS syntax opts
  - all asXXX() functions also return wrapped colors,
    only asCSS() still returns strings
  - add SRGBA type/color mode reserve existing RGBA for
    linear colors (non-gamma corrected)
  - rename existing conversions, now using SRGBA (i.e. srgbaCss(),
    srgbaInt()), add new versions for (now linear) RGBA
  - parseCSS() RGB colors now result in SRGB instances,
    use asRGBA() or srgbRgba() to convert to linear RGB
- add multiColorGradient(), update cos version ([dc88f37](https://github.com/thi-ng/umbrella/commit/dc88f37))
- BREAKING CHANGE: multiCosineGradient() args now given as options object
  - add MultiGradientOpts
  - add support for per-interval easing
  - add support for result color coercion
- major update/rename all types/conversions ([4143c8f](https://github.com/thi-ng/umbrella/commit/4143c8f))
- BREAKING CHANGE: update/rename all color types/conversions
  - rename YCbCrA => YCC
  - remove `A` suffix from all color types
    (e.g. `HSVA` => `HSV`, `XYZA` => `XYZ` etc.)
  - accordingly, rename all conversions (e.g. `rgbaHsva()` => `rgbHsv()`)
  - rename `.alpha` accessor in all color types
    (previously a mixture of `.a` vs `.alpha`, now always latter)
  - standardize casing in all function names (now always camelCase)
    e.g. `asCSS()` => `asCss()`
  - resolveAsCss() untyped default now sRGB
  - rename distSatHsv() => distHsvSat()
  - rename distLumaHsv() => distHsvLuma()
  - rename distLumaRGB() => distRgbLuma()
  - add distChannel() HOF
  - add basic convert() support for Lab<>LCH<>CSS
  - add/update docstrings
  - rename RANGES => COLOR_RANGES
  - update colorFromRange(), colorsFromRange() and
    colorsFromTheme() to return wrapped HSV colors
- major restructure, new types/conversions ([6389f7c](https://github.com/thi-ng/umbrella/commit/6389f7c))
- BREAKING CHANGE: replace color classes w/ dynamically generated impls
  - add ColorSpec, ColorType, ColorFactory types
  - add defColor() color type factory based on declarative ColorSpec
  - all color types now based on defColor()
  - remove obsolete AColor class
  - color factories now also act as converters
  - add color() factory to wrap color in class for given mode
  - remove CSS and Int types (use plain strings/ints now, and use css()
    or resolveAsCss() to convert to CSS strings)
  - parseCss() now returns ParsedColor (circumvents circular deps)
  - replace convert() w/ new simplified version
  - add/update generic isGray(), isBlack(), isWhite(), luminance()
- update types, CSS formatting ([f0502a2](https://github.com/thi-ng/umbrella/commit/f0502a2))
- BREAKING CHANGE: remove obsolete resolveAsCss(), use css() instead
  - update MaybeColor alias
  - update TypedColor
  - merge resolveAsCss() cases into css()
  - fix color factory for int args

#### 🚀 Features

- add Oklab color space support ([57a5bad](https://github.com/thi-ng/umbrella/commit/57a5bad))
- add XYZ/Oklab conversions, update/fix XYZ matrices ([e07a038](https://github.com/thi-ng/umbrella/commit/e07a038))
  - add/refactor oklab conversions (XYZ / RGBA / CSS)
  - RGB_XYZ / XYZ_RGB matrices were row-major, now correctly column major
- add barebones support for LAB & LCH ([6e3b8c9](https://github.com/thi-ng/umbrella/commit/6e3b8c9))
- update CSS_NAMES ([7ea0cf0](https://github.com/thi-ng/umbrella/commit/7ea0cf0))
- add SystemColors and defaults ([16bad21](https://github.com/thi-ng/umbrella/commit/16bad21))
- add wavelengthXyza() ([d29ce23](https://github.com/thi-ng/umbrella/commit/d29ce23))
- add AColor.toJSON() ([ee96412](https://github.com/thi-ng/umbrella/commit/ee96412))
  - better handling for memory mapped colors
- add AColor.set() ([7e7a05c](https://github.com/thi-ng/umbrella/commit/7e7a05c))
- add XYY mode ([7a743f2](https://github.com/thi-ng/umbrella/commit/7a743f2))
  - currently only conversions from/to XYZ
- add rgbSrgbApprox() and vice versa ([c1efada](https://github.com/thi-ng/umbrella/commit/c1efada))
- add/update Lab/XYZ/LCH conversions ([9feb251](https://github.com/thi-ng/umbrella/commit/9feb251))
  - add D50/D65 white points & matrices
  - add Lab<>XYZ<>RGB conversions (for diff white points)
  - update/fix Lab/LCH CSS formatting
  - update mulV33 to NOT clamp result by default
- add/update luminance & YCC conversion ([89ca131](https://github.com/thi-ng/umbrella/commit/89ca131))
  - add SRGB luminance versions, update RGB version to
    use linear weights
  - update RGB<>YCC conversion fns (configurable luma)
  - update grayscale(), luminanceAlpha() default coeffs
    to use linear RGB weights
- update/restructure types, add buffer mapping ([cebaafa](https://github.com/thi-ng/umbrella/commit/cebaafa))
  - add ColorFactory.mapBuffer()
  - add ColorFactory/TypedColor.random()
  - update all color class declarations
  - split api.ts into /api subdir
  - update css()
- split Lab & XYZ types into D50/D65 ([29e1e74](https://github.com/thi-ng/umbrella/commit/29e1e74))
  - add LabD50/D65, add XYZD50/XYZD65
  - rename factory fns (labD50/D65, xyzD50/D65)
  - update/simplify ColorSpec in all color type defs
  - add tools/limits.ts to sample RGB gamut limits, add to color defs
  - add TypedColor.clamp(), update defColor()
  - fix Oklab<>XYZ conversions (use D65 as default)
- add lab D50/65 conv, update HSx<>CSS conv ([014e41d](https://github.com/thi-ng/umbrella/commit/014e41d))
  - add labLabD50_65/D65_50()
  - add lab65 -> CSS conversion (always as D50)
  - since there's no official requirement, allow direct conversions
    from sRGB to various HSx modes (also to be backward compatible)
- add sortMapped() for mapped memory cols ([9a548ec](https://github.com/thi-ng/umbrella/commit/9a548ec))
- add ARGB32/ABGR32 int types/conversions ([1993beb](https://github.com/thi-ng/umbrella/commit/1993beb))
  - rename existing int conversion fns
  - add versions for ARGB/ABGR orders
  - add/update luminance fns
  - minor update defConversions()
- improve int ARGB/ABGR support ([6460e4d](https://github.com/thi-ng/umbrella/commit/6460e4d))
  - add CSS conversions
  - add ARGB<>ABGR swapping
  - add converters for RGB/SRGB
- add setPrecision(), LCH cleanup ([778f84a](https://github.com/thi-ng/umbrella/commit/778f84a))
- add gradient and mix fns ([f31966c](https://github.com/thi-ng/umbrella/commit/f31966c))
  - add cosineGradientBuffer()
  - add multiColorGradientBuffer()
  - add defMix(), mixHsl(), mixLch() fns
  - remove obsolete mixAlpha() (use porter-duff pkg for alpha blending)
- convert mix() to defmulti, color mode aware ([faed98b](https://github.com/thi-ng/umbrella/commit/faed98b))
- add TypedColor/ColorFactory.range impls ([7ecfa0c](https://github.com/thi-ng/umbrella/commit/7ecfa0c))
- add Int32.alpha accessor, minor update int->srgb ([b65f9ee](https://github.com/thi-ng/umbrella/commit/b65f9ee))
- use RGB fallbacks for Lab/LCH CSS ([53ddaeb](https://github.com/thi-ng/umbrella/commit/53ddaeb))
  - keep existing conversions, but disable until browser support is ready
- add generic analog() (for all color types) ([117a5bc](https://github.com/thi-ng/umbrella/commit/117a5bc))
- generic isBlack/Gray/White, LCH color ranges ([598afdf](https://github.com/thi-ng/umbrella/commit/598afdf))
  - update ColorRange, ColorRangeOpts and related fns to switch HSV -> LCH
- update ColorFactory, TypedColor ([8c5f8fb](https://github.com/thi-ng/umbrella/commit/8c5f8fb))
  - add `Symbol.toStringTag` impl
  - expose `.class` in color factories
  - add support for longer conversions (2-4 steps) in defConversions()
- add/update conversions ([e979044](https://github.com/thi-ng/umbrella/commit/e979044))
- update ColorMix & gradient types/functions ([829fcf6](https://github.com/thi-ng/umbrella/commit/829fcf6))
- add/update distance functions ([6d15065](https://github.com/thi-ng/umbrella/commit/6d15065))
  - add distCIEDE2000()
  - add distCMC()
  - rename distRgb() => distEucledian3
  - add distEucledian4
- replace proximity functions ([7a0be62](https://github.com/thi-ng/umbrella/commit/7a0be62))
  - add new proximity() HOF to replace proximityHsv/Rgb()

#### 🩹 Bug fixes

- fix resolveAsCSS() ([7b1eeff](https://github.com/thi-ng/umbrella/commit/7b1eeff))
  - color mode field is a string now, not number anymore
  - wi/o this fix any non-RGB color would be wrongly interpreted as RGBA
- normalize LCH hue channel ([c0b9e9d](https://github.com/thi-ng/umbrella/commit/c0b9e9d))
- update resolveAsCss() ([0e7e955](https://github.com/thi-ng/umbrella/commit/0e7e955))
  - constrain arg type, add string test/case
- update Lab/LCH rules in parseCss() ([cb7f15e](https://github.com/thi-ng/umbrella/commit/cb7f15e))
- div-by-zero in XYY<>XYZ conversions ([8a71c6e](https://github.com/thi-ng/umbrella/commit/8a71c6e))
- fix typo in parseHex, update parse helpers ([a7315c0](https://github.com/thi-ng/umbrella/commit/a7315c0))
- rescale labXyz(), use D50 for LCH->RGB ([9e59545](https://github.com/thi-ng/umbrella/commit/9e59545))
- unconstrained analog() for some modes ([439265b](https://github.com/thi-ng/umbrella/commit/439265b))
- don't clamp Oklab/XYZ<>RGB conversions ([fab3639](https://github.com/thi-ng/umbrella/commit/fab3639))
- kelvinRgb() results are sRGB ([31cd4b5](https://github.com/thi-ng/umbrella/commit/31cd4b5))

#### ⏱ Performance improvements

- make defColor() fixed for 4 channels ([4ea77ef](https://github.com/thi-ng/umbrella/commit/4ea77ef))

#### ♻️ Refactoring

- minor update mode getter impls ([bacc446](https://github.com/thi-ng/umbrella/commit/bacc446))
- add/update pkg exports ([f6826dd](https://github.com/thi-ng/umbrella/commit/f6826dd))
- update args for swatch fns ([e5b1b9b](https://github.com/thi-ng/umbrella/commit/e5b1b9b))
- rename GRADIENTS => COSINE_GRADIENTS ([22fe0de](https://github.com/thi-ng/umbrella/commit/22fe0de))
  - migrate multiColorGradient() to separate file
- update ColorSpec handling ([d5d605e](https://github.com/thi-ng/umbrella/commit/d5d605e))
  - make ChannelSpecs optional, update defaults handling in defColor()
- simplify int24Css() ([ebe3948](https://github.com/thi-ng/umbrella/commit/ebe3948))
- simplify defColor() factory fn ([afc300c](https://github.com/thi-ng/umbrella/commit/afc300c))
- update css() ([655dd32](https://github.com/thi-ng/umbrella/commit/655dd32))
- rename dynamic class in defColor() ([4c846d6](https://github.com/thi-ng/umbrella/commit/4c846d6))
- update backing buffer types ([b5661db](https://github.com/thi-ng/umbrella/commit/b5661db))
  - use NumericArray (see related change in [0e4edb793](https://github.com/thi-ng/umbrella/commit/0e4edb793))
- update sortMapped() ([6b5fed9](https://github.com/thi-ng/umbrella/commit/6b5fed9))
- rename fns in gradient gen tool ([69e2287](https://github.com/thi-ng/umbrella/commit/69e2287))
- update int-int fns, docs, readme ([1ef7341](https://github.com/thi-ng/umbrella/commit/1ef7341))
  - re-use swapLane13() for ARGB<>ABGR
  - update deps
  - update CSS ref links
  - update readme
- replace ensureHue() w/ fract() ([1499904](https://github.com/thi-ng/umbrella/commit/1499904))
- add/rename luminance consts, add docs ([9d43274](https://github.com/thi-ng/umbrella/commit/9d43274))
- update colorFromRange(), asThemePart() ([2e4e14d](https://github.com/thi-ng/umbrella/commit/2e4e14d))
- add ColorRangeOpts.base, update related fns ([e06c7ee](https://github.com/thi-ng/umbrella/commit/e06c7ee))
  - move base arg into ColorRangeOpts
  - update colorFromRange(), colorsFromRange(), colorsFromTheme()
- update LAB<>LCH conversions ([eb03c89](https://github.com/thi-ng/umbrella/commit/eb03c89))
- update types ([729db15](https://github.com/thi-ng/umbrella/commit/729db15))
- update parseHex 3/4 digit handling ([7424906](https://github.com/thi-ng/umbrella/commit/7424906))
- update color range presets ([9353c93](https://github.com/thi-ng/umbrella/commit/9353c93))
  - adjust/balance settings for LCH (from former HSV configs)

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@2.1.0) (2021-01-02)

#### 🚀 Features

- add HSV/RGB distance fns ([3bd3969](https://github.com/thi-ng/umbrella/commit/3bd3969))
- add HSV/RGB gray axis checks ([927202b](https://github.com/thi-ng/umbrella/commit/927202b))
- add declarative range/theme iterators ([971d5dc](https://github.com/thi-ng/umbrella/commit/971d5dc))
  - add ColorRange related types
  - add ColorRange presets
  - add colorFromRange()
  - add colorsFromRange(), colorsFromTheme() iterators
  - add analogHSV(), analogRGB() functions
- add sortColors(), comparators ([6761feb](https://github.com/thi-ng/umbrella/commit/6761feb))
- add color swatch hiccup helpers ([5ecc528](https://github.com/thi-ng/umbrella/commit/5ecc528))
- update ColorRangeOpts, add docstrings ([350fbe5](https://github.com/thi-ng/umbrella/commit/350fbe5))

#### 🩹 Bug fixes

- fix cosineGradient() return type ([651590c](https://github.com/thi-ng/umbrella/commit/651590c))

#### ♻️ Refactoring

- add/migrate types for presets ([a8e815b](https://github.com/thi-ng/umbrella/commit/a8e815b))
- update color range iterators ([ea1acc8](https://github.com/thi-ng/umbrella/commit/ea1acc8))
  - update colorsFromTheme() & asThemePart() to precompute spec details
  - minor update colorFromRange() (opts)
- replace ColorThemePartString ([efbb6f3](https://github.com/thi-ng/umbrella/commit/efbb6f3))
  - add ColorThemePartTuple
  - update asThemePart() to convert tuple versions
  - to avoid TS typecheck perf issues w/ the template literal string,
    switch to a tuple format for theme parts
  - update swatch tool

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@2.0.0) (2020-12-22)

#### 🛑 Breaking changes

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([17e2449](https://github.com/thi-ng/umbrella/commit/17e2449))
- BREAKING CHANGE: replace ColorMode w/ type alias

### [1.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.3.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([2808adf](https://github.com/thi-ng/umbrella/commit/2808adf))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.3.0) (2020-11-24)

#### 🚀 Features

- add GradientPresets type, update GRADIENTS ([985b719](https://github.com/thi-ng/umbrella/commit/985b719))
  - allows for autocomplete of gradient IDs

### [1.2.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.2.16) (2020-09-13)

#### ♻️ Refactoring

- update types, imports ([f0fa5b0](https://github.com/thi-ng/umbrella/commit/f0fa5b0))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.2.0) (2020-05-29)

#### 🚀 Features

- add gradient presets ([2f93581](https://github.com/thi-ng/umbrella/commit/2f93581))

### [1.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.1.12) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([1802fbe](https://github.com/thi-ng/umbrella/commit/1802fbe))

### [1.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.1.6) (2020-02-25)

#### ♻️ Refactoring

- update imports, internal restruct ([592409c](https://github.com/thi-ng/umbrella/commit/592409c))

### [1.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.1.2) (2019-11-09)

#### 🩹 Bug fixes

- update/rename imports (vectors pkg) ([7cb8877](https://github.com/thi-ng/umbrella/commit/7cb8877))
  - values() => stridedValues()

#### ♻️ Refactoring

- update wrapSides/tween call sites in various pkgs ([ee8200c](https://github.com/thi-ng/umbrella/commit/ee8200c))
- update multiCosineGradient() ([0359d4a](https://github.com/thi-ng/umbrella/commit/0359d4a))
  - update tween() args due to API change

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.1.0) (2019-08-21)

#### 🚀 Features

- add resolveAsCSS(), update deps ([f96ac92](https://github.com/thi-ng/umbrella/commit/f96ac92))
  - add [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks) as explicit dep

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.0.2) (2019-08-16)

#### 🩹 Bug fixes

- add proper rounding to rgbaInt() ([d956954](https://github.com/thi-ng/umbrella/commit/d956954))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@1.0.0) (2019-07-31)

#### 🛑 Breaking changes

- remove PD related functions, update readme ([5d868db](https://github.com/thi-ng/umbrella/commit/5d868db))
- BREAKING CHANGE: Porter-Duff ops & pre/post-multiply moved to
  new package [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/main/packages/porter-duff)

#### 🚀 Features

- ([#106](https://github.com/thi-ng/umbrella/issues/106)) add PD int ops, clamp existing `porterDuff()` ([4c975b2](https://github.com/thi-ng/umbrella/commit/4c975b2))
  - add premultiplyInt / postmultiplyInt

#### 🩹 Bug fixes

- update factory fn args for mem-mapped colors ([eae671e](https://github.com/thi-ng/umbrella/commit/eae671e))
  - add support for opt offset/stride (was already supported by class ctors)
  - update shared `ensureArgs()` helper

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@0.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([8c13166](https://github.com/thi-ng/umbrella/commit/8c13166))
  - reformat color matrices in transform.ts
- TS strictNullChecks, update color conversion fns ([04dc356](https://github.com/thi-ng/umbrella/commit/04dc356))

### [0.1.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@0.1.11) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

### [0.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@0.1.10) (2019-03-04)

#### 🩹 Bug fixes

- add/update luminanceRGB/luminanceInt, add to re-exports ([566cf02](https://github.com/thi-ng/umbrella/commit/566cf02))

### [0.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@0.1.7) (2019-02-28)

#### 🩹 Bug fixes

- update ColorMode & Hue const enum handling ([bb71b7c](https://github.com/thi-ng/umbrella/commit/bb71b7c))
  - remove reverse `__ColorMode` hack
  - should fix bundling issues w/ webpack

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@0.1.3) (2019-02-05)

#### ♻️ Refactoring

- update imports (zip) ([2904590](https://github.com/thi-ng/umbrella/commit/2904590))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@0.1.0) (2019-01-21)

#### ♻️ Refactoring

- remove circular dependencies, update parseCss() ([5ca5803](https://github.com/thi-ng/umbrella/commit/5ca5803))
