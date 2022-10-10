const std = @import("std");
const dom = @import("api.zig");
const FreeList = @import("free-list.zig").FreeList;

pub usingnamespace dom;

/// DOM event listener
pub const EventListener = struct {
    callback: *const fn (event: *const dom.Event, ?*anyopaque) void,
    arg: ?*anyopaque = null,
};

/// RAF event listener
pub const RAFListener = struct {
    callback: *const fn (time: f64, ?*anyopaque) void,
    arg: ?*anyopaque = null,
};

/// Reserved reference handle for the browser window itself (e.g. used for event targets)
pub const WINDOW: i32 = -1;
/// Reserved reference handle for `document.body`
pub const DOC_BODY: i32 = 0;

pub const DOMError = error{
    InvalidID,
};

var eventListeners: FreeList(*const EventListener) = undefined;
var rafListeners: FreeList(*const RAFListener) = undefined;

pub fn init(allocator: std.mem.Allocator) anyerror!void {
    eventListeners = FreeList(*const EventListener).init(allocator);
    rafListeners = FreeList(*const RAFListener).init(allocator);
}

pub extern "dom" fn getWindowInfo(desc: *dom.WindowInfo) void;

pub extern "dom" fn createElement(opts: *const dom.CreateElementOpts) i32;

pub extern "dom" fn removeElement(elementID: i32) bool;

pub extern "dom" fn createCanvas(opts: *const dom.CreateCanvasOpts) i32;

pub extern "dom" fn setCanvasSize(elementID: i32, width: u16, height: u16, dpr: u8) void;

pub extern "dom" fn _setStringAttrib(elementID: i32, name: [*]const u8, val: [*]const u8) void;

pub fn setStringAttrib(elementID: i32, name: []const u8, val: []const u8) void {
    _setStringAttrib(elementID, name.ptr, val.ptr);
}

pub extern "dom" fn _getStringAttrib(elementID: i32, name: [*]const u8, val: [*]u8, maxBytes: usize) usize;

pub fn getStringAttrib(elementID: i32, name: []const u8, val: []u8) []u8 {
    return val[0.._getStringAttrib(elementID, name.ptr, val.ptr, val.len)];
}

pub extern "dom" fn _setNumericAttrib(elementID: i32, name: [*]const u8, val: f64) void;

pub fn setNumericAttrib(elementID: i32, name: []const u8, val: f64) void {
    _setNumericAttrib(elementID, name.ptr, val);
}

pub extern "dom" fn _getNumericAttrib(elementID: i32, name: [*]const u8) f64;

pub fn getNumericAttrib(elementID: i32, name: []const u8) f64 {
    return _getNumericAttrib(elementID, name.ptr);
}

pub extern "dom" fn _setInnerHtml(elementID: i32, ptr: [*]const u8) void;

pub fn setInnerHtml(elementID: i32, tag: []const u8) void {
    _setInnerHtml(elementID, tag.ptr);
}

pub extern "dom" fn _setInnerText(elementID: i32, ptr: [*]const u8) void;

pub fn setInnerText(elementID: i32, tag: []const u8) void {
    _setInnerText(elementID, tag.ptr);
}

export fn dom_callListener(listenerID: usize, event: *const dom.Event) void {
    if (eventListeners.get(listenerID)) |listener| listener.callback(event, listener.arg);
}

pub extern "dom" fn _addListener(elementID: i32, name: [*]const u8, listenerID: usize) void;

pub fn addListener(elementID: i32, name: []const u8, listener: *const EventListener) anyerror!usize {
    const listenerID = try eventListeners.add(listener);
    _addListener(elementID, name.ptr, listenerID);
    return listenerID;
}

pub extern "dom" fn _removeListener(listenerID: usize) void;

pub fn removeListener(listenerID: usize) void {
    eventListeners.remove(listenerID);
    _removeListener(listenerID);
}

/// calls .preventDefault() on currently processed event
/// (only to be called from an EventListener!)
pub extern "dom" fn preventDefault() void;

/// calls .stopImmediatePropagation() on currently processed event
/// (only to be called from an EventListener!)
pub extern "dom" fn stopImmediatePropagation() void;

pub extern "dom" fn _requestAnimationFrame(listenerID: usize) void;

pub fn requestAnimationFrame(listener: *const RAFListener) anyerror!usize {
    const id = try rafListeners.add(listener);
    _requestAnimationFrame(id);
    return id;
}

export fn dom_callRAF(listenerID: usize, time: f64) void {
    if (rafListeners.get(listenerID)) |raf| {
        rafListeners.remove(listenerID);
        raf.callback(time, raf.arg);
    }
}
