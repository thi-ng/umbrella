import { exists } from "@thi.ng/checks";
import { DGraph } from "@thi.ng/dgraph";
import { serialize } from "@thi.ng/hiccup";
import { group, text } from "@thi.ng/hiccup-svg";
import {
    comp,
    filter,
    map,
    mapcat,
    mapIndexed,
    max,
    pluck,
    push,
    reducer,
    repeat,
    transduce,
    tuples
} from "@thi.ng/transducers";
import * as fs from "fs";
import {
    barChart,
    labeledTickY,
    labeledTickX,
} from "./viz";

const BASE_DIR = "../../packages/";

const packages = transduce(
    comp(
        map((f) => BASE_DIR + f),
        filter((f) => fs.statSync(f).isDirectory()),
        map((f) => { try { return fs.readFileSync(f + "/package.json"); } catch (_) { } }),
        filter(exists),
        map((p) => JSON.parse(p.toString())),
        map((p) => ({
            id: p.name,
            v: p.version,
            deps: p.dependencies ? Object.keys(p.dependencies) : []
        }))
    ),
    push(),
    fs.readdirSync(BASE_DIR)
);

const graph = transduce(
    mapcat((p: any) => tuples(repeat(p.id), p.deps)),
    reducer(() => new DGraph(), (g, [p, d]) => g.addDependency(p, d)),
    packages
);

const packageDeps = packages
    .map((p) => [p.id, graph.transitiveDependents(p.id).size])
    .sort((a, b) => b[1] - a[1]);

const maxDeps = transduce(pluck(1), max(), packageDeps);

fs.writeFileSync(
    `package-deps.svg`,
    serialize(
        [barChart,
            {
                attribs: {
                    width: 1024,
                    height: 260,
                    "font-size": "10px",
                    "font-family": "Iosevka-Term-Light, Menlo, sans-serif"
                },
                x: {
                    axis: [80, 1010, 170],
                    domain: [0, packageDeps.length, 1],
                    range: [80, 1020],
                    ticks: [...map((x) => x[0].substr(8), packageDeps)],
                    label: labeledTickX
                },
                y: {
                    axis: [170, 10, 65],
                    domain: [0, maxDeps, 10],
                    range: [160, 20],
                    label: labeledTickY(1010)
                },
                axis: "#666",
                fill: "#0cc"
            },
            mapIndexed((i, m) => [i, m[1]], packageDeps),
            group({ "font-size": "20px", "text-anchor": "middle" },
                text([592, 28], "@thi.ng/umbrella internal re-use"),
                text([592, 56], "(transitive dependents)"),
            )
        ]
    )
);
