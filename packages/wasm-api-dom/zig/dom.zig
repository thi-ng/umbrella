const std = @import("std");
const dom = @import("api.zig");
const ManagedIndex = @import("wasmapi").ManagedIndex;

pub usingnamespace dom;

/// DOM event listener
pub const EventListener = struct {
    /// Event listener function. Takes an event and optional pointer to user
    /// supplied arbitrary context data provided when registering the handler
    /// via addListener()
    callback: *const fn (event: *const dom.Event, ?*anyopaque) void,
    /// Optional type erased pointer to arbitrary user context. This pointer
    /// can be cast back into the desired type using this form:
    /// `@ptrCast(?*Foo, @alignCast(@alignOf(Foo), raw))`
    /// Also see: `wasmapi.ptrCast()`
    ctx: ?*anyopaque = null,
};

/// RAF event listener
pub const RAFListener = struct {
    /// Animation frame listener function. Takes an hires timestamp and optional
    /// pointer to user supplied arbitrary context data provided when registering
    /// the handler via requestAnimationFrame()
    callback: *const fn (time: f64, ?*anyopaque) void,
    /// Optional type erased pointer to arbitrary user context. This pointer
    /// can be cast back into the desired type using this form:
    /// `@ptrCast(?*Foo, @alignCast(@alignOf(Foo), raw))`
    /// Also see: `wasmapi.ptrCast()`
    ctx: ?*anyopaque = null,
};

pub const FullscreenCallback = *const fn () void;

/// Reserved reference handle for the browser window itself (e.g. used for event targets)
pub const WINDOW: i32 = -1;
/// Reserved reference handle for `document.body`
pub const DOC_BODY: i32 = 0;

pub const DOMError = error{
    InvalidID,
};

var eventListeners: ManagedIndex(*const EventListener, u16) = undefined;
var rafListeners: ManagedIndex(*const RAFListener, u16) = undefined;

pub fn init(allocator: std.mem.Allocator) !void {
    eventListeners = ManagedIndex(*const EventListener, u16).init(allocator);
    rafListeners = ManagedIndex(*const RAFListener, u16).init(allocator);
}

pub extern "dom" fn getWindowInfo(desc: *dom.WindowInfo) void;

pub extern "dom" fn createElement(opts: *const dom.CreateElementOpts) i32;

pub extern "dom" fn removeElement(elementID: i32) bool;

pub extern "dom" fn createCanvas(opts: *const dom.CreateCanvasOpts) i32;

pub extern "dom" fn setCanvasSize(elementID: i32, width: u16, height: u16, dpr: u8) void;

pub extern "dom" fn _setStringAttrib(elementID: i32, name: [*]const u8, val: [*]const u8) void;

/// Sets attrib for given name to string val
pub fn setStringAttrib(elementID: i32, name: []const u8, val: []const u8) void {
    _setStringAttrib(elementID, name.ptr, val.ptr);
}

pub extern "dom" fn _getStringAttrib(elementID: i32, name: [*]const u8, val: [*]u8, maxBytes: usize) usize;

/// Returns string value of attrib for given name
pub fn getStringAttrib(elementID: i32, name: []const u8, val: []u8) []u8 {
    return val[0.._getStringAttrib(elementID, name.ptr, val.ptr, val.len)];
}

pub extern "dom" fn _setNumericAttrib(elementID: i32, name: [*]const u8, val: f64) void;

/// Sets attrib for given name to numeric val
pub fn setNumericAttrib(elementID: i32, name: []const u8, val: f64) void {
    _setNumericAttrib(elementID, name.ptr, val);
}

pub extern "dom" fn _getNumericAttrib(elementID: i32, name: [*]const u8) f64;

/// Returns numeric value of attrib for given name
pub fn getNumericAttrib(elementID: i32, name: []const u8) f64 {
    return _getNumericAttrib(elementID, name.ptr);
}

pub extern "dom" fn _setInnerHtml(elementID: i32, ptr: [*]const u8) void;

/// Sets the `.innerHTML` property of a DOM element to given string
pub fn setInnerHtml(elementID: i32, html: []const u8) void {
    _setInnerHtml(elementID, html.ptr);
}

pub extern "dom" fn _setInnerText(elementID: i32, ptr: [*]const u8) void;

/// Sets the `.innerText` property of a DOM element to given string
pub fn setInnerText(elementID: i32, text: []const u8) void {
    _setInnerText(elementID, text.ptr);
}

/// Internal callback. Called from JS
export fn dom_callListener(listenerID: u16, event: *const dom.Event) void {
    if (eventListeners.get(listenerID)) |listener| listener.callback(event, listener.ctx);
}

pub extern "dom" fn _addListener(elementID: i32, name: [*]const u8, listenerID: u16) void;

/// Adds given listener to a DOM element for event `name`.
/// Returns an unique listener ID.
pub fn addListener(elementID: i32, name: []const u8, listener: *const EventListener) !u16 {
    const listenerID = try eventListeners.add(listener);
    _addListener(elementID, name.ptr, listenerID);
    return listenerID;
}

pub extern "dom" fn _removeListener(listenerID: u16) void;

/// Removes the listener for given ID
pub fn removeListener(listenerID: u16) void {
    eventListeners.remove(listenerID);
    _removeListener(listenerID);
}

/// Calls .preventDefault() on currently processed event
/// (only to be called from an EventListener!)
pub extern "dom" fn preventDefault() void;

/// Calls .stopPropagation() on currently processed event
/// (only to be called from an EventListener!)
pub extern "dom" fn stopPropagation() void;

/// Calls .stopImmediatePropagation() on currently processed event
/// (only to be called from an EventListener!)
pub extern "dom" fn stopImmediatePropagation() void;

pub extern "dom" fn _requestAnimationFrame(listenerID: u16) void;

/// Registers given listener for next animation frame
pub fn requestAnimationFrame(listener: *const RAFListener) !u16 {
    const id = try rafListeners.add(listener);
    _requestAnimationFrame(id);
    return id;
}

/// Internal callback. Called from JS
export fn dom_callRAF(listenerID: u16, time: f64) void {
    if (rafListeners.get(listenerID)) |raf| {
        rafListeners.remove(listenerID);
        raf.callback(time, raf.ctx);
    }
}

var fsCallback: ?FullscreenCallback = null;

pub extern "dom" fn _requestFullscreen(elementID: i32) void;

pub extern "dom" fn _exitFullscreen() void;

/// Only to be called from an event handler. Requests fullscreen display for
/// given element ID. Use -1 for the entire window/document.
/// The optional callback will be called once (and if) fullscreen is enabled
pub fn requestFullscreen(elementID: i32, callback: ?FullscreenCallback) void {
    fsCallback = callback;
    _requestFullscreen(elementID);
}

/// Only to be called from an event handler. Exits fullscreen display (if
/// active). The optional callback will be called once (and if) fullscreen
/// switch is complete.
pub fn exitFullscreen(callback: ?FullscreenCallback) void {
    fsCallback = callback;
    _exitFullscreen();
}

/// Internal callback. Called from JS
export fn dom_fullscreenChanged() void {
    if (fsCallback) |callback| {
        callback();
        fsCallback = null;
    }
}
