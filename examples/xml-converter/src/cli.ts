import { readFileSync } from "fs";
import { resolve } from "path";
import { strings, string, flag, parse } from "@thi.ng/args";
import { convertXML } from "./convert.js";
import { COMPACT_FORMAT, DEFAULT_FORMAT } from "./format.js";
import { varName } from "./utils.js";

interface CLIOpts {
	tags?: string[];
	attribs?: string[];
	var?: string;
	singleQuote: boolean;
	pretty: boolean;
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
		pretty: flag({ alias: "p", desc: "enable pretty printing" }),
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
	format: opts.pretty
		? { ...DEFAULT_FORMAT, quote, indent: 4 }
		: { ...COMPACT_FORMAT, quote },
	removeAttribs: new Set(opts.attribs || []),
	removeTags: new Set(opts.tags || []),
};

const xml = readFileSync(xmlFile).toString();
const hiccup = convertXML(xml, copts);

console.log(
	opts.var ? `export const ${varName(opts.var)} =\n${hiccup};` : hiccup
);
