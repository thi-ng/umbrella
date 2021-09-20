import {
    Type,
    TypedArray,
    typedArray,
    TypedArrayTypeMap,
} from "@thi.ng/api/typedarray";
import type { IMemPoolArray } from "./api";

/**
 * Stub/polyfill implementation of {@link IMemPoolArray}, merely delegating to
 * JS typed array ctors with no further management of returned arrays.
 */
export class NativePool implements IMemPoolArray {
    mallocAs<T extends Type>(
        type: T,
        num: number
    ): TypedArrayTypeMap[T] | undefined {
        return typedArray(type, num);
    }

    callocAs<T extends Type>(
        type: T,
        num: number,
        fill = 0
    ): TypedArrayTypeMap[T] | undefined {
        return <any>typedArray(type, num).fill(fill);
    }

    reallocArray<T extends TypedArray>(src: T, num: number): T | undefined {
        if (num === src.length) return src;
        const dest = new (<any>src.constructor)(num);
        dest.set(src.subarray(0, Math.min(src.length, num)));
        return dest;
    }

    free(_: number | TypedArray) {
        return true;
    }

    freeAll() {}

    release() {
        return true;
    }
}
