const std = @import("std");
const dom = @import("api.zig");
const ManagedIndex = @import("wasmapi").ManagedIndex;

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

var eventListeners: ManagedIndex(*const EventListener, u16) = undefined;
var rafListeners: ManagedIndex(*const RAFListener, u16) = undefined;

/// Initializes the managed indices for DOM resources
pub fn init(allocator: std.mem.Allocator) !void {
    eventListeners = ManagedIndex(*const EventListener, u16).init(allocator);
    rafListeners = ManagedIndex(*const RAFListener, u16).init(allocator);
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
