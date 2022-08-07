//! JavaScript externals for https://thi.ng/wasm-api

/// Prints number using configured JS logger
pub extern "core" fn printI8(x: i8) void;
/// Prints number using configured JS logger
pub extern "core" fn printU8(x: u8) void;
/// Prints hex number using configured JS logger
pub extern "core" fn printU8Hex(x: u8) void;

/// Prints number using configured JS logger
pub extern "core" fn printI16(x: i16) void;
/// Prints number using configured JS logger
pub extern "core" fn printU16(x: u16) void;
/// Prints hex number using configured JS logger
pub extern "core" fn printU16Hex(x: u16) void;

/// Prints number using configured JS logger
pub extern "core" fn printI32(x: i32) void;
/// Prints number using configured JS logger
pub extern "core" fn printU32(x: u32) void;
/// Prints hex number using configured JS logger
pub extern "core" fn printU32Hex(x: u32) void;

/// Prints decomposed i64 number using configured JS logger
pub extern "core" fn _printI64(hi: i32, lo: i32) void;
/// Convenience wrapper for _printI64(), accepting an i64
pub fn printI64(x: i64) void {
    _printI64(@truncate(i32, x >> 32), @truncate(i32, x));
}

/// Prints decomposed u64 number using configured JS logger
pub extern "core" fn _printU64(hi: u32, lo: u32) void;
/// Convenience wrapper for _printU64(), accepting an u64
pub fn printU64(x: u64) void {
    _printU64(@truncate(u32, x >> 32), @truncate(u32, x));
}

/// Prints decomposed u64 hex number using configured JS logger
pub extern "core" fn _printU64Hex(hi: u32, lo: u32) void;
/// Convenience wrapper for _printU64Hex(), accepting an u64
pub fn printU64Hex(x: u64) void {
    _printU64Hex(@truncate(u32, x >> 32), @truncate(u32, x));
}

/// Prints number using configured JS logger
pub extern "core" fn printF32(x: f32) void;
/// Prints number using configured JS logger
pub extern "core" fn printF64(x: f64) void;

/// Prints pointer as hex number using configured JS logger
pub fn printPtr(ptr: *const anyopaque) void {
    printU32Hex(@ptrToInt(ptr));
}

/// Prints number array using configured JS logger
pub extern "core" fn _printI8Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printU8Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printI16Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printU16Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printI32Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printU32Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printI64Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printU64Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printF32Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "core" fn _printF64Array(addr: usize, len: usize) void;

/// Prints number array using configured JS logger
pub fn printI8Array(buf: []const i8) void {
    _printI8Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printU8Array(buf: []const u8) void {
    _printU8Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printI16Array(buf: []const i16) void {
    _printI16Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printU16Array(buf: []const u16) void {
    _printU16Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printI32Array(buf: []const i32) void {
    _printI32Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printU32Array(buf: []const u32) void {
    _printU32Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printI64Array(buf: []const i64) void {
    _printI64Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printU64Array(buf: []const u64) void {
    _printU64Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printF32Array(buf: []const f32) void {
    _printF32Array(@ptrToInt(buf.ptr), buf.len);
}
/// Prints number array using configured JS logger
pub fn printF64Array(buf: []const f64) void {
    _printF64Array(@ptrToInt(buf.ptr), buf.len);
}

/// Prints a zero-terminated string using configured JS logger
pub extern "core" fn _printStr0(addr: usize) void;
/// Prints a string of given length using configured JS logger
pub extern "core" fn _printStr(addr: usize, len: usize) void;
/// Convenience wrapper for _printStr, accepting a slice as arg
pub fn printStr(msg: []const u8) void {
    _printStr(@ptrToInt(msg.ptr), msg.len);
}
