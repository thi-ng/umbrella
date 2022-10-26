const std = @import("std");

pub const A = struct {
    a: u8,
    __pad0: [3]u8,
    b: u32,
    c: *[3]u16,
    __pad1: [2]u8,
    d: f64,
};

pub const B = union {
    a: [3]A,
    b: u64,
};
