import { execSync } from "child_process";
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { files } from "./io";

const PKG = process.argv[2];
if (!PKG) {
    console.warn("\nUsage: scripts/deploy-docs.js <pkg-name>");
    process.exit(1);
}

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
    const src = readFileSync(f, "utf-8")
        .replace(
            /\{@link @thi\.ng\/([a-z0-9-]+)(#(\w+))?\s*\|\s*([^\}]+)\}/g,
            (_, id, label) => {
                updated = true;
                return `<a href="${S3_PREFIX}/${id}/">${label}</a>`;
            }
        )
        .replace(
            /\{@link @thi\.ng\/([a-z0-9-]+)#(\w+)?\s*\}/g,
            (_, id, sym) => {
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
        .replace(/\{@link @thi\.ng\/([a-z0-9-]+)#?\s*\}/g, (_, id) => {
            updated = true;
            return `<a href="${S3_PREFIX}/${id}/">@thi.ng/${id}</a>`;
        });
    if (updated) {
        console.log("sanitizing:", f);
        writeFileSync(f, src, "utf-8");
    }
};

const sanitizePackage = (root: string) => {
    for (let f of files(root, ".html")) {
        sanitizeFile(f);
    }
};

const minifyPackage = (root: string) => {
    console.log("minifying", root);
    execSync(
        `node_modules/.bin/html-minifier-terser ${MINIFY_OPTS} --input-dir ${root} --output-dir ${root}`
    );
};

const syncPackage = (id: string, root: string) => {
    console.log("syncing", root);
    console.log(
        execSync(
            `aws s3 sync ${root} ${S3_BUCKET}${S3_PREFIX}/${id} ${SYNC_OPTS}`
        ).toString()
    );
};

const invalidatePackage = (id: string) =>
    execSync(
        `aws cloudfront create-invalidation --distribution-id ${CF_DISTRO} --paths "${S3_PREFIX}/${id}/*" ${AWS_PROFILE}`
    );

const processPackage = (id: string, invalidate = true) => {
    console.log("processing", id);
    const root = `packages/${id}/doc`;
    try {
        sanitizePackage(root);
        minifyPackage(root);
        syncPackage(id, root);
        invalidate && invalidatePackage(id);
    } catch (e) {
        console.warn(e);
    }
};

if (PKG) {
    processPackage(PKG);
} else {
    const pkgs = readdirSync("packages").filter((p) =>
        statSync(`packages/${p}`).isDirectory()
    );
    pkgs.forEach((pkg, i) => processPackage(pkg, i === pkgs.length - 1));
}

execSync(`scripts/node-esm tools/src/doc-table.ts`);

execSync(`aws s3 cp docs.html ${S3_BUCKET}/index.html ${S3_OPTS}`);
