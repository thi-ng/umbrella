import type { TypedArray, UIntArray } from "./typedarray.js";

export interface IGrid2D<T extends any[] | TypedArray = UIntArray, P = number> {
    readonly width: number;
    readonly height: number;

    readonly stride: number;
    readonly rowStride: number;

    readonly data: T;

    /**
     * Returns value at given position. If pos is outside the defined region,
     * returns a suitable zero value.
     *
     * @param x -
     * @param y -
     */
    getAt(x: number, y: number): P;

    /**
     * Non-boundschecked version of {@link IGrid2D.getAt}. Assumes given
     * position is valid.
     *
     * @param x -
     * @param y -
     */
    getAtUnsafe(x: number, y: number): P;

    /**
     * Writes value at given position. Has no effect if outside of the defined
     * region.
     *
     * @param x -
     * @param y -
     * @param col -
     */
    setAt(x: number, y: number, col: P): this;

    /**
     * Non-boundschecked version of {@link IGrid2D.setAt}. Assumes given
     * position is valid.
     *
     * @param x -
     * @param y -
     */
    setAtUnsafe(x: number, y: number, col: P): this;
}

export interface IGrid3D<T extends any[] | TypedArray = UIntArray, P = number> {
    readonly width: number;
    readonly height: number;
    readonly depth: number;

    readonly stride: number;
    readonly rowStride: number;
    readonly sliceStride: number;

    readonly data: T;

    /**
     * Returns value at given position. If pos is outside the defined region,
     * returns a suitable zero value.
     *
     * @param x -
     * @param y -
     * @param z -
     */
    getAt(x: number, y: number, z: number): P;

    /**
     * Non-boundschecked version of {@link IGrid3D.getAt}. Assumes given
     * position is valid.
     *
     * @param x -
     * @param y -
     * @param z -
     */
    getAtUnsafe(x: number, y: number, z: number): P;

    /**
     * Writes value at given position. Has no effect if outside of the defined
     * region.
     *
     * @param x -
     * @param y -
     * @param z -
     * @param col -
     */
    setAt(x: number, y: number, z: number, col: P): this;

    /**
     * Non-boundschecked version of {@link IGrid3D.setAt}. Assumes given
     * position is valid.
     *
     * @param x -
     * @param y -
     * @param z -
     * @param col -
     */
    setAtUnsafe(x: number, y: number, z: number, col: P): this;
}
