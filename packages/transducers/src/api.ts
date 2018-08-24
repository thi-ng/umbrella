import { Comparator, Fn, IObjectOf } from "@thi.ng/api/api";

import { Reduced } from "./reduced";

export type Transducer<A, B> = (rfn: Reducer<any, B>) => Reducer<any, A>;

export type ReductionFn<A, B> = (acc: A, x: B) => A | Reduced<A>;

export interface Reducer<A, B> extends Array<any> {
    [0]: () => A;
    [1]: (acc: A) => A;
    [2]: ReductionFn<A, B>;
};

export interface IReducible<A, B> {
    $reduce(rfn: ReductionFn<A, B>, acc: A): A | Reduced<A>;
}

export type TransformFn = (x: any) => any;
export type TransformSubSpec = IObjectOf<TransformSpec | TransformFn>;
export interface TransformSpec extends Array<any> {
    [0]: TransformFn;
    [1]?: TransformSubSpec;
}

export interface SortOpts<A, B> {
    /**
     * Sort key lookup function.
     * Default: `identity`
     */
    key: Fn<A, B>;
    /**
     * Comparator.
     * Default: `thi.ng/compare/compare`
     */
    compare: Comparator<B>;
}

export interface GroupByOpts<SRC, KEY, GROUP> {
    key: Fn<SRC, KEY>;
    group: Reducer<GROUP, SRC>;
}
