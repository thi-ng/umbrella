import { IObjectOf } from "@thi.ng/api/api";

import { EquivSet } from "./equiv-set";
import { intersection } from "./intersection";
import { indexed } from "./indexed";
import { invertObj } from "./invert";
import { mergeObj } from "./merge";
import { renameKeysObj } from "./rename-keys";
import { selectKeysObj } from "./select-keys";
import { empty, first, objValues } from "./utils";

export function join<A, B>(xrel: Set<A>, yrel: Set<B>) {
    if (xrel.size && yrel.size) {
        const ks = [...intersection(
            new Set(Object.keys(first(xrel) || {})),
            new Set(Object.keys(first(yrel) || {})))
        ];
        let r, s;
        if (xrel.size <= yrel.size) {
            r = xrel;
            s = yrel;
        } else {
            r = yrel;
            s = xrel;
        }
        const idx = indexed(r, ks);
        const res = new EquivSet<any>();
        for (let x of s) {
            const found = idx.get(selectKeysObj(x, ks));
            if (found) {
                for (let f of found) {
                    res.add(mergeObj({ ...f }, x));
                }
            }
        }
        return res;
    }
    return empty(xrel, Set);
}

export function joinWith<A, B>(xrel: Set<A>, yrel: Set<B>, km: IObjectOf<PropertyKey>) {
    if (xrel.size && yrel.size) {
        let r: Set<any>, s: Set<any>;
        let k: IObjectOf<PropertyKey>;
        if (xrel.size <= yrel.size) {
            r = xrel;
            s = yrel;
            k = invertObj(km);
        } else {
            r = yrel;
            s = xrel;
            k = km;
        }
        const idx = indexed(r, objValues(k));
        const ks = Object.keys(k);
        const res = new EquivSet<any>();
        for (let x of s) {
            const found = idx.get(renameKeysObj(selectKeysObj(x, ks), k));
            if (found) {
                for (let f of found) {
                    res.add(mergeObj({ ...f }, x));
                }
            }
        }
        return res;
    }
    return empty(xrel, Set);
}
