//! JavaScript externals for https://thi.ng/wasm-api

/// Prints number using configured JS logger
pub extern fn printI8(x: i8) void;
/// Prints number using configured JS logger
pub extern fn printU8(x: u8) void;
/// Prints hex number using configured JS logger
pub extern fn printU8Hex(x: u8) void;
/// Prints number using configured JS logger
pub extern fn printI16(x: i16) void;
/// Prints number using configured JS logger
pub extern fn printU16(x: u16) void;
/// Prints hex number using configured JS logger
pub extern fn printU16Hex(x: u16) void;
/// Prints number using configured JS logger
pub extern fn printI32(x: i32) void;
/// Prints number using configured JS logger
pub extern fn printU32(x: u32) void;
/// Prints hex number using configured JS logger
pub extern fn printU32Hex(x: u32) void;
/// Prints number using configured JS logger
pub extern fn printF32(x: f32) void;
/// Prints number using configured JS logger
pub extern fn printF64(x: f64) void;

/// Prints pointer as hex number using configured JS logger
pub fn printPtr(x: *const anyopaque) void {
    printU32Hex(@ptrToInt(x));
}

/// Prints number array using configured JS logger
pub extern fn _printI8Array(ptr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern fn _printU8Array(ptr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern fn _printI16Array(ptr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern fn _printU16Array(ptr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern fn _printI32Array(ptr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern fn _printU32Array(ptr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern fn _printF32Array(ptr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern fn _printF64Array(ptr: usize, len: usize) void;

/// Prints number array using configured JS logger
pub fn printI8Array(buf: []const i8) void {
    _printI8Array(@ptrToInt(&buf), buf.len);
}
/// Prints number array using configured JS logger
pub fn printU8Array(buf: []const u8) void {
    _printU8Array(@ptrToInt(&buf), buf.len);
}
/// Prints number array using configured JS logger
pub fn printI16Array(buf: []const i16) void {
    _printI16Array(@ptrToInt(&buf), buf.len);
}
/// Prints number array using configured JS logger
pub fn printU16Array(buf: []const u16) void {
    _printU16Array(@ptrToInt(&buf), buf.len);
}
/// Prints number array using configured JS logger
pub fn printI32Array(buf: []const i32) void {
    _printI32Array(@ptrToInt(&buf), buf.len);
}
/// Prints number array using configured JS logger
pub fn printU32Array(buf: []const u32) void {
    _printU32Array(@ptrToInt(&buf), buf.len);
}
/// Prints number array using configured JS logger
pub fn printF32Array(buf: []const f32) void {
    _printF32Array(@ptrToInt(&buf), buf.len);
}
/// Prints number array using configured JS logger
pub fn printF64Array(buf: []const f64) void {
    _printF64Array(@ptrToInt(&buf), buf.len);
}

/// Prints a zero-terminated string using configured JS logger
extern fn _printStr0(ptr: usize) void;
/// Prints a string of given length using configured JS logger
extern fn _printStr(ptr: usize, len: usize) void;

pub fn printStr(msg: []const u8) void {
    _printStr(@ptrToInt(&msg), msg.len);
}
