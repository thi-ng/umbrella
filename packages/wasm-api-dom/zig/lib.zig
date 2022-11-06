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

pub extern "dom" fn _getElementByID(id: [*]const u8) i32;

pub fn getElementByID(id: []const u8) i32 {
    return _getElementByID(id.ptr);
}

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

pub extern "dom" fn _getStringAttribAlloc(elementID: i32, name: [*]const u8, slice: *[]u8) void;

/// Returns string value of attrib for given name and allocates memory for that string
/// Caller owns memory
pub fn getStringAttribAlloc(elementID: i32, name: []const u8) []u8 {
    var addr: []u8 = undefined;
    _getStringAttribAlloc(elementID, name.ptr, &addr);
    return addr;
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

pub extern "dom" fn _setBooleanAttrib(elementID: i32, name: [*]const u8, state: u8) void;

/// Returns numeric value of attrib for given name
pub fn setBooleanAttrib(elementID: i32, name: []const u8, state: bool) void {
    return _setBooleanAttrib(elementID, name.ptr, if (state) 1 else 0);
}

pub extern "dom" fn _getBooleanAttrib(elementID: i32, name: [*]const u8) u8;

/// Returns boolean value of attrib for given name
pub fn getBooleanAttrib(elementID: i32, name: []const u8) bool {
    return if (_getBooleanAttrib(elementID, name.ptr) != 0) true else false;
}

pub extern "dom" fn _addClass(elementID: i32, name: [*]const u8) void;

pub fn addClass(elementID: i32, name: []const u8) void {
    _addClass(elementID, name.ptr);
}

pub extern "dom" fn _removeClass(elementID: i32, name: [*]const u8) void;

pub fn removeClass(elementID: i32, name: []const u8) void {
    _removeClass(elementID, name.ptr);
}

pub extern "dom" fn _setInnerHtml(elementID: i32, html: [*]const u8) void;

/// Sets the `.innerHTML` property of a DOM element to given string
pub fn setInnerHtml(elementID: i32, html: []const u8) void {
    _setInnerHtml(elementID, html.ptr);
}

pub extern "dom" fn _setInnerText(elementID: i32, text: [*]const u8) void;

/// Sets the `.innerText` property of a DOM element to given string
pub fn setInnerText(elementID: i32, text: []const u8) void {
    _setInnerText(elementID, text.ptr);
}
