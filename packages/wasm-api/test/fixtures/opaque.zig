const std = @import("std");

pub const A = struct {
    a: *anyopaque,
    ptr: **anyopaque,
    slice: []*anyopaque,
    array: [3]*anyopaque,
};
