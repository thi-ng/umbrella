import { Vec2Like } from "./api";
import { ff } from "./format";

export const rect = (p: Vec2Like, width: number, height: number, attribs?: any) =>
    roundedRect(p, width, height, 0, 0, attribs);

export const roundedRect = (
    p: Vec2Like,
    width: number,
    height: number,
    rx: number,
    ry: number,
    attribs?: any): any[] => {

    attribs = {
        x: ff(p[0]),
        y: ff(p[1]),
        width: ff(width),
        height: ff(height),
        ...attribs
    };
    if (rx > 0 || ry > 0) {
        attribs.rx = ff(rx);
        attribs.ry = ff(ry);
    }
    return ["rect", attribs];
};