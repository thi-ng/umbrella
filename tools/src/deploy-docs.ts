import { dirs, files, readText, writeText } from "@thi.ng/file-io";
import { execSync } from "child_process";
import { LOGGER } from "./api.js";

const PKG = process.argv[2];

const AWS_PROFILE = "--profile thing-umbrella";
const S3_BUCKET = "s3://docs.thi.ng";
const S3_PREFIX = "/umbrella";
const S3_OPTS = `${AWS_PROFILE} --acl public-read`;
const SYNC_OPTS = `${S3_OPTS} --include "*" --exclude "*.sass" --exclude "*.ts"`;
const CF_DISTRO = "E2855K70PVNL1D";

const MINIFY_OPTS =
    "--file-ext html --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true";

const sanitizeFile = (f: string) => {
    let updated = false;
    const src = readText(f, LOGGER)
        .replace(
            /\{@link\s+@thi\.ng\/([a-z0-9-]+)(#(\w+))?\s*\|\s*([^\}]+)\}/g,
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
    execSync(
        `node_modules/.bin/html-minifier-terser ${MINIFY_OPTS} --input-dir ${root} --output-dir ${root}`
    );
};

const syncPackage = (id: string, root: string) => {
    LOGGER.info("syncing", root);
    LOGGER.info(
        execSync(
            `aws s3 sync ${root} ${S3_BUCKET}${S3_PREFIX}/${id} ${SYNC_OPTS}`
        ).toString()
    );
};

const invalidatePath = (path: string) => {
    LOGGER.info("invalidating CDN path:", path);
    execSync(
        `aws cloudfront create-invalidation --distribution-id ${CF_DISTRO} --paths "${S3_PREFIX}/${path}" ${AWS_PROFILE}`
    );
};

const processPackage = (id: string, invalidate = true) => {
    LOGGER.info("processing package", id);
    const root = `packages/${id}/doc`;
    try {
        sanitizePackage(root);
        minifyPackage(root);
        syncPackage(id, root);
        invalidate && invalidatePath(`${id}/*`);
    } catch (e) {
        console.warn(e);
    }
};

if (PKG) {
    processPackage(PKG);
} else {
    for (let pkg of dirs("packages", "", 1)) {
        processPackage(pkg.replace("packages/", ""), false);
    }
    invalidatePath("*");
}

execSync(`scripts/node-esm tools/src/doc-table.ts`);

execSync(`aws s3 cp docs.html ${S3_BUCKET}/index.html ${S3_OPTS}`);

if (PKG) {
    invalidatePath("/index.html");
}
