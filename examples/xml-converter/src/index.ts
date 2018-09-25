import { isString } from "@thi.ng/checks/is-string";
import { stream, Stream } from "@thi.ng/rstream/stream";
import {
    parse,
    ParseElement,
    ParseEvent,
    Type
} from "@thi.ng/sax";
import { maybeParseFloat } from "@thi.ng/strings/parse";
import { splice } from "@thi.ng/strings/splice";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { comp } from "@thi.ng/transducers/func/comp";
import { identity } from "@thi.ng/transducers/func/identity";
import { pairs } from "@thi.ng/transducers/iter/pairs";
import { assocObj } from "@thi.ng/transducers/rfn/assoc-obj";
import { last } from "@thi.ng/transducers/rfn/last";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { filter } from "@thi.ng/transducers/xform/filter";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplex } from "@thi.ng/transducers/xform/multiplex";
import { format, spaces } from "./format";

// parses given XMLish string using @thi.ng/sax transducer into a
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
            (v != null) && (acc[k.trim()] = parseAttrib([k, v.trim()])[1]);
            return acc;
        },
        {}
    );

// takes attrib key-value pair and attempts to coerce / transform its
// value. returns updated pair.
const parseAttrib = ([k, v]: string[]) =>
    k === "style" && isString(v) ?
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
    if (isString(attribs.class)) {
        const classes = attribs.class.replace(/\s+/g, ".");
        classes.length && (tag += "." + classes);
        delete attribs.class;
    }
    return tag;
};

// recursively transforms entire parse tree
const transformTree = (tree: ParseEvent | ParseElement) => {
    if ((<ParseEvent>tree).type === Type.ERROR) {
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
            map((tree) => format({ indent: 0, tabSize: 4 }, tree, ""))
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
        <h1 style="color:red;bg:blue">
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
