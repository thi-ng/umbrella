const std = @import("std");
const api = @import("api.zig");

pub const none = "none";

pub extern "canvas2d" fn beginCtx(ctx: i32) void;
pub extern "canvas2d" fn endCtx() void;

pub extern "canvas2d" fn save() void;
pub extern "canvas2d" fn restore() void;
pub extern "canvas2d" fn translate(x: f32, y: f32) void;
pub extern "canvas2d" fn scale(x: f32, y: f32) void;
pub extern "canvas2d" fn rotate(theta: f32) void;
pub extern "canvas2d" fn transform(addr: [*:0]const u8) void;

pub extern "canvas2d" fn setFont(addr: [*:0]const u8) void;
pub extern "canvas2d" fn setFontKerning(addr: api.FontKerning) void;
pub extern "canvas2d" fn setTextAlign(mode: api.TextAlign) void;
pub extern "canvas2d" fn setTextBaseline(mode: api.TextBaseline) void;
pub extern "canvas2d" fn setTextDirection(mode: api.TextDirection) void;

pub extern "canvas2d" fn setFill(addr: [*:0]const u8) void;
pub extern "canvas2d" fn setGradientFill(id: u32) void;
pub extern "canvas2d" fn setPatternFill(id: u32) void;
pub extern "canvas2d" fn setStroke(addr: [*:0]const u8) void;
pub extern "canvas2d" fn setGradientStroke(id: u32) void;
pub extern "canvas2d" fn setPatternStroke(id: u32) void;
pub extern "canvas2d" fn setLineWidth(w: f32) void;
pub extern "canvas2d" fn setLineCap(mode: api.LineCap) void;
pub extern "canvas2d" fn setLineJoin(mode: api.LineJoin) void;
pub extern "canvas2d" fn setMiterLimit(mode: f32) void;
pub extern "canvas2d" fn _setLineDash(addr: [*]f32, num: usize) void;
pub extern "canvas2d" fn setLineDashOffset(offset: f32) void;
pub extern "canvas2d" fn setShadow(addr: [*:0]const u8, x: f32, y: f32, blur: f32) void;
pub extern "canvas2d" fn setGlobalAlpha(alpha: f32) void;
pub extern "canvas2d" fn setGlobalCompositeOp(mode: api.GlobalCompositeOp) void;
pub extern "canvas2d" fn setFilter(addr: [*:0]const u8) void;

pub extern "canvas2d" fn _createLinearGradient(x1: f32, y1: f32, x2: f32, y2: f32, addr: [*]const api.GradientColorStop, num: usize) u32;
pub fn createLinearGradient(x1: f32, y1: f32, x2: f32, y2: f32, stops: []const api.GradientColorStop) u32 {
    return _createLinearGradient(x1, y1, x2, y2, stops.ptr, stops.len);
}
pub extern "canvas2d" fn _createRadialGradient(x1: f32, y1: f32, r1: f32, x2: f32, y2: f32, r2: f32, addr: [*]const api.GradientColorStop, num: usize) u32;
pub fn createRadialGradient(x1: f32, y1: f32, r1: f32, x2: f32, y2: f32, r2: f32, stops: []const api.GradientColorStop) u32 {
    return _createRadialGradient(x1, y1, r1, x2, y2, r2, stops.ptr, stops.len);
}
pub extern "canvas2d" fn _createConicGradient(startTheta: f32, x: f32, y: f32, addr: [*]const api.GradientColorStop, num: usize) u32;
pub fn createConicGradient(startTheta: f32, x: f32, y: f32, stops: []const api.GradientColorStop) u32 {
    return _createConicGradient(startTheta, x, y, stops.ptr, stops.len);
}
pub extern "canvas2d" fn createPattern(pixels: [*]const u32, width: u32, height: u32, repeat: api.PatternRepeat) u32;

pub extern "canvas2d" fn beginPath() void;
pub extern "canvas2d" fn closePath() void;
pub extern "canvas2d" fn fill() void;
pub extern "canvas2d" fn fillWithRule(rule: api.FillRule) void;
pub extern "canvas2d" fn stroke() void;
pub extern "canvas2d" fn clip() void;

pub extern "canvas2d" fn clearRect(x: f32, y: f32, w: f32, h: f32) void;
pub extern "canvas2d" fn fillRect(x: f32, y: f32, w: f32, h: f32) void;
pub extern "canvas2d" fn strokeRect(x: f32, y: f32, w: f32, h: f32) void;

pub extern "canvas2d" fn arc(x: f32, y: f32, radius: f32, startAngle: f32, endAngle: f32, ccw: bool) void;
pub extern "canvas2d" fn arcTo(x1: f32, y1: f32, x2: f32, y2: f32, radius: f32) void;
pub extern "canvas2d" fn ellipse(x: f32, y: f32, rx: f32, ry: f32, rotation: f32, startTheta: f32, endTheta: f32, ccw: bool) void;
pub extern "canvas2d" fn moveTo(x: f32, y: f32) void;
pub extern "canvas2d" fn lineTo(x: f32, y: f32) void;
pub extern "canvas2d" fn cubicTo(cp1x: f32, cp1y: f32, cp2x: f32, cp2y: f32, x: f32, y: f32) void;
pub extern "canvas2d" fn quadraticTo(cpx: f32, cpy: f32, x: f32, y: f32) void;

pub extern "canvas2d" fn _points(addr: [*]const [2]f32, num: usize, radius: f32, isFilled: bool) void;
pub fn points(pts: []const [2]f32, radius: f32, isFilled: bool) void {
    _points(pts.ptr, pts.len, radius, isFilled);
}

pub extern "canvas2d" fn _polyline(addr: [*]const [2]f32, num: usize, isFilled: bool) void;
pub fn polyline(pts: []const [2]f32, isFilled: bool) void {
    _polyline(pts.ptr, pts.len, isFilled);
}

pub extern "canvas2d" fn fillText(addr: [*:0]const u8, x: f32, y: f32, w: f32) void;
pub extern "canvas2d" fn strokeText(addr: [*:0]const u8, x: f32, y: f32, w: f32) void;
pub extern "canvas2d" fn _measureText(addr: [*:0]const u8, metrics: *api.TextMetrics) void;
pub fn measureText(addr: [*:0]const u8) api.TextMetrics {
    var metrics: api.TextMetrics = undefined;
    _measureText(addr, &metrics);
    return metrics;
}

pub extern "canvas2d" fn putPixelsGray(addr: [*]const u8) void;
pub extern "canvas2d" fn putPixelRegionGray(addr: [*]const u8, x: u32, y: u32, width: u32, height: u32) void;
pub extern "canvas2d" fn putPixelsIndexed(addr: [*]const u8, palette: [*]const u32, numPal: u32) void;
pub extern "canvas2d" fn putPixelRegionIndexed(addr: [*]const u8, palette: [*]const u32, numPal: u32, x: u32, y: u32, width: u32, height: u32) void;
pub extern "canvas2d" fn putPixelsARGB(addr: [*]const u32) void;
pub extern "canvas2d" fn putPixelRegionARGB(addr: [*]const u32, x: u32, y: u32, width: u32, height: u32) void;
pub extern "canvas2d" fn putPixelsABGR(addr: [*]const u32) void;
pub extern "canvas2d" fn putPixelRegionABGR(addr: [*]const u32, x: u32, y: u32, width: u32, height: u32) void;
