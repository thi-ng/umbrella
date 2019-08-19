import { IObjectOf } from "@thi.ng/api";

export const endShape = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>
) => {
    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        ctx.fill();
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.stroke();
    }
};
