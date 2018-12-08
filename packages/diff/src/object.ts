import { equiv } from "@thi.ng/equiv";
import { ObjectDiff } from "./api";

export const diffObject =
    (a: any, b: any, _equiv = equiv) => {
        const adds = [];
        const dels = [];
        const edits = [];
        const state = <ObjectDiff>{ distance: 0, adds, dels, edits };
        if (a === b) {
            return state;
        }
        for (let k of new Set(Object.keys(a).concat(Object.keys(b)))) {
            const va = a[k];
            const vb = b[k];
            const hasA = va !== undefined;
            if (hasA && vb !== undefined) {
                if (!_equiv(va, vb)) {
                    edits.push([k, vb]);
                    state.distance++;
                }
            } else {
                (hasA ? dels : adds).push(k);
                state.distance++;
            }
        }
        return state;
    };
