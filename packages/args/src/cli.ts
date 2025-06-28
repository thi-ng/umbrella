// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Maybe } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { StreamLogger } from "@thi.ng/logger/stream";
import type { FormatPresets } from "@thi.ng/text-format";
import { PRESET_ANSI16, PRESET_NONE } from "@thi.ng/text-format/presets";
import type {
	CLIAppConfig,
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
	const format = isColor ? PRESET_ANSI16 : PRESET_NONE;
	const usageOpts = {
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
				showUsage: false,
				usageOpts,
				start,
			});
		} catch (e) {
			__printError((<Error>e).message, format);
		}
		if (!parsed) {
			__usageAndExit(config, usageOpts);
			process.exit(1); // extraneous, required for TS inference
		}
		if (cmd.inputs !== undefined && cmd.inputs !== parsed.rest.length) {
			__printError(`expected ${cmd.inputs || 0} input(s)`, format);
			__usageAndExit(config, usageOpts);
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
		__printError((<Error>e).message, format);
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
const __printError = (msg: string, fmt: FormatPresets) =>
	process.stderr.write(fmt.red(msg) + "\n\n");
