// SPDX-License-Identifier: Apache-2.0
import { flag, oneOf, parse, string, strings } from "@thi.ng/args";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { convertXML } from "./convert.js";
import { COMPACT_FORMAT, PRETTY_FORMAT, JSON_FORMAT } from "./format.js";
import { varName } from "./utils.js";

interface CLIOpts {
	tags?: string[];
	attribs?: string[];
	var?: string;
	singleQuote: boolean;
	format: "compact" | "json" | "pretty";
}

const res = parse<CLIOpts>(
	{
		tags: strings({
			alias: "t",
			hint: "NAMES",
			desc: "remove tags from tree",
			delim: ",",
		}),
		attribs: strings({
			alias: "a",
			hint: "NAMES",
			desc: "remove attribs from tree",
			delim: ",",
		}),
		var: string({
			alias: "v",
			hint: "NAME",
			desc: "generate TS export var decl",
		}),
		singleQuote: flag({ alias: "s", desc: "use single quotes" }),
		format: oneOf({
			opts: ["compact", "json", "pretty"],
			alias: "fmt",
			desc: "enable pretty printing",
			default: "pretty",
		}),
	},
	process.argv
);

if (!res || res.done) {
	console.log("Please run: hiccup --help");
	process.exit(1);
}

const opts = res.result;
const xmlFile = resolve(res.rest[0]);
const quote = opts.singleQuote ? `'` : `"`;
const copts = {
	format: {
		compact: { ...COMPACT_FORMAT, quote },
		pretty: { ...PRETTY_FORMAT, quote, indent: 4 },
		json: JSON_FORMAT,
	}[opts.format],
	removeAttribs: new Set(opts.attribs || []),
	removeTags: new Set(opts.tags || []),
};

const xml = readFileSync(xmlFile).toString();
const hiccup = convertXML(xml, copts);

console.log(
	opts.var ? `export const ${varName(opts.var)} =\n${hiccup};` : hiccup
);
