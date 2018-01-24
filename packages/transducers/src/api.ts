import { Reduced } from "./reduced";

export type Fn<A, B> = (x: A) => B;

export type Transducer<A, B> = (rfn: Reducer<any, B>) => Reducer<any, A>;

export interface Reducer<A, B> extends Array<any> {
    [0]: () => A;
    [1]: (acc: A) => A;
    [2]: (acc: A, x: B) => A | Reduced<A>;
};

export interface StructField extends Array<any> {
    [0]: string;
    [1]: number;
    [2]?: Fn<any[], any>;
}

export const SEMAPHORE = Symbol("SEMAPHORE");
