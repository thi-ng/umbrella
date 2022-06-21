import { isFunction } from "@thi.ng/checks/is-function";
import { clamp01, mix } from "@thi.ng/math";
import type { FieldCoeff, SDFn } from "./api.js";

export const abs =
    (sdf: SDFn): SDFn =>
    (p, minD?: number) =>
        Math.abs(sdf(p, minD));

export const flip =
    (sdf: SDFn): SDFn =>
    (p, minD?: number) =>
        -sdf(p, minD);

export const round = (sdf: SDFn, r: number | FieldCoeff): SDFn =>
    isFunction(r)
        ? (p, minD?: number) => sdf(p, minD) - r(p)
        : (p, minD?: number) => sdf(p, minD) - r;

export const union =
    (children: SDFn[]): SDFn =>
    (p, minD = Infinity) => {
        let res = Infinity;
        for (let i = children.length; i-- > 0; ) {
            const d = children[i](p, minD);
            if (d < minD) minD = d;
            res = Math.min(res, d);
        }
        return res;
    };

export const intersection =
    (children: SDFn[]): SDFn =>
    (p, minD = Infinity) => {
        let res = -Infinity;
        for (let i = children.length; i-- > 0; ) {
            const d = children[i](p, minD);
            if (d < minD) minD = d;
            res = Math.max(res, d);
        }
        return res;
    };

export const difference =
    (children: SDFn[]): SDFn =>
    (p, minD = Infinity) => {
        let res = children[0](p, minD);
        if (res < minD) minD = res;
        for (let i = 1, n = children.length; i < n; i++) {
            const d = children[i](p, minD);
            if (d < minD) minD = d;
            res = Math.max(res, -d);
        }
        return res;
    };

export const smoothUnion = (k: number | FieldCoeff, children: SDFn[]): SDFn => {
    const kfield = __asField(k);
    return (p, minD = Infinity) => {
        const $k = kfield(p);
        let res = children[0](p, minD);
        if (res < minD) minD = res;
        for (let i = 1, n = children.length; i < n; i++) {
            const d = children[i](p, minD);
            if (d < minD) minD = d;
            const h = clamp01(0.5 + (0.5 * (d - res)) / $k);
            res = mix(d, res, h) - $k * h * (1 - h);
        }
        return res;
    };
};

export const smoothIntersection = (
    k: number | FieldCoeff,
    children: SDFn[]
): SDFn => {
    const kfield = __asField(k);
    return (p, minD = Infinity) => {
        const $k = kfield(p);
        let res = children[0](p, minD);
        if (res < minD) minD = res;
        for (let i = 1, n = children.length; i < n; i++) {
            const d = children[i](p, minD);
            if (d < minD) minD = d;
            const h = clamp01(0.5 - (0.5 * (d - res)) / $k);
            res = mix(d, res, h) + $k * h * (1 - h);
        }
        return res;
    };
};

export const smoothDifference = (
    k: number | FieldCoeff,
    children: SDFn[]
): SDFn => {
    const kfield = __asField(k);
    return (p, minD = Infinity) => {
        const $k = kfield(p);
        let res = children[0](p, minD);
        if (res < minD) minD = res;
        for (let i = 1, n = children.length; i < n; i++) {
            const d = children[i](p, minD);
            if (d < minD) minD = d;
            const h = clamp01(0.5 - (0.5 * (res + d)) / $k);
            res = mix(res, -d, h) + $k * h * (1 - h);
        }
        return res;
    };
};

const __asField = (k: number | FieldCoeff) => (isFunction(k) ? k : () => k);
