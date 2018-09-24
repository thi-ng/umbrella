import { stream } from "@thi.ng/rstream/stream";
import { parse, Type } from "@thi.ng/sax";
import { maybeParseFloat } from "@thi.ng/strings/parse";
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

const parseXML = (src: string) =>
    transduce(
        comp(
            parse({ trim: true }),
            filter((e) => e.type === Type.ELEM_END || e.type === Type.ERROR)
        ),
        last(),
        src
    );

const transformAttribs = (attribs: any) =>
    transduce(
        comp(
            map(([k, v]) => [k, maybeParseFloat(v, null)]),
            filter(([_, v]) => v !== null),
        ),
        assocObj(),
        attribs,
        pairs(attribs)
    );

const transformTree = (tree) => {
    if (tree.type === Type.ERROR) {
        return ["error", tree.body];
    }
    const res: any[] = [];
    const attribs = transformAttribs(tree.attribs);
    let tag = tree.tag;
    if (attribs.id) {
        tag += "#" + attribs.id;
        delete attribs.id;
    }
    if (attribs.class) {
        tag += "." + attribs.class.replace(/\s+/g, ".");
        delete attribs.class;
    }
    res.push(tag);
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

const app = ([html, hiccup]) =>
    ["div.flex",
        ["div",
            ["h3", "XML/HTML source",
                ["small.fw1.ml2", "(must be well formed!)"]],
            ["textarea.mr2.f7.code.bg-light-yellow",
                {
                    cols: 72,
                    rows: 25,
                    oninput: (e) => src.next(e.target.value),
                    value: html
                }]
        ],
        ["div",
            ["h3", "Parsed Hiccup / JSON"],
            ["textarea.f7.code",
                {
                    cols: 72,
                    rows: 25,
                    disabled: true
                },
                JSON.stringify(hiccup, null, 2)
            ]
        ]
    ];

const src = stream<string>()
    .transform(
        multiplex(
            map(identity),
            comp(
                map(parseXML),
                map(transformTree)
            )
        ),
        map(app),
        updateDOM()
    );

src.next(`<html lang="en">
    <head>
        <title>foo</title>
    </head>
    <body class="foo bar">
        <div id="app"></div>
    </body>
</html>`);

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => src.done());
}

["html",
    {
        "lang": "en"
    },
    [
        "head",
        [
            "title",
            "foo"
        ]
    ],
    [
        "body.foo.bar",
        [
            "div#app"
        ]
    ]
]