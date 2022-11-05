const std = @import("std");

pub const A = *const fn(x: *u32, y: []const u8) void;

pub const B = struct {
    a: A,
    ptr: *A,
    array: [2]A,
    slice: []A,
};
