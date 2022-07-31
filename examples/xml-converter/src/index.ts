import { reactive } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers/map";
import { convertXML } from "./convert.js";
import { COMPACT_FORMAT, DEFAULT_FORMAT } from "./format.js";
import { app, UI } from "./ui.js";
import { xformAsSet } from "./utils.js";

// input streams (reactive state values)
const inputs = {
	xml: reactive(`<html lang="en">
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
</html>`),
	prettyPrint: reactive(true),
	doubleQuote: reactive(true),
	trailingComma: reactive(true),
	removeAttribs: reactive("id,class"),
	removeTags: reactive("head"),
	copyButton: reactive(false),
};

// stream combinator to assemble formatter options
const formatOpts = sync({
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
const opts = sync({
	src: {
		format: formatOpts,
		removeAttribs: inputs.removeAttribs.transform(xformAsSet),
		removeTags: inputs.removeTags.transform(xformAsSet),
	},
});

// main stream combinator to create & update UI
sync({
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
