import type { Fn, Fn2 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isDate } from "@thi.ng/checks/is-date";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";
import { base64Encode } from "@thi.ng/transducers-binary/base64";
import type { Node, Prefixes } from "./api.js";
import { isNode, isRef, isToEGF } from "./checks.js";
import { defPrefixer } from "./prefix.js";

export const toEGF = (
    nodes: Iterable<Node>,
    prefixes: Prefixes = {},
    propFn?: Fn2<string, any, string>
) => {
    const prefixID = defPrefixer(prefixes);
    const res: string[] = [];
    for (let id in prefixes) {
        res.push(`@prefix ${id}: ${prefixes[id]}`);
    }
    res.push("");
    for (let node of nodes) {
        res.push(toEGFNode(node, prefixID, propFn), "");
    }
    return res.join("\n");
};

export const toEGFNode = (
    node: Node,
    prefix: Fn<string, string | undefined>,
    propFn: Fn2<string, any, string> = toEGFProp
) => {
    if (isToEGF(node)) return node.toEGF();
    const res: string[] = [prefix(node.$id) || node.$id];

    const $prop = (p: string, pid: string, v: any) =>
        res.push(
            `\t${pid} ` +
                (isNode(v)
                    ? `-> ${prefix(v.$id) || v.$id}`
                    : isRef(v)
                    ? `-> ${prefix(v.$ref) || v.$ref}`
                    : isToEGF(v)
                    ? v.toEGF()
                    : propFn(p, v))
        );

    for (let p in node) {
        if (p === "$id") continue;
        const pid = prefix(p) || p;
        const val = node[p];
        if (isArray(val)) {
            for (let v of val) {
                $prop(p, pid, v);
            }
        } else {
            $prop(p, pid, val);
        }
    }
    return res.join("\n");
};

export const toEGFProp = (_: string, val: any) =>
    isString(val)
        ? val.indexOf("\n") >= 0
            ? `>>>${val}<<<`
            : val
        : isNumber(val)
        ? `#num ${val}`
        : isDate(val)
        ? `#date ${val.toISOString()}`
        : isTypedArray(val)
        ? `#base64 ${base64Encode(
              new Uint8Array(val.buffer, val.byteOffset, val.byteLength)
          )}`
        : isArray(val) || isPlainObject(val)
        ? `#json ${JSON.stringify(val)}`
        : String(val);
