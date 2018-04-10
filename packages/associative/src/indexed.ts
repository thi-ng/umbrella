import { EquivMap } from "./equiv-map";
import { selectKeysObj } from "./select-keys";

/**
 *
 * @param records
 * @param ks keys used for indexing
 */
export function indexed(records: Set<any>, ks: PropertyKey[]) {
    const res = new EquivMap<any, Set<any>>();
    let m, ik, rv;
    for (m of records) {
        ik = selectKeysObj(m, ks);
        rv = res.get(ik);
        if (!rv) {
            res.set(ik, rv = new Set<any>());
        }
        rv.add(m);
    }
    return res;
}
