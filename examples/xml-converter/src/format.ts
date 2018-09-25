import { isArray } from "@thi.ng/checks/is-array";
import { isBoolean } from "@thi.ng/checks/is-boolean";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { repeat } from "@thi.ng/strings/repeat";
import { peek } from "@thi.ng/transducers/func/peek";

interface FormatterState {
    indent: number;
    tabSize: number;
    prefix?: string;
}

// memoized indentations
export const spaces = (n: number) => repeat(" ", n);

// creates new state with deeper indentation
const indentState = (state: FormatterState): FormatterState =>
    ({ ...state, indent: state.indent + state.tabSize });

// dispatch helper function for the `format` defmulti below
const classify = (_: FormatterState, x: any) =>
    isArray(x) ? "array" : isPlainObject(x) ? "obj" : DEFAULT;

// wraps attrib name in quotes if needed
const formatAttrib = (x: string) =>
    /^[a-z]+$/i.test(x) ? x : `"${x}"`;

// attrib or body value formatter
const formatVal = (state: FormatterState, x: any, indent = true) =>
    isNumber(x) || isBoolean(x) ?
        x :
        isPlainObject(x) ?
            format(indent ? indentState(state) : state, x, "") :
            `"${x}"`;

// attrib key-value pair formatter w/ indentation
const formatPair = (state: FormatterState, x: any, k: string) =>
    `${spaces(state.indent)}${formatAttrib(k)}: ${formatVal(state, x[k], k !== "style")}`;

// multiple-dispatch function to format the transformed tree (hiccup
// structure) into a more compact & legible format than produced by
// standard: `JSON.stringify(tree, null, 4)`
export const format = defmulti<FormatterState, any, string, string>(classify);

// implementation for array values
format.add("array", (state, x, res) => {
    const hasAttribs = isPlainObject(x[1]);
    let attribs = hasAttribs ? Object.keys(x[1]) : [];
    res += `${spaces(state.indent)}["${x[0]}"`;
    if (hasAttribs) {
        res += ", ";
        res = format(
            {
                ...indentState(state),
                prefix: `\n${spaces(state.indent + state.tabSize)}`
            },
            x[1], res
        );
    }
    // single line if none or only single child
    // and if no `style` attrib
    if (x.length === (hasAttribs ? 3 : 2) &&
        attribs.length < 2 &&
        attribs[0] !== "style" &&
        classify(state, peek(x)) === DEFAULT) {
        return format({ ...state, indent: 0 }, peek(x), res += ", ") + "]";
    }
    // default format if more children
    for (let i = hasAttribs ? 2 : 1; i < x.length; i++) {
        res += ",\n";
        res = format(indentState(state), x[i], res);
    }
    res += "]";
    return res;
});

// implementation for object values (i.e. attributes in this case)
format.add("obj", (state, x, res) => {
    const keys = Object.keys(x);
    if (keys.length === 0) {
        res += `{}`;
    } else if (keys.length === 1 &&
        (keys[0] !== "style" || Object.keys(x.style).length < 2)) {
        res += `{ ${formatPair({ ...state, indent: 0 }, x, keys[0])} }`;
    } else {
        const outer = spaces(state.indent);
        res += `${state.prefix}{\n`;
        for (let k in x) {
            res += formatPair(k === "style" ? { ...indentState(state), prefix: "" } : indentState(state), x, k) + ",\n";
        }
        res += outer + "}";
    }
    return res;
});

// implementation for other values
format.add(DEFAULT, (state, x, res) =>
    res += spaces(state.indent) + formatVal(state, x));
