import { stream, sync } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { convertXML } from "./convert";
import { COMPACT_FORMAT, DEFAULT_FORMAT } from "./format";
import { app, UI } from "./ui";
import { xformAsSet } from "./utils";

// input streams (reactive state values)
const inputs = {
    xml: stream<string>(),
    prettyPrint: stream<boolean>(),
    doubleQuote: stream<boolean>(),
    trailingComma: stream<boolean>(),
    removeAttribs: stream<string>(),
    removeTags: stream<string>(),
    copyButton: stream<boolean>(),
};

// stream combinator to assemble formatter options
const formatOpts = sync<any, any>({
    src: {
        trailingComma: inputs.trailingComma,
        doubleQuote: inputs.doubleQuote,
        prettyPrint: inputs.prettyPrint,
    },
    xform: map((opts: any) => ({
        ...(opts.prettyPrint ? DEFAULT_FORMAT : COMPACT_FORMAT),
        trailingComma: opts.trailingComma,
        quote: opts.doubleQuote ? `"` : `'`,
    })),
});

// stream combinator to assemble conversion options
const opts = sync<any, any>({
    src: {
        format: formatOpts,
        removeAttribs: inputs.removeAttribs.transform(xformAsSet),
        removeTags: inputs.removeTags.transform(xformAsSet),
    },
});

// main stream combinator to create & update UI
const main = sync<any, any>({
    src: {
        src: inputs.xml,
        copy: inputs.copyButton,
        opts,
    },
}).transform(
    // convert xml -> hiccup
    map((state: any) => ({
        ...state,
        hiccup: convertXML(state.src, state.opts),
    })),
    // transform into hdom tree
    map(app(UI.main, inputs)),
    // apply to real DOM
    updateDOM({ ctx: UI })
);

// all inputs need to be initialized
// in order for the UI to be rendered at least once

// initial options
inputs.removeTags.next("head");
inputs.removeAttribs.next("id,class");
inputs.trailingComma.next(true);
inputs.doubleQuote.next(true);
inputs.prettyPrint.next(true);

inputs.copyButton.next(false);

// seed input and kick off UI/app
inputs.xml.next(
    `<html lang="en">
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
</html>`
);

// ParcelJS HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => main.done());
}
