import type { IObjectOf } from "@thi.ng/api";

/**
 * Higher order helper function for {@link rename} transducer. Takes an object
 * of key mappings and returns function applying these mapping/renames.
 *
 * @remarks
 * Keys in `kmap` are the new/renamed keys, their values the original names. For
 * keys which simply should be kept, but not renamed, set their value to `true`.
 *
 * @param kmap -
 */
export const renamer = (kmap: IObjectOf<PropertyKey | boolean>) => {
	const ks = Object.keys(kmap);
	const [a2, b2, c2] = ks;
	const [a1, b1, c1] = ks.map((k) =>
		kmap[k] === true ? k : <PropertyKey>kmap[k]
	);
	switch (ks.length) {
		case 3:
			return (x: any) => {
				const res: any = {};
				let v;
				(v = x[c1]) !== undefined && (res[c2] = v);
				(v = x[b1]) !== undefined && (res[b2] = v);
				(v = x[a1]) !== undefined && (res[a2] = v);
				return res;
			};
		case 2:
			return (x: any) => {
				const res: any = {};
				let v;
				(v = x[b1]) !== undefined && (res[b2] = v);
				(v = x[a1]) !== undefined && (res[a2] = v);
				return res;
			};
		case 1:
			return (x: any) => {
				const res: any = {};
				let v;
				(v = x[a1]) !== undefined && (res[a2] = v);
				return res;
			};
		default:
			return (x: any) => {
				let k, kk, v;
				const res: any = {};
				for (let i = ks.length - 1; i >= 0; i--) {
					k = ks[i];
					kk = kmap[k];
					(v = x[kk === true ? k : <PropertyKey>kk]) !== undefined &&
						(res[k] = v);
				}
				return res;
			};
	}
};
