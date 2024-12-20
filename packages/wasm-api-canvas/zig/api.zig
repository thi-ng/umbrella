//! Generated by @thi.ng/wasm-api-bindgen at 2024-08-17T14:24:42.586Z
//! DO NOT EDIT!

const std = @import("std");
const bindgen = @import("wasm-api-bindgen");

pub const LineCap = enum(i32) {
    butt,
    round,
    square,
};

pub const LineJoin = enum(i32) {
    bevel,
    round,
    miter,
};

pub const TextAlign = enum(i32) {
    start,
    end,
    left,
    right,
    center,
};

pub const TextBaseline = enum(i32) {
    top,
    hanging,
    middle,
    alphabetic,
    ideographic,
    bottom,
};

pub const TextDirection = enum(i32) {
    inherit,
    ltr,
    rtl,
};

pub const FontKerning = enum(i32) {
    auto,
    normal,
    none,
};

pub const FillRule = enum(i32) {
    nonzero,
    evenodd,
};

pub const PatternRepeat = enum(i32) {
    repeat,
    repeat_x,
    repeat_y,
    no_repeat,
};

pub const GlobalCompositeOp = enum(i32) {
    color,
    color_burn,
    color_dodge,
    copy,
    darken,
    destination_atop,
    destination_in,
    destination_out,
    destination_over,
    difference,
    exclusion,
    hard_light,
    hue,
    lighten,
    lighter,
    luminosity,
    multiply,
    overlay,
    saturation,
    screen,
    soft_light,
    source_atop,
    source_in,
    source_out,
    source_over,
    xor,
};

pub const GradientColorStop = extern struct {
    /// Normalized position of this color stop
    pos: f32,
    /// CSS color string associated with this stop
    color: bindgen.ConstStringPtr,
};

/// The dimensions of a piece of text in the canvas, as created by the
/// CanvasRenderingContext2D.measureText() method.
pub const TextMetrics = extern struct {
    actualBoundingBoxAscent: f32,
    actualBoundingBoxDescent: f32,
    actualBoundingBoxLeft: f32,
    actualBoundingBoxRight: f32,
    fontBoundingBoxAscent: f32,
    fontBoundingBoxDescent: f32,
    width: f32,
};
