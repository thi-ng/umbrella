import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { serialize } from "../src";

group("hiccup-markdown", {
    serialize: () => {
        // list component
        // the 1st arg is the optional user context object
        // passed to {@link serialize} (ignored here)
        // the 2nd arg is the list tag (ul/ol)
        // rest args are converted to list items
        const list = (_: any, type: string, ...xs: any[]) => [
            type,
            ...xs.map((x) => (Array.isArray(x) ? x : ["li", x])),
        ];

        // code block component w/ lang hint
        const codeblock = (_: any, lang: string, body: any[]) => [
            "pre",
            { lang },
            ["code", body],
        ];

        // link component for thi.ng URLs
        const thingLink = (_: any, id: string, label: any) => [
            "a",
            { href: `http://thi.ng/${id}` },
            label,
        ];

        // Note: the same hiccup tree can be serialized to HTML via @thi.ng/hiccup or
        // used interactively in the browser w/ @thi.ng/hdom
        assert.strictEqual(
            serialize(
                [
                    "div",
                    ["h1", "Hello Markdown"],
                    [
                        "p",
                        "This is a test: ",
                        ["strong", "I am strong and ", ["em", "italic"]],
                        "...",
                    ],
                    // anon component fn to demo context lookup
                    [(ctx: any) => ["p", `My magic number is: ${ctx.magic}`]],
                    // codeblock w/ language hint
                    [
                        codeblock,
                        "ts",
                        `import { serialize } from "@thi.ng/hiccup-markdown";`,
                    ],
                    // nested lists
                    [
                        list,
                        "ul",
                        "foo",
                        "bar",
                        [list, "ol", "b1", "b2", "b3"],
                        "baz",
                    ],
                    ["blockquote", "So long and thanks for all the fish."],
                    [
                        "table",
                        ["caption", ["em", "Table caption"]],
                        [
                            "thead",
                            [
                                "tr",
                                ["th", "ID"],
                                ["th", "Name"],
                                ["th", "Comment"],
                            ],
                        ],
                        [
                            "tbody",
                            [
                                "tr",
                                ["th", 1],
                                ["td", ["code", "map()"]],
                                ["td", "Transform"],
                            ],
                            [
                                "tr",
                                ["th", 2],
                                ["td", ["code", "filter()"]],
                                ["td", "Predicate"],
                            ],
                        ],
                    ],
                    [
                        "p",
                        "More info ",
                        [thingLink, "hiccup-markdown", "here"],
                        ".",
                    ],
                ],
                // optional context object passed to all component functions
                { magic: 42 }
            ),
            // prettier-ignore
            `# Hello Markdown

This is a test: **I am strong and _italic_**...

My magic number is: 42

\`\`\`ts
\import { serialize } from "@thi.ng/hiccup-markdown";
\`\`\`

- foo
- bar
    1. b1
    2. b2
    3. b3
- baz

> So long and thanks for all the fish.

| **ID** | **Name**   | **Comment** |
| ------ | ---------- | ----------- |
| **1**  | \`map()\`    | Transform   |
| **2**  | \`filter()\` | Predicate   |

_Table caption_

More info [here](http://thi.ng/hiccup-markdown).
`
        );
    },
});
