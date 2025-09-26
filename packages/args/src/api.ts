// SPDX-License-Identifier: Apache-2.0
import type { Fn, Fn2, IDeref, IObjectOf, Predicate } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import type { FormatPresets } from "@thi.ng/text-format";

export interface ArgSpecBase {
	/**
	 * Unique arg type ID
	 */
	type: string;
	/**
	 * Shorthand for given arg/option
	 */
	alias?: string;
	/**
	 * Description (for usage only)
	 */
	desc?: string;
	/**
	 * Type hint (for usage only)
	 */
	hint?: string;
	/**
	 * Custom string representation of default value (e.g. a hex value)
	 */
	defaultHint?: string;
	/**
	 * Predicate function called when this arg is being parsed. Function MUST
	 * return true for parsing to continue.
	 */
	fn?: Fn<string, boolean>;
	/**
	 * Group ID this arg belongs to. By default args belong to a "main" group.
	 * {@link flag} args are associated with the "flags" group (by default).
	 *
	 * See {@link UsageOpts.groups} for more details.
	 */
	group?: string;
}

export type ArgSpec<T> = ArgSpecBase & ArgSpecRequired<T>;

export type ArgSpecRequired<T> = undefined extends T
	? { default?: T }
	: { required: true } | { default: T };

export type Args<T extends object> = {
	[id in keyof T]: ArgSpec<T[id]>;
};

/**
 * Partial arg spec given to various argument factory functions.
 */
export type ArgDef = Omit<ArgSpecBase, "type">;
/**
 * Partial arg spec (for required arguments) given to various argument factory
 * functions.
 */
export type ArgDefRequired<T> = ArgDef & ({ default: T } | { required: true });

/**
 * @internal
 */
export type ArgSpecExt = ArgSpec<any> & {
	/**
	 * Value coercion fn.
	 */
	coerce?: Fn<any, any>;
	/**
	 * Delimiter to split values (only used for `multi` args and if `split=false`)
	 */
	delim?: string;
	/**
	 * Default value
	 */
	default?: any;
	/**
	 * User defined validation fn (can be used for side effects too).
	 */
	fn?: Predicate<string>;
	/**
	 * Indicator flag for args accepting multiple values
	 */
	multi?: boolean;
	/**
	 * Indicator flag for required args.
	 */
	required?: true;
	/**
	 * Unless false, collected values are split via `delim` prior to calling
	 * coercion function. Only used for `multi` specs.
	 */
	split?: boolean;
};

export type KVDict = IObjectOf<string>;
export type KVMultiDict = IObjectOf<string[]>;

export interface ParseResult<T> {
	/**
	 * Parsed arguments
	 */
	result: T;
	/**
	 * `process.argv` index (+1) where parsing stopped
	 */
	index: number;
	/**
	 * If true, all elements of `process.argv` have been consumed
	 */
	done: boolean;
	/**
	 * Remaining unparsed elements of `process.argv` (if any)
	 */
	rest: string[];
}

export interface ParseOpts {
	/**
	 * Start index in `process.argv` to start parsing arguments from.
	 *
	 * @defaultValue 2
	 */
	start: number;
	/**
	 * True, if {@link usage} should be called automatically when a parse error
	 * occurs. Note: Errors will always be thrown, regardless of this setting.
	 *
	 * @defaultValue true
	 */
	showUsage: boolean;
	/**
	 * Only used if `showUsage` is enabled.
	 *
	 * Also see {@link UsageOpts}
	 */
	usageOpts: Partial<UsageOpts>;
	/**
	 * Usage command option(s)
	 *
	 * @defaultValue ["--help"]
	 */
	help: string[];
}

export interface UsageOpts {
	/**
	 * Line width for usage information (used for word wrapping).
	 *
	 * @defaultValue 80
	 */
	lineWidth: number;
	/**
	 * Column width for params
	 *
	 * @defaultValue 32
	 */
	paramWidth: number;
	/**
	 * If false, ANSI colors will be stripped from output.
	 *
	 * @remarks
	 * When using {@link cliApp}, the default for this value will depend on the
	 * `NO_COLOR` env var being set. See https://no-color.org/ for details.
	 *
	 * @defaultValue true
	 */
	color: Partial<ColorTheme> | boolean;
	/**
	 * If true (default), display argument default values. Nullish or false
	 * default values will never be shown.
	 *
	 * @defaultValue true
	 */
	showDefaults: boolean;
	/**
	 * If true, displays group names as sub headings.
	 *
	 * @defaultValue false
	 */
	showGroupNames: boolean;
	/**
	 * Prefix content to show before list of options. Can contain ANSI control
	 * seqs and will be automatically word wrapped to given `lineWidth`.
	 *
	 * @default empty string
	 */
	prefix: string;
	/**
	 * Suffix content to show after list of options.  Can contain ANSI control
	 * seqs and will be automatically word wrapped to given `lineWidth`.
	 *
	 * @default empty string
	 */
	suffix: string;
	/**
	 * Defines output order of arg groups. By default args belong to either
	 * "main" or "flag" groups. Each group's args are output in alphabetical
	 * order. Groups are separated by an empty line.
	 *
	 * @defaultValue `["flags", "main"]`
	 */
	groups: string[];
}

