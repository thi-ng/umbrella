const wasm = @import("wasmapi");
const dom = @import("api.zig");
const event = @import("events.zig");
const fullscreen = @import("fullscreen.zig");

pub usingnamespace dom;
pub usingnamespace event;
pub usingnamespace fullscreen;

/// Reserved reference handle for the browser window itself (e.g. used for event targets)
pub const window: i32 = -1;
/// Reserved reference handle for `document.head`
pub const head: i32 = 0;
/// Reserved reference handle for `document.body`
pub const body: i32 = 1;

pub const DOMError = error{
    InvalidID,
};

export fn _dom_init() void {
    if (wasm.allocator()) |allocator| {
        wasm.printStr("dom using root allocator");
        event.init(allocator);
    }
}

pub extern "dom" fn getWindowInfo(desc: *dom.WindowInfo) void;

pub extern "dom" fn getElementByID(id: [*:0]const u8) i32;

pub extern "dom" fn createElement(opts: *const dom.CreateElementOpts) i32;

pub extern "dom" fn removeElement(elementID: i32) bool;

pub extern "dom" fn createCanvas(opts: *const dom.CreateCanvasOpts) i32;

pub extern "dom" fn setCanvasSize(elementID: i32, width: u16, height: u16, dpr: u8) void;

/// Sets attrib for given name to string val
pub extern "dom" fn setStringAttrib(elementID: i32, name: [*:0]const u8, val: [*:0]const u8) void;

pub extern "dom" fn _getStringAttrib(elementID: i32, name: [*:0]const u8, val: [*:0]u8, maxBytes: usize) usize;

/// Returns string value of attrib for given name
pub fn getStringAttrib(elementID: i32, name: [*:0]const u8, val: [:0]u8) [:0]u8 {
    return val[0.._getStringAttrib(elementID, name, val.ptr, val.len + 1)];
}

pub extern "dom" fn _getStringAttribAlloc(elementID: i32, name: [*:0]const u8, slice: *[:0]u8) void;

/// Returns string value of attrib for given name and allocates memory for that string
/// Caller owns memory
pub fn getStringAttribAlloc(elementID: i32, name: [*:0]const u8) [:0]u8 {
    var addr: [:0]u8 = undefined;
    _getStringAttribAlloc(elementID, name, &addr);
    return addr;
}

/// Sets attrib for given name to numeric val
pub extern "dom" fn setNumericAttrib(elementID: i32, name: [*:0]const u8, val: f64) void;

/// Returns numeric value of attrib for given name
pub extern "dom" fn getNumericAttrib(elementID: i32, name: [*:0]const u8) f64;

pub extern "dom" fn _setBooleanAttrib(elementID: i32, name: [*:0]const u8, state: u8) void;

/// Returns numeric value of attrib for given name
pub fn setBooleanAttrib(elementID: i32, name: [*:0]const u8, state: bool) void {
    return _setBooleanAttrib(elementID, name, if (state) 1 else 0);
}

pub extern "dom" fn _getBooleanAttrib(elementID: i32, name: [*:0]const u8) u8;

/// Returns boolean value of attrib for given name
pub fn getBooleanAttrib(elementID: i32, name: [*:0]const u8) bool {
    return if (_getBooleanAttrib(elementID, name) != 0) true else false;
}

pub extern "dom" fn addClass(elementID: i32, name: [*:0]const u8) void;

pub extern "dom" fn removeClass(elementID: i32, name: [*:0]const u8) void;

// Sets the `.innerHTML` property of a DOM element to given string
pub extern "dom" fn setInnerHtml(elementID: i32, html: [*:0]const u8) void;

// Sets the `.innerText` property of a DOM element to given string
pub extern "dom" fn setInnerText(elementID: i32, text: [*:0]const u8) void;
