# @thi.ng/hiccup

[![npm](https://img.shields.io/npm/v/@thi.ng/hiccup.svg)](https://www.npmjs.com/package/@thi.ng/hiccup)

## Overview

Lightweight HTML/SVG/XML serialization of plain, nested data structures,
iterables & closures. Inspired by
[Hiccup](https://github.com/weavejester/hiccup) and
[Reagent](http://reagent-project.github.io/) for Clojure/ClojureScript.

Forget all the custom toy DSLs for templating and instead use the full power of
ES6 to directly define fully data-driven, purely functional and easily
*composable* components for static serialization to HTML & friends.

This library is suitable for static website generation, server side rendering
etc. For interactive use cases, please see companion package
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom).

### Features

- Only uses arrays, functions, ES6 iterables / iterators / generators
- Eager & lazy component composition using embedded functions / closures
- Support for self-closing tags (incl. validation), boolean attributes
- Dynamic element attribute value generation via functions
- CSS formatting of `style` attribute objects
- Optional HTML entity encoding
- Small (2.2KB minified) & fast

*) Lazy composition here means that functions are only executed at
serialization time. Examples below...

### No special sauce needed (or wanted)

Using only vanilla language features simplifies the development, composability,
reusability and testing of components. Furthermore, no custom template parser
is required and you're only restricted by the expressiveness of the language /
environment, not by your template engine.

Components can be defined as simple functions returning arrays or loaded via JSON/JSONP.

### What is Hiccup?

For many years, [Hiccup](https://github.com/weavejester/hiccup) has been the
de-facto standard to encode HTML/XML datastructures in Clojure. This library
brings & extends this convention into ES6. A valid Hiccup tree is any flat
(though, usually nested) array of the following possible structures. Any
functions embedded in the tree are expected to return values of the same
structure. Please see [examples](#examples) & [API](#api) further
explanations...

```js
["tag", ...]
["tag#id.class1.class2", ...]
["tag", {other: "attrib", ...}, ...]
["tag", {...}, "body", 23, function, [...]]
[function, arg1, arg2, ...]
[iterable]
```

## Installation

```
yarn add @thi.ng/hiccup
```

## Examples

```js
h = require("@thi.ng/hiccup");
```

### Tags with Zencoding expansion

Tag names support
[Zencoding/Emmet](https://docs.emmet.io/abbreviations/syntax/#id-and-class)
style ID & class attribute expansion:

```js
h.serialize(
    ["div#yo.hello.world", "Look ma, ", ["strong", "no magic!"]]
);
```

```html
<div id="yo" class="hello world">Look ma, <strong>no magic!</strong></div>
```

### Attributes

Arbitrary attributes can be supplied via an optional 2nd array element. `style`
attributes can be given as CSS string or as an object. Boolean attributes are
serialized in HTML5 syntax (i.e. present or not, but no values).

If the 2nd array element is not a plain object, it's treated as normal child
node (see previous example).

```js
h.serialize(
    ["div.notice",
        {
            selected: true,
            style: {
                background: "#ff0",
                border: "3px solid black"
            }
        },
        "WARNING"]
);
```

```html
<div class="notice" selected style="background:#ff0;border:3px solid black">WARNING</div>
```

If an attribute specifies a function as value, the function is called with the
entire attribute object as argument. This allows for the dynamic generation of
attribute values, based on existing ones. The result MUST be a string.

**BREAKING CHANGE since 1.0.0:** Function values for event attributes (any
attrib name starting with "on") WILL BE OMITTED from output.

```js
["div#foo", { bar: (attribs) => attribs.id + "-bar" }]
```

```html
<div id="foo" bar="foo-bar"></div>
```

```js
["div#foo", { onclick: () => alert("foo") }, "click me!"]
```

```html
<div id="foo">click me!</div>
```

```js
["div#foo", { onclick: "alert('foo')" }, "click me!"]
```

```html
<div id="foo" onclick="alert('foo')">click me!</div>
```

### Simple components

```js
const thumb = (src) => ["img.thumb", { src, alt: "thumbnail" }];

h.serialize(
    ["div.gallery", ["foo.jpg", "bar.jpg", "baz.jpg"].map(thumb)]
);
```

```html
<div class="gallery">
    <img class="thumb" src="foo.jpg" alt="thumbnail"/>
    <img class="thumb" src="bar.jpg" alt="thumbnail"/>
    <img class="thumb" src="baz.jpg" alt="thumbnail"/>
</div>
```

### SVG generation, generators & lazy composition

```js
const fs = require("fs");

// creates an unstyled SVG circle element
const circle = (x, y, r) => ["circle", { cx: x | 0, cy: y | 0, r: r | 0 }];

// note how this next component lazily composes `circle`.
// This form delays evaluation of the `circle` component
// until serialization time.
// since `circle` is in the head position of the returned array
// all other elements are passed as args when `circle` is called
const randomCircle = () => [
    circle,
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 100
];

// generator to produce iterable of `n` calls to `fn`
function* repeatedly(n, fn) {
    while (n-- > 0) yield fn();
}

// generate 100 random circles and write serialized SVG to file
// `randomCircle` is wrapped
const doc = [
    "svg", { xmlns: h.SVG_NS, width: 1000, height: 1000 },
        ["g", { fill: "none", stroke: "red" },
            repeatedly(100, randomCircle)]];

fs.writeFileSync("circles.svg", h.serialize(doc));
```

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
    <g fill="none" stroke="red">
        <circle cx="182" cy="851" r="66"/>
        <circle cx="909" cy="705" r="85"/>
        <circle cx="542" cy="915" r="7"/>
        <circle cx="306" cy="762" r="88"/>
        ...
    </g>
</svg>
```

### Data-driven component composition

```js
// data
const glossary = {
    foo: "widely used placeholder name in computing",
    bar: "usually appears in combination with 'foo'",
    hiccup: "de-facto standard format to define HTML in Clojure",
    toxi: "author of this fine library",
};

// Helper function: takes a function `f` and object `items`,
// executes fn for each key (sorted) in object and returns array of results
const objectList = (f, items) => Object.keys(items).sort().map((k)=> f(items, k));

// single definition list item component (returns pair of <dt>/<dd> tags)
const dlItem = (index, key) => [["dt", key], ["dd", index[key]]];

// full definition list component
const dlList = (attribs, items) => ["dl", attribs, [objectList, dlItem, items]];

// finally the complete widget
const widget = [
    "div.widget",
        ["h1", "Glossary"],
        [dlList, { id: "glossary" }, glossary]];

// the 2nd arg `true` enforces HTML entity encoding (off by default)
h.serialize(widget, true);
```

```html
<div class="widget">
    <h1>Glossary</h1>
    <dl id="glossary">
        <dt>bar</dt>
        <dd>usually appears in combination with &apos;foo&apos;</dd>
        <dt>foo</dt>
        <dd>widely used placeholder name in computing</dd>
        <dt>hiccup</dt>
        <dd>de-facto standard format to define HTML in Clojure</dd>
        <dt>toxi</dt>
        <dd>author of this fine library</dd>
    </dl>
</div>
```

### Stateful component

```js
// stateful component to create hierarchically
// indexed & referencable section headlines:
// e.g. "sec-1.1.2.3"
const indexer = (prefix = "sec") => {
    let counts = new Array(6).fill(0);
    return (level, title) => {
        counts[level - 1]++;
        counts.fill(0, level);
        return [
            ["a", { name: "sec-" + counts.slice(0, level).join(".") }],
            ["h" + level, title]
        ];
    };
};

const TOC = [
    [1, "Document title"],
    [2, "Preface"],
    [3, "Thanks"],
    [3, "No thanks"],
    [2, "Chapter"],
    [3, "Exercises"],
    [4, "Solutions"],
    [2, "The End"]
];

// create new indexer instance
const section = indexer();

h.serialize([
    "div.toc",
    TOC.map(([level, title]) => [section, level, title])
]);
```

```html
<div class="toc">
    <a name="sec-1"></a><h1>Document title</h1>
    <a name="sec-1.1"></a><h2>Preface</h2>
    <a name="sec-1.1.1"></a><h3>Thanks</h3>
    <a name="sec-1.1.2"></a><h3>No thanks</h3>
    <a name="sec-1.2"></a><h2>Chapter</h2>
    <a name="sec-1.2.1"></a><h3>Exercises</h3>
    <a name="sec-1.2.1.1"></a><h4>Solutions</h4>
    <a name="sec-1.3"></a><h2>The End</h2>
</div>
```

## API

The library exposes these two functions:

### serialize(tree, escape = false): string

Recursively normalizes and then serializes given tree as HTML/SVG/XML string.
If `escape` is true, HTML entity replacement is applied to all element body &
attribute values.

Any embedded component functions are expanded with their results.
A normalized element has one of these shapes:

```js
// no body
["div", {attribs...}]

// with body
["div", {...}, "a", "b", ...]

// iterable of normalized elements
[iteratable]
```

Tags can be defined in "Zencoding" convention, i.e.

```
["div#foo.bar.baz", "hi"] => <div id="foo" class="bar baz">hi</div>
```

**Note:** It's an error to specify IDs and/or classes in Zencoding convention
**and** in a supplied attribute object. However, either of these are valid:

```js
["div#foo", { class: "bar" }] // <div id="foo" class="bar"></div>
["div.foo", { id: "bar" }] // <div id="bar" class="foo"></div>
```

The presence of the attributes object is optional.
If the 2nd array index is **not** a plain object, it'll be treated
as normal child of the current tree node.

Any `null` or `undefined` values (other than in head position)
will be removed, unless a function is in head position.
In this case all other elements of that array are passed as
arguments when that function is called.

```js
const myfunc = (a, b, c) => ["div", {id: a, class: c}, b];

serialize([myfunc, "foo", null, "bar"])
```

Will result in:

```html
<!-- the `null` element has been ignored during serialization -->
<div id="foo" class="bar"></div>
```

The function's return value MUST be a valid new tree (or `undefined`).
Functions located in other positions are called without args
and can return any (serializable) value (i.e. new trees, strings,
numbers, iterables or any type with a suitable `.toString()`
implementation).

### escape(str: string): string

Helper function. Applies HTML entity replacement on given string.
If `serialize()` is called with `true` as 2nd argument, entity encoding
is done automatically ([list of entities considered](https://github.com/thi-ng/hiccup/blob/master/src/index.ts#L14)).

# Authors
- Karsten Schmidt

# License

&copy; 2016-2018 Karsten Schmidt // Apache Software License 2.0