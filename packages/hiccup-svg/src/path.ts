import { PathSegment } from "./api";
import { points } from "./format";

export const path = (segments: PathSegment[], attr?) =>
    [
        "path",
        {
            ...attr,
            d: segments.map((seg) => seg[0] + points(seg[1], ",")).join(""),
        }
    ];
