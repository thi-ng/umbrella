const std = @import("std");
const wasm = @import("wasmapi");

pub const A = extern struct {
    a: u8,
    __pad0: [3]u8,
    b: u32,
    c: *[3]u16,
    __pad1: [2]u8,
    d: f64,
};

pub const B = extern union {
    a: [3]A,
    b: u64,
};
