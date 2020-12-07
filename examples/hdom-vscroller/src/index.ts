import { start } from "@thi.ng/hdom";
import { map, mapIndexed } from "@thi.ng/transducers";
import _commits from "./commits.json";
import _logo from "./logo-64.png";
import _packages from "./packages.json";
import { virtualScroller } from "./vscroller";

type Commit = [string, string, string];
type Package = [string, string];

const LOGO = _logo;
const REPO_BASE = "https://github.com/thi-ng/umbrella/";
const COMMITS = <Commit[]>_commits;
const PACKAGES = <Package[]>_packages;

let query = "";
let filtered = COMMITS;
let commitsOffset = 0;
let commitsTop = 0;
let pkgOffset = 0;
let pkgTop = 0;

const filterCommit = (q: string) => (x: Commit) =>
    x[2].toLowerCase().indexOf(q) >= 0 || x[1].indexOf(q) >= 0;

const setQuery = (e: Event) => {
    try {
        query = (<HTMLInputElement>e.target).value;
        filtered = COMMITS.filter(filterCommit(query));
        commitsOffset = 0;
        commitsTop = 0;
    } catch (e) {}
};

const queryFilter = (_: any, query: EventListener, items: any[]) => [
    "div.pv2.ph3.bg-black.white",
    "Filter: ",
    ["input", { type: "text", oninput: setQuery, value: query }],
    ` (${items.length})`,
];

const repoLink = (_: any, sha: string, body: any) => [
    "a.link.blue",
    { href: `${REPO_BASE}commit/${sha}` },
    body,
];

const packageLink = (_: any, name: any) => [
    "a.link.blue",
    { href: `${REPO_BASE}tree/develop/packages/${name.substr(8)}` },
    name,
];

const commit = (i: number, [sha, date, msg]: Commit) => [
    `div.f7.pv2.bg-${i & 1 ? "light-gray" : "transparent"}`,
    ["div.dib.w-30.w-20-m.w-10-l.ph3", date],
    [
        "div.dib.w-70.w-80-m.w-90-l.ph3.overflow-x-hidden.nowrap",
        [repoLink, sha, msg],
    ],
];

const pkgSummary = ([name, desc]: Package) => [
    "div.flex.items-center.lh-copy.pa3.ph0-l.bb.b--black-10",
    { style: { height: "96px" } },
    ["img.w2.h2", { src: LOGO }],
    ["div.pl3.flex-auto.f7", ["h3.ma0", [packageLink, name]], desc],
];

const app = () => [
    "div.sans-serif.pa2",
    [queryFilter, query, filtered],
    virtualScroller({
        onscroll: (_top, _offset) => {
            commitsTop = _top;
            commitsOffset = _offset;
        },
        start: commitsOffset,
        top: commitsTop,
        numVisible: 10,
        numItems: filtered.length,
        itemHeight: 31,
        items: mapIndexed(commit, 0, filtered),
    }),
    ["h3.ph2", "Packages"],
    virtualScroller({
        onscroll: (_top, _offset) => {
            pkgTop = _top;
            pkgOffset = _offset;
        },
        start: pkgOffset,
        top: pkgTop,
        numVisible: 2,
        numItems: PACKAGES.length,
        itemHeight: 96,
        items: map(pkgSummary, PACKAGES),
    }),
];

start(app);
