import { IObjectOf } from "@thi.ng/api/api";

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

export type ConvolutionKernel1D = [number, number][];
export type ConvolutionKernel2D = [number, [number, number]][];
export type ConvolutionKernel3D = [number, [number, number, number]][];

export type TransformFn = (x: any) => any;
export type TransformSubSpec = IObjectOf<TransformSpec | TransformFn>;
export interface TransformSpec extends Array<any> {
    [0]: TransformFn;
    [1]?: TransformSubSpec;
}

export const SEMAPHORE = Symbol("SEMAPHORE");
