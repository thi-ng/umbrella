<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Partially ported and extended from the Clojure versions of the
[ws-ldn-1](https://github.com/thi-ng/ws-ldn-1/blob/master/src/ws_ldn_1/day1/csv.clj)
and
[resonate-2014](https://github.com/learn-postspectacular/resonate-workshop-2014)
workshop repos.

### Features

The parser supports customizable delimiters, quoted and unquoted cells, line
breaks within quoted cells. Being transducer based, memory usage is kept at a
minimum by only processing single lines of (pre-split) text. For CSV records
spanning multiple lines (due to line breaks), new results are only
emitted/processed downstream once a _logical_ CSV row is complete.

Also, being transducer based means the parser can be easily integrated into more
complex data preparation, cleaning or conversion workflows. See
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
for more details/ideas.

{{meta.status}}

### Planned features

- [x] Simple CSV row parsing w/o object mapping (`parseCSVSimple()`)
- [x] CSV output from structured data
- [ ] CSVW support (#257)
- [ ] Integration with thi.ng/egf

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

Also see extensive doc strings for `parseCSV()` and `CSVOpts`. See
`parseCSVSimple()` and `parseCSVFromString()` for alternatives and syntax sugar
forms.

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

<!-- include ../../assets/tpl/footer.md -->
