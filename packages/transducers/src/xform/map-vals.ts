import { IObjectOf } from "@thi.ng/api/api";

import { Transducer } from "../api";
import { map } from "./map";

export function mapVals<A, B>(fn: (v: A) => B, copy = true): Transducer<IObjectOf<A>, IObjectOf<B>> {
    return map((x) => {
        const res: any = copy ? { ...x } : x;
        for (let k in x) {
            res[k] = fn(x[k]);
        }
        return <any>res;
    });
}
