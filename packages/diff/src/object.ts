import { equiv } from "@thi.ng/equiv";

import { ObjectDiff } from "./api";

export function diffObject(a: any, b: any) {
    const adds = [];
    const dels = [];
    const edits = [];
    const keys = new Set(Object.keys(a).concat(Object.keys(b)));
    const state = <ObjectDiff>{ distance: 0, adds, dels, edits };
    if (a === b) {
        return state;
    }
    for (let k of keys) {
        const va = a[k];
        const vb = b[k];
        const hasA = va !== undefined;
        if (hasA && vb !== undefined) {
            if (!equiv(va, vb)) {
                edits.push([k, vb]);
                state.distance++;
            }
        } else {
            (hasA ? dels : adds).push(k);
            state.distance++;
        }
    }
    return state;
}
