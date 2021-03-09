import type { Fn } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { isString } from "@thi.ng/checks";
import { canvas2D } from "@thi.ng/hdom-components";
import { fitClamped } from "@thi.ng/math";
import type { ISubscription } from "@thi.ng/rstream";
import { GestureEvent, gestureStream } from "@thi.ng/rstream-gestures";
import { heading, sub2 } from "@thi.ng/vectors";

/**
 * Dial component options.
 */
export interface DialOpts {
    /**
     * Dial center X (normalized)
     * Default: 0.5
     */
    cx: number;
    /**
     * Dial center Y (normalized)
     * Default: 0.5
     */
    cy: number;
    /**
     * Inner radius (normalized)
     * Default: 0.5
     */
    r1: number;
    /**
     * Outer radius (normalized)
     * Default: 0.99
     */
    r2: number;
    /**
     * Dial min value
     * Default: 0
     */
    min: number;
    /**
     * Dial min value
     * Default: 1
     */
    max: number;
    /**
     * Orientation / start angle (in radians)
     * Default: PI/2
     */
    base: number;
    /**
     * Angular gap between min / max values
     * Default: PI/10
     */
    gap: number;
    /**
     * Fill color (or gradient) for value area
     * Default: black
     */
    color: string | GradientDef;
    /**
     * Fill color (or gradient) for background ring
     * Default: rgba(0,0,0,0.1)
     */
    bgColor: string | GradientDef;
    /**
     * Label formatter. No label will be displayed, if missing.
     */
    label: Fn<number, string>;
    /**
     * Label Y offset from `cy`
     * Default: 0
     */
    labelYOffset: number;
    /**
     * Default: black
     */
    labelColor: string;
    /**
     * Label font CSS string
     * Default (10px sans-serif)
     */
    font: string;
    /**
     * Event callback (receives new dial value)
     */
    onchange: Fn<number, void>;
}

/**
 * Multi-stop linear gradient definition.
 */
export interface GradientDef {
    /**
     * Start point (normalized)
     */
    from: number[];
    /**
     * End point (normalized)
     */
    to: number[];
    /**
     * Color stops (position normalized)
     */
    stops: [number, string][];
}

const PI = Math.PI;
const TAU = 2 * PI;

/**
 * HOF component. Returns pre-configured dial component.
 *
 * @param opts
 */
export const dial = (_opts: Partial<DialOpts>) => {
    const opts = <DialOpts>{
        cx: 0.5,
        cy: 0.5,
        r1: 0.5,
        r2: 0.99,
        min: 0,
        max: 1,
        base: PI * 0.5,
        gap: PI * 0.1,
        color: "black",
        bgColor: "rgba(0,0,0,0.1)",
        labelColor: "black",
        labelYOffset: 0,
        font: "10px sans-serif",
        ..._opts,
    };
    let events: ISubscription<any, GestureEvent>;
    let cx: number, cy: number;
    const startTheta = opts.base + opts.gap / 2;

    const drawRing = (
        ctx: CanvasRenderingContext2D,
        amount: number,
        col: any
    ) => {
        const endTheta = startTheta + (TAU - opts.gap) * amount;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(cx, cy, opts.r2, startTheta, endTheta, false);
        ctx.arc(cx, cy, opts.r1, endTheta, startTheta, true);
        ctx.fill();
    };

    const makeGradient = (
        el: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        def: GradientDef
    ) => {
        const g = ctx.createLinearGradient(
            def.from[0] * el.width,
            def.from[1] * el.height,
            def.to[0] * el.width,
            def.to[1] * el.height
        );
        def.stops.forEach(([pos, col]) => g.addColorStop(pos, col));
        return g;
    };

    return canvas2D({
        init: (el, ctx) => {
            cx = el.width * opts.cx;
            cy = el.height * opts.cy;
            ctx.strokeStyle = "none";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = opts.font;
            const scale = Math.min(cx, cy);
            opts.r1 *= scale;
            opts.r2 *= scale;
            if (!isString(opts.bgColor)) {
                opts.bgColor = <any>(
                    makeGradient(el, ctx, <GradientDef>opts.bgColor)
                );
            }
            if (!isString(opts.color)) {
                opts.color = <any>(
                    makeGradient(el, ctx, <GradientDef>opts.color)
                );
            }
            if (opts.onchange) {
                // add interaction event stream (mouse & touch)
                // configure stream to return scaled coords (devicePixelRatio)
                events = gestureStream(el, { scale: true }).subscribe({
                    next: (e) => {
                        if (e.type === "start" || e.type === "drag") {
                            let theta =
                                heading(sub2([], e.pos, [cx, cy])) - startTheta;
                            if (theta < 0) theta += TAU;
                            theta %= TAU;
                            opts.onchange.call(
                                null,
                                fitClamped(
                                    Math.min(theta / (TAU - opts.gap)),
                                    0,
                                    1,
                                    opts.min,
                                    opts.max
                                )
                            );
                        }
                    },
                });
            }
        },

        // clean up gesture event stream when component is released
        release: () => {
            events && events.unsubscribe();
        },

        // there're a few args we're not interested in here, so we use var args instead.
        // the dial value is the last arg
        update: (el, ctx, ...args: any[]) => {
            const val = peek(args);
            ctx.clearRect(0, 0, el.width, el.height);
            drawRing(ctx, 1, opts.bgColor);
            drawRing(
                ctx,
                fitClamped(val, opts.min, opts.max, 0.005, 1),
                opts.color
            );
            if (opts.label) {
                ctx.fillStyle = opts.labelColor;
                ctx.fillText(opts.label(val), cx, cy + opts.labelYOffset);
            }
        },
    });
};
