import type { IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { __endShape } from "./internal/end-shape.js";

export const path = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    segments: any[]
) => {
    ctx.beginPath();
    let a: ReadonlyVec = [0, 0];
    for (let i = 0, n = segments.length; i < n; i++) {
        const s = segments[i];
        let b = s[1],
            c,
            d;
        switch (s[0]) {
            // move to
            case "m":
                b = [a[0] + b[0], a[1] + b[1]];
            case "M":
                ctx.moveTo(b[0], b[1]);
                a = b;
                break;
            // line to
            case "l":
                b = [a[0] + b[0], a[1] + b[1]];
            case "L":
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            // horizontal line rel
            case "h":
                b = [a[0] + b, a[1]];
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            // horizontal line abs
            case "H":
                b = [b, a[1]];
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            // vertical line rel
            case "v":
                b = [a[0], a[1] + b];
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            // vertical line abs
            case "V":
                b = [a[0], b];
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            // cubic curve rel
            case "c":
                c = s[2];
                d = s[3];
                d = [a[0] + d[0], a[1] + d[1]];
                ctx.bezierCurveTo(
                    a[0] + b[0],
                    a[1] + b[1],
                    a[0] + c[0],
                    a[1] + c[1],
                    d[0],
                    d[1]
                );
                a = d;
                break;
            // cubic curve abs
            case "C":
                c = s[2];
                d = s[3];
                ctx.bezierCurveTo(b[0], b[1], c[0], c[1], d[0], d[1]);
                a = d;
                break;
            // quadratic curve rel
            case "q":
                c = s[2];
                c = [a[0] + c[0], a[1] + c[1]];
                ctx.quadraticCurveTo(a[0] + b[0], a[1] + b[1], c[0], c[1]);
                a = c;
                break;
            // quadratic curve abs
            case "Q":
                c = s[2];
                ctx.quadraticCurveTo(b[0], b[1], c[0], c[1]);
                a = c;
                break;
            // circular arc rel
            // Note: NOT compatible w/ SVG arc segments
            case "a":
                c = s[2];
                c = [a[0] + c[0], a[1] + c[1]];
                ctx.arcTo(a[0] + b[0], a[1] + b[1], c[0], c[1], s[3]);
                a = c;
                break;
            // circular arc abs
            // Note: NOT compatible w/ SVG arc segments
            case "A":
                c = s[2];
                ctx.arcTo(b[0], b[1], c[0], c[1], s[3]);
                a = c;
                break;
            // close path
            case "z":
            case "Z":
                ctx.closePath();
        }
    }
    __endShape(ctx, attribs);
};
