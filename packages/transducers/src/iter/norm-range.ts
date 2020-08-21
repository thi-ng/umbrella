/**
 * Yields sequence of `n+1` monotonically increasing numbers in the
 * closed interval (0.0 .. 1.0). If `n <= 0`, yields nothing.
 *
 * @example
 * ```ts
 * [...normRange(4)]
 * // [0, 0.25, 0.5, 0.75, 1.0]
 * ```
 *
 * @param n - number of steps
 * @param inclLast - include last value (i.e. `1.0`)
 */
export function* normRange(
    n: number,
    inclLast = true
): IterableIterator<number> {
    if (n > 0) {
        for (let i = 0, m = inclLast ? n + 1 : n; i < m; i++) {
            yield i / n;
        }
    }
}

export function* normRange2(
  nx: number,
  ny: number,
  includeLastX: boolean = true,
  includeLastY: boolean = true,
) {
  for (let y of normRange(ny, includeLastY)) {
    const rx = normRange(nx, includeLastX)
    for (let x of rx) {
      yield [x, y] as [number, number]
    }
  }
}

