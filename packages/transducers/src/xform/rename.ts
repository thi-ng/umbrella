import { IObjectOf } from "@thi.ng/api/api";

import { Reducer, Transducer } from "../api";
import { comp } from "../func/comp";
import { renamer } from "../func/renamer";
import { transduce } from "../transduce";
import { filter } from "./filter";
import { map } from "./map";

export function rename<A, B>(kmap: IObjectOf<PropertyKey>, rfn?: Reducer<B, [PropertyKey, A]>): Transducer<A[], B> {
    if (rfn) {
        const ks = Object.keys(kmap);
        return map(
            (y) =>
                transduce(
                    comp(
                        map((k: PropertyKey) => [k, y[kmap[k]]]),
                        filter(x => x[1] !== undefined)),
                    rfn, ks)
        );
    } else {
        return map(renamer(kmap));
    }
}
