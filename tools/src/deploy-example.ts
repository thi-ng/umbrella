// SPDX-License-Identifier: Apache-2.0
import { type Fn } from "@thi.ng/api";
import { cliApp, flag, string, type CommandCtx } from "@thi.ng/args";
import { dirs, files, readJSON } from "@thi.ng/file-io";
import { preferredType } from "@thi.ng/mime";
import { map } from "@thi.ng/transducers";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { basename, resolve } from "node:path";
import { S3_BUCKET_EXAMPLES, S3_COMPRESS_OPTS, S3_OPTS } from "./aws-config.js";
import { compressFile, execAWS } from "./utils.js";

interface UploadOpts {
	ext: string;
	compress: boolean;
	depth: number;
	process: Fn<string, void>;
}

interface CLIOpts {
	// noInvalidate: boolean;
	base: string;
	dest: string;
	rename?: string;
}

interface CLICtx extends CommandCtx<CLIOpts, any> {}

const NEVER_COMPRESS = new Set(["mp4"]);

const deploy = async ({ opts, logger }: CLICtx, name: string) => {
	const BASE = `${opts.base}/${name}`;
	const BUILD = `${opts.base}/${name}/dist/`;
	const DEST_DIR = `/${opts.dest}/${opts.rename ?? name}`;
	const PKG = readJSON(resolve(`${BASE}/package.json`), logger);

	if (PKG["thi.ng"]?.online === false) {
		logger.warn("example marked as offline-only, skipping...");
		return;
	}

	execFileSync(
		"find",
		`${BASE} -type f -name '*.DS_Store' -ls -delete`.split(" ")
	);

	const uploadAssets = (dir: string, opts?: Partial<UploadOpts>) => {
		const root = `${BUILD}${dir}`;
		if (!existsSync(root)) return;
		opts = { ext: "", compress: true, depth: Infinity, ...opts };
		for (let f of files(root, opts.ext!, opts.depth)) {
			const fd = `${S3_BUCKET_EXAMPLES}${DEST_DIR}/${f
				.replace(BUILD, "")
				.substring(dir === "" ? 1 : 0)}`;
			const ext = f.substring(f.lastIndexOf(".") + 1);
			const type = preferredType(ext);
			logger.debug(f, "->", fd, type);
			opts.process && opts.process(f);
			if (opts.compress && !NEVER_COMPRESS.has(ext)) {
				compressFile(f);
				execAWS(
					`s3 cp ${f}.br ${fd} ${S3_COMPRESS_OPTS} --content-type ${type}`,
					logger
				);
			} else {
				execAWS(
					`s3 cp ${f} ${fd} ${S3_OPTS} --content-type ${type}`,
					logger
				);
			}
		}
	};

	uploadAssets("assets");
	uploadAssets("lib");
	uploadAssets("img");

	uploadAssets("js", { ext: ".js", depth: 2 });
	uploadAssets("", { ext: ".js", depth: 1 });
	uploadAssets("", { ext: ".json", depth: 1 });
	uploadAssets("", { ext: ".html" });

	// if (!opts.noInvalidate) {
	// 	logger.info("invaliding", DEST_DIR);
	// 	execAWS(
	// 		`cloudfront create-invalidation --distribution-id ${CF_DISTRO_EXAMPLES} --paths ${DEST_DIR}/* ${AWS_PROFILE}`,
	// 		logger
	// 	);
	// }
};

cliApp<CLIOpts, CLICtx>({
	opts: {
		base: string({
			alias: "b",
			desc: "Examples base directory",
			default: "examples",
		}),
		dest: string({
			alias: "d",
			desc: "Destination S3 directory",
			default: "umbrella",
		}),
		rename: string({
			alias: "r",
			desc: "New name on S3 (only for single uploads)",
			required: false,
		}),
		// noInvalidate: flag({
		// 	alias: "n",
		// 	desc: "Don't create a CDN invalidation for the example(s)",
		// }),
	},
	commands: {
		default: {
			desc: "Deploy example(s) to CDN",
			fn: async (ctx) => {
				let inputs = ctx.inputs;
				let isAll = !inputs.length;
				if (isAll) {
					inputs = [...map(basename, dirs(ctx.opts.base, "", 1))];
					// ctx.opts.noInvalidate = true;
				}
				for (let name of inputs) {
					ctx.logger.info("--------------------------------");
					ctx.logger.info(name);
					try {
						await deploy(ctx, name);
					} catch (e) {
						ctx.logger.severe(
							"error deploying:",
							name,
							(<Error>e).message
						);
					}
				}
				// if (isAll) {
				// 	ctx.logger.info("invaliding all");
				// 	execAWS(
				// 		`cloudfront create-invalidation --distribution-id ${CF_DISTRO_EXAMPLES} --paths /${ctx.opts.dest}/* ${AWS_PROFILE}`,
				// 		ctx.logger
				// 	);
				// }
				ctx.logger.info("done");
			},
			opts: {},
		},
	},
	single: true,
	name: "deploy-example",
	ctx: async (ctx) => ctx,
	usage: {
		prefix: "Usage: deploy-example [OPTS] [NAME...]",
		paramWidth: 24,
	},
});
