import type { IObjectOf } from "@thi.ng/api";
import { isMobile, isString } from "@thi.ng/checks";
import {
    ColorRangePreset,
    colorsFromTheme,
    ColorThemePart,
    CSSColorName,
    distCIEDE2000,
    lch,
    LCH,
    proximity,
    sort,
} from "@thi.ng/color";
import { SYSTEM, XsAdd } from "@thi.ng/random";
import { debounce, reactive, stream, Stream, sync } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { MainInputs, MainOutputs, RANGE_IDs } from "./api";
import { downloadACT } from "./palette";
import { initFromHash } from "./serialize";
// import { toDot, walk } from "@thi.ng/rstream-dot";

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

export const randomizeThemeParts = () => {
    for (let part of Object.values(parts)) {
        part.next({
            range: RANGE_IDs[SYSTEM.int() % RANGE_IDs.length],
            base: lch.random(),
            weight: SYSTEM.float(),
        });
    }
};

/**
 * Receives app state tuple, computes color theme swatches (optionally sorted by
 * proximity to white) and adds them to the state for further downstream
 * processing.
 *
 * @param state
 */
export const computeSwatches = (state: MainInputs) => {
    const { parts, num, variance, seed, sorted } = state;
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
    return { ...state, colors };
};

// setup streams of color theme parts
export const parts: IObjectOf<Stream<ColorThemePart>> = {
    0: themePart("bright", "goldenrod"),
    1: themePart("hard", "turquoise", 0.33),
    2: themePart("cool", "fuchsia", 0.5),
    3: themePart("warm", "seagreen", 0.1),
};

// debounce needed to avoid triggering extraneous updates via randomizeTheme()
export const debouncedParts = sync({ src: parts, id: "parts" }).subscribe(
    debounce(1)
);

// streams for other user controls
// (the IDs are optional, only used for visualization purposes, see end of file)
export const num = reactive(isMobile() ? 128 : 256, { id: "num" });
export const variance = reactive(0.05, { id: "variance" });
export const sorted = reactive(false, { id: "sorted" });
export const seed = reactive(0xdecafbad, { id: "seed" });

initFromHash(parts, seed, num, variance);

const mainInputs = <const>{
    parts: debouncedParts,
    num,
    variance,
    seed,
    sorted,
};

// stream combinator
export const main = sync<typeof mainInputs, MainOutputs>({
    src: mainInputs,
    xform: map(computeSwatches),
    id: "main",
});

export const downloadTrigger = stream<boolean>();
sync({
    src: { main, trigger: downloadTrigger },
    reset: true,
}).subscribe({
    next: (state) => downloadACT(state.main.colors),
});

// traverse dataflow graph from given roots, produce Graphviz DOT output
// (also uncomment rstream-dot import above)
// see: https://twitter.com/thing_umbrella/status/1363844585907249156

// console.log(
//     toDot(
//         walk(
//             [
//                 ...Object.values(parts),
//                 variance,
//                 num,
//                 sorted,
//                 seed,
//                 downloadTrigger,
//             ],
//             {
//                 values: true,
//             }
//         )
//     )
// );
