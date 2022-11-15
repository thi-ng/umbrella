//! Zig API for https://thi.ng/wasm-api

const std = @import("std");
const root = @import("root");

pub const ManagedIndex = @import("managed-index.zig").ManagedIndex;

/// Higher-order generic slice wrapper for `extern struct` use cases
/// S = slice type
/// P = pointer type
pub fn Slice(comptime S: type, comptime P: type) type {
    return extern struct {
        ptr: P = @as(S, &.{}).ptr,
        len: usize = 0,

        pub inline fn wrap(slice: S) @This() {
            return .{
                .ptr = @ptrCast(P, slice.ptr),
                .len = slice.len,
            };
        }

        pub inline fn toSlice(self: *@This()) S {
            return @ptrCast(*S, self).*;
        }
    };
}

pub const StringPtr = [*:0]const u8;
pub const MutStringPtr = [*:0]u8;

/// `[]const u8` slice wrapper for `extern struct` use cases
pub const String = Slice([]const u8, StringPtr);
/// `[]u8` slice wrapper for `extern struct` use cases
pub const MutString = Slice([]u8, MutStringPtr);

pub const OpaquePtr = *const anyopaque;
pub const MutOpaquePtr = *anyopaque;

pub const OpaqueSlice = Slice([]OpaquePtr, [*]OpaquePtr);

pub const MutOpaqueSlice = Slice([]MutOpaquePtr, [*]MutOpaquePtr);

/// Syntax sugar for `String.wrap()`
pub inline fn string(str: []const u8) String {
    return String.wrap(str);
}

/// Syntax sugar for `MutString.wrap()`
pub inline fn mutString(str: []u8) String {
    return MutString.wrap(str);
}

/// Similar to @ptrCast intrinsic. Helper function to cast & re-align an
/// optional `anyopaque` pointer to another given pointer type.
/// E.g. useful for retrieving user context data from an opaque extra arg
/// given to a event listner callback...
pub fn ptrCast(comptime T: type, ptr: ?*anyopaque) ?T {
    if (ptr == null) return null;
    const info = @typeInfo(T);
    if (info != .Pointer) @compileError("require pointer type");
    return @ptrCast(T, @alignCast(@alignOf(info.Pointer.child), ptr));
}

/// JS external part of the custom panic handler
/// Prints message using configured JS logger and then throws JS error
pub extern "wasmapi" fn _panic(addr: [*]const u8, len: usize) noreturn;

/// Custom panic handler which prints given message using configured JS logger
/// To use this handler, add the following line to your **root** source file:
///
/// ```
/// pub const panic = @import("wasmapi").panic;
/// ```
pub fn panic(msg: []const u8, _: ?*std.builtin.StackTrace, _: ?usize) noreturn {
    _panic(msg.ptr, msg.len);
    unreachable;
}

/// Obtains the allocator to be exposed to the WASM host env
/// (via `_wasm_allocate()` and `_wasm_free()`).
/// If the user defines a public `WASM_ALLOCATOR` in their **root** file
/// then this allocator will be used, otherwise the implementations
/// of the two mentioned functions are no-ops.
/// The `WASM_ALLOCATOR` can be changed and/or enabled/disabled dynamically
/// This helper function here is used to always lookup the current value/impl.
///
/// Note: The type for this var is purposefully chosen as an optional,
/// effectively disabling allocations from the WASM host side if no
/// `WASM_ALLOCATOR` is set (or set to null).
pub inline fn allocator() ?std.mem.Allocator {
    return if (@hasDecl(root, "WASM_ALLOCATOR")) root.WASM_ALLOCATOR else null;
}

/// Attempts to allocate memory using configured `allocator()` and if
/// successful returns address of new chunk or zero if failed
/// Note: For SIMD compatibility all allocations are aligned to 16 bytes
pub export fn _wasm_allocate(numBytes: usize) usize {
    if (allocator()) |alloc| {
        var mem = alloc.alignedAlloc(u8, 16, numBytes) catch return 0;
        return @ptrToInt(mem.ptr);
    }
    return 0;
}

