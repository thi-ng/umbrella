const std = @import("std");
const wasm = @import("wasmapi");
const api = @import("api.zig");
const ManagedIndex = @import("wasmapi").ManagedIndex;

pub usingnamespace api;

pub const ScheduledCallback = struct {
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

var calls: ManagedIndex(ScheduledCallback, u16) = undefined;

/// Initializes the API module. MUST be called before using any of the other
/// functions provided here.
pub fn init(allocator: std.mem.Allocator) void {
    calls = ManagedIndex(ScheduledCallback, u16).init(allocator);
}

export fn _schedule_init() void {
    if (wasm.allocator()) |allocator| {
        wasm.printStr("scheduler using root allocator");
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

pub extern "schedule" fn _schedule(kind: api.ScheduleType, callID: u16, delay: usize) void;

/// Schedules given timer callback of given kind and returns an unique ID handle.
pub fn schedule(kind: api.ScheduleType, timeout: *const ScheduledCallback, delay: usize) !u16 {
    const callID = try calls.add(timeout.*);
    _schedule(kind, callID, delay);
    return callID;
}

pub extern "schedule" fn _cancel(callID: u16) void;

/// Cancels & removes the scheduled call for given ID
pub fn cancel(callID: u16) void {
    calls.remove(callID);
    _cancel(callID);
}
