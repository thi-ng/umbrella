// Import JS core API
const js = @import("wasmapi");

/// Fill vec2 with random values
extern fn custom_setVec2(addr: usize) void;

export fn test_setVec2() void {
    var foo = [2]f32{ 0, 0 };
    js.printF32Array(foo[0..]);
    custom_setVec2(@ptrToInt(&foo));
    js.printF32Array(foo[0..]);
}
