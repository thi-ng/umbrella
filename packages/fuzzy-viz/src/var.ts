import type { LVar } from "@thi.ng/fuzzy";
import { serialize } from "@thi.ng/hiccup";
import { convertTree, svg } from "@thi.ng/hiccup-svg";
import { fit } from "@thi.ng/math";

export interface VizualizeVarOpts {
    /**
     * Number of samples to evaluate for each fuzzy set.
     */
    samples: number;
    /**
     * Visualization width
     */
    width: number;
    /**
     * Visualization height
     */
    height: number;
    /**
     * If true, includes a legend of color coded labels of the fuzzy sets.
     */
    labels: boolean;
}

/**
 * Takes an {@link @thi.ng/fuzzy#LVar} and visualization options. Evaluates all
 * of the var's fuzzy sets in the var's value domain and visualizes them as
 * polygons. Returns a {@link @thi.ng/hiccup-canvas#} compatible shape component
 * tree.
 *
 * @param var
 * @param opts
 */
export const varToHiccup = (
    { domain: [min, max], terms }: LVar<any>,
    opts: Partial<VizualizeVarOpts> = {}
) => {
    const { samples, width, height, labels } = {
        samples: 200,
        width: 600,
        height: 100,
        labels: true,
        ...opts,
    };
    const keys = Object.keys(terms);
    const dt = (max - min) / samples;
    const ds = width / samples;
    const dh = 360 / keys.length;
    const curves: any[] = [];
    const legend: any[] = [];
    for (let i = 0; i < keys.length; i++) {
        const id = keys[i];
        const f = terms[id];
        const y = (i + 1) * 12;
        const stroke = `hsl(${(i * dh) | 0},100%,40%)`;
        const curr: number[][] = [];
        for (let i = 0; i <= samples; i++) {
            curr.push([i * ds, (1 - f(min + i * dt)) * height]);
        }
        curr.push([width, height], [0, height]);
        curves.push([
            "polygon",
            {
                stroke,
                fill: `hsla(${(i * dh) | 0},100%,50%,20%)`,
            },
            curr,
        ]);
        if (labels) {
            legend.push(
                ["line", { stroke }, [0, y], [20, y]],
                [
                    "text",
                    {
                        baseline: "middle",
                        fill: "black",
                    },
                    [30, y],
                    id,
                ]
            );
        }
    }
    const zero = fit(0, min, max, 0, width);
    return svg(
        {
            width,
            height: height + 12,
            fill: "none",
            "font-family": "sans-serif",
            "font-size": 10,
        },
        ...curves,
        ...legend,
        [
            "g",
            { fill: "black", translate: [0, height + 10] },
            [
                "line",
                {
                    stroke: "black",
                    dash: [2, 2],
                },
                [zero, 0],
                [zero, height],
            ],
            ["text", {}, [0, 0], min.toFixed(2)],
            ["text", { align: "center" }, [zero, 0], "0.00"],
            ["text", { align: "end" }, [width, 0], max.toFixed(2)],
        ]
    );
};

/**
 * Similar to {@link varToHiccup}, but then also serializes the result to an
 * actual SVG string.
 *
 * @param $var
 * @param opts
 */
export const varToSvg = ($var: LVar<any>, opts: Partial<VizualizeVarOpts>) =>
    serialize(convertTree(varToHiccup($var, opts)));
