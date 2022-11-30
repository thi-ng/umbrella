//! App state model & operations for drawn gestures

const std = @import("std");
const wasm = @import("wasm-api");
const dom = @import("wasm-api-dom");
const api = @import("api.zig");

/// Allocator to use for recorded strokes/gestures
allocator: std.mem.Allocator,
/// Browser window measurements
window: dom.WindowInfo = undefined,
/// List of recorded strokes/gestures
strokes: std.ArrayList(*api.Stroke) = undefined,
/// Current stroke (or null if none active)
currStroke: ?*api.Stroke = null,
/// DOM element ID for target canvas
canvasID: i32 = -1,

const Self = @This();

/// Returns an initialized state struct
pub fn init(allocator: std.mem.Allocator) Self {
    var self = Self{
        .allocator = allocator,
        .strokes = std.ArrayList(*api.Stroke).init(allocator),
    };
    dom.getWindowInfo(&self.window);
    return self;
}

/// Starts a new stroke and appends it to the list
pub fn startStroke(self: *Self, x: i16, y: i16) void {
    var stroke: *api.Stroke = self.allocator.create(api.Stroke) catch return;
    var strokeInst = api.Stroke.init(self.allocator);
    strokeInst.append(self.scaledPoint(x, y)) catch return;
    stroke.* = strokeInst;
    self.strokes.append(stroke) catch return;
    self.currStroke = stroke;
}

/// End current stroke
pub fn endStroke(self: *Self) void {
    if (self.currStroke) |stroke| {
        if (stroke.items.len == 0) self.undoStroke();
        self.currStroke = null;
    }
}

/// Appends new point to current stroke (checks if any is active)
/// Returns true if successful
pub fn updateStroke(self: *Self, x: i16, y: i16) void {
    if (self.currStroke) |curr| {
        curr.append(self.scaledPoint(x, y)) catch return;
        self.requestRedraw();
    }
}

/// Attempts to discard most recent stroke. Returns true if successful
pub fn undoStroke(self: *Self) void {
    if (self.strokes.popOrNull()) |stroke| {
        stroke.clearAndFree();
        self.requestRedraw();
        self.currStroke = null;
    }
}

/// Triggers redraw during next RAF cycle. This app redraws on demand,
/// but we NEVER want to do so from the event loop!
pub fn requestRedraw(self: *Self) void {
    const wrapper = struct {
        pub fn handler(_: f64, raw: ?*anyopaque) void {
            if (wasm.ptrCast(*const Self, raw)) |state| state.redraw();
        }
    };
    _ = dom.requestAnimationFrame(wrapper.handler, self) catch return;
}

/// Calls into JS API to clear canvas and redraw all recorded strokes.
pub fn redraw(self: *const Self) void {
    api.clearCanvas(self.canvasID);
    for (self.strokes.items) |stroke| {
        api.drawStroke(self.canvasID, stroke.items.ptr, stroke.items.len);
    }
}

/// Computes point scaled to given device pixel ratio
fn scaledPoint(self: *const Self, x: i16, y: i16) api.Point {
    return [2]i16{
        (x - 8) * self.window.dpr,
        (y - 8) * self.window.dpr,
    };
}
