import type {
    Fn6,
    IObjectOf,
    NumOrString,
    Predicate,
    Predicate2,
} from "@thi.ng/api";

export type FTerm = Predicate<any>;

export type OTerm = any | null;

export type SPTerm = FTerm | NumOrString | null;

export type SPInputTerm = SPTerm | NumOrString[] | Set<NumOrString>;

export type QueryObj = IObjectOf<any>;

export type QueryType =
    | "lll"
    | "llf"
    | "lln"
    | "lfl"
    | "lff"
    | "lfn"
    | "lnl"
    | "lnf"
    | "lnn"
    | "fll"
    | "flf"
    | "fln"
    | "ffl"
    | "fff"
    | "ffn"
    | "fnl"
    | "fnf"
    | "fnn"
    | "nll"
    | "nlf"
    | "nln"
    | "nfl"
    | "nff"
    | "nfn"
    | "nnl"
    | "nnf"
    | "nnn";

export type QueryImpl = Fn6<
    QueryObj,
    QueryObj,
    SPTerm,
    SPTerm,
    OTerm,
    QueryOpts,
    void
>;

export type QueryImpls = Record<QueryType, QueryImpl>;

export interface QueryOpts {
    equiv: Predicate2<any>;
}
