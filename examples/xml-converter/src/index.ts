import { stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/stream-sync";
import { splice } from "@thi.ng/strings/splice";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { convertXML } from "./convert";
import { COMPACT_FORMAT, DEFAULT_FORMAT } from "./format";
import { xformAsSet } from "./utils";

// input streams (reactive state values)
const inputs = {
    xml: stream<string>(),
    prettyPrint: stream<boolean>(),
    doubleQuote: stream<boolean>(),
    trailingComma: stream<boolean>(),
    removeAttribs: stream<string>(),
    removeTags: stream<string>(),
};

// configurable editor panel UI component
// (uses Tachyons CSS classes for styling)
const editPane = (_, title, attribs, value, extra?) =>
    ["div.w-50-ns.pa3",
        ["h3.ma0.mb2", ...title],
        ["textarea.w-100.pa2.bn.f7.code", { rows: 25, value, ...attribs }],
        ["div.f7", `${value.length} chars`],
        extra];

// configurable input UI component
const input = (_, label, attribs) =>
    ["div.mb2",
        ["label.dib.w-100.w-25-l.pv2", { for: attribs.id }, label],
        ["input.w-100.w-75-l.pa1.bg-light-silver.white.bn", attribs]];

// combined transform options input components
const transformOpts = (_, inputs) =>
    ["div",
        ["h3", "Options"],
        mapIndexed(
            (i, [label, type, stream]) => {
                let v = type === "checkbox" ? "checked" : "value";
                return [input, label,
                    {
                        id: "opt" + i,
                        type,
                        [v]: stream.deref(),
                        oninput: (e) => stream.next(e.target[v])
                    }];
            },
            [
                ["Remove tags", "text", inputs.removeTags],
                ["Remove attributes", "text", inputs.removeAttribs],
                ["Pretty print", "checkbox", inputs.prettyPrint],
                ["Double quotes", "checkbox", inputs.doubleQuote],
                ["Trailing commas", "checkbox", inputs.trailingComma],
            ]
        )
    ];

// hdom UI root component receives tuple of xml & formatted hiccup
// strings. defined as closure purely for demonstration purposes and to
// avoid component is using global vars
const app = (inputs: any) =>
    ({ src, hiccup }) =>
        ["div.flex-ns",
            [editPane,
                ["XML/HTML source", ["small.fw1.ml2.dn.dib-l", "(must be well formed!)"]],
                {
                    class: "bg-washed-green",
                    autofocus: true,
                    onkeydown: (e: KeyboardEvent) => {
                        // override tab to insert spaces at edit pos
                        if (e.key === "Tab") {
                            e.preventDefault();
                            inputs.xml.next(
                                splice(src, "    ", (<HTMLTextAreaElement>e.target).selectionStart)
                            );
                        }
                    },
                    // emitting a new value to the stream will
                    // re-trigger UI update
                    oninput: (e) => inputs.xml.next(e.target.value),
                },
                src],
            [editPane,
                ["Transformed Hiccup / JSON"],
                {
                    class: hiccup.indexOf("error") < 0 ?
                        "bg-light-gray" :
                        "bg-washed-red"
                },
                hiccup,
                [transformOpts, inputs]]];

// stream combinator to assemble formatter options
const formatOpts = sync({
    src: {
        trailingComma: inputs.trailingComma,
        doubleQuote: inputs.doubleQuote,
        prettyPrint: inputs.prettyPrint,
    },
    xform: map(
        (opts: any) => ({
            ...(opts.prettyPrint ? DEFAULT_FORMAT : COMPACT_FORMAT),
            trailingComma: opts.trailingComma,
            quote: opts.doubleQuote ? `"` : `'`,
        })
    )
});

// stream combinator to assemble conversion options
const opts = sync({
    src: {
        format: formatOpts,
        removeAttribs: inputs.removeAttribs.transform(xformAsSet),
        removeTags: inputs.removeTags.transform(xformAsSet),
    }
});

// main stream combinator to create & update UI
const main = sync({
    src: {
        opts,
        src: inputs.xml
    }
}).transform(
    map((state: any) => ({
        ...state,
        hiccup: convertXML(state.src, state.opts)
    })),
    map(app(inputs)),
    updateDOM()
);

// initial options
inputs.removeTags.next("head");
inputs.removeAttribs.next("id,class");
inputs.trailingComma.next(true);
inputs.doubleQuote.next(true);
inputs.prettyPrint.next(true);

// seed input and kick off UI/app
inputs.xml.next(`<html lang="en">
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
    hot && hot.dispose(() => main.done());
}
