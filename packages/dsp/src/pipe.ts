import type { IGen, IProc } from "./api.js";
import { MapG1 } from "./mapg.js";
import { serial } from "./serial.js";

/**
 * Higher order generator. Composes a new {@link IGen} from given source gen and
 * a number of {@link IProc}s (processed in series, using {@link serial}).
 *
 * @param src -
 * @param proc -
 */
export function pipe<A, B>(src: IGen<A>, proc: IProc<A, B>): IGen<B>;
export function pipe<A, B, C>(
	src: IGen<A>,
	a: IProc<A, B>,
	b: IProc<B, C>
): IGen<C>;
export function pipe<A, B, C, D>(
	src: IGen<A>,
	a: IProc<A, B>,
	b: IProc<B, C>,
	c: IProc<C, D>
): IGen<D>;
export function pipe<A, B, C, D, E>(
	src: IGen<A>,
	a: IProc<A, B>,
	b: IProc<B, C>,
	c: IProc<C, D>,
	d: IProc<D, E>
): IGen<E>;
export function pipe<A, B, C, D, E>(
	src: IGen<A>,
	a: IProc<A, B>,
	b: IProc<B, C>,
	c: IProc<C, D>,
	d: IProc<D, E>,
	...xs: IProc<any, any>[]
): IGen<any>;
export function pipe(src: IGen<any>, ...procs: IProc<any, any>[]): IGen<any> {
	// @ts-ignore
	const proc = serial<any, any, any>(...procs);
	return new MapG1(proc.next.bind(proc), src, <any>null);
}
