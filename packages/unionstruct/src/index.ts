// SPDX-License-Identifier: Apache-2.0
export type FieldType =
	| "f64"
	| "f32"
	| "u32"
	| "u16"
	| "u8"
	| "i32"
	| "i16"
	| "i8"
	| "union"
	| "struct";

export interface Field extends Array<any> {
	[0]: string;
	[1]: FieldType;
	[2]?: any;
}

const TYPES: { [id: string]: [number, string, boolean] } = {
	f64: [64, "Float", false],
	f32: [32, "Float", false],
	u32: [32, "Uint", false],
	u16: [16, "Uint", false],
	u8: [8, "Uint", false],
	i32: [32, "Int", true],
	i16: [16, "Int", true],
	i8: [8, "Int", true],
};

const UNION = "union";
const STRUCT = "struct";

/** @internal */
const __isBitField = (f: Field) =>
	typeof f[2] === "number" && /^(u|i)\d+$/.test(f[1]);

/** @internal */
const __align = (
	bitOffset: number,
	type: keyof typeof TYPES | "union" | "struct",
	spec: any
): number => {
	if (type === UNION) {
		spec = spec.__spec || spec;
		let a = 0,
			f;
		for (let i = 0; i < spec.length; i++) {
			f = spec[i];
			a = Math.max(__align(bitOffset, f[1], f[2]), a);
		}
		return a;
	} else if (type === STRUCT) {
		spec = (spec.__spec || spec)[0];
		return __align(bitOffset, spec[1], spec[2]);
	}
	let block = TYPES[type][0];
	return block > 8 ? (bitOffset + block - 1) & -block : bitOffset;
};

/** @internal */
const __maybePad = (offset: number, spec: any[], i: number) => {
	let f = spec[i],
		width;
	if (i === spec.length - 1 || !__isBitField(spec[i + 1])) {
		width = TYPES[f[1]][0];
		offset += ((offset + width - 1) & ~(width - 1)) - offset;
	}
	return offset;
};

/** @internal */
const __sizeOf = (
	spec: Field[],
	union: boolean,
	doAlign: boolean,
	bitOffset: number,
	total: number
) => {
	for (let i = 0; i < spec.length; i++) {
		let f = spec[i],
			type = f[1],
			size = f[2],
			isBF = __isBitField(f);
		bitOffset =
			doAlign && !isBF ? __align(bitOffset, type, size) : bitOffset;
		if (type === UNION || type === STRUCT) {
			[total, bitOffset] = __sizeOf(
				size.__spec || size,
				type === UNION,
				doAlign,
				bitOffset,
				total
			);
		} else if (!union) {
			bitOffset += isBF ? size : TYPES[type][0];
			if (doAlign && isBF) {
				bitOffset = __maybePad(bitOffset, spec, i);
			}
			total = bitOffset;
		} else {
			total = Math.max(total, isBF ? size : TYPES[type][0]);
		}
	}
	return [total, bitOffset];
};

export const sizeOf = (spec: Field[], union = false, doAlign = true) =>
	__sizeOf(spec, union, doAlign, 0, 0)[0];

/** @internal */
const __bitReader = (
	dv: DataView,
	byteOffset: number,
	bit: number,
	size: number
) => {
	const b = bit - size;
	if (b >= 0) {
		return () =>
			(dv.getUint32(byteOffset, false) >>> b) & ((1 << size) - 1);
	}
	return () =>
		((dv.getUint32(byteOffset, false) & ((1 << bit) - 1)) << -b) |
		(dv.getUint32(byteOffset + 4, false) >>> (32 + b));
};

/** @internal */
const __bitWriter = (
	dv: DataView,
	byteOffset: number,
	bit: number,
	size: number
) => {
	const b = bit - size;
	let m = bit < 32 ? ~((1 << bit) - 1) : 0;
	if (b >= 0) {
		m |= (1 << b) - 1;
		return (x: number) => {
			dv.setUint32(
				byteOffset,
				(dv.getUint32(byteOffset, false) & m) | ((x << b) & ~m),
				false
			);
		};
	} else {
		let bb = 32 + b;
		return (x: number) => {
			dv.setUint32(
				byteOffset,
				(dv.getUint32(byteOffset, false) & m) | ((x >>> -b) & ~m),
				false
			);
			dv.setUint32(
				byteOffset + 4,
				(dv.getUint32(byteOffset + 4, false) & ((1 << bb) - 1)) |
					(x << bb),
				false
			);
		};
	}
};

/** @internal */
const __makeField = (
	field: Field,
	obj: any,
	dv: DataView,
	bitOffset: number,
	doAlign: boolean,
	le: boolean
) => {
	let [id, type, size] = <any>field;
	const isBF = __isBitField(field);
	bitOffset = doAlign && !isBF ? __align(bitOffset, type, size) : bitOffset;
	let byteOffset = bitOffset >>> 3;
	obj.__offsets[id] = bitOffset;
	if (type === UNION || type === STRUCT) {
		let f = typedef(
			size.__spec || size,
			type === STRUCT,
			dv.buffer,
			byteOffset,
			doAlign,
			le
		);
		Object.defineProperty(obj, id, {
			get: () => f,
			enumerable: true,
			configurable: false,
		});
		bitOffset += (f as any).__size;
	} else {
		let [dsize, typeid, signed] = TYPES[type];
		let shift = 32 - size;
		let get, set, read: any, write: any;
		if (isBF) {
			byteOffset &= -4;
			let bitPos = 32 - (bitOffset & 0x1f);
			read = __bitReader(dv, byteOffset, bitPos, size);
			get = signed ? () => (read() << shift) >> shift : read;
			set = __bitWriter(dv, byteOffset, bitPos, size);
			bitOffset += size;
		} else {
			read = (<any>dv)[`get${typeid}${dsize}`];
			write = (<any>dv)[`set${typeid}${dsize}`];
			get = signed
				? () => (read.call(dv, byteOffset, le) << shift) >> shift
				: () => read.call(dv, byteOffset, le);
			set = signed
				? (x: number) =>
						write.call(dv, byteOffset, (x << shift) >> shift, le)
				: (x: number) => write.call(dv, byteOffset, x, le);
			bitOffset += dsize;
		}
		Object.defineProperty(obj, id, {
			get,
			set,
			enumerable: true,
			configurable: false,
		});
	}
	return bitOffset;
};

export const typedef = (
	spec: Field[],
	struct: boolean,
	buf?: ArrayBuffer | null,
	offset = 0,
	doAlign = true,
	le = false
) => {
	let size = sizeOf(spec, !struct, doAlign);
	let dv = new DataView(buf || new ArrayBuffer(((size + 7) & -8) >>> 3));
	let off = offset << 3;
	let obj = {
		__buffer: dv.buffer,
		__spec: spec,
		__size: size,
		__offsets: <any>{},
	};
	for (let i = 0; i < spec.length; i++) {
		let f = spec[i];
		offset = __makeField(f, obj, dv, off, doAlign, le);
		if (doAlign && __isBitField(f)) {
			offset = __maybePad(offset, spec, i);
		}
		if (struct) {
			off = offset;
		}
	}
	return obj;
};

export const union = (
	spec: Field[],
	buf?: ArrayBuffer | null,
	offset?: number,
	doAlign?: boolean,
	le?: boolean
) => {
	return typedef(spec, false, buf, offset, doAlign, le);
};

export const struct = (
	spec: Field[],
	buf?: ArrayBuffer | null,
	offset?: number,
	doAlign?: boolean,
	le?: boolean
) => {
	return typedef(spec, true, buf, offset, doAlign, le);
};
