import { peek } from "@thi.ng/arrays/peek";
import { isArray } from "@thi.ng/checks/is-array";
import { isBoolean } from "@thi.ng/checks/is-boolean";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { DEFAULT } from "@thi.ng/defmulti/constants";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { repeat } from "@thi.ng/strings/repeat";

export interface FormatOpts {
    indent: number;
    tabSize: number;
    lineSep: string;
    prefix?: string;
    quote: string;
    ws: string;
    trailingComma: boolean;
}

export const DEFAULT_FORMAT: FormatOpts = {
    indent: 0,
    tabSize: 4,
    trailingComma: true,
    lineSep: "\n",
    prefix: "",
    quote: `"`,
    ws: " ",
};

export const COMPACT_FORMAT: FormatOpts = {
    indent: 0,
    tabSize: 0,
    trailingComma: false,
    lineSep: "",
    prefix: "",
    quote: `"`,
    ws: "",
};

// memoized indentations
export const spaces = (n: number) => repeat(" ", n);

// creates new state with deeper indentation
const indentState = (opts: FormatOpts): FormatOpts => ({
    ...opts,
    indent: opts.indent + opts.tabSize,
});

// dispatch helper function for the `format` defmulti below
const classify = (x: any) =>
    isArray(x) ? "array" : isPlainObject(x) ? "obj" : DEFAULT;

// wraps attrib name in quotes if needed
const formatAttrib = (opts: FormatOpts, x: string) =>
    /^[a-z]+$/i.test(x) ? x : opts.quote + x + opts.quote;

// attrib or body value formatter
const formatVal = (opts: FormatOpts, x: any, indent = true) =>
    isNumber(x) || isBoolean(x)
        ? x
        : isPlainObject(x)
        ? format(indent ? indentState(opts) : opts, "", x)
        : opts.quote + escape(opts, x) + opts.quote;

// attrib key-value pair formatter w/ indentation
const formatPair = (opts: FormatOpts, x: any, k: string) =>
    spaces(opts.indent) +
    formatAttrib(opts, k) +
    ":" +
    opts.ws +
    formatVal(opts, x[k], k !== "style");

const escape = (opts: FormatOpts, x: any) =>
    opts.quote === '"'
        ? String(x).replace(/"/g, '\\"')
        : String(x).replace(/'/g, "\\'");

// multiple-dispatch function to format the transformed tree (hiccup
// structure) into a more compact & legible format than produced by
// standard: `JSON.stringify(tree, null, 4)`
export const format = defmulti<FormatOpts, string, any, string>((_, __, x) =>
    classify(x)
);

// implementation for array values
format.add("array", (opts, res, x) => {
    const hasAttribs = isPlainObject(x[1]);
    let attribs = hasAttribs ? Object.keys(x[1]) : [];
    res += spaces(opts.indent) + "[" + opts.quote + x[0] + opts.quote;
    if (hasAttribs) {
        res += "," + opts.ws;
        res = format(
            {
                ...indentState(opts),
                prefix: `${opts.lineSep}${spaces(opts.indent + opts.tabSize)}`,
            },
            res,
            x[1]
        );
    }
    // single line if none or only single child
    // and if no `style` attrib
    if (
        x.length === (hasAttribs ? 3 : 2) &&
        attribs.length < 2 &&
        attribs[0] !== "style" &&
        classify(peek(x)) === DEFAULT
    ) {
        return (
            format({ ...opts, indent: 0 }, (res += "," + opts.ws), peek(x)) +
            "]"
        );
    }
    // default format if more children
    for (let i = hasAttribs ? 2 : 1; i < x.length; i++) {
        res += "," + opts.lineSep;
        res = format(indentState(opts), res, x[i]);
    }
    res += "]";
    return res;
});

// implementation for object values (i.e. attributes in this case)
format.add("obj", (opts, res, x) => {
    const keys = Object.keys(x);
    if (keys.length === 0) {
        res += `{}`;
    } else if (
        keys.length === 1 &&
        (keys[0] !== "style" || Object.keys(x.style).length < 2)
    ) {
        res +=
            "{" +
            opts.ws +
            formatPair({ ...opts, indent: 0 }, x, keys[0]) +
            opts.ws +
            "}";
    } else {
        const outer = spaces(opts.indent);
        res += opts.prefix + "{" + opts.lineSep;
        for (let i = keys.length; --i >= 0; ) {
            const k = keys[i];
            res += formatPair(
                k === "style"
                    ? { ...indentState(opts), prefix: "" }
                    : indentState(opts),
                x,
                k
            );
            res += (opts.trailingComma || i > 0 ? "," : "") + opts.lineSep;
        }
        res += outer + "}";
    }
    return res;
});

// implementation for other values
format.add(
    DEFAULT,
    (opts, res, x) => (res += spaces(opts.indent) + formatVal(opts, x))
);
