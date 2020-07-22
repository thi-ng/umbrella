import { isPlainObject } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import type { NodeRef, Prefixes } from "./api";

export const isRef = (x: any): x is NodeRef => isPlainObject(x) && "$ref" in x;

const RE_QFN = /^([a-z0-9-_$]*):([a-z0-9-_$.+]+)$/i;

export const qualifiedID = (prefixes: Prefixes, id: string) => {
    if (id.indexOf(":") !== -1) {
        const match = RE_QFN.exec(id);
        if (match) {
            const prefix = prefixes[match[1]];
            return prefix
                ? prefix + match[2]
                : illegalArgs(`unknown prefix: ${id}`);
        }
    }
    return id;
};
