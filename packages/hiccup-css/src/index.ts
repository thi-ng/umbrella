import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { transduce } from "@thi.ng/transducers/transduce";
import { permutations } from "@thi.ng/transducers/iter/permutations";
import { repeat } from "@thi.ng/transducers/iter/repeat";
import { str } from "@thi.ng/transducers/rfn/str";
import { flatten } from "@thi.ng/transducers/xform/flatten";
import { map } from "@thi.ng/transducers/xform/map";

export interface Format {
    rules: string;
    ruleSep: string;
    valSep: string;
    decls: string;
    declStart: string;
    declEnd: string;
    indent: string;
}

export interface CSSOpts {
    format: Format;
    autoprefix: string[] | Set<string>;
    vendors: string[];
    depth: number;
}

const NO_SPACES = ".:[";

export const COMPACT: Format = { rules: "", ruleSep: ",", valSep: "", decls: "", declStart: "{", declEnd: "}", indent: "" };
export const PRETTY: Format = { rules: "\n", ruleSep: ", ", valSep: " ", decls: "\n", declStart: " {\n", declEnd: "}\n", indent: "    " };

const xfSel = ((a, b) => (x) => a(b(x)))(
    flatten(),
    map((x: string) => NO_SPACES.indexOf(x.charAt(0)) >= 0 ? x : " " + x)
);

export function css(rules: any, opts?: Partial<CSSOpts>) {
    opts = { format: COMPACT, autoprefix: new Set(), vendors: [], depth: 0, ...opts };
    if (isArray(opts.autoprefix)) {
        opts.autoprefix = new Set(opts.autoprefix);
    }
    if (isArray(rules)) {
        return _css([], [], rules, <CSSOpts>opts).join(opts.format.rules);
    }
    if (isFunction(rules)) {
        return rules([], opts).join(opts.format.rules);
    }
    if (isPlainObject(rules)) {
        return formatDecls(rules, <CSSOpts>opts);
    }
}

function _css(acc: string[], parent: any[], rules: any[], opts: CSSOpts) {
    const n = rules.length;
    const sel: string[] = [];
    let curr: any;
    for (let i = 0; i < n; i++) {
        const r = rules[i];
        if (isArray(r)) {
            _css(acc, makeSelector(parent, sel), r, opts);
        } else if (isFunction(r)) {
            if (parent.length === 0) {
                r(acc, opts);
            } else {
                sel.push(r());
            }
        } else if (isPlainObject(r)) {
            curr = Object.assign(curr || {}, r);
        } else {
            sel.push(r);
        }
    }
    if (curr) {
        acc.push(formatRule(parent, sel, curr, opts));
    }
    return acc;
}

export function mediaQuery(cond, rules: any[]) {
    return (acc: string[], opts: CSSOpts) => {
        const space = indent(opts);
        acc.push(`${space}@media(${cond})${opts.format.declStart}`);
        opts.depth++;
        _css(acc, [], rules, opts);
        opts.depth--;
        acc.push(space + opts.format.declEnd);
        return acc;
    };
}

function formatDecls(rules: any, opts: CSSOpts) {
    const f = opts.format;
    const space = indent(opts, opts.depth + 1);
    const acc = [];
    for (let r in rules) {
        if (rules.hasOwnProperty(r)) {
            let val = rules[r];
            if (isFunction(val)) {
                val = val(rules);
            }
            if ((<Set<string>>opts.autoprefix).has(r)) {
                for (let v of opts.vendors) {
                    acc.push(`${space}${v}-${r}:${f.valSep}${val};`);
                }
            } else {
                acc.push(`${space}${r}:${f.valSep}${val};`);
            }
        }
    }
    return acc.join(f.decls) + f.decls;
}

function makeSelector(parent: any[], curr: any[]) {
    return parent.length ? [...permutations(parent, curr)] : curr;
}

function formatRule(parent: any[], sel: any[], curr: any, opts: CSSOpts) {
    const f = opts.format;
    const space = indent(opts);
    return space
        + transduce(
            map((sel: any[]) => transduce(xfSel, str(), isArray(sel) ? sel : [sel]).trim()),
            str(f.ruleSep),
            makeSelector(parent, sel))
        + f.declStart
        + formatDecls(curr, opts)
        + space
        + f.declEnd;
}

function indent(opts: CSSOpts, d = opts.depth) {
    return d > 1 ? [...repeat(opts.format.indent, d)].join("") : d > 0 ? opts.format.indent : "";
}
