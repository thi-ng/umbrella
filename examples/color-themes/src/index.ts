import type { ColorRangePreset, ColorThemePart } from "@thi.ng/color";
import { css } from "@thi.ng/color/css/css";
import { lch, LCH } from "@thi.ng/color/lch/lch";
import { swatchesH } from "@thi.ng/color/ops/swatches";
import { div } from "@thi.ng/hiccup-html/blocks";
import {
    button,
    checkbox,
    inputColor,
    inputRange,
    option,
} from "@thi.ng/hiccup-html/forms";
import { span } from "@thi.ng/hiccup-html/inline";
import { datalist } from "@thi.ng/hiccup-html/lists";
import { svg } from "@thi.ng/hiccup-svg/svg";
import type { ComponentLike } from "@thi.ng/rdom";
import { staticDropdown } from "@thi.ng/rdom-components/dropdown";
import { $compile } from "@thi.ng/rdom/compile";
import { $inputCheckbox, $inputNum, $inputTrigger } from "@thi.ng/rdom/event";
import { $list } from "@thi.ng/rdom/list";
import { $refresh } from "@thi.ng/rdom/switch";
import { reactive } from "@thi.ng/rstream/stream";
import { MainOutputs, RANGE_IDs } from "./api";
import {
    debouncedParts,
    downloadTrigger,
    main,
    num,
    parts,
    randomizeThemeParts,
    seed,
    sorted,
    variance,
} from "./state";

/**
 * UI root component for a set of controls for a single color theme part (range
 * preset, base color, weight).
 */
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

/**
 * Simple 2-column component wrapper for given label & body component.
 *
 * @param label
 * @param body
 */
const control = (label: string, ...body: ComponentLike[]) =>
    div(".grid2.mb3", {}, span({}, label), ...body);

/**
 * SVG component wrapper for color swatches.
 *
 * @param state
 */
const svgSwatches = async ({ colors, num }: MainOutputs) => <ComponentLike>svg(
        {
            width: "100vw",
            height: "100vh",
            viewBox: `0 0 ${num * 5} 100`,
            preserveAspectRatio: "none",
            convert: true,
        },
        swatchesH(colors, 5, 100)
    );

// main UI

$compile(
    div(
        {},
        // color swatches
        $refresh<MainOutputs>(main, svgSwatches),
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
                    min: 8,
                    max: 256,
                    list: "pow2",
                    value: num,
                    oninput: $inputNum(num),
                }),
                datalist(
                    "#pow2",
                    {},
                    ...[8, 16, 32, 64, 128, 256].map((x) =>
                        option({}, String(x))
                    )
                )
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
                    onchange: $inputCheckbox(sorted),
                })
            ),
            button(
                ".bg-black.white.bn.pa2.mr3",
                { onclick: randomizeThemeParts },
                "randomize"
            ),
            button(
                ".bg-black.white.bn.pa2",
                {
                    onclick: $inputTrigger(downloadTrigger),
                },
                "download (ACT)"
            )
        )
    )
).mount(document.getElementById("app")!);
