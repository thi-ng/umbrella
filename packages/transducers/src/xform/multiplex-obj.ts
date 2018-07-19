import { IObjectOf } from "@thi.ng/api/api";

import { Reducer, Transducer } from "../api";
import { comp } from "../func/comp";
import { multiplex } from "./multiplex";
import { rename } from "./rename";

export function multiplexObj<A, B>(xforms: IObjectOf<Transducer<A, any>>, rfn?: Reducer<B, [PropertyKey, any]>): Transducer<A, B> {
    const ks = Object.keys(xforms);
    return comp(
        multiplex.apply(null, ks.map((k) => xforms[k])),
        rename(ks, rfn)
    );
}
