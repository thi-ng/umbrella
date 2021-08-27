import { defAdjBitMatrix } from "@thi.ng/adjacency";
import { CDATA, COMMENT, serialize } from "@thi.ng/hiccup";
import { anchor, script, style, title } from "@thi.ng/hiccup-html";
import {
    circle,
    group,
    image,
    line,
    rect,
    svg,
    text,
} from "@thi.ng/hiccup-svg";
import { PI } from "@thi.ng/math";
import { XML_SVG } from "@thi.ng/prefixes";
import { comp, filter, iterator, map, range } from "@thi.ng/transducers";
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { files, readJSON } from "./io";
import { shortName } from "./partials/package";

const W = 16;
const LW = 150;
const GAP = 10;

const packages = [...files("packages", "package.json", 2)].map(readJSON);
const ids = packages.map((p) => shortName(p.name));
const num = ids.length;

const deps = defAdjBitMatrix(packages.length);
const rels = defAdjBitMatrix(packages.length);

const getID = (name: string) => ids.indexOf(shortName(name));

for (let p of packages) {
    const id = getID(p.name);
    for (let d in p.dependencies) {
        if (!d.startsWith("@thi.ng")) continue;
        deps.addEdge(getID(d), id);
    }
    for (let r of p["thi.ng"]?.related || []) {
        rels.addEdge(ids.indexOf(r), id);
    }
}

const invDeps = deps.invert();

let row = -1;

const pkgLink = (id: number, attribs: any, body: any) =>
    anchor({ href: `https://thi.ng/${ids[id]}`, ...attribs }, body);

const processPkg = (id: number) => {
    row++;
    const n = deps.neighbors(id).length;
    const y = row * W + LW;
    return group({ class: "t", data: { id } }, [
        pkgLink(
            id,
            {},
            text(
                [LW - 5, y + W / 2],
                ids[id],
                {
                    "text-anchor": "end",
                    "dominant-baseline": "middle",
                },
                title({}, `used by ${n} package${n !== 1 ? "s" : ""}`)
            )
        ),
        ...map(
            (d) =>
                rect(
                    [d * W + LW + 1, y + 1],
                    W - 2,
                    W - 2,
                    {
                        class: deps.hasEdge(id, d) ? "d" : "r",
                        data: {
                            id,
                            col: d,
                            row,
                        },
                    },
                    title(
                        {},
                        deps.hasEdge(id, d)
                            ? `dependency: ${ids[id]} ⟸ ${ids[d]}`
                            : `related: ${ids[id]} ⟺ ${ids[d]}`
                    )
                ),
            new Set([...deps.neighbors(id), ...rels.neighbors(id)])
        ),
    ]);
};

const cells = group({ id: "cells" }, [
    ...iterator(
        comp(
            filter((id) => deps.degree(id) > 0 || rels.degree(id) > 0),
            map(processPkg)
        ),
        range(num)
    ),
]);

row++;

const WIDTH = num * W + LW;
const HEIGHT = row * W + LW;

