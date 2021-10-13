import type { Color, HatchDir } from "./api.js";
import { defHatch } from "./hatch.js";

export const defHatchPen = (
    color: Color,
    dir: HatchDir = "d",
    thick = 8,
    space = 1,
    steps = 4
) =>
    defHatch({
        dir,
        space: thick * space,
        line: {
            attribs: {
                stroke: color,
                weight: thick,
            },
            jitter: thick * space * 0.25,
            resample: steps,
        },
    });
