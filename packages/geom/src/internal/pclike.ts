import { PCLikeConstructor } from "@thi.ng/geom-api";
import { argAttribs } from "./args";

export const pclike = (ctor: PCLikeConstructor, args: any[]) => {
    const attr = argAttribs(args);
    return new ctor(args.length === 1 ? args[0] : args, attr);
};
