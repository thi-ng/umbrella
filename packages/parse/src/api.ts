import type { Fn, Fn0, IObjectOf, Nullable } from "@thi.ng/api";
import type { ParseContext } from "./context.js";

export interface ParseScope<T> {
	id: string;
	state: Nullable<ParseState<T>>;
	children: Nullable<ParseScope<T>[]>;
	result: any;
}

export interface ParseState<T> {
	p: number;
	l: number;
	c: number;
	done?: boolean;
	last?: T;
}

export interface IReader<T> {
	read(state: ParseState<T>): T;
	next(state: ParseState<T>): void;
	isDone(state: ParseState<T>): boolean;
	format(state: ParseState<T>): string;
}

export type Parser<T> = Fn<ParseContext<T>, boolean>;

export type LitParser<T> = Parser<T> & { __lit: true };

export type DynamicParser<T> = Parser<T> & {
	set: Fn<Parser<T>, void>;
};

export type PassValue<T> = T | Fn0<T>;

export type CharSet = IObjectOf<boolean>;

export type ScopeTransform<T> = (
	scope: Nullable<ParseScope<T>>,
	ctx: ParseContext<T>,
	user?: any
) => Nullable<ParseScope<T>>;

export interface GrammarOpts {
	/**
	 * If true, prints AST and verbose compiler output.
	 *
	 * @defaultValue false
	 */
	debug: boolean;
	/**
	 * CURRENTLY UNUSED. If true will apply AST optimizations prior to
	 * compilation.
	 *
	 * @defaultValue true
	 */
	optimize: boolean;
}

export type Rules = IObjectOf<Parser<string>>;

export type RuleTransforms = IObjectOf<ScopeTransform<string>>;

export interface Language {
	grammar: ParseContext<string>;
	env: RuleTransforms;
	rules: Rules;
}

export interface ContextOpts {
	/**
	 * Max recursion depth failsafe. Parsing will terminate once this limit is
	 * reached.
	 *
	 * @defaultVal 64
	 */
	maxDepth: number;
	/**
	 * True to enable parser debug output. Will emit details of each
	 * parse scope.
	 *
	 * @defaultValue false
	 */
	debug: boolean;
	/**
	 * True to retain reader state for each AST node. State of root node
	 * is always available.
	 *
	 * @defaultValue false
	 */
	retain: boolean;
}
