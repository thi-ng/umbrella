import { interpolate } from "@thi.ng/strings";
import { execSync } from "child_process";
import { readdirSync, writeFileSync, statSync } from "fs";

const CONVERT = `../../examples/xml-converter/bin/hiccup --var {0} --attribs "xmlns,xmlns:xlink,xml:space,version,id,fill,stroke,stroke-width,width,height,x,y,style,data-name,class,viewBox" --tags "desc,title,defs" tmp.svg`;

const [destDir, srcDir] = process.argv.slice(2);

const files = ["utils/with-size"];

for (let src of readdirSync(srcDir)) {
    if (statSync(`${srcDir}/${src}`).isDirectory() || !/^[a-z]/i.test(src))
        continue;
    const dest = src
        .substr(0, src.length - 4)
        .toLowerCase()
        .replace(/--/g, "-");
    const varName = dest.toUpperCase().replace(/-/g, "_");
    console.log(src, dest, varName);
    execSync(`svgo -o tmp.svg ${srcDir}/${src}`);
    let res = execSync(interpolate(CONVERT, varName))
        .toString()
        .replace(/export const [A-Z0-9_]+/, (x) => x + ": any[]")
        .replace(/,\s+\["path", \{ d: "M0 0h32v32H0z" \}\]/, "")
        .replace(/,\s+\["path", \{ d: "M32 32H0V0h32z" \}\]/, "")
        .replace(/,\s+\["path", \{ d: "M32 0v32H0V0z" \}\]/, "")
        .replace(/,\s+\["path", \{ d: "M0 32V0h32v32z" \}\]/, "");
    if (res.indexOf(`"svg", {`) < 0) {
        res = res.replace(`"svg",`, `"svg", { viewBox: "0 0 32 32" },`);
    }
    res =
        `/**
 * https://demo.thi.ng/umbrella/hiccup-carbon-icons/#${varName}
*/
// prettier-ignore\n` + res;
    writeFileSync(`${destDir}/${dest}.ts`, res);
    files.push(dest);
}

writeFileSync(
    `${destDir}/index.ts`,
    files.map((id) => `export * from "./${id}";`).join("\n")
);
