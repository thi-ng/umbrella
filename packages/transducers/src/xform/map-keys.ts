import { IObjectOf } from "@thi.ng/api/api";

import { Transducer } from "../api";
import { map } from "./map";

export function mapKeys(keys: IObjectOf<(x: any) => any>, copy = true): Transducer<any, any> {
    const ks = Object.keys(keys);
    return map((x) => {
        const res = copy ? Object.assign({}, x) : x;
        for (let i = ks.length - 1; i >= 0; i--) {
            const k = ks[i];
            res[k] = keys[k](x[k]);
        }
        return res;
    });
}