const doc = svg(
    {
        viewBox: `-${GAP} -${GAP} ${WIDTH + 2 * GAP} ${HEIGHT + 2 * GAP}`,
        fill: "#000",
        "font-size": "12px",
        "font-family": "'IBM Plex Mono', monospace",
    },
    [COMMENT, `generated @ ${new Date().toISOString()}`],
    style({}, [
        CDATA,
        "@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap');",
        `.d { fill: #0cf; }`,
        `.r { fill: #f39; }`,
        `@keyframes dsel { from { fill: #0cf; } to { fill: #40f; } }`,
        `@keyframes rsel { from { fill: #f39; } to { fill: #906; } }`,
        `.d:hover { animation: 0.5s ease-in-out infinite alternate dsel; }`,
        `.dr:hover { animation: 0.5s ease-in-out infinite alternate drsel; }`,
        `.r:hover { animation: 0.5s ease-in-out infinite alternate rsel; }`,
        `line.sel { stroke: #000; }`,
        `.h { opacity: 0.1; }`,
        `.t { transition: opacity 0.1s linear; }`,
        `@keyframes fade { from { opacity: 0; } to { opacity: 1 } }`,
        `.fade { animation: 0.1s linear fade; }`,
    ]),
    anchor(
        { href: `https://thi.ng/` },
        circle([LW / 2, LW / 2], LW / 3, { fill: "#000" }),
        image([LW / 4, LW / 4], "./logo-anim-white.svg", {
            width: LW / 2,
            height: LW / 2,
        })
    ),
    group({ id: "labels" }, [
        ...map((id) => {
            const n = invDeps.degree(id);
            return pkgLink(
                id,
                { class: "t", data: { id } },
                text(
                    [0, 0],
                    ids[id],
                    {
                        translate: [(id + 0.5) * W + LW, LW - 5],
                        rotate: -PI / 2,
                        "dominant-baseline": "middle",
                    },
                    title({}, `depends on ${n} package${n !== 1 ? "s" : ""}`)
                )
            );
        }, range(num)),
    ]),
    group({ stroke: "#eee", translate: [LW, LW] }, [
        group({ id: "cols" }, [
            ...map(
                (x) => line([(x + 0.5) * W, 0], [(x + 0.5) * W, row * W]),
                range(num)
            ),
        ]),
        group({ id: "rows" }, [
            ...map(
                (y) => line([0, (y + 0.5) * W], [num * W, (y + 0.5) * W]),
                range(row)
            ),
        ]),
    ]),
    group({ id: "links" }),
    cells,
    script({}, [
        CDATA,
        `const svg = document.querySelector("svg");
const links = document.getElementById("links");
const cells = document.getElementById("cells");
const labels = document.getElementById("labels");
const colors = ["hsl(0,100%,50%)","hsl(20,100%,50%)","hsl(40,100%,50%)"]
let vline, hline, cell, label, prevDeps;

const attr = (el, id) => Number(el.getAttribute(id));
const setAttribs = (el, attribs) => Object.keys(attribs).forEach((id) => el.setAttribute(id, attribs[id]));
const centroid = (el) => [attr(el, "x") + attr(el, "width") / 2, attr(el, "y") + attr(el, "height") / 2];
const select = (...els) => els.forEach((e) => e.classList.add("sel"));
const deselect = (...els) => els.forEach((e) => e.classList.remove("sel"));

const createLinks = (acc, src, colors, maxD, depth = 0) => {
    const id = src.dataset.id;
    acc.rows.add(id);
    if (depth >= maxD) return;
    const [sx, sy] = centroid(src);
    for(let n of document.querySelectorAll(\`rect[data-col="\${id}"]\`)) {
        if (id === n.dataset.id || n.classList[0].indexOf("d") < 0) continue;
        acc.cols.add(n.dataset.col);
        const [dx, dy] = centroid(n);
        const line = document.createElementNS("${XML_SVG}", "line");
        setAttribs(line, { x1: sx, y1: sy, x2: dx, y2: dy });
        line.classList.add("fade");
        line.style.stroke = colors[depth];
        links.appendChild(line);
        createLinks(acc, n, colors, maxD, depth + 1);
    }
};

const toggle = (root, sel, hide) => {
    const children = root.childNodes;
    for(let i = 0; i < children.length; i++) {
        const c = children[i];
        if (!sel.has(c.dataset.id)) {
            hide ? c.classList.add("h") : c.classList.remove("h");
        }
    }
};

const clearSelection = () => {
    if (!prevDeps) return;
    toggle(cells, prevDeps.rows, false);
    toggle(labels, prevDeps.cols, false);
    while(links.firstChild) links.removeChild(links.firstChild);
    cell && deselect(cell, hline, vline);
    prevDeps.rects && prevDeps.rects.forEach((e) => e.classList.remove("h"));
    prevDeps = label = cell = hline = vline = null;
};

const selectCell = (e) => {
    cell = e.target;
    const { id, col, row } = e.target.dataset;
    vline = document.querySelector(\`#cols>line:nth-child(\${Number(col) + 1})\`);
    hline = document.querySelector(\`#rows>line:nth-child(\${Number(row) + 1})\`);
    select(cell, hline, vline);
    const deps = { rows: new Set(), cols: new Set([col]) };
    createLinks(deps, cell, colors, 3);
    toggle(cells, deps.rows, true);
    toggle(labels, deps.cols, true);
    prevDeps = deps;
};

const pkgDeps = (i) => [...document.querySelectorAll(\`#cells>g[data-id="\${i}"]>rect\`)];

const crossCutX = (target) => {
    const id = target.parentNode.dataset.id;
    const deps = { rows: new Set(), cols: new Set([id]), rects: [] };
    for(let i = 0; i < ${num}; i++) {
        const rects = pkgDeps(i);
        if (rects.some((r) => r.dataset.col === id)) {
            for(let r of rects) {
                if (r.dataset.col === id) {
                    deps.rows.add(r.dataset.id);
                } else {
                    r.classList.add("h");
                    deps.rects.push(r);
                }
            }
        }
    }
    return deps;
};

const crossCutY = (target) => {
    const id = target.parentNode.parentNode.dataset.id;
    return {
        rows: new Set([id]),
        cols: new Set(pkgDeps(id).map((r) => r.dataset.col))
    };
};

const handleInteraction = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.tagName === "text") {
        if (target !== label) {
            clearSelection();
            const deps = target.parentNode.parentNode === labels
                ? crossCutX(target)
                : crossCutY(target);
            toggle(cells, deps.rows, true);
            toggle(labels, deps.cols, true);
            prevDeps = deps;
            label = target;
        }
        return;
    }
    if (target.dataset.id != null) {
        if (target !== cell) {
            clearSelection();
            selectCell(e);
        }
    } else clearSelection();
};

svg.addEventListener("mousemove", handleInteraction);
svg.addEventListener("touchstart", handleInteraction);`,
    ]),
    script({
        data: { domain: "dependencies.thi.ng" },
        "xlink:href": "https://plausible.io/js/plausible.js",
    })
);

writeFileSync("assets/deps.svg", serialize(doc));
execSync("gzip -9 -f assets/deps.svg");

console.log("uploading...");
console.log(
    execSync(
        `aws s3 cp assets/deps.svg.gz s3://dependencies.thi.ng/index.svg --content-type image/svg+xml --content-encoding gzip --acl public-read --profile thing-umbrella`
    ).toString()
);