/**
 * Color theme for {@link usage}. Each item is an ANSI color code:
 *
 * https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit
 */
export interface ColorTheme {
	default: number;
	command: number;
	error: number;
	hint: number;
	multi: number;
	param: number;
	required: number;
}

export const DEFAULT_THEME: ColorTheme = {
	default: 95,
	command: 92,
	error: 91,
	hint: 90,
	multi: 90,
	param: 96,
	required: 33,
};

/**
 * Wrapper for fixed size tuple values produced by {@link tuple}.
 */
export class Tuple<T> implements IDeref<T[]> {
	constructor(public value: T[]) {}

	deref() {
		return this.value;
	}
}

export interface CLIAppConfig<
	OPTS extends object,
	CTX extends CommandCtx<OPTS, OPTS> = CommandCtx<OPTS, OPTS>
> {
	/**
	 * App (CLI command) short name.
	 */
	name: string;
	/**
	 * Shared args for all commands
	 */
	opts: Args<OPTS>;
	/**
	 * Command spec registry
	 */
	commands: IObjectOf<Command<any, OPTS, CTX>>;
	/**
	 * If true, the app will only use the single command entry in
	 * {@link CLIAppConfig.commands} and not expect the first CLI args to be a
	 * command name.
	 */
	single?: boolean;
	/**
	 * Usage options, same as {@link UsageOpts}. Usage will be shown
	 * automatically in case of arg parse errors.
	 */
	usage: Partial<UsageOpts>;
	/**
	 * Arguments vector to use for arg parsing. If omitted, uses `process.argv`
	 */
	argv?: string[];
	/**
	 * {@link CLIAppConfig.argv} index to start parsing from.
	 *
	 * @defaultValue 2
	 */
	start?: number;
	/**
	 * {@link CommandCtx} augmentation handler, i.e. an async function which
	 * will be called just before the actual command for additional setup/config
	 * purposes. The context object returned will be the one passed to the
	 * command.
	 */
	ctx: Fn2<CommandCtx<OPTS, OPTS>, Command<any, OPTS, CTX>, Promise<CTX>>;
	/**
	 * Lifecycle hook. Function which will be called just after the actual
	 * command handler, e.g. for teardown purposes.
	 */
	post?: Fn2<CTX, Command<any, OPTS, CTX>, Promise<void>>;
}

export interface Command<
	OPTS extends BASE,
	BASE extends object,
	CTX extends CommandCtx<OPTS, BASE> = CommandCtx<OPTS, BASE>
> {
	/**
	 * Command description (any length, will be word wrapped if needed)
	 */
	desc: string;
	/**
	 * Command specific CLI arg specs
	 */
	opts: Args<Omit<OPTS, keyof BASE>>;
	/**
	 * Number of required rest input value (after all parsed options). Leave
	 * unset to allow any number. If given as tuple, the values are interpreted
	 * as acceptable `[min,max]` range.
	 */
	inputs?: number | [number, number];
	/**
	 * Actual command function/implementation.
	 */
	fn: Fn<CTX, Promise<void>>;
}

export interface CommandCtx<OPTS extends BASE, BASE extends object> {
	/**
	 * Logger to be used by all commands. By default uses a console logger with
	 * log level INFO. Can be customized via {@link CLIAppConfig.ctx}.
	 */
	logger: ILogger;
	/**
	 * `NO_COLOR`-aware text formatting presets. If color output is NOT disabled
	 * via the `NO_COLOR` env var, this defaults to
	 * [`PRESET_ANSI16`](https://github.com/thi-ng/umbrella/blob/develop/packages/text-format/README.md),
	 * otherwise `PRESET_NONE` (i.e. same API, but ignoring any color requests).
	 *
	 * See https://no-color.org for context.
	 */
	format: FormatPresets;
	/**
	 * Parsed CLI args (according to provided command spec)
	 */
	opts: OPTS;
	/**
	 * Array of remaining CLI args (after parsed options). Individual commands
	 * can specify the number of items required via {@link Command.inputs}.
	 */
	inputs: string[];
}
