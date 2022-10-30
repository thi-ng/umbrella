pub const FullscreenCallback = *const fn () void;

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
