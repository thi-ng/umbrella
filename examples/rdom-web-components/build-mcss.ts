import { files } from "@thi.ng/file-io";
import { spawn, execFileSync } from "node:child_process";

// this build script is used to invoke the thi.ng/meta-css toolchain
// for both dev mode (incl. file watching of .mcss files) and for
// production builds. any additional args passed to this script
// will be forwarded to the `meta-css convert` command(s)...

const ARGS = process.argv.slice(2);

const MCSS_ROOT = "../../packages/meta-css";
const MCSS = `${MCSS_ROOT}/bin/metacss`;

const COMMANDS = [
	[
		MCSS,
		"convert",
		"--bundle",
		"--specs",
		"css/framework.json",
		"--force",
		"@css/includes.txt",
		"--out",
		"css/style.css",
		...ARGS,
		...files("css", ".mcss"),
	],
	[
		MCSS,
		"convert",
		"--no-decls",
		"--no-header",
		"--specs",
		"css/framework.json",
		...ARGS,
		...files("src/components", ".mcss"),
	],
];

const spawnAndAttach = (cmd: string, args: string[]) => {
	const proc = spawn(cmd, args);
	proc.stdout.on("data", (data) => console.log(data.toString()));
	proc.stderr.on("data", (data) => console.error(data.toString()));
	// proc.on("close", () => console.log(`PID #${proc.pid} exit`));
	return proc;
};

try {
	// generate CSS framework from base specs in meta-css pkg
	// and any additional specs in this example's /css directory
	execFileSync(MCSS, [
		"generate",
		"--out",
		"css/framework.json",
		...files(`${MCSS_ROOT}/specs`, ".mcss.json"),
		...files("css", ".mcss.json"),
	]);
	// spawn child processes
	const procs = COMMANDS.map(([cmd, ...args]) => spawnAndAttach(cmd, args));
	// forward ctrl+c to child processes
	process.on("SIGINT", (sig) => procs.forEach((proc) => proc.kill(sig)));
} catch (e) {
	console.log(e.message);
}
