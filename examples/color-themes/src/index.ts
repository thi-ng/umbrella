import type { IObjectOf } from "@thi.ng/api";
import { isMobile, isString } from "@thi.ng/checks";
import {
    ColorRangePreset,
    colorsFromTheme,
    ColorThemePart,
    COLOR_RANGES,
    css,
    CSSColorName,
    distCIEDE2000,
    lch,
    LCH,
    proximity,
    sort,
    swatchesH,
} from "@thi.ng/color";
import {
    button,
    checkbox,
    div,
    inputColor,
    inputRange,
    span,
} from "@thi.ng/hiccup-html";
import { svg } from "@thi.ng/hiccup-svg";
import { SYSTEM, XsAdd } from "@thi.ng/random";
import {
    $compile,
    $inputNum,
    $list,
    $refresh,
    ComponentLike,
} from "@thi.ng/rdom";
import { staticDropdown } from "@thi.ng/rdom-components";
import { debounce, reactive, Stream, sync, SyncTuple } from "@thi.ng/rstream";
// import { toDot, walk } from "@thi.ng/rstream-dot";

// pre-sort range preset IDs for dropdown menus
const RANGE_IDs = <ColorRangePreset[]>Object.keys(COLOR_RANGES).sort();

// number of serialized state tokens (from hash fragment)
const NUM_STATE_TOKENS = 15;

///////////////////////// UI widgets

const themePartControls = ([id, part]: [string, ColorThemePart]) => {
    const stream = parts[id];
    return div(
        ".grid.mb3",
        {},
        staticDropdown(RANGE_IDs, reactive(<string>part.range), {
            attribs: {
                title: "color range preset",
                oninput: (e) =>
                    stream.next({
                        ...part,
                        range: <ColorRangePreset>(
                            (<HTMLInputElement>e.target).value
                        ),
                    }),
            },
        }),
        inputColor({
            value: css(<LCH>part.base),
            title: "base color",
            onchange: (e) =>
                stream.next({
                    ...part,
                    base: lch((<HTMLInputElement>e.target).value),
                }),
        }),
        inputRange({
            min: 0,
            max: 1,
            step: 0.01,
            value: part.weight,
            title: "weight",
            onchange: (e) =>
                stream.next({
                    ...part,
                    weight: parseFloat((<HTMLInputElement>e.target).value),
                }),
        })
    );
};

const control = (label: string, body: ComponentLike) =>
    div(".grid2.mb3", {}, span({}, label), body);

const themeSwatches = async ({
    parts,
    num,
    variance,
    seed,
    sorted,
}: SyncTuple<typeof mainInputs>) => {
    const colors = [
        ...colorsFromTheme(Object.values(parts), {
            num,
            variance,
            rnd: new XsAdd(seed),
        }),
    ];
    if (sorted) {
        sort(colors, proximity(lch(1, 0, 0), distCIEDE2000()));
    }
    return <ComponentLike>svg(
        {
            width: "100vw",
            height: "100vh",
            viewBox: `0 0 ${num * 5} 100`,
            preserveAspectRatio: "none",
            convert: true,
        },
        swatchesH(colors, 5, 100)
    );
};

///////////////////////// streams / app state

const themePart = (
    range: ColorRangePreset,
    base: LCH | CSSColorName,
    weight = 1
) =>
    reactive<ColorThemePart>({
        range,
        base: isString(base) ? lch(base) : base,
        weight,
    });

const randomizeThemeParts = () => {
    for (let part of Object.values(parts)) {
        part.next({
            range: RANGE_IDs[SYSTEM.int() % RANGE_IDs.length],
            base: lch.random(),
            weight: SYSTEM.float(),
        });
    }
};

// setup streams of color theme parts
const parts: IObjectOf<Stream<ColorThemePart>> = {
    0: themePart("bright", "goldenrod"),
    1: themePart("hard", "turquoise", 0.33),
    2: themePart("cool", "fuchsia", 0.5),
    3: themePart("warm", "seagreen", 0.1),
};

// debounce needed to avoid triggering extraneous updates via randomizeTheme()
const debouncedParts = sync({ src: parts, id: "parts" }).subscribe(debounce(1));

// streams for other user controls
// (the IDs are optional, only used for visualization purposes, see end of file)
const num = reactive(isMobile() ? 100 : 200, { id: "num" });
const variance = reactive(0.05, { id: "variance" });
const sorted = reactive(false, { id: "sorted" });
const seed = reactive(0xdecafbad, { id: "seed" });

// attempt to restore state from hash fragment
if (location.hash.length > 1) {
    const tokens = atob(location.hash.substr(1)).split("|");
    if (tokens.length === NUM_STATE_TOKENS) {
        seed.next(parseInt(tokens[0]));
        num.next(parseInt(tokens[1]));
        variance.next(parseFloat(tokens[2]));
        for (let i = 3, j = 0; j < 4; i += 3, j++) {
            parts[j].next({
                range: <ColorRangePreset>tokens[i],
                base: lch(JSON.parse(tokens[i + 1])),
                weight: parseFloat(tokens[i + 2]),
            });
        }
    }
}

// stream combinator
const mainInputs = <const>{
    parts: debouncedParts,
    num,
    variance,
    seed,
    sorted,
};
const main = sync({ src: mainInputs, id: "main" });

///////////////////////// UI components

$compile(
    div(
        {},
        // color swatches
        $refresh<SyncTuple<typeof mainInputs>>(main, themeSwatches),
        // theme controls in HUD UI
        div(
            ".z-1.fixed.top-0.left-0.bg-white-80.ma3-m.ma3-l.pa3.w-100.w-50-m.w-33-l",
            {},
            // list of controls for each theme part
            $list<[string, ColorThemePart]>(
                debouncedParts.map((parts) => Object.entries(parts), {
                    id: "swatches",
                }),
                "div",
                {},
                themePartControls
            ),
            // global controls: num swatches, variance, random seed, sorting
            control(
                "num swatches",
                inputRange({
                    min: 10,
                    max: 200,
                    value: num,
                    oninput: $inputNum(num),
                })
            ),
            control(
                "variance",
                inputRange({
                    min: 0,
                    max: 0.2,
                    step: 0.005,
                    value: variance,
                    oninput: $inputNum(variance),
                })
            ),
            control(
                "random seed",
                inputRange({
                    min: 0,
                    max: 1 << 30,
                    value: seed,
                    oninput: $inputNum(seed),
                })
            ),
            control(
                "sort",
                checkbox({
                    checked: sorted,
                    onchange: (e) =>
                        sorted.next(
                            Boolean((<HTMLInputElement>e.target).checked)
                        ),
                })
            ),
            button(
                ".bg-black.white.w4",
                { onclick: randomizeThemeParts },
                "randomize"
            )
        )
    )
).mount(document.getElementById("app")!);

// store current config base64 encoded in hash fragment
main.subscribe({
    next({ parts, num, variance, seed }) {
        const res = [
            seed,
            num,
            variance,
            ...Object.values(parts).map(
                (p) => `${p.range}|${p.base}|${p.weight}`
            ),
        ].join("|");
        location.hash = btoa(res);
    },
});

// traverse dataflow graph from given roots, produce Graphviz DOT output
// (also uncomment rstream-dot import above)
// see: https://twitter.com/thing_umbrella/status/1363844585907249156

// console.log(
//     toDot(
//         walk([...Object.values(parts), variance, num, sorted, seed], {
//             values: true,
//         })
//     )
// );
