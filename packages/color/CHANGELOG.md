#  Change Log 

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines. 

#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@3.1.18...@thi.ng/color@3.2.0) (2021-08-04) 

###  Features 

- **color:** add/update swatch functions ([391ae4a](https://github.com/thi-ng/umbrella/commit/391ae4aa2e57aa14b9a2acdb1e3365b191612470)) 

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@3.0.1...@thi.ng/color@3.1.0) (2021-02-24) 

###  Features 

- **color:** add .toString() impl ([cc65bf0](https://github.com/thi-ng/umbrella/commit/cc65bf031e75c4b96c3c0089cf51c62b88187afe)) 

##  [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@3.0.0...@thi.ng/color@3.0.1) (2021-02-22) 

###  Bug Fixes 

- **color:** update compileThemePart() ([b8ceed6](https://github.com/thi-ng/umbrella/commit/b8ceed69e128c9f88999a92dc57971a1ab3c3e33)) 

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@2.1.5...@thi.ng/color@3.0.0) (2021-02-20) 

###  Bug Fixes 

- **color:** div-by-zero in XYY<>XYZ conversions ([8a71c6e](https://github.com/thi-ng/umbrella/commit/8a71c6ec25766967c20e27cfd6a0d44abde85a57)) 
- **color:** don't clamp Oklab/XYZ<>RGB conversions ([fab3639](https://github.com/thi-ng/umbrella/commit/fab3639ec59d8346752bb8a3831e9fac8d1663f7)) 
- **color:** fix resolveAsCSS() ([7b1eeff](https://github.com/thi-ng/umbrella/commit/7b1eeff17003229b9d38705dbee8e7da790699a1)) 
- **color:** fix typo in parseHex, update parse helpers ([a7315c0](https://github.com/thi-ng/umbrella/commit/a7315c0545bc4ef55f05a3b909f113fb9ca98041)) 
- **color:** kelvinRgb() results are sRGB ([31cd4b5](https://github.com/thi-ng/umbrella/commit/31cd4b5af37d72c0eded08c2e5bf9a520dcdd400)) 
- **color:** normalize LCH hue channel ([c0b9e9d](https://github.com/thi-ng/umbrella/commit/c0b9e9d90172487c7b0dce7d252d30bba92e425e)) 
- **color:** rescale labXyz(), use D50 for LCH->RGB ([9e59545](https://github.com/thi-ng/umbrella/commit/9e59545fb0cca91dfe7050a1a7db70239f818e9d)) 
- **color:** unconstrained analog() for some modes ([439265b](https://github.com/thi-ng/umbrella/commit/439265bbc6a2510a8fa6897e6165d805079c6db9)) 
- **color:** update Lab/LCH rules in parseCss() ([cb7f15e](https://github.com/thi-ng/umbrella/commit/cb7f15e1a98b78bdc6a61b3cdb5cdc55f2bc828f)) 
- **color:** update resolveAsCss() ([0e7e955](https://github.com/thi-ng/umbrella/commit/0e7e955e176bd7b3e440dc7190dee26f9843fe8b)) 

###  Code Refactoring 

- **color:** major update/rename all types/conversions ([4143c8f](https://github.com/thi-ng/umbrella/commit/4143c8fe746a692e61be7696053c883eef7ab326)) 

###  Features 

- **color:** add AColor.set() ([7e7a05c](https://github.com/thi-ng/umbrella/commit/7e7a05c0a1f9bfe57e304ab2afe3b314b048ea5e)) 
- **color:** add AColor.toJSON() ([ee96412](https://github.com/thi-ng/umbrella/commit/ee96412656fb6bd019f356a50f83651150ee7293)) 
- **color:** add ARGB32/ABGR32 int types/conversions ([1993beb](https://github.com/thi-ng/umbrella/commit/1993bebce4ee8c44a6dbcde01bc3635757d5d3f2)) 
- **color:** add barebones support for LAB & LCH ([6e3b8c9](https://github.com/thi-ng/umbrella/commit/6e3b8c9b84b33b5280247c17ae3f9b862dd44d04)) 
- **color:** add generic analog() (for all color types) ([117a5bc](https://github.com/thi-ng/umbrella/commit/117a5bcdcdd3c84f7c9eb8d68197963db4515b07)) 
- **color:** add gradient and mix fns ([f31966c](https://github.com/thi-ng/umbrella/commit/f31966ca8612415fb8faaff02a13b5f8eddb2753)) 
- **color:** add Int32.alpha accessor, minor update int->srgb ([b65f9ee](https://github.com/thi-ng/umbrella/commit/b65f9ee2896636df5bb5882e07186043d7ddc466)) 
- **color:** add lab D50/65 conv, update HSx<>CSS conv ([014e41d](https://github.com/thi-ng/umbrella/commit/014e41de9d7b051c58f4ea4a90ff0d3783884b6f)) 
- **color:** add multiColorGradient(), update cos version ([dc88f37](https://github.com/thi-ng/umbrella/commit/dc88f37abed0c5ab7dbdf2ea42fa60ddb4d5a353)) 
- **color:** add Oklab color space support ([57a5bad](https://github.com/thi-ng/umbrella/commit/57a5bad8cff99636b28f9d17124c7c445f36eebb)) 
- **color:** add rgbSrgbApprox() and vice versa ([c1efada](https://github.com/thi-ng/umbrella/commit/c1efada4f2b546c7515a34e12e31ea6a8857ec03)) 
- **color:** add setPrecision(), LCH cleanup ([778f84a](https://github.com/thi-ng/umbrella/commit/778f84aa5a080ffd8afb12967553f53463a34d2c)) 
- **color:** add sortMapped() for mapped memory cols ([9a548ec](https://github.com/thi-ng/umbrella/commit/9a548eccf3553d03afaff7817ce47f4bfeb98691)) 
- **color:** add SystemColors and defaults ([16bad21](https://github.com/thi-ng/umbrella/commit/16bad2194d52b2aa3880ec8e37cc3a3891f0c20e)) 
- **color:** add TypedColor/ColorFactory.range impls ([7ecfa0c](https://github.com/thi-ng/umbrella/commit/7ecfa0c5840722b8f4bb8965063f545a2d5348af)) 
- **color:** add wavelengthXyza() ([d29ce23](https://github.com/thi-ng/umbrella/commit/d29ce236e2d0a4a43053b18bc8d4b41f69f4f66b)) 
- **color:** add XYY mode ([7a743f2](https://github.com/thi-ng/umbrella/commit/7a743f2cc824ba2a46e32d72be8519a34d99b94c)) 
- **color:** add XYZ/Oklab conversions, update/fix XYZ matrices ([e07a038](https://github.com/thi-ng/umbrella/commit/e07a038f9fc0317008c9a2a2e05bdba88eff0712)) 
- **color:** add/update conversions ([e979044](https://github.com/thi-ng/umbrella/commit/e9790440dcf37ace01d4ea5f4c42ae76a556dc86)) 
- **color:** add/update distance functions ([6d15065](https://github.com/thi-ng/umbrella/commit/6d15065c07cb8e434f0d964c98d5fd1878738868)) 
- **color:** add/update Lab/XYZ/LCH conversions ([9feb251](https://github.com/thi-ng/umbrella/commit/9feb251def42ac12b6f522a8ea390e4e836cacaa)) 
- **color:** add/update luminance & YCC conversion ([89ca131](https://github.com/thi-ng/umbrella/commit/89ca131a4b3878ca30d3199d8647b67ed426f287)) 
- **color:** convert mix() to defmulti, color mode aware ([faed98b](https://github.com/thi-ng/umbrella/commit/faed98b3ced6a6e30bfd3d3afc95f493b39dc707)) 
- **color:** generic isBlack/Gray/White, LCH color ranges ([598afdf](https://github.com/thi-ng/umbrella/commit/598afdf045c7a56261a5edb96d21686bd2d2a2d8)) 
- **color:** improve int ARGB/ABGR support ([6460e4d](https://github.com/thi-ng/umbrella/commit/6460e4d04db8e548e575a586f24143c1ed674cde)) 
- **color:** major restructure, new types/conversions ([6389f7c](https://github.com/thi-ng/umbrella/commit/6389f7c4baf2b8ef184cf76b8d71b8d0a44237a6)) 
- **color:** new parseCSS(), add SRGBA, update conversions ([f748d65](https://github.com/thi-ng/umbrella/commit/f748d65934fe9472cc19b3e6bbfcce2578129fb7)) 
- **color:** replace proximity functions ([7a0be62](https://github.com/thi-ng/umbrella/commit/7a0be62c08ea2717298f2365292fa4c9eca6f911)) 
- **color:** split Lab & XYZ types into D50/D65 ([29e1e74](https://github.com/thi-ng/umbrella/commit/29e1e74a259bc8c73a79ccc77c654649f95c7d8c)) 
- **color:** update ColorFactory, TypedColor ([8c5f8fb](https://github.com/thi-ng/umbrella/commit/8c5f8fb5255beed3a272d987c99fd3539f92b9d6)) 
- **color:** update ColorMix & gradient types/functions ([829fcf6](https://github.com/thi-ng/umbrella/commit/829fcf6b61079e2ffaafadfd0ac115e341db6743)) 
- **color:** update CSS_NAMES ([7ea0cf0](https://github.com/thi-ng/umbrella/commit/7ea0cf073cc39c165b24258be3b13cfddfb3dd41))
- **color:** update types, CSS formatting ([f0502a2](https://github.com/thi-ng/umbrella/commit/f0502a2518a4e90edf45e35df180d2d273cdff68))
- **color:** update/restructure types, add buffer mapping ([cebaafa](https://github.com/thi-ng/umbrella/commit/cebaafa3bff43409a39162374ede7b0b07086b05))
- **color:** use RGB fallbacks for Lab/LCH CSS ([53ddaeb](https://github.com/thi-ng/umbrella/commit/53ddaeb5b3ff18c443b8308ad14ddba468dbe9da))

### Performance Improvements

- **color:** make defColor() fixed for 4 channels ([4ea77ef](https://github.com/thi-ng/umbrella/commit/4ea77eff4ef89b771268c6244628b71ec869ab8b))

### BREAKING CHANGES

- **color:** remove obsolete resolveAsCss(), use css() instead

- update MaybeColor alias
- update TypedColor
- merge resolveAsCss() cases into css()
- fix color factory for int args
- **color:** replace color classes w/ dynamically generated impls

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
- **color:** update/rename all color types/conversions

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
    - update colorFromRange(), colorsFromRange() and   colorsFromTheme() to return wrapped HSV colors 
- **color:** multiCosineGradient() args now given as options object 
    - add MultiGradientOpts 
    - add support for per-interval easing 
    - add support for result color coercion 
- **color:** parseCSS() now returns wrapped color types, not raw RGBA arrays as previously 
    - parseCSS() now returns SRGBA, HSLA, LAB or LCH color types and supports more CSS syntax opts 
    - all asXXX() functions also return wrapped colors,   only asCSS() still returns strings 
    - add SRGBA type/color mode reserve existing RGBA for   linear colors (non-gamma corrected) 
    - rename existing conversions, now using SRGBA (i.e. srgbaCss(),   srgbaInt()), add new versions for (now linear) RGBA 
    - parseCSS() RGB colors now result in SRGB instances,   use asRGBA() or srgbRgba() to convert to linear RGB 

#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@2.0.0...@thi.ng/color@2.1.0) (2021-01-02) 

###  Bug Fixes 

- **color:** fix cosineGradient() return type ([651590c](https://github.com/thi-ng/umbrella/commit/651590c2f3c4365e06f4bab85d2c9f9b99d3c4c1)) 

###  Features 

- **color:** add color swatch hiccup helpers ([5ecc528](https://github.com/thi-ng/umbrella/commit/5ecc5285fdea2d35535e5469d4d81a2b4d6878e9)) 
- **color:** add declarative range/theme iterators ([971d5dc](https://github.com/thi-ng/umbrella/commit/971d5dcbf061b0c4c52ffa1aca24d7150dea81e9)) 
- **color:** add HSV/RGB distance fns ([3bd3969](https://github.com/thi-ng/umbrella/commit/3bd396927c3aab7942853ec9b9f6013a1248389c)) 
- **color:** add HSV/RGB gray axis checks ([927202b](https://github.com/thi-ng/umbrella/commit/927202b77deaa808b57ee189ff483839975804d0)) 
- **color:** add sortColors(), comparators ([6761feb](https://github.com/thi-ng/umbrella/commit/6761feb65e24545290547408b8ba62a3ba4baedc)) 
- **color:** update ColorRangeOpts, add docstrings ([350fbe5](https://github.com/thi-ng/umbrella/commit/350fbe568b8abfc968a104cbada5abdeeb2b4107)) 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@1.3.2...@thi.ng/color@2.0.0) (2020-12-22) 

###  Code Refactoring 

- **color:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([17e2449](https://github.com/thi-ng/umbrella/commit/17e244969d2d39e17cdea739308928adc17d5392)) 

###  BREAKING CHANGES 

- **color:** replace ColorMode w/ type alias 

#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@1.2.18...@thi.ng/color@1.3.0) (2020-11-24) 

###  Features 

- **color:** add GradientPresets type, update GRADIENTS ([985b719](https://github.com/thi-ng/umbrella/commit/985b719b61475dfebe080dc1f74e2de9bb005018)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@1.1.21...@thi.ng/color@1.2.0) (2020-05-29) 

###  Features 

- **color:** add gradient presets ([2f93581](https://github.com/thi-ng/umbrella/commit/2f93581ca69f79df38ee6aa2697632c572fb55fc)) 

##  [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@1.1.1...@thi.ng/color@1.1.2) (2019-11-09) 

###  Bug Fixes 

- **color:** update/rename imports (vectors pkg) ([7cb8877](https://github.com/thi-ng/umbrella/commit/7cb88771f88fc329a2728d9f86a18faf04ab0c35)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@1.0.3...@thi.ng/color@1.1.0) (2019-08-21) 

###  Features 

- **color:** add resolveAsCSS(), update deps ([f96ac92](https://github.com/thi-ng/umbrella/commit/f96ac92)) 

##  [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@1.0.1...@thi.ng/color@1.0.2) (2019-08-16) 

###  Bug Fixes 

- **color:** add proper rounding to rgbaInt() ([d956954](https://github.com/thi-ng/umbrella/commit/d956954)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@0.2.2...@thi.ng/color@1.0.0) (2019-07-31) 

###  Bug Fixes 

- **color:** update factory fn args for mem-mapped colors ([eae671e](https://github.com/thi-ng/umbrella/commit/eae671e)) 

###  Code Refactoring 

- **color:** remove PD related functions, update readme ([5d868db](https://github.com/thi-ng/umbrella/commit/5d868db)) 

###  Features 

- **color:** ([#106](https://github.com/thi-ng/umbrella/issues/106)) add PD int ops, clamp existing `porterDuff()` ([4c975b2](https://github.com/thi-ng/umbrella/commit/4c975b2)) 

###  BREAKING CHANGES 

- **color:** Porter-Duff ops & pre/post-multiply moved to new package @thi.ng/porter-duff 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@0.1.21...@thi.ng/color@0.2.0) (2019-07-07) 

###  Features 

- **color:** enable TS strict compiler flags (refactor) ([8c13166](https://github.com/thi-ng/umbrella/commit/8c13166)) 
- **color:** TS strictNullChecks, update color conversion fns ([04dc356](https://github.com/thi-ng/umbrella/commit/04dc356)) 

##  [0.1.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@0.1.9...@thi.ng/color@0.1.10) (2019-03-04) 

###  Bug Fixes 

- **color:** add/update luminanceRGB/luminanceInt, add to re-exports ([566cf02](https://github.com/thi-ng/umbrella/commit/566cf02)) 

##  [0.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/color@0.1.6...@thi.ng/color@0.1.7) (2019-02-28) 

###  Bug Fixes 

- **color:** update ColorMode & Hue const enum handling ([bb71b7c](https://github.com/thi-ng/umbrella/commit/bb71b7c)) 

#  0.1.0 (2019-01-21) 

###  Bug Fixes 

- **color:** add/update conversions ([a5c53c3](https://github.com/thi-ng/umbrella/commit/a5c53c3)) 
- **color:** HCYA field names ([1c28c22](https://github.com/thi-ng/umbrella/commit/1c28c22)) 

###  Features 

- **color:** add alpha()/setAlpha(), add docs, re-exports, update readme ([b849bd1](https://github.com/thi-ng/umbrella/commit/b849bd1)) 
- **color:** add convert() fallback, minor other updates ([aa30344](https://github.com/thi-ng/umbrella/commit/aa30344)) 
- **color:** add HSI converters, add clampH(), minor refactors ([404ac54](https://github.com/thi-ng/umbrella/commit/404ac54)) 
- **color:** add Hue enum, closestHue*() fns, namedHueRgba() ([e7bb46b](https://github.com/thi-ng/umbrella/commit/e7bb46b)) 
- **color:** add luminance defmulti ([445b8c1](https://github.com/thi-ng/umbrella/commit/445b8c1)) 
- **color:** add more color spaces, refactor, rename, simplify ([e930d73](https://github.com/thi-ng/umbrella/commit/e930d73)) 
- **color:** add multiCosineGradient() ([dbbb26c](https://github.com/thi-ng/umbrella/commit/dbbb26c)) 
- **color:** add new package ([0b51ef1](https://github.com/thi-ng/umbrella/commit/0b51ef1)) 
- **color:** add Porter-Duff ops, pre/post-multiply, update types ([a5d2f98](https://github.com/thi-ng/umbrella/commit/a5d2f98)) 
- **color:** add RGBA/HSLA wrapper types, update convert ([610699a](https://github.com/thi-ng/umbrella/commit/610699a)) 
- **color:** add/update class wrappers ([5788646](https://github.com/thi-ng/umbrella/commit/5788646)) 

###  Performance Improvements 

- **color:** refactor porterDiff as HOF, update all PD ops, add docs ([714381d](https://github.com/thi-ng/umbrella/commit/714381d)) 
