import type { Fn } from "@thi.ng/api";
import { preferredType } from "@thi.ng/mime";
import { execSync } from "child_process";
import { exit } from "process";
import { files } from "./io";

interface UploadOpts {
    ext: string;
    gzip: boolean;
    depth: number;
    process: Fn<string, void>;
}

const EXAMPLE = process.argv[2];
if (!EXAMPLE) {
    console.warn("\nUsage: deploy-example.ts <example-name>");
    exit(1);
}

const BUILD = `examples/${EXAMPLE}/build/`;
const DEST_DIR = `/umbrella/${EXAMPLE}`;
const BUCKET = `s3://demo.thi.ng${DEST_DIR}`;
const CF_DISTRO = "EL2F1HMDPZ2RL";
const PROFILE = "thing-umbrella";
const OPTS = `--profile ${PROFILE} --acl public-read`;
const GZOPTS = `${OPTS} --content-encoding gzip`;

const NEVER_GZIP = new Set(["mp4"]);

const args = new Set(process.argv.slice(3).map((x) => x.substr(2)));
console.log(args);

execSync(`find examples/${EXAMPLE} -type f -name '*.DS_Store' -ls -delete`);

const uploadAssets = (dir: string, opts?: Partial<UploadOpts>) => {
    opts = { ext: "", gzip: true, depth: Infinity, ...opts };
    for (let f of files(`${BUILD}${dir}`, opts.ext!, opts.depth)) {
        const fd = `${BUCKET}/${f
            .replace(BUILD, "")
            .substr(dir === "" ? 1 : 0)}`;
        const ext = f.substr(f.lastIndexOf(".") + 1);
        const type = preferredType(ext);
        console.log(f, "->", fd, type);
        opts.process && opts.process(f);
        if (opts.gzip && !NEVER_GZIP.has(ext)) {
            execSync(`gzip -9 ${f}`);
            execSync(
                `aws s3 cp ${f}.gz ${fd} ${GZOPTS} --content-type ${type}`
            );
        } else {
            execSync(`aws s3 cp ${f} ${fd} ${OPTS} --content-type ${type}`);
        }
    }
};

// const interpolateFile = (tpl: any) => (src: string) => {
//     let body = fs.readFileSync(src, "utf-8");
//     body = body.replace(/\{\{(\w+)\}\}/g, (_, id) => tpl[id]);
//     fs.writeFileSync(src, body);
// };

// const include = (id: string) => args.has(id) || args.has("all");

uploadAssets("assets");

uploadAssets("js", { ext: ".js", depth: 2 });
uploadAssets("", { ext: ".js", depth: 1 });
uploadAssets("", { ext: ".html" });

console.log("invaliding", DEST_DIR);

execSync(
    `aws cloudfront create-invalidation --distribution-id ${CF_DISTRO} --paths "${DEST_DIR}/*" --profile ${PROFILE}`
);

console.log("done");
