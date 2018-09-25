import { isArray } from "@thi.ng/checks/is-array";
import { isBoolean } from "@thi.ng/checks/is-boolean";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { stream, Stream } from "@thi.ng/rstream/stream";
import { parse, Type } from "@thi.ng/sax";
import { splice } from "@thi.ng/strings/splice";
import { maybeParseFloat } from "@thi.ng/strings/parse";
import { repeat } from "@thi.ng/strings/repeat";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { comp } from "@thi.ng/transducers/func/comp";
import { identity } from "@thi.ng/transducers/func/identity";
import { peek } from "@thi.ng/transducers/func/peek";
import { pairs } from "@thi.ng/transducers/iter/pairs";
import { assocObj } from "@thi.ng/transducers/rfn/assoc-obj";
import { last } from "@thi.ng/transducers/rfn/last";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { filter } from "@thi.ng/transducers/xform/filter";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplex } from "@thi.ng/transducers/xform/multiplex";

// parses given XMLish string using @thi.ng/sax transducer into a tree
// sequence of parse events. we only care about the final (or error)
// event, which will be related to the final close tag and contains the
// entire tree
const parseXML = (src: string) =>
    transduce(
        comp(
            parse({ trim: true, boolean: true, entities: true }),
            filter((e) => e.type === Type.ELEM_END || e.type === Type.ERROR)
        ),
        last(),
        src
    );

// transforms string of CSS properties into a plain object
const transformCSS = (css: string) =>
    css.split(";").reduce(
        (acc, p) => {
            const [k, v] = p.split(":");
            acc[k.trim()] = v.trim();
            return acc;
        },
        {}
    );

// takes attrib key-value pair and attempts to coerce / transform its
// value. returns updated pair.
const parseAttrib = ([k, v]: string[]) =>
    k === "style" ?
        [k, transformCSS(v)] :
        v === "true" ?
            [k, true] :
            v === "false" ?
                [k, false] :
                [k, maybeParseFloat(v, v)];

// transforms an entire object of attributes
const transformAttribs = (attribs: any) =>
    transduce(
        map(parseAttrib),
        assocObj(),
        attribs,
        pairs<string>(attribs)
    );

// transforms element name by attempting to form Emmet-like tags
const transformTag = (tag: string, attribs: any) => {
    if (attribs.id) {
        tag += "#" + attribs.id;
        delete attribs.id;
    }
    if (attribs.class) {
        tag += "." + attribs.class.replace(/\s+/g, ".");
        delete attribs.class;
    }
    return tag;
};

// recursively transforms entire parse tree
const transformTree = (tree: any) => {
    if (tree.type === Type.ERROR) {
        return ["error", tree.body];
    }
    const attribs = transformAttribs(tree.attribs);
    const res: any[] = [transformTag(tree.tag, attribs)];
    if (Object.keys(attribs).length) {
        res.push(attribs);
    }
    if (tree.body) {
        res.push(tree.body);
    }
    if (tree.children && tree.children.length) {
        transduce(map(transformTree), push(), res, tree.children)
    }
    return res;
};

// dispatch helper function for the `format` defmulti below
const classify = (x: any) =>
    isArray(x) ? "array" : isPlainObject(x) ? "obj" : DEFAULT;

// wraps attrib name in quotes if needed
const formatAttrib = (x: string) =>
    /^[a-z]+$/i.test(x) ? x : `"${x}"`;

// attrib or body value formatter
const formatVal = (x: any, indent: number, istep: number) =>
    isNumber(x) || isBoolean(x) ?
        x :
        isPlainObject(x) ?
            format(x, "", indent + istep, istep) :
            `"${x}"`;

// attrib key-value pair formatter w/ indentation
const formatPair = (x: any, k: string, indent: number, istep: number) =>
    `${spaces(indent)}${formatAttrib(k)}: ${formatVal(x[k], indent, istep)}`;

// memoized indentations
const spaces = (n: number) => repeat(" ", n);

