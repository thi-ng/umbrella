import { selectKeysObj } from "@thi.ng/associative";
import { repeat, Z3 } from "@thi.ng/strings";
import {
    Border,
    canvas,
    drawTable,
    initTable,
    toString
} from "@thi.ng/text-canvas";
import {
    comp,
    filter,
    last,
    map,
    mapIndexed,
    mapKeys,
    max,
    multiplex,
    push,
    scan,
    transduce
} from "@thi.ng/transducers";
import {
    existsSync,
    readdirSync,
    readFileSync,
    writeFileSync
} from "fs";

const examples = transduce(
    comp(
        map((f) => `examples/${f}/package.json`),
        filter(existsSync),
        map((f) => JSON.parse(readFileSync(f).toString())),
        filter((pkg) => !pkg["thi.ng"]?.skip),
        mapKeys(
            {
                name: (id) => `[${id}](./${id}/)`,
                img: (_, ex) =>
                    ex["thi.ng"]?.screenshot
                        ? `<img src="../assets/${ex["thi.ng"].screenshot}" width="240"/>`
                        : "",
                description: (desc) => desc || "TODO"
            },
            false
        )
    ),
    push<any>(),
    readdirSync("examples")
);

const maxLen = (key: string) =>
    comp<any, number, number>(
        map((x) => x[key].length),
        scan(max())
    );

const colWidths = transduce<any, number[], number[]>(
    multiplex(maxLen("img"), maxLen("name"), maxLen("description")),
    last(),
    examples
);

const tbl = initTable(
    {
        cols: [{ width: 3 }, ...map((width) => ({ width }), colWidths)],
        padding: [1, 0],
        border: Border.V
    },
    [
        ["#", "Screenshot", "Name", "Description"],
        ["---", ...map((w) => repeat("-", w), colWidths)],
        ...mapIndexed(
            (i, ex) => [Z3(i + 1), ex.img, ex.name, ex.description],
            examples
        )
    ]
);

const canv = canvas(tbl.width, tbl.height);
drawTable(canv, 0, 0, tbl);

const PREFIX = `# @thi.ng/umbrella examples

This directory contains a growing number (currently ${examples.length}) of standalone
example projects, including live online versions, build instructions
and commented source code.

If you want to [contribute](../CONTRIBUTING.md) an example, please get
in touch via PR, issue tracker, email or twitter!

`;

writeFileSync("examples/README.md", PREFIX + toString(canv));
