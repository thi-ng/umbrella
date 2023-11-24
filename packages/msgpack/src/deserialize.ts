import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { utf8Decode } from "@thi.ng/strings/utf8";

export const deserialize = (
	src: Uint8Array | ArrayBufferLike,
	start = 0,
	end = src.byteLength
) => {
	const buf =
		src instanceof Uint8Array
			? src.subarray(start, end)
			: new Uint8Array(src, start, end);
	const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	let pos = 0;

	const read = (): any => {
		const x = buf[pos++];
		if (x >= 0x00 && x <= 0x7f) return x; // positive fixint
		if (x >= 0xe0 && x <= 0xff) return x - 0x100; // negative fixint
		if (x >= 0x80 && x <= 0x8f) return $object(x - 0x80); // fixmap
		if (x >= 0x90 && x <= 0x9f) return $array(x - 0x90); // fixbuf
		if (x >= 0xa0 && x <= 0xbf) return $string(x - 0xa0); // fixstr
		switch (x) {
			case 0xc0:
				return null; // nil
			case 0xc2:
				return false; // false
			case 0xc3:
				return true; // true
			case 0xc4:
				return $bytes(-1, 1); // bytes 8
			case 0xc5:
				return $bytes(-1, 2); // bytes 16
			case 0xc6:
				return $bytes(-1, 4); // bytes 32
			case 0xc7:
				return $ext(-1, 1); // ext 8
			case 0xc8:
				return $ext(-1, 2); // ext 16
			case 0xc9:
				return $ext(-1, 4); // ext 32
			case 0xca:
				return $float(4); // f32
			case 0xcb:
				return $float(8); // f64
			case 0xcc:
				return $uint(1); // u8
			case 0xcd:
				return $uint(2); // u16
			case 0xce:
				return $uint(4); // u32
			case 0xcf:
				return $uint(8); // u64
			case 0xd0:
				return $int(1); // i8
			case 0xd1:
				return $int(2); // i16
			case 0xd2:
				return $int(4); // i32
			case 0xd3:
				return $int(8); // i64
			case 0xd4:
				return $ext(1); // fixext 1
			case 0xd5:
				return $ext(2); // fixext 2
			case 0xd6:
				return $ext(4); // fixext 4
			case 0xd7:
				return $ext(8); // fixext 8
			case 0xd8:
				return $ext(16); // fixext 16
			case 0xd9:
				return $string(-1, 1); // str 8
			case 0xda:
				return $string(-1, 2); // str 16
			case 0xdb:
				return $string(-1, 4); // str 32
			case 0xdc:
				return $array(-1, 2); // buf 16
			case 0xdd:
				return $array(-1, 4); // buf 32
			case 0xde:
				return $object(-1, 2); // object 16
			case 0xdf:
				return $object(-1, 4); // object 32
			default:
				illegalArgs(
					`invalid byte code: 0x${x.toString(16)} @ position ${pos}`
				);
		}
	};

	const $int = (size: 1 | 2 | 4 | 8) => {
		const $pos = pos;
		pos += size;
		switch (size) {
			case 1:
				return view.getInt8($pos);
			case 2:
				return view.getInt16($pos);
			case 4:
				return view.getInt32($pos);
			case 8:
				return view.getBigInt64($pos);
		}
	};

	const $uint = (size: 1 | 2 | 4 | 8) => {
		const $pos = pos;
		pos += size;
		switch (size) {
			case 1:
				return buf[$pos];
			case 2:
				return view.getUint16($pos);
			case 4:
				return view.getUint32($pos);
			case 8:
				return view.getBigUint64($pos);
		}
	};

	const $float = (size: 4 | 8) => {
		const $pos = pos;
		pos += size;
		return size === 8 ? view.getFloat64($pos) : view.getFloat32($pos);
	};

	const $bytes = (size: number, lengthSize: 1 | 2 | 4 = 1) => {
		if (size < 0) size = <number>$uint(lengthSize);
		const $pos = pos;
		pos += size;
		return buf.subarray($pos, pos);
	};

	const $object = (size: number, lengthSize: 1 | 2 | 4 = 1) => {
		if (size < 0) size = <number>$uint(lengthSize);
		const result: Record<any, any> = {};
		while (size-- > 0) {
			const key = read();
			result[key] = read();
		}
		return result;
	};

	const $array = (size: number, lengthSize: 1 | 2 | 4 = 1) => {
		if (size < 0) size = <number>$uint(lengthSize);
		const result: any[] = [];
		while (size-- > 0) result.push(read());
		return result;
	};

	const $string = (size: number, lengthSize: 1 | 2 | 4 = 1) => {
		if (size < 0) size = <number>$uint(lengthSize);
		const $pos = pos;
		pos += size;
		return utf8Decode(buf, $pos, size);
	};

	const $ext = (size: number, lengthSize: 1 | 2 | 4 = 1) => {
		if (size < 0) size = <number>$uint(lengthSize);
		const type = $uint(1);
		switch (type) {
			case 255:
				return readExtDate(size);
			default:
				return { type: type, data: $bytes(size) };
		}
	};

	const readExtDate = (size: number) => {
		let sec: number, ns: number;
		const $pos = pos;
		pos += size;
		switch (size) {
			case 4:
				return new Date(view.getUint32($pos) * 1000);
			case 8:
				ns =
					(buf[$pos + 0] << 22) |
					(buf[$pos + 1] << 14) |
					(buf[$pos + 2] << 6) |
					(buf[$pos + 3] >>> 2);
				sec =
					(buf[$pos + 3] & 0x3) * 0x1_0000_0000 +
					view.getUint32($pos + 4);
				return new Date(sec * 1e3 + ns * 1e-6);
			case 12:
				ns = view.getUint32($pos);
				sec = Number(view.getBigInt64($pos + 4));
				return new Date(sec * 1e3 + ns * 1e-6);
			default:
				illegalArgs(`invalid date size (${size})`);
		}
	};

	return read();
};
