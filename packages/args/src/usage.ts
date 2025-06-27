// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Pair } from "@thi.ng/api";
import { capitalize, kebab } from "@thi.ng/strings/case";
import { stringify } from "@thi.ng/strings/stringify";
import {
	type ArgSpecExt,
	type Args,
	type ColorTheme,
	type UsageOpts,
} from "./api.js";
import {
	__ansi,
	__colorTheme,
	__padRightAnsi,
	__wrap,
	__wrapWithIndent,
} from "./utils.js";

export const usage = <T extends IObjectOf<any>>(
	specs: Args<T>,
	opts: Partial<UsageOpts> = {}
) => {
	opts = {
		lineWidth: 80,
		paramWidth: 32,
		showDefaults: true,
		prefix: "",
		suffix: "",
		groups: ["flags", "main"],
		...opts,
	};
	const theme = __colorTheme(opts.color);
	const format = (ids: string[]) =>
		ids.map((id) =>
			__argUsage(id, specs[id], opts, theme, opts.paramWidth!)
		);
	const sortedIDs = Object.keys(specs).sort();
	const groups: Pair<string, string[]>[] = opts.groups
		? opts.groups
				.map(
					(gid): Pair<string, string[]> => [
						gid,
						sortedIDs.filter((id) => specs[id].group === gid),
					]
				)
				.filter((g) => !!g[1].length)
		: [["options", sortedIDs]];
	return [
		...__wrap(opts.prefix, opts.lineWidth!),
		...groups.map(([gid, ids]) =>
			[
				...(opts.showGroupNames ? [`${capitalize(gid)}:\n`] : []),
				...format(ids),
				"",
			].join("\n")
		),
		...__wrap(opts.suffix, opts.lineWidth!),
	].join("\n");
};

/** @internal */
const __argUsage = (
	id: string,
	spec: ArgSpecExt,
	opts: Partial<UsageOpts>,
	theme: ColorTheme,
	indent: number
) => {
	const hint = __argHint(spec, theme);
	const alias = __argAlias(spec, theme, hint);
	const name = __ansi(`--${kebab(id)}`, theme.param!);
	const params = `${alias}${name}${hint}`;
	const isRequired = spec.optional === false && spec.default === undefined;
	const prefixes: string[] = [];
	isRequired && prefixes.push("required");
	spec.multi && prefixes.push("multiple");
	const body =
		__argPrefix(prefixes, theme, isRequired) +
		(spec.desc || "") +
		__argDefault(spec, opts, theme);
	return (
		__padRightAnsi(params, opts.paramWidth!) +
		__wrapWithIndent(body, indent, opts.lineWidth!)
	);
};

/** @internal */
const __argHint = (spec: ArgSpecExt, theme: ColorTheme) =>
	spec.hint ? __ansi(" " + spec.hint, theme.hint!) : "";

/** @internal */
const __argAlias = (spec: ArgSpecExt, theme: ColorTheme, hint: string) =>
	spec.alias ? `${__ansi("-" + spec.alias, theme.param!)}${hint}, ` : "";

/** @internal */
const __argPrefix = (
	prefixes: string[],
	theme: ColorTheme,
	isRequired: boolean
) =>
	prefixes.length
		? __ansi(
				`[${prefixes.join(", ")}] `,
				isRequired ? theme.required! : theme.multi!
		  )
		: "";

/** @internal */
const __argDefault = (
	spec: ArgSpecExt,
	opts: Partial<UsageOpts>,
	theme: ColorTheme
) =>
	opts.showDefaults && spec.default != null && spec.default !== false
		? __ansi(
				` (default: ${stringify(true)(
					spec.defaultHint != undefined
						? spec.defaultHint
						: spec.default
				)})`,
				theme.default
		  )
		: "";
