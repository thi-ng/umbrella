import { serialize } from "@thi.ng/hiccup";
import { group, text } from "@thi.ng/hiccup-svg";
import { getter } from "@thi.ng/paths";
import { bytes } from "@thi.ng/strings";
import {
    comp,
    filter,
    map,
    mapcat,
    mapIndexed,
    max,
    push,
    transduce
} from "@thi.ng/transducers";
import * as fs from "fs";
import { barChart, labeledTickX, labeledTickY } from "./viz";

const BASE_DIR = "../../packages/";

const meta = transduce(
    comp(
        map((m: string) => [m, BASE_DIR + m + "/.meta/size.json"]),
        filter(([_, path]) => fs.existsSync(path)),
        map(([m, path]) => [m, JSON.parse(fs.readFileSync(path).toString())])
    ),
    push(),
    fs.readdirSync(BASE_DIR)
);

console.log(meta.length);

const fileSizeChart =
    (stats, modType, type) => {

        const get = getter([1, modType, type]);
        stats = [...stats].sort((a, b) => get(b) - get(a));

        const maxSize = transduce(
            mapcat(([_, m]) => [m.esm[type], m.cjs[type], m.umd[type]]),
            max(),
            stats
        );

        fs.writeFileSync(
            `package-sizes-${modType}.svg`,
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
                            domain: [0, stats.length, 1],
                            range: [80, 1020],
                            ticks: [...map((x) => x[0], stats)],
                            label: labeledTickX
                        },
                        y: {
                            axis: [170, 10, 65],
                            domain: [0, maxSize, 5 * 1024],
                            range: [160, 20],
                            label: labeledTickY(1010, bytes)
                        },
                        axis: "#666",
                        fill: "#0cc"
                    },
                    mapIndexed((i, m) => [i, get(m)], stats),
                    group({ "font-size": "20px", "text-anchor": "middle" },
                        text([552, 28], `@thi.ng/umbrella package sizes (${modType.toUpperCase()})`),
                        text([552, 56], `(minified + gzipped)`),
                    )
                ]
            )
        );
    };

fileSizeChart(meta, "esm", "gzip");
fileSizeChart(meta, "cjs", "gzip");
fileSizeChart(meta, "umd", "gzip");
