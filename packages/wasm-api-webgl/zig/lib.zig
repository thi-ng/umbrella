// SPDX-License-Identifier: Apache-2.0
const std = @import("std");

pub const types = @import("types.zig");

pub extern "webgl" fn canvasGLContext(canvasID: i32, opts: *const types.WebGLContextOpts) i32;

pub extern "webgl" fn createShader(ctxID: i32, spec: *const types.ShaderSpec) i32;

pub extern "webgl" fn createModel(ctxID: i32, spec: *const types.ModelSpec) i32;

pub extern "webgl" fn createTexture(ctxID: i32, spec: *const types.TextureSpec) i32;

pub extern "webgl" fn updateAttrib(modelID: i32, name: [*:0]const u8, spec: *const types.AttribUpdateSpec) void;

pub extern "webgl" fn uniformVec(modelID: i32, name: [*:0]const u8, value: [*]const f32, size: u32) void;

pub extern "webgl" fn uniformIVec(modelID: i32, name: [*:0]const u8, value: [*]const i32, size: u32) void;

pub extern "webgl" fn uniformUVec(modelID: i32, name: [*:0]const u8, value: [*]const u32, size: u32) void;

pub extern "webgl" fn uniformFloat(modelID: i32, name: [*:0]const u8, value: f32) void;

pub extern "webgl" fn uniformInt(modelID: i32, name: [*:0]const u8, value: i32) void;

pub extern "webgl" fn uniformUInt(modelID: i32, name: [*:0]const u8, value: u32) void;

pub extern "webgl" fn draw(modelID: i32) void;

pub extern "webgl" fn clear(ctxID: i32, r: f32, g: f32, b: f32, a: f32) void;

// hoist generated helpers
pub const modelAttribs = types.modelAttribs;
pub const modelUniforms = types.modelUniforms;
pub const shaderAttribs = types.shaderAttribs;
pub const shaderUniforms = types.shaderUniforms;
pub const shaderVaryings = types.shaderVaryings;

// Syntax sugar for `uniformVec()` and vec2 values
pub fn uniformVec2(modelID: i32, name: [*:0]const u8, value: *const [2]f32) void {
    uniformVec(modelID, name, value, 2);
}

// Syntax sugar for `uniformVec()` and vec3 values
pub fn uniformVec3(modelID: i32, name: [*:0]const u8, value: *const [3]f32) void {
    uniformVec(modelID, name, value, 3);
}

// Syntax sugar for `uniformVec()` and vec4 values
pub fn uniformVec4(modelID: i32, name: [*:0]const u8, value: *const [3]f32) void {
    uniformVec(modelID, name, value, 3);
}

// Syntax sugar for `uniformVec()` and mat2 values
pub fn uniformMat22(modelID: i32, name: [*:0]const u8, value: *const [4]f32) void {
    uniformVec(modelID, name, value, 4);
}

// Syntax sugar for `uniformVec()` and mat3 values
pub fn uniformMat33(modelID: i32, name: [*:0]const u8, value: *const [9]f32) void {
    uniformVec(modelID, name, value, 9);
}

// Syntax sugar for `uniformVec()` and mat4 values
pub fn uniformMat44(modelID: i32, name: [*:0]const u8, value: *const [16]f32) void {
    uniformVec(modelID, name, value, 16);
}

/// Syntax sugar for defining a `ModelAttributeSpec` of f32 values
pub fn modelAttribF32(
    name: [*:0]const u8,
    data: []const f32,
    size: usize,
    stride: usize,
    offset: usize,
) types.ModelAttribSpec {
    return .{
        .name = name,
        .data = attribDataF32(data),
        .type = .f32,
        .size = size,
        .stride = stride,
        .offset = offset,
    };
}

/// Syntax sugar for defining a `ModelAttributeSpec` of i32 values
pub fn modelAttribI32(
    name: [*:0]const u8,
    data: []const i32,
    size: usize,
    stride: usize,
    offset: usize,
) types.ModelAttribSpec {
    return .{
        .name = name,
        .data = attribDataI32(data),
        .type = .i32,
        .size = size,
        .stride = stride,
        .offset = offset,
    };
}

/// Syntax sugar for defining a `ModelAttributeSpec` of u32 values
pub fn modelAttribU32(
    name: [*:0]const u8,
    data: []const u32,
    size: usize,
    stride: usize,
    offset: usize,
) types.ModelAttribSpec {
    return .{
        .name = name,
        .data = attribDataU32(data),
        .type = .u32,
        .size = size,
        .stride = stride,
        .offset = offset,
    };
}

pub fn updateAttribF32(modelID: i32, name: [*:0]const u8, data: []const f32, offset: usize) void {
    updateAttrib(modelID, name, &.{ .data = attribDataF32(data), .offset = offset });
}

pub fn updateAttribI32(modelID: i32, name: [*:0]const u8, data: []const i32, offset: usize) void {
    updateAttrib(modelID, name, &.{ .data = attribDataI32(data), .offset = offset });
}

pub fn updateAttribU32(modelID: i32, name: [*:0]const u8, data: []const u32, offset: usize) void {
    updateAttrib(modelID, name, &.{ .data = attribDataU32(data), .offset = offset });
}

pub inline fn attribDataF32(data: []const f32) types.ModelAttribData {
    return .{ .f32 = types.ConstF32Slice.wrap(data) };
}

pub inline fn attribDataI32(data: []const i32) types.ModelAttribData {
    return .{ .i32 = types.ConstI32Slice.wrap(data) };
}

pub inline fn attribDataU32(data: []const u32) types.ModelAttribData {
    return .{ .u32 = types.ConstI32Slice.wrap(data) };
}

/// Syntax sugar for defining u8 based `ImageData` from ABGR u32 source data
pub inline fn textureDataU32(data: []const u32) types.ImageData {
    return .{ .u8 = types.ConstU8Slice.wrap(std.mem.sliceAsBytes(data)) };
}
