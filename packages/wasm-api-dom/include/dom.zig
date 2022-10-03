const std = @import("std");
const dom = @import("api.zig");

pub usingnamespace dom;

/// DOM event listener function
pub const EventListener = *const fn (event: *const dom.Event) void;

/// Reserved reference handle for the browser window itself (e.g. used for event targets)
pub const WINDOW: i32 = -1;
/// Reserved reference handle for `document.body`
pub const DOC_BODY: i32 = 0;

pub const DOMError = error{
    InvalidID,
};

var listeners: std.ArrayList(?EventListener) = undefined;
var nextListenerID: i32 = -1;

pub fn init(allocator: std.mem.Allocator) anyerror!void {
    listeners = std.ArrayList(?EventListener).init(allocator);
}

pub extern "dom" fn getWindowInfo(desc: *dom.WindowInfo) void;

pub extern "dom" fn createElement(opts: *const dom.CreateElementOpts) i32;

pub extern "dom" fn removeElement(id: i32) bool;

pub extern "dom" fn createCanvas(opts: *const dom.CreateCanvasOpts) i32;

pub extern "dom" fn setCanvasSize(id: i32, width: u16, height: u16, dpr: u8) void;

pub extern "dom" fn _setStringAttrib(id: i32, name: [*]const u8, val: [*]const u8) void;

pub fn setStringAttrib(id: i32, name: []const u8, val: []const u8) void {
    _setStringAttrib(id, name.ptr, val.ptr);
}

pub extern "dom" fn _getStringAttrib(id: i32, name: [*]const u8, val: [*]u8, maxBytes: usize) usize;

pub fn getStringAttrib(id: i32, name: []const u8, val: []u8) []u8 {
    return val[0.._getStringAttrib(id, name.ptr, val.ptr, val.len)];
}

pub extern "dom" fn _setNumericAttrib(id: i32, name: [*]const u8, val: f64) void;

pub fn setNumericAttrib(id: i32, name: []const u8, val: f64) void {
    _setNumericAttrib(id, name.ptr, val);
}

pub extern "dom" fn _getNumericAttrib(id: i32, name: [*]const u8) f64;

pub fn getNumericAttrib(id: i32, name: []const u8) f64 {
    return _getNumericAttrib(id, name.ptr);
}

pub extern "dom" fn _setInnerHtml(id: i32, ptr: [*]const u8) void;

pub fn setInnerHtml(id: i32, tag: []const u8) void {
    _setInnerHtml(id, tag.ptr);
}

pub extern "dom" fn _setInnerText(id: i32, ptr: [*]const u8) void;

pub fn setInnerText(id: i32, tag: []const u8) void {
    _setInnerText(id, tag.ptr);
}

export fn dom_callListener(listenerID: u32, event: *const dom.Event) void {
    if (listeners.items[@as(u32, listenerID)]) |listener| listener(event);
}

pub extern "dom" fn _addListener(id: i32, name: [*]const u8, listenerID: i32) void;

pub fn addListener(id: i32, name: []const u8, listener: EventListener) i32 {
    nextListenerID += 1;
    listeners.append(listener) catch return -1;
    _addListener(id, name.ptr, nextListenerID);
    return nextListenerID;
}

pub extern "dom" fn _removeListener(listenerID: i32) void;

pub fn removeListener(listenerID: i32) void {
    if (listeners.items[listenerID]) {
        _removeListener(listenerID);
        listeners.items[listenerID] = null;
    }
}

/// calls .preventDefault() on currently processed event
/// (only to be called from an EventListener!)
pub extern "dom" fn preventDefault() void;

/// calls .stopImmediatePropagation() on currently processed event
/// (only to be called from an EventListener!)
pub extern "dom" fn stopImmediatePropagation() void;
