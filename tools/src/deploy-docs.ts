import { cliApp, string, type CommandCtx } from "@thi.ng/args";
import { dirs, files, readText, writeText } from "@thi.ng/file-io";
import { execFileSync } from "node:child_process";
import { LOGGER } from "./api.js";
import {
	AWS_PROFILE,
	CF_DISTRO_DOCS,
	S3_BUCKET_DOCS,
	S3_OPTS,
	S3_PREFIX,
} from "./aws-config.js";

interface CLIOpts {
	base: string;
}

interface CLICtx extends CommandCtx<CLIOpts, any> {}

const SYNC_OPTS = `${S3_OPTS} --include "*" --exclude "*.sass" --exclude "*.ts"`;

const MINIFY_OPTS =
	"--file-ext html --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true";

const COUNTER = `<script>window.goatcounter={path:p=>location.host+p};</script><script data-goatcounter="https://thing.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`;

const sanitizeFile = (f: string) => {
	let updated = false;
	const src = readText(f, LOGGER)
		.replace(
			/\{@link\s+@thi\.ng\/([a-z0-9-]+)(#(\w+))?\s*\|\s*([^}]+)\}/g,
			(_, id, label) => {
				LOGGER.debug("match pkg", id, label);
				updated = true;
				return `<a href="${S3_PREFIX}/${id}/">${label}</a>`;
			}
		)
		.replace(
			/\{@link\s+@thi\.ng\/([a-z0-9-]+)#(\w+)?\s*\}/g,
			(_, id, sym) => {
				LOGGER.debug("match sym", id, sym);
				updated = true;
				let path = `${S3_PREFIX}/${id}/`;
				if (!sym)
					return `<a href="${S3_PREFIX}/${id}/">@thi.ng/${id}</a>`;
				if (sym.startsWith("I")) {
					path += `interfaces/${sym.toLowerCase()}.html`;
				} else if (/^[a-z]/.test(sym)) {
					path += `modules.html#${sym.toLowerCase()}`;
				}
				return `<a href="${path}">${sym}</a>`;
			}
		)
		.replace(/\{@link\s+@thi\.ng\/([a-z0-9-]+)#?\s*\}/g, (_, id) => {
			LOGGER.debug("match pkg only", id);
			updated = true;
			return `<a href="${S3_PREFIX}/${id}/">@thi.ng/${id}</a>`;
		})
		.replace("</head>", () => {
			updated = true;
			return COUNTER + "</head>";
		});
	if (updated) {
		writeText(f, src, LOGGER);
	}
};

const sanitizePackage = (root: string) => {
	for (let f of files(root, ".html")) {
		sanitizeFile(f);
	}
};

const minifyPackage = (root: string) => {
	LOGGER.info("minifying", root);
	execFileSync(
		"node_modules/.bin/html-minifier-terser",
		`${MINIFY_OPTS} --input-dir ${root} --output-dir ${root}`.split(" ")
	);
};

const syncPackage = (id: string, root: string) => {
	LOGGER.info("syncing", root);
	LOGGER.info(
		execFileSync(
			"aws",
			`s3 sync ${root} ${S3_BUCKET_DOCS}${S3_PREFIX}/${id} ${SYNC_OPTS}`.split(
				" "
			)
		).toString()
	);
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

const processPackage = (base: string, id: string) => {
	LOGGER.info("processing package", base, id);
	const root = `${base}/${id}/doc`;
	try {
		sanitizePackage(root);
		minifyPackage(root);
		syncPackage(id, root);
	} catch (e) {
		console.warn(e);
	}
};

cliApp<CLIOpts, CLICtx>({
	opts: {
		base: string({
			alias: "b",
			desc: "Packages base directory",
			default: "packages",
		}),
	},
	commands: {
		default: {
			desc: "Deploy example(s) to CDN",
			fn: async (ctx) => {
				const base = ctx.opts.base;
				let inputs = ctx.inputs;
				let doAll = !inputs.length;
				const invalidations: string[] = [];
				if (doAll) invalidations.push(`${S3_PREFIX}/*`);
				const packages = doAll ? [...dirs(base, "", 1)] : inputs;
				for (let id of packages) {
					id = id.replace(base + "/", "");
					processPackage(base, id);
					if (!doAll) invalidations.push(`${S3_PREFIX}/${id}/*`);
				}
				if (base === "packages") {
					execFileSync("bun", ["tools/src/doc-table.ts"]);
					execFileSync(
						"aws",
						`s3 cp docs.html ${S3_BUCKET_DOCS}/index.html ${S3_OPTS}`.split(
							" "
						)
					);
				}
				invalidatePaths(`/index.html ${invalidations.join(" ")}`);
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
