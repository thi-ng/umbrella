import type { Fn, Fn2, FnAny, IDeref, Maybe, NumOrString } from "@thi.ng/api";

export interface Ctx {
	src: string;
	curr: Scope;
	cache: Maybe<Map<NumOrString, Memo>>[];
	memoize: boolean;
	prune: boolean;
	lastPrune: number;
	debug?: FnAny<void>;
}

export interface Scope {
	id: string;
	pos: number;
	children?: Scope[];
	result?: any;
}

export interface State {
	pos: number;
}

export type Memo = { scope: Scope; next: number } | typeof FAIL;

export type Parser = Fn<Ctx, boolean>;

export interface DynamicParser extends Parser, IDeref<Maybe<Parser>> {
	set: Fn<Parser, void>;
}

export interface ParserOpts {
	id?: string;
	key?: NumOrString;
	discard?: boolean;
	memoize?: boolean;
	onFail?: Fn2<number, Ctx, void>;
}

export interface ParserOptsMinMax extends ParserOpts {
	min?: number;
	max?: number;
}

export type Discarded<T extends ParserOpts> = Omit<T, "discard">;

/** @internal */
export const FAIL = Symbol("FAIL");
