import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { sync } from "gzip-size";
import { rollup } from "rollup";
import cleanup from "rollup-plugin-cleanup";
import { minify, MinifyOptions } from "terser";

const camelCase = (x: string) =>
    x.replace(/\-+(\w)/g, (_, c) => c.toUpperCase());

const size = (x: number) => (x / 1024).toFixed(2) + "KB";

const pkg = JSON.parse(readFileSync("./package.json").toString());

const deps = Object.keys(pkg.dependencies || {}).reduce(
    (acc, x) => ((acc[x] = `thi.ng.${camelCase(x.substr(8))}`), acc),
    <any>{}
);

const INPUT_OPTS = {
    external: Object.keys(deps),
    input: "./index.js",
    plugins: [cleanup({ comments: "none" })],
};

const TERSER_OPTS: MinifyOptions = {
    module: true,
    compress: true,
    mangle: true,
    ecma: 2020,
};

const buildVersion = async (opts: any, write = true, compressed = false) => {
    console.log(`bundling (${opts.format}): ${opts.file}`);

    const bundle = await rollup(INPUT_OPTS);
    const bundleOut = (await bundle.generate(opts)).output[0];
    const bundleCode = bundleOut.code;
    const terserOut = (await minify(bundleCode, TERSER_OPTS)).code!;
    const gzSize = sync(terserOut);

    write && writeFileSync(opts.file, compressed ? terserOut : bundleCode);
    opts.sourcemap &&
        writeFileSync(opts.file + ".map", bundleOut.map!.toString());

    console.log(`\tsize: ${size(terserOut.length)} / gzipped: ${size(gzSize)}`);
    return { raw: bundleCode.length, min: terserOut.length, gzip: gzSize };
};

(async () => {
    try {
        !existsSync(".meta") && mkdirSync(".meta");
        const esm = await buildVersion(
            {
                file: "lib/index.esm.js",
                format: "esm",
                interop: false,
            },
            false
        );
        writeFileSync(".meta/size.json", JSON.stringify({ esm }));
    } catch (e) {
        console.warn(e);
        process.exit(1);
    }
})();
