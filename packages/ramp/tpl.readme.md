<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/ramp/readme.png)

{{meta.status}}

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

```ts
import { linear, hermite } from "@thi.ng/ramp";

const rampL = linear([[0.1, 0], [0.5, 1], [0.9, 0]]);
const rampH = hermite([[0.1, 0], [0.5, 1], [0.9, 0]]);

for(let i = 0; i <= 10; i++) {
    console.log(
        i / 10,
        rampL.at(i / 10).toFixed(2),
        rampH.at(i / 10).toFixed(2)
    );
}

// 0   0.00 0.00
// 0.1 0.00 0.00
// 0.2 0.25 0.16
// 0.3 0.50 0.50
// 0.4 0.75 0.84
// 0.5 1.00 1.00
// 0.6 0.75 0.84
// 0.7 0.50 0.50
// 0.8 0.25 0.16
// 0.9 0.00 0.00
// 1   0.00 0.00
```

<!-- include ../../assets/tpl/footer.md -->
