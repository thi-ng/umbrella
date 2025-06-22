// SPDX-License-Identifier: Apache-2.0
const std = @import("std");
const wasm = @import("wasm-api");
const dom = @import("wasm-api-dom");
const schedule = @import("wasm-api-schedule");
const gl = @import("wasm-api-webgl");

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-schedule/zig/lib.zig
// pub const WASM_ALLOCATOR = std.heap.wasm_allocator;
var buf: [1024]u8 = undefined;
var alloc = std.heap.FixedBufferAllocator.init(&buf);
pub const WASM_ALLOCATOR = alloc.allocator();

var ctx: i32 = -1;
var model: i32 = -1;

/// Main entry point
export fn start() void {
    init() catch |e| @panic(@errorName(e));
}

/// Since (in general) various initialization tasks can return errors
/// we're bundling them all in a single fn, which is then called by start()
/// and so only needs one code site for error handling
fn init() !void {
    // the WASM API modules auto-initialize themselves if the root source
    // file exposes a `WASM_ALLOCATOR`, otherwise you'll have to initialize manually:
    // try dom.init(customAllocator);
    // try schedule.init(customAllocator);
    // try gl.init(customAllocator);

    const canvas = dom.createCanvas(&.{
        .width = 640,
        .height = 480,
        .parent = dom.body,
        .dpr = 2,
    });
    ctx = gl.canvasGLContext(canvas, &.{
        .preserveDrawingBuffer = 1,
    });

    const tex = gl.createTexture(ctx, &.{
        .img = gl.textureDataU32(
            &[_]u32{ 0xffffffff, 0xff808080, 0xff808080, 0xffffffff },
        ),
        .imgType = .u8,
        .width = 2,
        .height = 2,
        .wrap = .repeat,
        .filter = .linear,
    });

    const shader = gl.createShader(ctx, &.{
        .vs = @embedFile("shaders/vs.glsl"),
        .fs = @embedFile("shaders/fs.glsl"),
        .attribs = gl.shaderAttribs(&.{
            .{ .name = "position", .type = .vec2 },
            .{ .name = "uv", .type = .vec2 },
            .{ .name = "color", .type = .vec3 },
            .{ .name = "offset", .type = .vec2 },
            .{ .name = "scale", .type = .float },
        }),
        .varying = gl.shaderVaryings(&.{
            .{ .name = "vuv", .type = .vec2 },
            .{ .name = "vcol", .type = .vec3 },
        }),
        .uniforms = gl.shaderUniforms(&.{
            .{ .name = "baseColor", .type = .vec3 },
            .{ .name = "tex", .type = .sampler2D },
        }),
    });

    model = gl.createModel(ctx, &.{
        .shader = shader,
        .attribs = gl.modelAttribs(&.{
            gl.modelAttribF32(
                "position",
                &[_]f32{ -1, -1, 1, -1, 0, 1 },
                2,
                0,
                0,
            ),
            gl.modelAttribF32(
                "uv",
                &[_]f32{ 0, 0, 10, 0, 5, 10 },
                2,
                0,
                0,
            ),
            gl.modelAttribF32(
                "color",
                &[_]f32{ 1, 0, 0, 0, 1, 0, 0, 0, 1 },
                3,
                0,
                0,
            ),
        }),
        .instances = gl.modelAttribs(&.{
            gl.modelAttribF32(
                "scale",
                &[_]f32{ 0.9, 0.3, 0.3 },
                1,
                0,
                0,
            ),
            gl.modelAttribF32(
                "offset",
                &[_]f32{ 0, 0, -0.6, 0.6, 0.6, 0.6 },
                2,
                0,
                0,
            ),
        }),
        .uniforms = gl.modelUniforms(&.{
            .{
                .name = "baseColor",
                .type = .vec3,
                .value = .{ .vec3 = [_]f32{ 1, 0, 0 } },
            },
        }),
        .textures = gl.ConstI32Slice.wrap(&[_]i32{tex}),
        .mode = .triangles,
        .num = 3,
        .numInstances = 3,
    });

    requestRedraw();
}

fn draw(_: ?*anyopaque) void {
    const t: f32 = @floatCast(schedule.now() * 0.001);
    gl.updateAttribF32(
        model,
        "position",
        &[_]f32{@sin(t * 3.0) * 0.5 + 0.5},
        5 * 4,
    );
    gl.uniformVec3(
        model,
        "baseColor",
        &[_]f32{
            @sin(t),
            @sin(t + std.math.tau / 3.0),
            @sin(t + std.math.tau * 2.0 / 3.0),
        },
    );
    gl.clear(ctx, 0.5, 0.5, 0.5, 1);
    gl.draw(model);
    requestRedraw();
}

fn requestRedraw() void {
    _ = schedule.schedule(.raf, 0, draw, null) catch return;
}
