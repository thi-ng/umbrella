# xml-converter

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/xml-converter.png)

[Live demo](http://demo.thi.ng/umbrella/xml-converter/)

This example uses
[@thi.ng/sax](https://github.com/thi-ng/umbrella/tree/develop/packages/sax)
to convert XML/HTML/SVG syntax into
[hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
/ JSON syntax and provides several options to filter the parsed tree and
control the resulting output format.

## Dataflow

This diagram illustrates the
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
dataflow topology used by the browser app:

![dataflow](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/xml-converter-dflow.png)

## Browser version

Please refer to the [example build
instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)
on the wiki.

**IMPORTANT:** Please also see the [troubleshooting
note](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions#troubleshooting)
and temporary workaround for this example.

## CLI version

In addition to the above browser UI, this example can be built as a
**basic** CLI tool to convert & filter files (the result is always
written to stdout).

```bash
# in this example's project root...
yarn install

yarn build-cli

bin/hiccup --help
# Usage: hiccup [options] <file>
#
# Options:
#
#   -V, --version          output the version number
#   -t, --tags <items>     remove tags from tree
#   -a, --attribs <items>  remove attribs from tree
#   -v, --var <name>       generate TS export var declaration
#   -s, --single-quote     use single quotes
#   -p, --no-pretty        disable pretty printing
#   -h, --help             output usage information

# Example file
cat << EOF > foo.svg
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="10px"
     height="10px"
     viewBox="0 0 10 10"
     version="1.1"
     xmlns="http://www.w3.org/2000/svg">
    <title>add</title>
    <desc>Foo bar</desc>
    <defs></defs>
    <g id="add" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M6,4 L10,4 L10,6 L6,6 L6,10 L4,10 L4,6 L0,6 L0,4 L4,4 L4,0 L6,0 L6,4 Z"
              id="Plus" fill="#000000"/>
    </g>
</svg>
EOF

bin/hiccup \
    -v ICON \ # create a target var name
    -t title,desc,defs \ # remove tags
    -a id,style,stroke,fill,xmlns,width,height,version \ # remove attribs
    foo.svg
# export const ICON =
#     ["svg", { viewBox: "0 0 10 10" },
#         ["g",
#             {
#                 "fill-rule": "evenodd",
#                 "stroke-width": 1,
#             },
#             ["path", { d: "M6,4 L10,4 L10,6 L6,6 L6,10 L4,10 L4,6 L0,6 L0,4 L4,4 L4,0 L6,0 L6,4 Z" }]]];
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
