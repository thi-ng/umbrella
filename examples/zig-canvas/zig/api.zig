//! Common types & declarations

const std = @import("std");

pub const Point = @Vector(2, i16);
pub const Stroke = std.ArrayList(Point);

// JS externals
pub extern "canvas" fn clearCanvas(canvas: i32) void;
pub extern "canvas" fn downloadCanvas(canvas: i32) void;
pub extern "canvas" fn drawStroke(canvas: i32, points: [*]Point, len: u32) void;
