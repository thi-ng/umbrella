import { serialize } from "@thi.ng/hiccup";
import { execSync } from "child_process";
import * as fs from "fs";
import * as icons from "../src/index";

const REV = execSync('git log --pretty="%h %cI" -1').toString().trim();

// prettier-ignore
fs.writeFileSync(
    "contact-sheet.html",
    serialize(
        ["html", { lang: "en" },
            ["head",
                ["meta", { "http-equiv": "Content-Type", content: "text/html;charset=UTF-8" }],
                ["title", `@thi.ng/hiccup-carbon-icons contact sheet (${REV})`],
                ["link", { href: "https://unpkg.com/tachyons@4/css/tachyons.min.css", rel: "stylesheet" }],
                ["style", `svg:hover * { fill: #357edd; transition: fill 0.15s ease-in-out; }`]
            ],
            ["body.sans-serif.ma3",
                ["div",
                    ["h1.f2.fw2.mv2", "@thi.ng/hiccup-carbon-icons"],
                    ["p.measure.lh-copy",
                        "This document lists all icons provided by the ",
                        ["a.link.b.black.hover-blue",
                            { href: "https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-carbon-icons" },
                            "@thi.ng/hiccup-carbon-icons"],
                        ` package, including their exported variable names. These icons were converted to hiccup format from the original icons designed by IBM and published in the `,
                        ["a.link.b.black.hover-blue",
                            { href: "https://github.com/IBM/carbon-icons" },
                            "IBM/carbon-icons"],
                        ` repository.`
                    ]
                ],
                ["div",
                    { style: { "font-size": "0.5rem" } },
                    Object
                        .keys(icons)
                        .filter((id) => Array.isArray((<any>icons)[id]))
                        .map((id) => {
                            return ["div.dib.ma2",
                                ["div.w4.h4.bg-light-gray.dark-gray.flex.items-center.tc",
                                    ["div.w-100",
                                        icons.withSize((<any>icons)[id], "2rem"),
                                        ["div.mt3", id]]]
                            ];
                        })
                ]
            ]
        ]
    ));