// multiply dispatch function to format the transformed tree (hiccup
// structure) into a more compact & legible format than produced by
// standard: `JSON.stringify(tree, null, 4)`
const format = defmulti<any, string, number, number, string>(classify);

// implementation for array values
format.add("array", (x, res, indent, istep) => {
    const hasAttribs = isPlainObject(x[1]);
    let attribs = hasAttribs ? Object.keys(x[1]) : [];
    res += `${spaces(indent)}["${x[0]}"`;
    if (hasAttribs) {
        res += ", ";
        res = format(x[1], res, indent + istep, istep);
    }
    // single line if none or only single child
    // and if max. 1 CSS prop
    if (x.length === (hasAttribs ? 3 : 2) &&
        attribs.length < 2 &&
        attribs[0] !== "style" &&
        classify(peek(x)) === DEFAULT) {
        return format(peek(x), res += ", ", 0, istep) + "]";
    }
    // default format if more children
    for (let i = hasAttribs ? 2 : 1; i < x.length; i++) {
        res += ",\n";
        res = format(x[i], res, indent + istep, istep);
    }
    res += "]";
    return res;
});

// implementation for object values (i.e. attributes in this case)
format.add("obj", (x, res, indent, istep) => {
    const keys = Object.keys(x);
    if (keys.length === 1 &&
        (keys[0] !== "style" || Object.keys(x.style).length == 1)) {
        res += `{ ${formatPair(x, keys[0], 0, istep)} }`;
    } else {
        const outer = spaces(indent);
        res += `\n${outer}{\n`;
        for (let k in x) {
            res += formatPair(x, k, indent + istep, istep) + ",\n";
        }
        res += outer + "}";
    }
    return res;
});

// implementation for other values
format.add(DEFAULT, (x, res, indent, istep) =>
    res += spaces(indent) + formatVal(x, indent, istep));

// hdom UI root component receives tuple of xml & formatted hiccup
// strings. defined as closure purely for demonstration purposes and to
// avoid app using global vars
const app = (src: Stream<string>) =>
    ([xml, hiccup]: string[]) =>
        ["div.flex",
            ["div",
                ["h3", "XML/HTML source",
                    ["small.fw1.ml2", "(must be well formed!)"]],
                ["textarea.mr2.f7.code.bg-light-yellow",
                    {
                        cols: 72,
                        rows: 25,
                        autofocus: true,
                        onkeydown: (e: KeyboardEvent) => {
                            // override tab to insert spaces at edit pos
                            if (e.key === "Tab") {
                                e.preventDefault();
                                src.next(
                                    splice(xml, spaces(4), (<any>e.target).selectionStart)
                                );
                            }
                        },
                        // emitting a new value to the stream will
                        // re-trigger UI update
                        oninput: (e) => src.next(e.target.value),
                        value: xml
                    }]
            ],
            ["div",
                ["h3", "Parsed Hiccup / JSON"],
                ["textarea.f7.code",
                    {
                        cols: 72,
                        rows: 25,
                        disabled: true,
                        value: hiccup
                    },
                ]
            ]
        ];

// create a stream which transforms input values (xml strings) parses,
// transforms and formats them and then forms a tuple of:
// `[orig, formatted]` to pass to the root component function and
// finally updates the DOM
const src = stream<string>();
src.transform(
    multiplex(
        map(identity),
        comp(
            map(parseXML),
            map(transformTree),
            map((tree) => format(tree, "", 0, 4))
        )
    ),
    map(app(src)),
    updateDOM()
);

// seed input and kick off UI/app
src.next(`<html lang="en">
    <head>
        <title>foo</title>
    </head>
    <body class="foo bar">
        <h1 style="color:red">
            HTML &amp; Hiccup walk into a bar...
        </h1>
        <div id="app"></div>
        <input disabled value="42"/>
    </body>
</html>`);

// ParcelJS HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => src.done());
}
