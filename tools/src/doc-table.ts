import { serialize } from "@thi.ng/hiccup";
import { comp, filter, map, push, transduce } from "@thi.ng/transducers";
import { existsSync, readdirSync, writeFileSync } from "fs";
import { META_FIELD, Package } from "./api";
import { readJSON } from "./io";
import { shortName } from "./partials/package";

const REPO_URL = "https://github.com/thi-ng/umbrella/blob/develop/packages";
const NPM_URL = "https://www.npmjs.com/package";
const BADGE_URL = "https://img.shields.io/npm/v";
const BASE_DIR = "./packages/";

const pkgDetails = (p: Package) => [
    "tr",
    ["td", ["a", { href: `umbrella/${shortName(p.name)}/` }, p.name]],
    [
        "td",
        [
            "a",
            { href: `${NPM_URL}/${p.name}` },
            [
                "img",
                {
                    src: `${BADGE_URL}/${p.name}.svg`,
                    alt: "npm version",
                },
            ],
        ],
    ],
    [
        "td",
        [
            "a",
            {
                href: `${REPO_URL}/${shortName(p.name)}/CHANGELOG.md`,
            },
            "changelog",
        ],
    ],
];

const packages = transduce(
    comp(
        map((f) => `${BASE_DIR}/${f}/package.json`),
        filter(existsSync),
        map((f) => readJSON(<string>f)),
        filter((pkg) => !pkg[META_FIELD]?.skip),
        map(pkgDetails)
    ),
    push(),
    readdirSync(BASE_DIR)
);

writeFileSync(
    "docs.html",
    serialize([
        ["!DOCTYPE", "html"],
        [
            "html",
            { lang: "en" },
            [
                "head",
                ["title", "docs.thi.ng"],
                [
                    "meta",
                    {
                        "http-equiv": "Content-Type",
                        content: "text/html; charset=utf-8",
                    },
                ],
                [
                    "link",
                    {
                        href:
                            "https://unpkg.com/tachyons@4/css/tachyons.min.css",
                        rel: "stylesheet",
                    },
                ],
            ],
            [
                "body.measure.center.sans-serif.lh-copy",
                [
                    "img.db.mt3",
                    {
                        alt: "docs.thi.ng",
                        src:
                            "https://media.thi.ng/umbrella/banners/docsthing.svg",
                    },
                ],
                [
                    "p",
                    "This site hosts auto-generated documentation for the following projects:",
                ],
                ["table.w-100", ["tbody", ...packages]],
                [
                    "div.mv4.tc",
                    ["a", { href: "http://thi.ng/" }, "thi.ng"],
                    " | ",
                    ["a", { href: "https://github.com/thi-ng/" }, "github"],
                    " | ",
                    ["a", { href: "https://travis-ci.org/thi-ng/" }, "ci"],
                    " | ",
                    [
                        "a",
                        { href: "https://twitter.com/thing_umbrella/" },
                        "twitter",
                    ],
                    [
                        "p.mt3.f7.gray",
                        "Last updated: ",
                        new Date().toISOString(),
                    ],
                ],
            ],
        ],
    ])
);
