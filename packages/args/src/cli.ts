import type { IObjectOf } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { StreamLogger } from "@thi.ng/logger/stream";
import { padRight } from "@thi.ng/strings/pad-right";
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

export const cliApp = async <
	OPTS extends object,
	CTX extends CommandCtx<OPTS, OPTS>
>(
	config: CLIAppConfig<OPTS, CTX>
) => {
	const argv = config.argv || process.argv;
	const isColor = !process.env.NO_COLOR;
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
			usageOpts.prefix += __descriptions(config.commands);
			if (!cmd) __usageAndExit(config, usageOpts);
			start++;
		}
		let parsed: ParseResult<OPTS> | undefined;
		try {
			parsed = parse<OPTS>({ ...config.opts, ...cmd.opts }, argv, {
				showUsage: true,
				usageOpts,
				start,
			});
		} catch (_) {}
		if (!parsed) process.exit(1);
		if (cmd.inputs !== undefined && cmd.inputs !== parsed.rest.length) {
			process.stderr.write(`expected ${cmd.inputs || 0} input(s)\n`);
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
		process.stderr.write((<Error>e).message + "\n\n");
		process.exit(1);
	}
};

const __usageAndExit = (
	config: CLIAppConfig<any, any>,
	usageOpts: Partial<UsageOpts>
) => {
	process.stderr.write(usage(config.opts, usageOpts));
	process.exit(1);
};

const __descriptions = (commands: IObjectOf<Command<any, any, any>>) =>
	[
		"\nAvailable commands:\n",
		...Object.keys(commands).map(
			(x) => `${padRight(16)(x)}: ${commands[x].desc}`
		),
		"\n",
	].join("\n");
