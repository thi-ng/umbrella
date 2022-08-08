// Import JS core API
const js = @import("wasmapi");
const std = @import("std");

pub const WASM_ALLOCATOR: ?std.mem.Allocator = null;

/// Fill vec2 with random values
/// Associate this function with the "custom" import section
extern "custom" fn setVec2(addr: usize) void;

export fn test_setVec2() void {
    var foo = [2]f32{ 0, 0 };
    js.printF32Array(foo[0..]);
    setVec2(@ptrToInt(&foo));
    js.printF32Array(foo[0..]);
}
