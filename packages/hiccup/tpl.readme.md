<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Inspired by [Hiccup](https://github.com/weavejester/hiccup) and
[Reagent](http://reagent-project.github.io/) for Clojure/ClojureScript.

Forget all the custom toy DSLs for templating and instead use the full
power of ES6 to directly define fully data-driven, purely functional and
easily *composable* components for static serialization to HTML &
friends.

This library is suitable for static website generation, server side rendering
etc. For interactive use cases, please see companion packages
[@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)
(or the older
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom))
and their various support packages.

### Features

- Only uses arrays, functions, ES6 iterables / iterators / generators
- Eager & lazy component composition using embedded functions / closures
- Support for self-closing tags (incl. validation), boolean attributes
- Arbitrary user context object injection for component functions
- Dynamic derived attribute value generation via function values
- CSS formatting of `style` attribute objects
- Optional HTML entity encoding
- Support for comments and XML/DTD processing instructions
- Branch-local behavior control attributes to control serialization
- Small (1.9KB minified) & fast

(*) Lazy composition here means that functions are only executed at
serialization time. Examples below...

### Use cases

- Serverside rendering
- Static site, feed generation
- `.innerHTML` body generation
- SVG asset creation
- Shape trees for declarative canvas API drawing
- Generic intermediate representation format for many other use cases...

### No special sauce needed (or wanted)

Using only vanilla language features simplifies the development,
composability, reusability and testing of components. Furthermore, no
custom template parser is required and you're only restricted by the
expressiveness of the language / environment, not by your template
engine.

Components can be defined as simple functions returning arrays or loaded
via JSON/JSONP.

### What is Hiccup?

For many years, [Hiccup](https://github.com/weavejester/hiccup) has been
the de-facto standard to encode HTML/XML datastructures in Clojure. This
library brings & extends this convention into ES6. A valid Hiccup tree
is any flat (though, usually nested) array of the following possible
structures. Any functions embedded in the tree are expected to return
values of the same structure. Please see [examples](#examples) &
[API](#api) further explanations...

```ts
["tag", ...]
["tag#id.class1.class2", ...]
["tag", {other: "attrib", ...}, ...]
["tag", {...}, "body", 23, function, [...]]
[function, arg1, arg2, ...]
[{render: (ctx, ...args) => [...]}, args...]
iterable
```

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

### Tags with Zencoding expansion

Tag names support
[Zencoding/Emmet](https://docs.emmet.io/abbreviations/syntax/#id-and-class)
style ID & class attribute expansion:

```ts
serialize(
    ["div#yo.hello.world", "Look ma, ", ["strong", "no magic!"]]
);
```

```html
<div id="yo" class="hello world">Look ma, <strong>no magic!</strong></div>
```

### Attributes

Arbitrary attributes can be supplied via an optional 2nd array element.
`style` attributes can be given as CSS string or as an object. Boolean
attributes are serialized in HTML5 syntax (i.e. present or not, but no
values).

If the 2nd array element is not a plain object, it's treated as normal
child node (see previous example).

```ts
serialize(
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

If an attribute specifies a function as value, the function is called
with the entire attribute object as argument. This allows for the
dynamic generation of attribute values, based on existing ones. The
result MUST be a string.

**Function values for event attributes (any attrib name starting with
"on") WILL BE OMITTED from output.**

```ts
["div#foo", { bar: (attribs) => attribs.id + "-bar" }]
```

```html
<div id="foo" bar="foo-bar"></div>
```

```ts
["div#foo", { onclick: () => alert("foo") }, "click me!"]
```

```html
<div id="foo">click me!</div>
```

```ts
["div#foo", { onclick: "alert('foo')" }, "click me!"]
```

```html
<div id="foo" onclick="alert('foo')">click me!</div>
```

### Simple components

```ts
const thumb = (src) => ["img.thumb", { src, alt: "thumbnail" }];

serialize(
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

### User context injection

Every component function will receive an arbitrary user defined context
object as first argument. This context object is passed to `serialize()`
and is then auto-injected for every component function call.

The context object should contain any global component configuration,
e.g. for theming purposes.

```ts
const header = (ctx, body) =>
    ["h1", ctx.theme.title, body];

const section = (ctx, title, ...body) =>
    ["section", ctx.theme.section, [header, title], ...body];

// theme definition (here using Tachyons CSS classes,
// but could be any attributes)
const theme = {
    section: { class: "bg-black moon-gray bt b--dark-gray mt3" },
    title: { class: "white f3" }
};

serialize(
    [section, "Hello world", "Easy theming"],
    { theme }
);
// <section class="bg-black moon-gray bt b--dark-gray mt3"><h1 class="white f3">Hello world</h1>Easy theming</section>
```

**Note:** Of course the context is ONLY auto-injected for lazily
embedded component functions (as shown above), i.e. if the functions are
wrapped in arrays and only called during serialization. If you call a
component function directly, you MUST pass the context (or `null`) as
first arg yourself. Likewise, if a component function doesn't make use
of the context you can either:

```ts
// skip the context arg and require direct invocation
const div = (attribs, body) => ["div", attribs, body];

serialize(div({id: "foo"}, "bar"));
// <div id="foo">bar</div>
```

Or...

```ts
// ignore the first arg (context) and support both direct & indirect calls
const div = (_, attribs, body) => ["div", attribs, body];

// direct invocation of div (pass `null` as context)
serialize(div(null, {id: "foo"}, "bar"));
// <div id="foo">bar</div>

// lazy invocation of div
serialize([div, {id: "foo"}, "bar"]);
// <div id="foo">bar</div>
```

### SVG generation, generators & lazy composition

Also see
[@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)
for related functionality.

```ts
const fs = require("fs");

// creates an unstyled SVG circle element
// we ignore the first arg (an auto-injected context arg)
// context handling is described further below
const circle = (_, x, y, r) => ["circle", { cx: x | 0, cy: y | 0, r: r | 0 }];

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
import { SVG_NS } from "@thi.ng/hiccup";

const doc = [
    "svg", { xmlns: SVG_NS, width: 1000, height: 1000 },
        ["g", { fill: "none", stroke: "red" },
            repeatedly(100, randomCircle)]];

fs.writeFileSync("circles.svg", serialize(doc));
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

```ts
// data
const glossary = {
    foo: "widely used placeholder name in computing",
    bar: "usually appears in combination with 'foo'",
    hiccup: "de-facto standard format to define HTML in Clojure",
    toxi: "author of this fine library",
};

// mapping function to produce single definition list item (pair of <dt>/<dd> tags)
const dlItem = (index, key) => [["dt", key], ["dd", index[key]]];

// Helper function: takes a function `f` and object `items`,
// executes fn for each key (sorted) in object and returns array of results
const objectList = (f, items) => Object.keys(items).sort().map((k)=> f(items, k));

// full definition list component
const dlList = (_, attribs, items) => ["dl", attribs, objectList(dlItem, items)];

// finally the complete widget
const widget = [
    "div.widget",
        ["h1", "Glossary"],
        [dlList, { id: "glossary" }, glossary]];

// the 2nd arg `true` enforces HTML entity encoding (off by default)
serialize(widget, null, true);
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

```ts
// stateful component to create hierarchically
// indexed & referencable section headlines:
// e.g. "sec-1.1.2.3"
const indexer = (prefix = "sec") => {
    let counts = new Array(6).fill(0);
    return (_, level, title) => {
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

serialize([
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

### Component objects

The sibling library
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
supports components with basic life cycle methods (init, render,
release). In order to support serialization of hdom component trees,
hiccup too supports such components since version 2.0.0. However, for
static serialization only the `render` method is of interest and others
are ignored.

```ts
const component = {
    render: (ctx, title, ...body) => ["section", ["h1", title], ...body]
};

serialize([component, "Hello world", "Body"]);
```

### Behavior control attributes

The following attributes can be used to control the serialization
behavior of individual elements / tree branches:

- **`__skip`** - if true, skips serialization (also used by
  [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom))
- **`__serialize`** - if false, skips serialization (hiccup only)

```ts
serialize(["div.container", ["div", {__skip: true}, "ignore me"]]);
// <div class="container"></div>
```

### Comments

Single or multiline comments can be included using the special `COMMENT`
tag (`__COMMENT__`) (always WITHOUT attributes!).

```ts
[COMMENT, "Hello world"]
// <!-- Hello world -->

[COMMENT, "Hello", "world"]
// <!--
//     Hello
//     world
// -->
```

### XML / DTD processing instructions

Currently, the only processing / DTD instructions supported are:

- `?xml`
- `!DOCTYTPE`
- `!ELEMENT`
- `!ENTITY`
- `!ATTLIST`

These are used as follows (attribs are only allowed for `?xml`, all
others only accept a body string which is taken as is):

```ts
["?xml", { version: "1.0", standalone: "yes" }]
// <?xml version="1.0" standalone="yes"?>

["!DOCTYPE", "html"]
// <!DOCTYPE html>
```

Emitted processing instructions are always succeeded by a newline
character.

## API

The library exposes these two functions:

### serialize()

Signature: `serialize(tree: any, ctx?: any, escape = false): string`

Recursively normalizes and serializes given tree as HTML/SVG/XML string.
Expands any embedded component functions with their results. Each node
of the input tree can have one of the following input forms:

```ts
["tag", ...]
["tag#id.class1.class2", ...]
["tag", {other: "attrib"}, ...]
["tag", {...}, "body", function, ...]
[function, arg1, arg2, ...]
[{render: (ctx,...) => [...]}, args...]
iterable
```

Tags can be defined in "Zencoding" convention, e.g.

```ts
["div#foo.bar.baz", "hi"]
// <div id="foo" class="bar baz">hi</div>
```

The presence of the attributes object (2nd array index) is optional. Any
attribute values, incl. functions are allowed. If the latter, the
function is called with the full attribs object as argument and the
return value is used for the attribute. This allows for the dynamic
creation of attrib values based on other attribs. The only exception to
this are event attributes, i.e. attribute names starting with "on".

```ts
["div#foo", { bar: (attribs) => attribs.id + "-bar" }]
// <div id="foo" bar="foo-bar"></div>
```

The `style` attribute can ONLY be defined as string or object.

```ts
["div", {style: {color: "red", background: "#000"}}]
// <div style="color:red;background:#000;"></div>
```

Boolean attribs are serialized in HTML5 syntax (present or not). null or
empty string attrib values are ignored.

Any `null` or `undefined` array values (other than in head position) will be
removed, unless a function is in head position.

A function in head position of a node acts as a mechanism for component
composition & delayed execution. The function will only be executed at
serialization time. In this case the optional global context object and
all other elements of that node / array are passed as arguments when
that function is called. The return value the function MUST be a valid
new tree (or undefined).

```ts
const foo = (ctx, a, b) => ["div#" + a, ctx.foo, b];

serialize([foo, "id", "body"], { foo: { class: "black" }})
// <div id="id" class="black">body</div>
```

Functions located in other positions are called ONLY with the global
context arg and can return any (serializable) value (i.e. new trees,
strings, numbers, iterables or any type with a suitable .toString()
implementation).

Please also see list of supported [behavior control
attributes](#behavior-control-attributes).

### escape()

Signature: `escape(str: string): string`

Helper function. Applies HTML entity replacement on given string. If
`serialize()` is called with `true` as 2nd argument, entity encoding is
done automatically ([list of entities
considered](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup/src/api.ts#L11)).

<!-- include ../../assets/tpl/footer.md -->
