# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Partially ported and extended from the Clojure versions of the
[ws-ldn-1](https://github.com/thi-ng/ws-ldn-1/blob/master/src/ws_ldn_1/day1/csv.clj)
and
[resonate-2014](https://github.com/learn-postspectacular/resonate-workshop-2014)
workshop repos.

${status}

### Planned features

- [ ] CSV output from structured data
- [ ] CSVW support (#257)
- [ ] integration with thi.ng/egf

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

Also see extensive doc strings for `parseCSV()` and `CSVOpts`. See `parseCSVString()` for alternative/syntax sugar.

```ts
import { parseCSV, upper, float } from "@thi.ng/csv";

[...parseCSV(
  {
    all: false,
    cols: {
      "country": { tx: upper },
      "latitude": { alias: "lat", tx: float() },
      "longitude": { alias: "lon", tx: float() },
    }
  },
  [
     `"country","country group","name (en)","latitude","longitude"`,
     `"at","eu","Austria","47.6965545","13.34598005"`,
     `"be","eu","Belgium","50.501045","4.47667405"`,
     `"bg","eu","Bulgaria","42.72567375","25.4823218"`,
  ]
)]

// [
//   { country: 'AT', lat: 47.6965545, lon: 13.34598005 },
//   { country: 'BE', lat: 50.501045, lon: 4.47667405 },
//   { country: 'BG', lat: 42.72567375, lon: 25.4823218 }
// ]
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
