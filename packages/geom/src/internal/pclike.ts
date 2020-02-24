import { argAttribs } from "./args";
import type { PCLikeConstructor } from "@thi.ng/geom-api";

export const pclike = (ctor: PCLikeConstructor, args: any[]) => {
    const attr = argAttribs(args);
    return new ctor(args.length === 1 ? args[0] : args, attr);
};
