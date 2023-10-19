export var buf: [10]u8 = undefined;

/// Encodes 64bit uint `src` and writes result bytes into `dest` (must
/// have at least 10 bytes capacity)
pub fn leb128EncodeU(src: u64, dest: []u8) u8 {
    if (src < 0x80) {
        dest[0] = @intCast(src & 0x7f);
        return 1;
    }
    var n: u8 = 0;
    var x: u64 = src;
    while (true) {
        var byte: u8 = @intCast(x & 0x7f);
        x = x >> 7;
        if (x != 0) {
            byte |= 0x80;
        }
        dest[n] = byte;
        n += 1;
        if (x == 0) break;
    }
    return n;
}

/// Decodes LEB128 bytes in `src` as u64 and writes number of bytes
/// consumed into `num`.
pub fn leb128DecodeU(src: []u8, num: *u8) u64 {
    var res: u64 = 0;
    var shift: u6 = 0;
    var n: u8 = 0;
    while (n < 10) {
        var byte = src[n];
        res |= @as(u64, @intCast(byte & 0x7f)) << shift;
        shift += 7;
        n += 1;
        if (byte < 0x80) {
            break;
        }
    }
    num.* = n;
    return res;
}

/// Like `leb128EncodeU` but for signed integers
pub fn leb128EncodeI(src: i64, dest: []u8) u8 {
    const neg: bool = src < 0;
    if (src >= -64 and src < 64) {
        dest[0] = @as(u8, @intCast(src & 0x3f)) |
            @as(u8, @intCast(@intFromBool(neg))) << 6;
        return 1;
    }
    var n: u8 = 0;
    var x: i64 = src;
    var more: bool = true;
    while (more) {
        var byte: u8 = @intCast(x & 0x7f);
        var sign: bool = (byte & 0x40) > 0;
        x >>= 7;
        if ((x == 0 and !sign) or (x == -1 and sign)) {
            more = false;
        } else {
            byte |= 0x80;
        }
        dest[n] = byte;
        n += 1;
    }
    return n;
}

/// Like `leb128DecodeU` but for signed integers
pub fn leb128DecodeI(src: []u8, num: *u8) i64 {
    var res: i64 = 0;
    var shift: u6 = 0;
    var n: u8 = 0;
    var byte: u8 = 0;
    while (true) {
        byte = src[n];
        res |= @as(i64, @intCast(byte & 0x7f)) << shift;
        shift += 7;
        n += 1;
        if ((byte & 0x80) == 0 or n > 9) {
            break;
        }
    }
    if (n < 10 and (byte & 0x40) > 0) {
        res |= @as(i64, @intCast(-1)) << shift;
    }
    num.* = n;
    return res;
}

/// WASM only. JS interop to exchange data via f64 (for lack of i64/u64
/// on JS side). Writes results to exported `buf` array and returns
/// number of bytes used.
pub export fn leb128EncodeU64(x: u64) u8 {
    return leb128EncodeU(x, buf[0..]);
}

/// WASM only. JS interop to exchange data via f64 (for lack of i64/u64
/// on JS side). Consumes bytes from the exported `buf` array and returns
/// decoded value. Writes number of bytes consumed into `buf[0]`
pub export fn leb128DecodeU64() u64 {
    return leb128DecodeU(buf[0..], &buf[0]);
}

/// See `leb128_encode_u_js`
pub export fn leb128EncodeI64(x: i64) u8 {
    return leb128EncodeI(x, buf[0..]);
}

/// See `leb128_decode_u_js`
pub export fn leb128DecodeI64() i64 {
    return leb128DecodeI(buf[0..], &buf[0]);
}

const std = @import("std");
const warn = std.debug.warn;
const assert = std.debug.assert;
const mem = std.mem;

test "min safe integer" {
    assert(leb128EncodeI(-9007199254740991, buf[0..]) == 8);
    assert(mem.eql(u8, buf[0..8], &[_]u8{ 129, 128, 128, 128, 128, 128, 128, 112 }));
}

test "max safe integer" {
    assert(leb128EncodeI(9007199254740991, buf[0..]) == 8);
    assert(mem.eql(u8, buf[0..8], &[_]u8{ 255, 255, 255, 255, 255, 255, 255, 15 }));

    assert(leb128EncodeU(9007199254740991, buf[0..]) == 8);
    assert(mem.eql(u8, buf[0..8], &[_]u8{ 255, 255, 255, 255, 255, 255, 255, 15 }));
}
