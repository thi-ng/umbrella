import { clamp01, mix } from "@thi.ng/math";
import type { SDFn } from "./api.js";

export const abs =
    (sdf: SDFn): SDFn =>
    (p) =>
        Math.abs(sdf(p));

export const flip =
    (sdf: SDFn): SDFn =>
    (p) =>
        -sdf(p);

export const round =
    (sdf: SDFn, r: number): SDFn =>
    (p) =>
        sdf(p) - r;

export const union =
    (children: SDFn[]): SDFn =>
    (p) =>
        children.reduce((acc, f) => Math.min(acc, f(p)), Infinity);

export const intersection =
    (children: SDFn[]): SDFn =>
    (p) =>
        children.reduce((acc, f) => Math.max(acc, f(p)), -Infinity);

export const difference =
    (a: SDFn, ...children: SDFn[]): SDFn =>
    (p) =>
        children.reduce((acc, f) => Math.max(acc, -f(p)), a(p));

export const smoothUnion =
    (k: number, a: SDFn, ...children: SDFn[]): SDFn =>
    (p) =>
        children.reduce((acc, f) => {
            const d = f(p);
            const h = clamp01(0.5 + (0.5 * (d - acc)) / k);
            return mix(d, acc, h) - k * h * (1 - h);
        }, a(p));

export const smoothIntersection =
    (k: number, a: SDFn, ...children: SDFn[]): SDFn =>
    (p) =>
        children.reduce((acc, f) => {
            const d = f(p);
            const h = clamp01(0.5 - (0.5 * (d - acc)) / k);
            return mix(d, acc, h) + k * h * (1 - h);
        }, a(p));

export const smoothDifference =
    (k: number, a: SDFn, ...children: SDFn[]): SDFn =>
    (p) =>
        children.reduce((acc, f) => {
            const d = f(p);
            const h = clamp01(0.5 - (0.5 * (acc + d)) / k);
            return mix(acc, -d, h) + k * h * (1 - h);
        }, a(p));
