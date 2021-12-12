/**
 * Returns iterator of all prime numbers ≤ given `x` using Sieve of
 * Eratosthenes.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 *
 * @param x
 */
export function* primesUntil(x: number) {
    if (x < 1) return;
    yield 1;
    const sieve: boolean[] = [];
    const max = Math.sqrt(x) | 0;
    for (let i = 2; i <= x; i++) {
        if (!sieve[i]) {
            yield i;
            __updateSieve(sieve, i, x, max);
        }
    }
}

/**
 * Returns largest prime number ≤ given `x` using Sieve of Eratosthenes. Returns
 * -1 if x < 1.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 *
 * @param x
 */
export const nearestPrime = (x: number) => {
    if (x < 1) return -1;
    let prime = 1;
    const sieve: boolean[] = [];
    const max = Math.sqrt(x) | 0;
    for (let i = 2; i <= x; i++) {
        if (!sieve[i]) {
            prime = i;
            __updateSieve(sieve, i, x, max);
        }
    }
    return prime;
};

/**
 * @internal
 */
const __updateSieve = (sieve: boolean[], i: number, x: number, max: number) => {
    if (i <= max) {
        for (let j = i * i; j <= x; j += i) sieve[j] = true;
    }
};
