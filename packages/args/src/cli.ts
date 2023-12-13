import { illegalArgs } from "@thi.ng/errors";
import { ConsoleLogger } from "@thi.ng/logger/console";
import type { CLIAppConfig, Command, CommandCtx, UsageOpts } from "./api.js";
import { parse } from "./parse.js";
import { usage } from "./usage.js";
import { padRight } from "@thi.ng/strings/pad-right";
import type { IObjectOf } from "@thi.ng/api";

export const cliApp = async <T extends object>(config: CLIAppConfig<T>) => {
	const argv = config.argv || process.argv.slice(2);
	let usageOpts = {
		prefix: "",
		color: process.env.NO_COLOR !== "1",
		...config.usage,
	};
	try {
		let cmdID: string;
		let cmd: Command<any, T>;
		let start = 0;
		if (config.single) {
			// single command mode, use 1st available name
			cmdID = Object.keys(config.commands)[0];
			if (!cmdID) illegalArgs("no command provided");
			cmd = config.commands[cmdID];
		} else {
			start = 1;
			cmdID = argv[0];
			cmd = config.commands[cmdID];
			usageOpts.prefix += __descriptions(config.commands);
			if (!cmd) __usageAndExit(config, usageOpts);
		}
		const parsed = parse<T>({ ...config.opts, ...cmd.opts }, argv, {
			showUsage: false,
			usageOpts,
			start,
		});
		if (!parsed) process.exit(1);
		if (cmd.inputs !== undefined && cmd.inputs !== parsed.rest.length) {
			process.stderr.write(`expected ${cmd.inputs || 0} input(s)\n`);
			__usageAndExit(config, usageOpts);
		}
		const ctx: CommandCtx<any, T> = {
			logger: new ConsoleLogger("app", "INFO"),
			opts: parsed.result,
			inputs: parsed.rest,
		};
		if (config.pre) await config.pre(ctx, cmd);
		await cmd.fn(ctx);
		if (config.post) await config.post(ctx, cmd);
	} catch (e) {
		process.stderr.write((<Error>e).message + "\n\n");
		__usageAndExit(config, usageOpts);
	}
};

const __usageAndExit = <T extends object>(
	config: CLIAppConfig<T>,
	usageOpts: Partial<UsageOpts>
) => {
	process.stderr.write(usage(config.opts, usageOpts));
	process.exit(1);
};

const __descriptions = (commands: IObjectOf<Command<any, any>>) =>
	[
		"\nAvailable commands:\n",
		...Object.keys(commands).map(
			(x) => `${padRight(16)(x)}: ${commands[x].desc}`
		),
		"\n\n",
	].join("\n");
