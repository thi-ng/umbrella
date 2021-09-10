import { TrieMap } from "@thi.ng/associative/trie-map";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { IToEGFConvert, Node, NodeRef, Prefixes } from "./api";

export const isNode = (x: any): x is Node => isPlainObject(x) && "$id" in x;

export const isRef = (x: any): x is NodeRef => isPlainObject(x) && "$ref" in x;

export const isToEGF = (x: any): x is IToEGFConvert =>
    implementsFunction(x, "toEGF");

const RE_QFN = /^([a-z0-9-_$]*):([a-z0-9-_$.+]+)$/i;

export const qualifiedID = (prefixes: Prefixes, id: string) => {
    if (id[0] === "<" && id[id.length - 1] === ">") {
        return id.substring(1, id.length - 1);
    }
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

export const defPrefixer = (prefixes: Prefixes) => {
    const uriToID = new TrieMap<string>();
    Object.entries(prefixes).forEach(([id, url]) => uriToID.set(url, id));
    return (uri: string) => {
        const known = uriToID.knownPrefix(uri);
        return known
            ? uriToID.get(known)! + ":" + uri.substr(known.length)
            : undefined;
    };
};

export const defVocab =
    (uri: string) =>
    (name = "") =>
        uri + name;
