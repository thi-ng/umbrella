// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Maybe } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { LogLevel, type ILogger } from "@thi.ng/logger/api";
import { StreamLogger } from "@thi.ng/logger/stream";
import { PRESET_ANSI16, PRESET_NONE } from "@thi.ng/text-format/presets";
import { execFileSync } from "node:child_process";
import type {
	CLIAppConfig,
	ColorTheme,
	Command,
	CommandCtx,
	ParseResult,
	UsageOpts,
} from "./api.js";
import { parse } from "./parse.js";
import { usage } from "./usage.js";
import {
	__ansi,
	__colorTheme,
	__padRightAnsi,
	__wrapWithIndent,
} from "./utils.js";

export const cliApp = async <
	OPTS extends object,
	CTX extends CommandCtx<OPTS, OPTS>
>(
	config: CLIAppConfig<OPTS, CTX>
) => {
	const argv = config.argv || process.argv;
	const isColor = !process.env.NO_COLOR;
	const theme = __colorTheme(isColor);
	const usageOpts: Partial<UsageOpts> = {
		prefix: "",
		color: isColor,
		...config.usage,
	};
	try {
		let cmdID: string;
		let cmd: Command<any, OPTS, CTX>;
		let start = config.start ?? 2;
		if (config.single) {
			// single command mode, use 1st available name
			cmdID = Object.keys(config.commands)[0];
			if (!cmdID) illegalArgs("no command provided");
			cmd = config.commands[cmdID];
		} else {
			cmdID = argv[start];
			cmd = config.commands[cmdID];
			if (!cmd) {
				usageOpts.prefix += __descriptions(config.commands, usageOpts);
				__usageAndExit(config, usageOpts);
			}
			start++;
		}
		let parsed: Maybe<ParseResult<OPTS>>;
		try {
			parsed = parse<OPTS>({ ...config.opts, ...cmd.opts }, argv, {
				usageOpts,
				start,
			});
		} catch (e) {
			process.exit(1);
		}
		if (!parsed) process.exit(0); // bail out if `--help`
		if (cmd.inputs !== undefined) {
			const num = parsed.rest.length;
			let err: Maybe<string>;
			if (isArray(cmd.inputs)) {
				const [min, max] = cmd.inputs;
				if (num < min || num > max) {
					err =
						max < Infinity
							? `expected ${min}-${max} inputs`
							: `expected at least ${min} inputs`;
				}
			} else if (num !== cmd.inputs) {
				err = `expected ${cmd.inputs} input(s)`;
			}
			if (err) {
				__printError(err, theme);
				__usageAndExit(config, usageOpts);
			}
		}

		const ctx: CTX = await config.ctx(
			{
				logger: new StreamLogger(process.stderr, config.name, "INFO"),
				format: isColor ? PRESET_ANSI16 : PRESET_NONE,
				opts: parsed.result,
				inputs: parsed.rest,
			},
			cmd
		);
		await cmd.fn(ctx);
		if (config.post) await config.post(ctx, cmd);
	} catch (e) {
		__printError((<Error>e).message, theme);
		process.exit(1);
	}
};

/** @internal */
const __usageAndExit = (
	config: CLIAppConfig<any, any>,
	usageOpts: Partial<UsageOpts>
) => {
	process.stderr.write(usage(config.opts, usageOpts));
	process.exit(1);
};

/** @internal */
const __descriptions = (
	commands: IObjectOf<Command<any, any, any>>,
	{ color, lineWidth = 80 }: Partial<UsageOpts> = {}
) => {
	const names = Object.keys(commands);
	const maxLength = Math.max(...names.map((x) => x.length));
	const theme = __colorTheme(color);
	return [
		"\nAvailable commands:\n",
		...names.map(
			(x) =>
				`${__padRightAnsi(
					__ansi(x, theme.command),
					maxLength
				)} : ${__wrapWithIndent(
					commands[x].desc,
					maxLength + 3,
					lineWidth
				)}`
		),
		"\n",
	].join("\n");
};

/** @internal */
const __printError = (msg: string, theme: ColorTheme) =>
	process.stderr.write(__ansi(msg, theme.error) + "\n\n");

/**
 * Calls `tput cols` to obtain the number of columns in the current
 * terminal. Returns `fallback` in case of error.
 *
 * @param fallback
 */
export const terminalLineWidth = (fallback = 80) => {
	try {
		return +execFileSync("tput", ["cols"], { encoding: "ascii" });
	} catch (e) {
		return fallback;
	}
};

export const configureLogLevel = (
	logger: ILogger,
	verbose: boolean,
	quiet = false
) => {
	if (quiet) logger.level = LogLevel.NONE;
	else if (verbose) logger.level = LogLevel.DEBUG;
};
