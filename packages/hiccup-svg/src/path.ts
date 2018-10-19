import { PathSegment } from "./api";
import { ff, fpoint, fpoints } from "./format";

export const path = (segments: PathSegment[], attribs?: any): any[] => {
    let res = [];
    for (let seg of segments) {
        res.push(seg[0]);
        switch (seg[0].toLowerCase()) {
            case "a":
                res.push([
                    ff(<number>seg[1]),
                    ff(<number>seg[2]),
                    ff(<number>seg[3]),
                    seg[4] ? 1 : 0,
                    seg[5] ? 1 : 0,
                    ff(<number>seg[6][0]),
                    ff(<number>seg[6][1]),
                ].join(","));
                break;
            case "h":
            case "v":
                res.push(ff(<number>seg[1]));
                break;
            case "m":
            case "l":
                res.push(fpoint(<any>seg[1]));
                break;
            case "z":
                break;
            default:
                res.push(fpoints((<any>seg).slice(1), ","));
        }
    }
    return ["path", { ...attribs, d: res.join("") }];
};
