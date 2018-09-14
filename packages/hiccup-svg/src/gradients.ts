import { Vec2Like, GradientStop } from "./api";
import { ff } from "./format";

const gradient = (type: string, attribs: any, stops: GradientStop[]): any[] =>
    [
        type,
        attribs,
        ...stops.map(
            ([offset, col]) => ["stop", { offset, "stop-color": col }]
        )
    ];

export const linearGradient = (
    id: string,
    from: Vec2Like,
    to: Vec2Like,
    stops: GradientStop[],
    attribs?: any) =>

    gradient(
        "linearGradient",
        {
            id,
            x1: ff(from[0]),
            y1: ff(from[1]),
            x2: ff(to[0]),
            y2: ff(to[1]),
            ...attribs
        },
        stops
    );

export const radialGradient = (
    id: string,
    from: Vec2Like,
    to: Vec2Like,
    fr: number,
    r: number,
    stops: GradientStop[],
    attribs?: any) =>

    gradient(
        "radialGradient",
        {
            id,
            fx: ff(from[0]),
            fy: ff(from[1]),
            cx: ff(to[0]),
            cy: ff(to[1]),
            fr: ff(fr),
            r: ff(r),
            ...attribs
        },
        stops
    );
