import { Fn } from "@thi.ng/api/api";
import { isString } from "@thi.ng/checks/is-string";
import { canvas2D } from "@thi.ng/hdom-components/canvas";
import { GestureEvent, gestureStream } from "@thi.ng/rstream-gestures";
import { Subscription } from "@thi.ng/rstream/subscription";

export interface GradientDef {
    from: number[];
    to: number[];
    stops: [number, string][];
}

export interface DialOpts {
    cx: number;
    cy: number;
    r1: number;
    r2: number;
    base: number;
    spread: number;
    color: string | GradientDef;
    bgColor: string | GradientDef;
    label?: (x: number) => string;
    labelYOffset?: number;
    labelColor?: string;
    font: string;
    onchange: Fn<number, void>;
}

const PI = Math.PI;
const TAU = 2 * PI;

export const dial = (opts: Partial<DialOpts>) => {
    opts = {
        cx: 0.5,
        cy: 0.5,
        r1: 0.5,
        r2: 0.99,
        base: Math.PI * 0.5,
        spread: PI * 0.1,
        color: "black",
        bgColor: "rgba(0,0,0,0.1)",
        labelColor: "black",
        labelYOffset: 0,
        font: "10px sans-serif",
        ...opts
    };
    let events: Subscription<any, GestureEvent>;
    let cx, cy;
    const startTheta = opts.base + opts.spread / 2;

    const drawRing = (ctx: CanvasRenderingContext2D, amount: number, col: any) => {
        const endTheta = startTheta + (TAU - opts.spread) * amount;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(cx, cy, opts.r2, startTheta, endTheta, false);
        ctx.arc(cx, cy, opts.r1, endTheta, startTheta, true);
        ctx.fill();
    };

    const makeGradient = (el: HTMLCanvasElement, ctx: CanvasRenderingContext2D, def: GradientDef) => {
        const g = ctx.createLinearGradient(
            def.from[0] * el.width, def.from[1] * el.height,
            def.to[0] * el.width, def.to[1] * el.height
        );
        def.stops.forEach(([pos, col]) => g.addColorStop(pos, col));
        return g;
    };

    return canvas2D({

        init: (el, ctx) => {
            cx = el.width * opts.cx;
            cy = el.height * opts.cy;
            const scale = Math.min(cx, cy);
            opts.r1 *= scale;
            opts.r2 *= scale;
            if (!isString(opts.bgColor)) {
                opts.bgColor = <any>makeGradient(el, ctx, <GradientDef>opts.bgColor);
            }
            if (!isString(opts.color)) {
                opts.color = <any>makeGradient(el, ctx, <GradientDef>opts.color);
            }
            if (opts.onchange) {
                events = gestureStream(el).subscribe({
                    next: () => {
                        // TODO
                        // opts.onchange.call(null, x);
                    }
                });
            }
        },

        release: () => {
            events && events.unsubscribe();
        },

        update: (el, ctx, ...args: any[]) => {
            ctx.strokeStyle = "none";
            ctx.font = opts.font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const amount = args[4];
            ctx.clearRect(0, 0, el.width, el.height);
            drawRing(ctx, 1, opts.bgColor);
            drawRing(ctx, Math.max(amount, 0.005), opts.color);
            if (opts.label) {
                ctx.fillStyle = opts.labelColor;
                ctx.fillText(opts.label(amount), cx, cy + opts.labelYOffset);
            }
        }
    });
};
