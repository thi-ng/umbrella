import { GL2TYPE, GLType, Type, TYPE2GL } from "@thi.ng/api";

/**
 * Returns canonical {@link @thi.ng/api#Type} value of `type` by first
 * attempting to resolve it as {@link @thi.ng/api#GLType} enum.
 *
 * @example
 * ```ts
 * nativeType(GLType.F32) => Type.F32
 * nativeType(Type.F32) => Type.F32
 * ```
 *
 * @param type -
 */
export const asNativeType = (type: GLType | Type): Type => {
    const t = (<any>GL2TYPE)[type];
    return t !== undefined ? t : <Type>type;
};

export const asGLType = (type: GLType | Type): GLType => {
    const t = (<any>TYPE2GL)[type];
    return t !== undefined ? t : <GLType>type;
};
