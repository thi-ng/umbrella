const api = @import("api.zig");

pub usingnamespace api;

pub extern "webgl" fn canvasGLContext(canvasID: i32, opts: *const api.WebGLContextOpts) i32;

pub extern "webgl" fn createShader(ctxID: i32, spec: *const api.ShaderSpec) i32;

pub extern "webgl" fn createModel(ctxID: i32, spec: *const api.ModelSpec) i32;

pub extern "webgl" fn createTexture(ctxID: i32, spec: *const api.TextureSpec) i32;

pub extern "webgl" fn updateAttrib(modelID: i32, name: [*:0]const u8, spec: *const api.AttribUpdateSpec) void;

pub extern "webgl" fn uniformVec(modelID: i32, name: [*:0]const u8, value: [*]const f32, size: u32) void;

pub extern "webgl" fn uniformFloat(modelID: i32, name: [*:0]const u8, value: f32) void;

pub extern "webgl" fn uniformInt(modelID: i32, name: [*:0]const u8, value: i32) void;

pub extern "webgl" fn uniformUint(modelID: i32, name: [*:0]const u8, value: u32) void;

pub extern "webgl" fn draw(modelID: i32) void;

pub extern "webgl" fn clear(ctxID: i32, r: f32, g: f32, b: f32, a: f32) void;

pub fn uniformVec2(modelID: i32, name: [*:0]const u8, value: *const [2]f32) void {
    uniformVec(modelID, name, value, 2);
}

pub fn uniformVec3(modelID: i32, name: [*:0]const u8, value: *const [3]f32) void {
    uniformVec(modelID, name, value, 3);
}

pub fn uniformVec4(modelID: i32, name: [*:0]const u8, value: *const [3]f32) void {
    uniformVec(modelID, name, value, 3);
}

pub fn uniformMat22(modelID: i32, name: [*:0]const u8, value: *const [4]f32) void {
    uniformVec(modelID, name, value, 4);
}

pub fn uniformMat33(modelID: i32, name: [*:0]const u8, value: *const [9]f32) void {
    uniformVec(modelID, name, value, 9);
}

pub fn uniformMat44(modelID: i32, name: [*:0]const u8, value: *const [16]f32) void {
    uniformVec(modelID, name, value, 16);
}

/// Syntax sugar for defining a `ModelAttributeSpec`
pub fn modelAttribFloat(
    name: [*:0]const u8,
    size: usize,
    stride: usize,
    offset: usize,
    data: []const f32,
) api.ModelAttribSpec {
    return .{
        .name = name,
        .data = .{ .f32 = api.ConstF32Slice.wrap(data) },
        .type = .f32,
        .size = size,
        .stride = stride,
        .offset = offset,
    };
}

/// Syntax sugar for defining a `ModelAttributeSpec`
pub fn modelAttribInt(
    name: [*:0]const u8,
    size: usize,
    stride: usize,
    offset: usize,
    data: []const i32,
) api.ModelAttribSpec {
    return .{
        .name = name,
        .data = .{ .i32 = api.ConstI32Slice.wrap(data) },
        .type = .i32,
        .size = size,
        .stride = stride,
        .offset = offset,
    };
}
