// SPDX-License-Identifier: Apache-2.0
// Import JS core API
const js = @import("wasm-api");
const std = @import("std");

/// Fill vec2 with random values
/// Associate this function with the "custom" import section
extern "custom" fn setVec2(addr: *[2]f32) void;

extern "custom" fn structWithOptPtr(addr: *const Test) void;

const Test = struct {
    ptr: ?[*:0]const u8 = null,
};

export fn test_setVec2() void {
    var foo = [2]f32{ 0, 0 };
    js.printF32Array(foo[0..]);
    setVec2(&foo);
    js.printF32Array(foo[0..]);
}

export fn test_epoch() void {
    js.printU64(js.epoch());
}

export fn test_optStringPtrNull() void {
    const tmp = Test{};
    structWithOptPtr(&tmp);
}

export fn test_optStringPtr() void {
    const tmp = Test{ .ptr = "foo" };
    structWithOptPtr(&tmp);
}
