import type { Fn, Fn2 } from "@thi.ng/api";

/**
 * Takes a function accepting a NodeJS-like callback w/ (error, result)
 * args and converts it into a Promise, e.g. for use in async contexts.
 *
 * @remarks
 * The constructed promise calls the given function with a custom
 * callback, which then either resolves or rejects the promise.
 *
 * @example
 * ```ts
 * (async () => {
 *    const body = await promisify(partial(fs.readFile, "foo.txt"));
 *    console.log(body.toString());
 * })();
 * ```
 *
 * @param fn - function accepting a callback
 */
export const promisify = <T>(fn: Fn<Fn2<any, T, void>, void>) =>
	new Promise<T>((resolve, reject) =>
		fn((err, result) => (err != null ? reject(err) : resolve(result)))
	);
