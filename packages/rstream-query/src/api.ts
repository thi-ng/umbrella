export type Pattern = [any, any, any];

export type Triple = Pattern;

export type TripleIds = Set<number>

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
