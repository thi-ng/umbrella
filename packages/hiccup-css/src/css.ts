import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { transduce } from "@thi.ng/transducers/transduce";
import { permutations } from "@thi.ng/transducers/iter/permutations";
import { str } from "@thi.ng/transducers/rfn/str";
import { flatten } from "@thi.ng/transducers/xform/flatten";
import { map } from "@thi.ng/transducers/xform/map";

import { CSSOpts, COMPACT, DEFAULT_VENDORS } from "./api";
import { indent } from "./utils";

const NO_SPACES = ".:[";

const xfSel = ((a, b) => (x) => a(b(x)))(
    flatten(),
    map((x: string) => NO_SPACES.indexOf(x.charAt(0)) >= 0 ? x : " " + x)
);

export function css(rules: any, opts?: Partial<CSSOpts>) {
    opts = {
        format: COMPACT,
        autoprefix: new Set(),
        vendors: DEFAULT_VENDORS,
        fns: {},
        depth: 0,
        ...opts
    };
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

export function _css(acc: string[], parent: any[], rules: any[], opts: CSSOpts) {
    const n = rules.length;
    const sel: string[] = [];
    let curr: any, isFn;
    for (let i = 0; i < n; i++) {
        const r = rules[i];
        if (isArray(r)) {
            _css(acc, makeSelector(parent, sel), r, opts);
        } else if ((isFn = isFunction(r)) || opts.fns[r]) {
            if (parent.length === 0) {
                return opts.fns[r] ?
                    opts.fns[r].apply(null, rules.slice(i + 1))(acc, opts) :
                    r(acc, opts);
            } else if (isFn) {
                sel.push(r());
            } else {
                throw new Error(`quoted fn ('${r}') only allowed @ root level`);
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

export function formatDecls(rules: any, opts: CSSOpts) {
    const f = opts.format;
    const prefixes = <Set<string>>opts.autoprefix;
    const space = indent(opts, opts.depth + 1);
    const acc = [];
    for (let r in rules) {
        if (rules.hasOwnProperty(r)) {
            let val = rules[r];
            if (isFunction(val)) {
                val = val(rules);
            }
            if (isArray(val)) {
                val = val.map((v) => isArray(v) ? v.join(" ") : v).join(f.ruleSep);
            }
            if (prefixes.has(r)) {
                for (let v of opts.vendors) {
                    acc.push(`${space}${v}${r}:${f.valSep}${val};`);
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

