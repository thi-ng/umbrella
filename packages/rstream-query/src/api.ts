export interface Pattern extends Array<any> {
    [0]: any;
    [1]: any;
    [2]: any;
}

export type Fact = Pattern;

export type FactIds = Set<number>

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

export let DEBUG = true;