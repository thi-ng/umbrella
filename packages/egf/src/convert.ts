import type { Fn, Fn2 } from "@thi.ng/api";
import {
    isArray,
    isDate,
    isNumber,
    isPlainObject,
    isString,
    isTypedArray,
} from "@thi.ng/checks";
import { base64Encode } from "@thi.ng/transducers-binary";
import type { Node, Prefixes } from "./api";
import { defPrefixer, isNode, isRef, isToEGF } from "./utils";

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

export const toEGFProp = (_: string, x: any) =>
    isString(x)
        ? x.indexOf("\n") >= 0
            ? `>>>${x}<<<`
            : x
        : isNumber(x)
        ? `#num ${x}`
        : isDate(x)
        ? `#date ${x.toISOString()}`
        : isTypedArray(x)
        ? `#base64 ${base64Encode(
              new Uint8Array(x.buffer, x.byteOffset, x.byteLength)
          )}`
        : isArray(x) || isPlainObject(x)
        ? `#json ${JSON.stringify(x)}`
        : x;
