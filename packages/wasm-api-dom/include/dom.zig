const std = @import("std");
const dom = @import("api.zig");

pub usingnamespace dom;

pub const EventListener = *const fn (event: *const dom.Event) void;

pub extern "dom" fn getWindowInfo(desc: *dom.WindowInfo) void;

pub extern "dom" fn createElement(opts: *const dom.CreateElementOpts) i32;

pub extern "dom" fn createCanvas(opts: *const dom.CreateCanvasOpts) i32;

pub extern "dom" fn setCanvasSize(id: i32, width: u16, height: u16, dpr: u8) void;

pub extern "dom" fn _setStringAttrib(id: i32, name: [*]const u8, val: [*]const u8) void;

pub fn setStringAttrib(id: i32, name: []const u8, val: []const u8) void {
    _setStringAttrib(id, name.ptr, val.ptr);
}

pub extern "dom" fn _setNumericAttrib(id: i32, name: [*]const u8, val: f32) void;

pub fn setNumericAttrib(id: i32, name: []const u8, val: f32) void {
    _setNumericAttrib(id, name.ptr, val);
}

pub extern "dom" fn _setInnerHtml(id: i32, ptr: [*]const u8) void;

pub fn setInnerHtml(id: i32, tag: []const u8) void {
    _setInnerHtml(id, tag.ptr);
}

pub extern "dom" fn _setInnerText(id: i32, ptr: [*]const u8) void;

pub fn setInnerText(id: i32, tag: []const u8) void {
    _setInnerText(id, tag.ptr);
}

var listeners: std.ArrayList(EventListener) = undefined;
var nextListenerID: i32 = -1;

pub fn init(allocator: std.mem.Allocator) anyerror!void {
    listeners = std.ArrayList(EventListener).init(allocator);
}

export fn dom_callListener(id: u32, event: *const dom.Event) void {
    listeners.items[@as(u32, id)](event);
}

pub extern "dom" fn _addListener(ctx: i32, name: [*]const u8, listenerID: i32) void;

pub fn addListener(ctx: i32, name: []const u8, listener: EventListener) i32 {
    nextListenerID += 1;
    listeners.append(listener) catch return -1;
    _addListener(ctx, name.ptr, nextListenerID);
    return nextListenerID;
}

pub extern "dom" fn _removeListener(listenerID: i32) void;
