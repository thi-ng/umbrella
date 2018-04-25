import { IObjectOf } from "@thi.ng/api/api";

export type Pattern = [any, any, any];

export type Triple = Pattern;

export type Triples = Set<Pattern>;

export type TripleIds = Set<number>;

export type Solutions = Set<IObjectOf<any>>;

export const CHOICES = Symbol("CHOICES");

export enum EditOp {
    ADD,
    DELETE,
    UPDATE
}

export interface Edit {
    index: Set<number>;
    key: any;
}

export let DEBUG = false;
