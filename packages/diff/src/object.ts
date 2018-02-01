import { equiv } from "@thi.ng/api/equiv";

import { ObjectDiff } from "./api";

export function diffObject(a: any, b: any) {
    const adds = [],
        dels = [],
        edits = [],
        keys = new Set(Object.keys(a).concat(Object.keys(b)));
    let distance = 0;
    for (let k of keys) {
        const va = a[k],
            vb = b[k],
            hasA = va !== undefined;
        if (hasA && vb !== undefined) {
            if (!equiv(va, vb)) {
                edits.push([k, vb]);
                distance++;
            }
        } else {
            (hasA ? dels : adds).push(k);
            distance++;
        }
    }
    return <ObjectDiff>{ distance, adds, dels, edits };
}
