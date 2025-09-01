// SPDX-License-Identifier: Apache-2.0
const std = @import("std");
const wasm = @import("wasm-api");

const types = @import("types.zig");

var eventListeners: wasm.ManagedIndex(types.EventListener, u16) = undefined;
var rafListeners: wasm.ManagedIndex(types.RAFListener, u16) = undefined;

/// Initializes the managed indices for DOM resources
pub fn init(allocator: std.mem.Allocator) void {
    eventListeners = wasm.ManagedIndex(types.EventListener, u16).init(allocator);
    rafListeners = wasm.ManagedIndex(types.RAFListener, u16).init(allocator);
}

pub fn deinit() void {
    eventListeners.deinit();
    rafListeners.deinit();
}

/// Internal callback. Called from JS
export fn _dom_callListener(listenerID: u16, event: *const types.Event) void {
    if (eventListeners.get(listenerID)) |listener| listener.callback(event, listener.ctx);
}

pub extern "dom" fn _addListener(elementID: i32, name: [*:0]const u8, listenerID: u16) void;

/// Adds given listener to a DOM element for event `name`.
/// Returns an unique listener ID.
pub fn addListener(elementID: i32, name: [*:0]const u8, callback: types.EventCallback, ctx: ?*anyopaque) !u16 {
    const listenerID = try eventListeners.add(.{ .callback = callback, .ctx = ctx });
    _addListener(elementID, name, listenerID);
    return listenerID;
}

export fn _dom_addListener(listener: *const types.EventListener) i32 {
    const listenerID = eventListeners.add(listener.*) catch return -1;
    return @as(i32, listenerID);
}

/// Internal callback. Called from JS when an indirectly referenced event
/// listener must be removed as part of the recursive cleanup procedure of
/// removeElement()
export fn _dom_removeListener(listenerID: u16) void {
    eventListeners.remove(listenerID);
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
pub fn requestAnimationFrame(callback: types.RAFCallback, ctx: ?*anyopaque) !u16 {
    const id = try rafListeners.add(.{ .callback = callback, .ctx = ctx });
    _requestAnimationFrame(id);
    return id;
}

/// Internal callback. Called from JS
export fn _dom_callRAF(listenerID: u16, time: f64) void {
    if (rafListeners.get(listenerID)) |raf| {
        rafListeners.remove(listenerID);
        raf.callback(time, raf.ctx);
    }
}
