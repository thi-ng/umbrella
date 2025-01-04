import {
	cliApp,
	flag,
	kvPairs,
	string,
	type CommandCtx,
	type KVDict,
} from "@thi.ng/args";
import { dirs, files, readText, writeText } from "@thi.ng/file-io";
import { execFileSync } from "node:child_process";
import { LOGGER } from "./api.js";
import {
	AWS_PROFILE,
	CF_DISTRO_DOCS,
	S3_BUCKET_DOCS,
	S3_OPTS,
} from "./aws-config.js";

interface CLIOpts {
	alias?: KVDict;
	base: string;
	dest: string;
	dryRun: boolean;
	noMinify: boolean;
	noToc: boolean;
	scope: string;
}

interface CLICtx extends CommandCtx<CLIOpts, any> {}

interface DocCtx {
	aliases: KVDict;
	base: string;
	dryRun: boolean;
	minify: boolean;
	noToc: boolean;
	s3Prefix: string;
	scope: string;
}

const SYNC_OPTS = `${S3_OPTS} --include "*" --exclude "*.sass" --exclude "*.ts"`;

const MINIFY_OPTS =
	"--file-ext html --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true";

const COUNTER = `<script>window.goatcounter={path:p=>location.host+p};</script><script data-goatcounter="https://thing.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`;

const sanitizeFile = (ctx: DocCtx, f: string) => {
	let updated = false;
	const escapedScope = ctx.scope.replace(".", "\\.");
	const src = readText(f, LOGGER)
		.replace(
			new RegExp(
				`\\{@link\\s+${escapedScope}\\/([a-z0-9-]+)(#(\\w+))?\\s*\\|\\s*([^}]+)\\}`,
				"g"
			),
			(_, id, label) => {
				LOGGER.debug("match pkg", id, label);
				updated = true;
				id = ctx.aliases[id] || id;
				return `<a href="${ctx.s3Prefix}/${id}/">${label}</a>`;
			}
		)
		.replace(
			new RegExp(
				`\\{@link\\s+${escapedScope}\\/([a-z0-9-]+)#(\\w+)?\\s*\\}`,
				"g"
			),
			(_, id, sym) => {
				LOGGER.debug("match sym", id, sym);
				updated = true;
				let path = `${ctx.s3Prefix}/${id}/`;
				if (!sym) {
					const destID = ctx.aliases[id] || id;
					return `<a href="${ctx.s3Prefix}/${destID}/">${ctx.scope}/${id}</a>`;
				}
				if (sym.startsWith("I")) {
					path += `interfaces/${sym.toLowerCase()}.html`;
				} else if (/^[a-z]/.test(sym)) {
					path += `modules.html#${sym.toLowerCase()}`;
				}
				return `<a href="${path}">${sym}</a>`;
			}
		)
		.replace(
			new RegExp(
				`\\{@link\\s+${escapedScope}\\/([a-z0-9-]+)#?\\s*\\}`,
				"g"
			),
			(_, id) => {
				LOGGER.debug("match pkg only", id);
				updated = true;
				return `<a href="${ctx.s3Prefix}/${id}/">${ctx.scope}/${id}</a>`;
			}
		)
		.replace("</head>", () => {
			updated = true;
			return COUNTER + "</head>";
		});
	if (updated) {
		writeText(f, src, LOGGER);
	}
};

const sanitizePackage = (ctx: DocCtx, root: string) => {
	for (let f of files(root, ".html")) {
		sanitizeFile(ctx, f);
	}
};

const minifyPackage = (root: string) => {
	LOGGER.info("minifying", root);
	execFileSync(
		"node_modules/.bin/html-minifier-terser",
		`${MINIFY_OPTS} --input-dir ${root} --output-dir ${root}`.split(" ")
	);
};

const syncPackage = (ctx: DocCtx, id: string, root: string) => {
	const destID = ctx.aliases[id] || id;
	const dest = `${S3_BUCKET_DOCS}${ctx.s3Prefix}/${destID}`;
	LOGGER.info("syncing", root, "->", dest);
	if (!ctx.dryRun) {
		LOGGER.info(
			execFileSync(
				"aws",
				`s3 sync ${root} ${dest} ${SYNC_OPTS}`.split(" ")
			).toString()
		);
	}
};

const invalidatePaths = (paths: string) => {
	LOGGER.info("invalidating CDN paths:", paths);
	execFileSync(
		"aws",
		`cloudfront create-invalidation --distribution-id ${CF_DISTRO_DOCS} --paths ${paths} ${AWS_PROFILE}`.split(
			" "
		)
	);
};

const processPackage = (ctx: DocCtx, id: string) => {
	LOGGER.info("processing package", ctx.base, id);
	const root = `${ctx.base}/${id}/doc`;
	try {
		sanitizePackage(ctx, root);
		if (ctx.minify) minifyPackage(root);
		syncPackage(ctx, id, root);
	} catch (e) {
		console.warn(e);
	}
};

cliApp<CLIOpts, CLICtx>({
	opts: {
		alias: kvPairs({
			alias: "a",
			desc: "Destination package name",
		}),
		base: string({
			alias: "b",
			desc: "Packages base directory",
			default: "packages",
		}),
		dest: string({
			alias: "d",
			desc: "Destination S3 root directory",
			default: "umbrella",
		}),
		dryRun: flag({
			desc: "Dry run (no uploads)",
		}),
		noMinify: flag({
			alias: "m",
			desc: "Disable HTML minification",
		}),
		noToc: flag({
			desc: "Disable doc table",
		}),
		scope: string({
			alias: "s",
			desc: "Package scope",
			default: "@thi.ng",
		}),
	},
	commands: {
		default: {
			desc: "Deploy example(s) to CDN",
			fn: async (ctx) => {
				const docCtx: DocCtx = {
					aliases: ctx.opts.alias || {},
					base: ctx.opts.base,
					dryRun: ctx.opts.dryRun,
					minify: !ctx.opts.noMinify,
					noToc: ctx.opts.noToc,
					scope: ctx.opts.scope,
					s3Prefix: "/" + ctx.opts.dest,
				};
				let inputs = ctx.inputs;
				let doAll = !inputs.length;
				const invalidations: string[] = [];
				if (doAll) invalidations.push(`${docCtx.s3Prefix}/*`);
				const packages = doAll ? [...dirs(docCtx.base, "", 1)] : inputs;
				for (let id of packages) {
					id = id.replace(docCtx.base + "/", "");
					processPackage(docCtx, id);
					if (!doAll) {
						const destID = docCtx.aliases[id] || id;
						LOGGER.debug("adding invalidation", destID);
						invalidations.push(`${docCtx.s3Prefix}/${destID}/*`);
					}
				}
				if (!docCtx.noToc) {
					execFileSync("bun", ["tools/src/doc-table.ts"]);
					if (!docCtx.dryRun) {
						execFileSync(
							"aws",
							`s3 cp docs.html ${S3_BUCKET_DOCS}/index.html ${S3_OPTS}`.split(
								" "
							)
						);
					}
				}
				if (!docCtx.dryRun) {
					invalidatePaths(`/index.html ${invalidations.join(" ")}`);
				}
			},
			opts: {},
		},
	},
	single: true,
	name: "deploy-docs",
	ctx: async (ctx) => ctx,
	usage: {
		prefix: "Usage: deploy-docs [OPTS] [NAME...]",
		paramWidth: 20,
	},
});
