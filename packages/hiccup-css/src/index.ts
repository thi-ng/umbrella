import { IObjectOf } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { transduce } from "@thi.ng/transducers/transduce";
import { permutations } from "@thi.ng/transducers/iter/permutations";
import { str } from "@thi.ng/transducers/rfn/str";
import { flatten } from "@thi.ng/transducers/xform/flatten";
import { map } from "@thi.ng/transducers/xform/map";

export interface Format {
    rules: string;
    ruleSep: string;
    decls: string;
    declsStart: string;
    declEnd: string;
    indent: string;
}

const NO_SPACES = ":[";

export const FORMATS: IObjectOf<Format> = {
    min: { rules: "", ruleSep: ",", decls: "", declsStart: "{", declEnd: "}", indent: "" },
    pretty: { rules: "\n", ruleSep: ", ", decls: "\n", declsStart: " {\n", declEnd: "\n}", indent: "    " },
};

const xfSel = ((a, b) => (x) => a(b(x)))(
    flatten(),
    map((x: string) => NO_SPACES.indexOf(x.charAt(0)) >= 0 ? x : " " + x)
);

export function css(rules: any, fmt = FORMATS.min) {
    if (isArray(rules)) {
        return _css([], [], rules, fmt).join(fmt.rules);
    }
    if (isPlainObject(rules)) {
        return format(rules, fmt);
    }
}

function _css(acc: string[], parent: any[], rules: any[], fmt: Format) {
    const n = rules.length;
    const sel: string[] = [];
    let curr: any;
    for (let i = 0; i < n; i++) {
        const r = rules[i];
        if (isArray(r)) {
            _css(acc, makeSelector(parent, sel), r, fmt);
        } else if (isPlainObject(r)) {
            curr = Object.assign(curr || {}, r);
        } else {
            sel.push(r);
        }
    }
    if (curr) {
        acc.push(formatRule(parent, sel, curr, fmt));
    }
    return acc;
}

function format(rules: any, fmt: Format) {
    const acc = [];
    for (let r in rules) {
        if (rules.hasOwnProperty(r)) {
            acc.push(`${fmt.indent}${r}:${rules[r]};`);
        }
    }
    return acc.join(fmt.decls);
}

function makeSelector(parent: any[], curr: any[]) {
    return parent.length ? [...permutations(parent, curr)] : curr;
}

function formatRule(parent: any[], sel: any[], curr: any, fmt: Format) {
    return transduce(
        map((sel: any[]) => transduce(xfSel, str(), isArray(sel) ? sel : [sel]).trim()),
        str(fmt.ruleSep),
        makeSelector(parent, sel))
        + fmt.declsStart
        + format(curr, fmt)
        + fmt.declEnd;
}
