// SPDX-License-Identifier: Apache-2.0
// @ts-ignore: decorator
@inline
export function align(x: usize, base: usize): usize {
    base--;
    return (x + base) & ~base;
}

// @ts-ignore: decorator
@inline
export function isAligned(x: usize, base: usize): boolean {
    return (x & (base - 1)) === 0;
}
