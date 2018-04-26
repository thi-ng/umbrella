import { IObjectOf } from "@thi.ng/api/api";
import { ISubscribable } from "@thi.ng/rstream/api";

export let DEBUG = false;

export type Pattern = [any, any, any];

export type PathPattern = [any, any[], any];

export type Triple = Pattern;

export type Triples = Set<Pattern>;

export type TripleIds = Set<number>;

export type Solution = IObjectOf<any>;

export type Solutions = Set<Solution>;

export type QuerySolution = ISubscribable<Solutions>;

export type BindFn = (s: Solution) => any;

export interface Edit {
    index: Set<number>;
    key: any;
}

export interface QuerySpec {
    q: SubQuerySpec[];
    select?: string[];
    order?: string;
    bind?: IObjectOf<BindFn>;
    limit?: number;
}

export type SubQuerySpec = WhereQuerySpec | PathQuerySpec;

export interface WhereQuerySpec {
    where: Pattern[];
}

export interface PathQuerySpec {
    path: PathPattern;
}

export interface JoinOpts {
    limit: number;
    select: string[];
}