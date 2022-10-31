const std = @import("std");
const api = @import("api.zig");
const ManagedIndex = @import("wasmapi").ManagedIndex;

pub usingnamespace api;

pub const TimerCallback = struct {
    /// Actual callback function. Takes an optional pointer to user
    /// supplied arbitrary context data provided when registering the handler
    /// via setTimeout() or setInterval()
    callback: *const fn (?*anyopaque) void,
    /// Optional type erased pointer to arbitrary user context. This pointer
    /// can be cast back into the desired type using this form:
    /// `@ptrCast(?*Foo, @alignCast(@alignOf(Foo), raw))`
    /// Also see: `wasmapi.ptrCast()`
    ctx: ?*anyopaque = null,
};

var timeouts: ManagedIndex(*const TimerCallback, u16) = undefined;

/// Initializes the API module. MUST be called before using any of the other
/// functions provided here.
pub fn init(allocator: std.mem.Allocator) !void {
    timeouts = ManagedIndex(*const TimerCallback, u16).init(allocator);
}

/// Internal callback. Called from JS
export fn _timer_callback(timeoutID: u16, remove: api.TimerType) void {
    if (timeouts.get(timeoutID)) |callback| {
        if (remove != .interval) timeouts.remove(timeoutID);
        callback.callback(callback.ctx);
    }
}

pub extern "timer" fn _schedule(timeoutID: u16, interval: usize, kind: api.TimerType) void;

/// Schedules given timer callback of given kind and returns an unique listener ID.
pub fn schedule(timeout: *const TimerCallback, interval: usize, kind: api.TimerType) !u16 {
    const timeoutID = try timeouts.add(timeout);
    _schedule(timeoutID, interval, kind);
    return timeoutID;
}

pub extern "timer" fn _cancel(timeoutID: u16) void;

/// Cancels & removes the timer callback for given ID
pub fn cancel(timeoutID: u16) void {
    timeouts.remove(timeoutID);
    _cancel(timeoutID);
}
