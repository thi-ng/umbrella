import { __argAttribs } from "./args";
import type { PCLikeConstructor } from "@thi.ng/geom-api";

export const __pclike = (ctor: PCLikeConstructor, args: any[]) => {
    const attr = __argAttribs(args);
    return new ctor(args.length === 1 ? args[0] : args, attr);
};
