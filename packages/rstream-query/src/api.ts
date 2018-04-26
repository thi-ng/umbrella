import { IObjectOf } from "@thi.ng/api/api";
import { ISubscribable } from "@thi.ng/rstream/api";

export type Pattern = [any, any, any];

export type PathPattern = [any, any[], any];

export type Triple = Pattern;

export type Triples = Set<Pattern>;

export type TripleIds = Set<number>;

export type Solutions = Set<IObjectOf<any>>;

export type QuerySolution = ISubscribable<Solutions>;

export interface Edit {
    index: Set<number>;
    key: any;
}

export let DEBUG = false;
