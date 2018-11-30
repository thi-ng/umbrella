import { Type } from "@thi.ng/malloc/api";
import { GL2TYPE, GLType, TYPE2GL } from "./api";

/**
 * Returns canonical `Type` value of `type` by first attempting to
 * resolve it as `GLType` enum.
 *
 * ```
 * nativeType(GLType.F32) => Type.F32
 * nativeType(Type.F32) => Type.F32
 * ```
 *
 * @param type
 */
export const asNativeType = (type: GLType | Type): Type => {
    const t = GL2TYPE[type];
    return t !== undefined ? t : type;
};

export const asGLType = (type: GLType | Type): GLType => {
    const t = TYPE2GL[type];
    return t !== undefined ? t : type;
};
