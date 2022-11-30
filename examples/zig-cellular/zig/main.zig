//! Main Zig application (aka root package)

const std = @import("std");
const wasm = @import("wasm-api");
const dom = @import("wasm-api-dom");
const CA = @import("ca.zig");

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/lib.zig

// 4MB "heap" buffer for allocator
var mem: [2 * 1024 * 1024]u8 = undefined;
// setup allocator
var fba = std.heap.FixedBufferAllocator.init(&mem);
pub const WASM_ALLOCATOR = fba.allocator();

// imported JS functions (see /src/index.ts for details)
pub extern "pixels" fn updatePixelsABGR(canvasID: i32, pixels: [*]const u32, numPix: usize) void;
pub extern "pixels" fn updatePixelsLUT(canvasID: i32, pixels: [*]const u8, numPix: usize, paletteAddr: [*]const u32, numPal: usize) void;

// initialize PRNG instance
var rnd = std.rand.DefaultPrng.init(0xdecafbad);

var sim: CA = undefined;
var canvas: i32 = 0;

/// Von Neumann neighborhood
/// https://en.wikipedia.org/wiki/Von_Neumann_neighborhood
const neumann = [_][2]i8{
    .{ 0, -1 },
    .{ -1, 0 },
    .{ 1, 0 },
    .{ 0, 1 },
};

/// Moore neighborhood
/// https://en.wikipedia.org/wiki/Moore_neighborhood
const moore = [_][2]i8{
    .{ -1, -1 },
    .{ 0, -1 },
    .{ 1, -1 },
    .{ -1, 0 },
    .{ 1, 0 },
    .{ -1, 1 },
    .{ 0, 1 },
    .{ 1, 1 },
};

/// Custom neighborhood
const custom = [_][2]i8{
    .{ -2, -2 },
    .{ -3, -1 },
    .{ -3, 1 },
    .{ -2, 0 },
    .{ -1, 0 },
    .{ 1, 0 },
    .{ 2, 0 },
    .{ 3, 1 },
    .{ 3, -1 },
    .{ 2, -2 },
};

// Define cell behaviors (see ca.zig for docs)
const behavior1 = CA.Behavior{ .neighbors = &moore, .threshold = 3, .mutate = 0.002 };
const behavior2 = CA.Behavior{ .neighbors = &custom, .threshold = 2, .mutate = 0.001 };

// List of behaviors (one for each cell state)
// Number of behaviors MUST be in [1..palette.len] range
// but can be different than palette size,
// e.g. here we use 6 behaviors, but have 8 colors...
const behaviors = [_]CA.Behavior{
    behavior1,
    behavior1,
    behavior1,
    behavior2,
    behavior2,
    behavior2,
};

// Colors as 24bit RGB
// Palette taken from: thi.ng/color-palettes
var palette = [_]u32{
    0x000000,
    0x00334b,
    0x6699bb,
    0x99ddff,
    0x7a0011,
    0xc21122,
    0xe5bf99,
    0xfef2d8,
};

// canvas dimensions
const width = 640;
const height = 480;

// ABGR pixel buffer
var abgr: [width * height]u32 = undefined;

fn initApp() !void {
    // create canvas DOM element
    canvas = dom.createCanvas(&.{
        .width = width,
        .height = height,
        .parent = dom.body,
        .index = 0,
    });
    // init simulation
    sim = try CA.init(WASM_ALLOCATOR, rnd.random(), width, height, &behaviors, palette.len);
    sim.seed();
    // convert colors
    convertPalette(&palette);
    // start update loop
    requestLoop();
}

fn update(_: f64, _: ?*anyopaque) void {
    sim.update();
    formatPixels(&abgr, sim.cells, &palette);
    updatePixelsABGR(canvas, &abgr, abgr.len);
    // updatePixelsLUT(canvas, sim.cells.ptr, sim.cells.len, &palette, palette.len);
    requestLoop();
}

/// Triggers next sim frame via requestAnimationFrame
fn requestLoop() void {
    _ = dom.requestAnimationFrame(update, null) catch |e| @panic(@errorName(e));
}

/// Main entry point (called from JS)
export fn start() void {
    initApp() catch |e| @panic(@errorName(e));
    wasm.printStr("started");
}

// helper functions

/// Converts array of palette indices into array of u32 colors,
/// using provided LUT (palette)
fn formatPixels(dest: []u32, src: []const u8, lut: []const u32) void {
    for (src) |x, i| dest[i] = lut[x];
}

/// Converts (in-place) palette of 24bit RGB to 32bit ABGR colors
/// ABGR format is required for canvas image data compatibility
fn convertPalette(lut: []u32) void {
    for (lut) |*color| color.* = 0xff000000 | rgb2bgr(color.*);
}

/// Swaps byte lanes to convert from ARGB => ABGR
inline fn rgb2bgr(x: u32) u32 {
    return x & 0xff00ff00 | ((x << 16) & 0xff0000) | ((x >> 16) & 0xff);
}
