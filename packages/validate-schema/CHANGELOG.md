# Change Log

- **Last updated**: 2026-06-15T14:57:39Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/validate-schema@0.2.0/packages/validate-schema) (2026-06-15)

#### 🚀 Features

- add value coercion support ([77e08c6](https://codeberg.org/thi.ng/umbrella/commit/77e08c6))
  - add `JSONSchema.coerce`
  - add coercion functions
  - add `DEFAULT_COERCIONS` registry presets
  - update `validateSchema()` and validators
  - add docs
  - add/update tests

## [0.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/validate-schema@0.1.0/packages/validate-schema) (2026-06-05)

#### 🚀 Features

- import as new pkg ([78ebbb1](https://codeberg.org/thi.ng/umbrella/commit/78ebbb1))
- add error collating, major update of all validators & tests ([afb5528](https://codeberg.org/thi.ng/umbrella/commit/afb5528))
- add cycle breaker for recursive schema refs ([1a91664](https://codeberg.org/thi.ng/umbrella/commit/1a91664))
- add support for `anyOf`/`allOf` schema combinators ([36bacbc](https://codeberg.org/thi.ng/umbrella/commit/36bacbc))
- major update types, schema recursion, object validation ([51d4be6](https://codeberg.org/thi.ng/umbrella/commit/51d4be6))
- update types, string & array validators ([ab987ae](https://codeberg.org/thi.ng/umbrella/commit/ab987ae))
- update types, array validators (contains/unique) ([404f538](https://codeberg.org/thi.ng/umbrella/commit/404f538))
- add support for min/maxProperties, propertyNames ([c6b8487](https://codeberg.org/thi.ng/umbrella/commit/c6b8487))
- add support for `dependentRequired`, `dependentSchemas` ([9870034](https://codeberg.org/thi.ng/umbrella/commit/9870034))
- add support for `if`, `then`, `else` ([7717f65](https://codeberg.org/thi.ng/umbrella/commit/7717f65))
- add default value collection ([8fc7a57](https://codeberg.org/thi.ng/umbrella/commit/8fc7a57))
  - update `ValidateSchemaCtx` to include default values
  - update `validateSchema()` return type to return collected default values
  - update tests
- add support for string `format` (selected presets only) ([5f7118b](https://codeberg.org/thi.ng/umbrella/commit/5f7118b))
- add/update result types ([c20d4f8](https://codeberg.org/thi.ng/umbrella/commit/c20d4f8))
