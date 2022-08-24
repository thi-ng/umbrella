// Import JS core API
const js = @import("wasmapi");
const std = @import("std");

var HEAP: [1024]u8 = undefined;

var fba = std.heap.FixedBufferAllocator.init(&HEAP);
var gpa = std.heap.GeneralPurposeAllocator(.{}){};

pub var WASM_ALLOCATOR: ?std.mem.Allocator = null;

export fn check(addr: usize, len: usize) void {
    var mem = [2]usize{ addr, len };
    js.printStr(@ptrCast(*[]u8, &mem).*);
}

export fn useFBA() void {
    WASM_ALLOCATOR = fba.allocator();
}

export fn useGPA() void {
    WASM_ALLOCATOR = gpa.allocator();
}

export fn useNone() void {
    WASM_ALLOCATOR = null;
}
