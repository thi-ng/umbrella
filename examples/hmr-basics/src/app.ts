// edit this file after launching the dev server (`yarn start`)
// to see hot module replacement in action:
// the `state.launched` and `state.seed` values should remain constant
// when this module is being replaced via HMR

// root component function
export const app = ({ now, state }: any) => [
    "div.pa2.sans-serif.f6.bg-light-yellow",
    ["h1.pa0.ma0.bb", "State"],
    [
        "ul.ma0.pv3.bb",
        [item, "Now:", now],
        [item, "Launched at:", state.launched],
        [item, "Seed:", state.seed],
    ],
    [
        "div.mt3",
        "Edit ",
        [repoLink, "src/app.ts"],
        " to see hot module replacement in action.",
    ],
];

const item = (_: any, label: string, value: any) => [
    "li",
    ["span.dib.b.w4", label],
    value,
];

const repoLink = (_: any, file: string) => [
    "a.pa1.link.black.bg-light-gray",
    {
        href: `https://github.com/thi-ng/umbrella/tree/develop/examples/hmr-basics/${file}`,
    },
    file,
];
