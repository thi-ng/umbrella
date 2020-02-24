import { Type } from "@thi.ng/api";
import type { SOAAttribSpec } from "./api";

export const prepareSpec = (spec: Partial<SOAAttribSpec>) => {
    spec = { type: Type.F32, size: 1, ...spec };
    !spec.stride && (spec.stride = spec.size);
    return spec;
};
