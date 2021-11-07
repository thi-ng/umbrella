import type { IGrid1D, IGrid2D, IGrid3D, IGrid4D } from "../grid.js";
import { mixin } from "../mixin.js";
import type { NumericArray } from "../typedarray.js";

/**
 * Default implementation for {@link IGrid1D} methods.
 */
export const IGrid1DMixin = mixin(<IGrid1D<any, any>>{
    order() {
        return [0];
    },

    includes(x: number) {
        return x >= 0 && x < this.size[0];
    },

    indexAt(x: number) {
        return this.includes(x) ? this.indexAtUnsafe(x) : -1;
    },

    indexAtUnsafe(x: number) {
        return this.offset + (x | 0) * this.stride[0];
    },

    getAt(x: number) {
        return this.includes(x) ? this.data[this.indexAtUnsafe(x)] : 0;
    },

    getAtUnsafe(x: number) {
        return this.data[this.indexAtUnsafe(x)];
    },

    setAt(x: number, val: any) {
        return this.includes(x)
            ? ((this.data[this.indexAtUnsafe(x)] = val), true)
            : false;
    },

    setAtUnsafe(x: number, val: any) {
        this.data[this.indexAtUnsafe(x)] = val;
        return true;
    },
});

/**
 * Default implementation for {@link IGrid2D} methods.
 */
export const IGrid2DMixin = mixin(<IGrid2D<any, any>>{
    order() {
        return Math.abs(this.stride[1]) > Math.abs(this.stride[0])
            ? [1, 0]
            : [0, 1];
    },

    includes(x: number, y: number) {
        const size = this.size;
        return x >= 0 && x < size[0] && y >= 0 && y < size[1];
    },

    indexAt(x: number, y: number) {
        return this.includes(x, y) ? this.indexAtUnsafe(x, y) : -1;
    },

    indexAtUnsafe(x: number, y: number) {
        return (
            this.offset + (x | 0) * this.stride[0] + (y | 0) * this.stride[1]
        );
    },

    getAt(x: number, y: number) {
        return this.includes(x, y) ? this.data[this.indexAtUnsafe(x, y)] : 0;
    },

    getAtUnsafe(x: number, y: number) {
        return this.data[this.indexAtUnsafe(x, y)];
    },

    setAt(x: number, y: number, val: any) {
        return this.includes(x, y)
            ? ((this.data[this.indexAtUnsafe(x, y)] = val), true)
            : false;
    },

    setAtUnsafe(x: number, y: number, val: any) {
        this.data[this.indexAtUnsafe(x, y)] = val;
        return true;
    },
});

/**
 * Default implementation for {@link IGrid3D} methods.
 */
export const IGrid3DMixin = mixin(<IGrid3D<any, any>>{
    order() {
        return strideOrder(this.stride);
    },

    includes(x: number, y: number, z: number) {
        const size = this.size;
        return (
            x >= 0 &&
            x < size[0] &&
            y >= 0 &&
            y < size[1] &&
            z >= 0 &&
            z < size[2]
        );
    },

    indexAt(x: number, y: number, z: number) {
        return this.includes(x, y, z) ? this.indexAtUnsafe(x, y, z) : -1;
    },

    indexAtUnsafe(x: number, y: number, z: number) {
        const stride = this.stride;
        return (
            this.offset +
            (x | 0) * stride[0] +
            (y | 0) * stride[1] +
            (z | 0) * stride[2]
        );
    },

    getAt(x: number, y: number, z: number) {
        return this.includes(x, y, z)
            ? this.data[this.indexAtUnsafe(x, y, z)]
            : 0;
    },

    getAtUnsafe(x: number, y: number, z: number) {
        return this.data[this.indexAtUnsafe(x, y, z)];
    },

    setAt(x: number, y: number, z: number, val: any) {
        return this.includes(x, y, z)
            ? ((this.data[this.indexAtUnsafe(x, y, z)] = val), true)
            : false;
    },

    setAtUnsafe(x: number, y: number, z: number, val: any) {
        this.data[this.indexAtUnsafe(x, y, z)] = val;
        return true;
    },
});

/**
 * Default implementation for {@link IGrid4D} methods.
 */
export const IGrid4DMixin = mixin(<IGrid4D<any, any>>{
    order() {
        return strideOrder(this.stride);
    },

    includes(x: number, y: number, z: number, w: number) {
        const size = this.size;
        return (
            x >= 0 &&
            x < size[0] &&
            y >= 0 &&
            y < size[1] &&
            z >= 0 &&
            z < size[2] &&
            w >= 0 &&
            w < size[3]
        );
    },

    indexAt(x: number, y: number, z: number, w: number) {
        return this.includes(x, y, z, w) ? this.indexAtUnsafe(x, y, z, w) : -1;
    },

    indexAtUnsafe(x: number, y: number, z: number, w: number) {
        const stride = this.stride;
        return (
            this.offset +
            (x | 0) * stride[0] +
            (y | 0) * stride[1] +
            (z | 0) * stride[2] +
            (w | 0) * stride[3]
        );
    },

    getAt(x: number, y: number, z: number, w: number) {
        return this.includes(x, y, z, w)
            ? this.data[this.indexAtUnsafe(x, y, z, w)]
            : 0;
    },

    getAtUnsafe(x: number, y: number, z: number, w: number) {
        return this.data[this.indexAtUnsafe(x, y, z, w)];
    },

    setAt(x: number, y: number, z: number, w: number, val: any) {
        return this.includes(x, y, z, w)
            ? ((this.data[this.indexAtUnsafe(x, y, z, w)] = val), true)
            : false;
    },

    setAtUnsafe(x: number, y: number, z: number, w: number, val: any) {
        this.data[this.indexAtUnsafe(x, y, z, w)] = val;
        return true;
    },
});

const strideOrder = (strides: NumericArray) =>
    [...strides]
        .map((x, i) => [x, i])
        .sort((a, b) => Math.abs(b[0]) - Math.abs(a[0]))
        .map((x) => x[1]);
