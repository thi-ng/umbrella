import { defAtom, defView } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";

// theme definitions
const THEMES = [
    {
        id: "default",
        root: { class: "w-100 ma0 pa3 sans-serif f6" },
        button: { class: "w4 pa2 bg-blue white" },
    },
    {
        id: "alt",
        root: { class: "w-100 ma0 pa3 serif f3 bg-washed-red" },
        button: { class: "w5 pa2 bg-red white" },
    },
    {
        id: "mono",
        root: { class: "w-100 ma0 pa3 courier f7 bg-light-gray" },
        button: { class: "w4 pa2 bg-black white" },
    },
];

// central app state atom
const db = defAtom({ id: 0 });

// define hdom context object w/ derived views of the atom's `id` value.
// a copy of this object will be passed to all component functions and
// the views will be automatically deref'd for each redraw. the same
// goes for any other data structure which implements the @thi.ng/api
// `IDeref` interface (e.g. the above atom, rstream's etc.)...
const ctx = {
    theme: defView(db, ["id"], (id) => THEMES[id]),
    themeID: defView(db, ["id"], (id) => THEMES[id].id.toUpperCase()),
};

// state updater / event handler to cycle through all themes
const toggle = () => db.swapIn(["id"], (id) => (id + 1) % THEMES.length);

// root component function
// the destructuring form is for the context object which is always
// passed as 1st arg
const app = ({ theme, themeID }: any) => [
    "div",
    theme.root,
    ["h1", `Current theme: ${themeID}`],
    ["button", { ...theme.button, onclick: toggle }, "Toggle"],
];

// kick off hdom render loop
start(app, {
    ctx,
    autoDerefKeys: Object.keys(ctx),
});
