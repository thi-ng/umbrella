const std = @import("std");
const wasm = @import("wasmapi");
const api = @import("api.zig");
const ManagedIndex = @import("wasmapi").ManagedIndex;

pub usingnamespace api;

pub const Callback = *const fn (?*anyopaque) void;

pub const ScheduledCall = struct {
    /// Actual callback function. Takes an optional pointer to user
    /// supplied arbitrary context data provided when registering the handler
    /// via setTimeout() or setInterval()
    callback: Callback,
    /// Optional type erased pointer to arbitrary user context. This pointer
    /// can be cast back into the desired type using this form:
    /// `@ptrCast(?*Foo, @alignCast(@alignOf(Foo), raw))`
    /// Also see: `wasmapi.ptrCast()`
    ctx: ?*anyopaque = null,
};

var calls: ManagedIndex(ScheduledCall, u16) = undefined;

/// Initializes the API module. MUST be called before using any of the other
/// functions provided here.
pub fn init(allocator: std.mem.Allocator) void {
    calls = ManagedIndex(ScheduledCall, u16).init(allocator);
}

/// Auto-initialization hook called from JS when the module initializes
export fn _schedule_init() void {
    if (wasm.allocator()) |allocator| {
        init(allocator);
    }
}

/// Internal callback. Called from JS
export fn _schedule_callback(callID: u16, remove: api.ScheduleType) void {
    if (calls.get(callID)) |callback| {
        if (remove != .interval) calls.remove(callID);
        callback.callback(callback.ctx);
    }
}

pub extern "schedule" fn _schedule(kind: api.ScheduleType, delay: usize, callID: u16) void;

/// Schedules given timer callback of given kind and returns an unique ID handle.
pub fn schedule(kind: api.ScheduleType, delay: usize, callback: Callback, ctx: ?*anyopaque) !u16 {
    const callID = try calls.add(.{ .callback = callback, .ctx = ctx });
    _schedule(kind, delay, callID);
    return callID;
}

pub extern "schedule" fn _cancel(callID: u16) void;

/// Cancels & removes the scheduled call for given ID
pub fn cancel(callID: u16) void {
    calls.remove(callID);
    _cancel(callID);
}
