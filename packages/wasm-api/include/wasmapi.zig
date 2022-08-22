//! JavaScript externals for https://thi.ng/wasm-api

const std = @import("std");
const root = @import("root");

/// Initialize the allocator to be exposed to the WASM host env
/// (via `_wasm_allocate()` and `_wasm_free()`).
/// If the user defines a public `WASM_ALLOCATOR` in their root file
/// then this allocator will be used, otherwise the implementation
/// falls back to using GPA.
/// Note: The type for this var is purposefully chosen as an optional,
/// effectively disabling allocations from the WASM host side if
/// `WASM_ALLOCATOR` is set to null.
pub const allocator: ?std.mem.Allocator = alloc: {
    if (@hasDecl(root, "WASM_ALLOCATOR")) {
        break :alloc root.WASM_ALLOCATOR;
    } else {
        var gpa = std.heap.GeneralPurposeAllocator(.{}){};
        break :alloc gpa.allocator();
    }
};

/// Attempts to allocate memory using configured `allocator` and if
/// successful returns address of new chunk or zero if failed
/// Note: For SIMD compatibility all allocations are aligned to 16 bytes
pub export fn _wasm_allocate(numBytes: usize) usize {
    if (allocator) |alloc| {
        var mem = alloc.alignedAlloc(u8, 16, numBytes) catch return 0;
        return @ptrToInt(mem.ptr);
    }
    return 0;
}

/// Frees chunk of heap memory (previously allocated using `_wasm_allocate()`)
/// starting at given address and of given byte length.
/// Note: This is a no-op if the allocator is explicitly disabled (see `setAllocator()`),
pub export fn _wasm_free(addr: usize, numBytes: usize) void {
    if (allocator) |alloc| {
        var mem = [2]usize{ addr, numBytes };
        printFmt("{d}", .{@ptrCast(*[]u8, &mem).*});
        alloc.free(@ptrCast(*[]u8, &mem).*);
    }
}

/// Prints number using configured JS logger
pub extern "wasmapi" fn printI8(x: i8) void;
/// Prints number using configured JS logger
pub extern "wasmapi" fn printU8(x: u8) void;
/// Prints hex number using configured JS logger
pub extern "wasmapi" fn printU8Hex(x: u8) void;

/// Prints number using configured JS logger
pub extern "wasmapi" fn printI16(x: i16) void;
/// Prints number using configured JS logger
pub extern "wasmapi" fn printU16(x: u16) void;
/// Prints hex number using configured JS logger
pub extern "wasmapi" fn printU16Hex(x: u16) void;

/// Prints number using configured JS logger
pub extern "wasmapi" fn printI32(x: i32) void;
/// Prints number using configured JS logger
pub extern "wasmapi" fn printU32(x: u32) void;
/// Prints hex number using configured JS logger
pub extern "wasmapi" fn printU32Hex(x: u32) void;

/// Prints decomposed i64 number using configured JS logger
pub extern "wasmapi" fn _printI64(hi: i32, lo: i32) void;
/// Convenience wrapper for _printI64(), accepting an i64
pub fn printI64(x: i64) void {
    _printI64(@truncate(i32, x >> 32), @truncate(i32, x));
}

/// Prints decomposed u64 number using configured JS logger
pub extern "wasmapi" fn _printU64(hi: u32, lo: u32) void;
/// Convenience wrapper for _printU64(), accepting an u64
pub fn printU64(x: u64) void {
    _printU64(@truncate(u32, x >> 32), @truncate(u32, x));
}

/// Prints decomposed u64 hex number using configured JS logger
pub extern "wasmapi" fn _printU64Hex(hi: u32, lo: u32) void;
/// Convenience wrapper for _printU64Hex(), accepting an u64
pub fn printU64Hex(x: u64) void {
    _printU64Hex(@truncate(u32, x >> 32), @truncate(u32, x));
}

/// Prints number using configured JS logger
pub extern "wasmapi" fn printF32(x: f32) void;
/// Prints number using configured JS logger
pub extern "wasmapi" fn printF64(x: f64) void;

/// Prints pointer as hex number using configured JS logger
pub fn printPtr(ptr: *const anyopaque) void {
    printU32Hex(@ptrToInt(ptr));
}

/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printI8Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printU8Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printI16Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printU16Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printI32Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printU32Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printI64Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printU64Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printF32Array(addr: usize, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printF64Array(addr: usize, len: usize) void;

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
pub extern "wasmapi" fn _printStr0(addr: usize) void;
/// Prints a string of given length using configured JS logger
pub extern "wasmapi" fn _printStr(addr: usize, len: usize) void;
/// Convenience wrapper for _printStr, accepting a slice as arg
pub fn printStr(msg: []const u8) void {
    _printStr(@ptrToInt(msg.ptr), msg.len);
}

/// Calls std.fmt.allocPrint to format given string, then calls `printStr()`
/// to output it via JS, then frees string's memory again
/// (Only available if the allocator used by `_wasm_allocate()` hasn't been disabled.)
pub fn printFmt(comptime fmt: []const u8, args: anytype) void {
    if (allocator) |alloc| {
        const res = std.fmt.allocPrint(alloc, fmt, args) catch return;
        defer alloc.free(res);
        printStr(res);
    }
}

/// Triggers the JS/browser debugger
pub extern "wasmapi" fn debug() void;