/// Frees chunk of heap memory (previously allocated using `_wasm_allocate()`)
/// starting at given address and of given byte length.
/// Note: This is a no-op if no allocator is configured (see `allocator()`)
pub export fn _wasm_free(addr: [*]u8, numBytes: usize) void {
    if (allocator()) |alloc| {
        var mem = [2]usize{ @ptrToInt(addr), numBytes };
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

/// Prints i64 number using configured JS logger
pub extern "wasmapi" fn printI64(x: i64) void;
/// Prints u64 number using configured JS logger
pub extern "wasmapi" fn printU64(x: u64) void;
/// Prints u64 hex number using configured JS logger
pub extern "wasmapi" fn printU64Hex(x: u64) void;

/// Prints number using configured JS logger
pub extern "wasmapi" fn printF32(x: f32) void;
/// Prints number using configured JS logger
pub extern "wasmapi" fn printF64(x: f64) void;

/// Prints pointer as hex number using configured JS logger
pub fn printPtr(ptr: *const anyopaque) void {
    printU32Hex(@ptrToInt(ptr));
}

/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printI8Array(addr: [*]const i8, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printU8Array(addr: [*]const u8, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printI16Array(addr: [*]const i16, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printU16Array(addr: [*]const u16, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printI32Array(addr: [*]const i32, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printU32Array(addr: [*]const u32, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printI64Array(addr: [*]const i64, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printU64Array(addr: [*]const u64, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printF32Array(addr: [*]const f32, len: usize) void;
/// Prints number array using configured JS logger
pub extern "wasmapi" fn _printF64Array(addr: [*]const f64, len: usize) void;

/// Prints number array using configured JS logger
pub fn printI8Array(buf: []const i8) void {
    _printI8Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printU8Array(buf: []const u8) void {
    _printU8Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printI16Array(buf: []const i16) void {
    _printI16Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printU16Array(buf: []const u16) void {
    _printU16Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printI32Array(buf: []const i32) void {
    _printI32Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printU32Array(buf: []const u32) void {
    _printU32Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printI64Array(buf: []const i64) void {
    _printI64Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printU64Array(buf: []const u64) void {
    _printU64Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printF32Array(buf: []const f32) void {
    _printF32Array(buf.ptr, buf.len);
}
/// Prints number array using configured JS logger
pub fn printF64Array(buf: []const f64) void {
    _printF64Array(buf.ptr, buf.len);
}

pub extern "wasmapi" fn printHexdump(addr: *const anyopaque, len: usize) void;

/// Prints a zero-terminated string using configured JS logger
pub extern "wasmapi" fn printStrZ(addr: [*:0]const u8) void;
/// Prints a string of given length using configured JS logger
pub extern "wasmapi" fn _printStr(addr: [*]const u8, len: usize) void;
/// Convenience wrapper for _printStr, accepting a slice as arg
pub fn printStr(msg: []const u8) void {
    _printStr(msg.ptr, msg.len);
}

/// Calls std.fmt.allocPrint to format given string, then calls `printStr()`
/// to output it via JS, then frees string's memory again
/// (Only available if the allocator used by `_wasm_allocate()` hasn't been disabled.)
pub fn printFmt(comptime fmt: []const u8, args: anytype) void {
    if (allocator()) |alloc| {
        const res = std.fmt.allocPrint(alloc, fmt, args) catch return;
        defer alloc.free(res);
        printStr(res);
    }
}

/// Triggers the JS/browser debugger
pub extern "wasmapi" fn debug() void;

/// Returns a JS/browser highres timer value (via `performance.now()`)
pub extern "wasmapi" fn timer() f64;

/// Returns a JS/browser Unix epoch (via `Date.now()`)
pub extern "wasmapi" fn epoch() u64;
