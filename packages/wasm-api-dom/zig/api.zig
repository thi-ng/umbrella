//! Generated by @thi.ng/wasm-api-bindgen at 2024-08-17T15:49:39.199Z
//! DO NOT EDIT!

const std = @import("std");
const bindgen = @import("wasm-api-bindgen");

pub const CreateElementOptsSlice = bindgen.Slice([]CreateElementOpts, [*]CreateElementOpts);
pub const ConstCreateElementOptsSlice = bindgen.Slice([]const CreateElementOpts, [*]const CreateElementOpts);

pub const AttribSlice = bindgen.Slice([]Attrib, [*]Attrib);
pub const ConstAttribSlice = bindgen.Slice([]const Attrib, [*]const Attrib);

/// Syntax sugar for: `ConstCreateElementOptsSlice.wrap()`
pub inline fn children(items: []const CreateElementOpts) ConstCreateElementOptsSlice {
    return ConstCreateElementOptsSlice.wrap(items);
}

/// Syntax sugar for: `ConstAttribSlice.wrap()`
pub inline fn attribs(items: []const Attrib) ConstAttribSlice {
    return ConstAttribSlice.wrap(items);
}

pub const EventType = enum(i32) {
    unkown = -1,
    drag,
    focus,
    input,
    key,
    mouse,
    pointer,
    scroll,
    touch,
    wheel,
};

pub const MouseButton = enum(u8) {
    none,
    primary = 1,
    secondary = 2,
    middle = 4,
};

pub const PointerType = enum(u8) {
    mouse,
    pen,
    touch,
};

pub const WheelDeltaMode = enum(u8) {
    pixel,
    line,
    page,
};

pub const KeyModifier = enum(u8) {
    shift = 1,
    ctrl = 2,
    alt = 4,
    meta = 8,
};

/// Various browser window related information [TODO]
pub const WindowInfo = extern struct {
    innerWidth: u16,
    innerHeight: u16,
    /// Horizontal scroll offset in fractional CSS pixels
    scrollX: f32,
    /// Vertical scroll offset in fractional CSS pixels
    scrollY: f32,
    /// Current device pixel ratio
    dpr: u8,
    /// Encoded bitmask indicating fullscreen status / capability:
    /// - 1 (bit 0): fullscreen active
    /// - 2 (bit 1): fullscreen supported
    fullscreen: u8,
    
    /// Returns true if fullscreen mode is currently active (see `.fullscreen`)
    pub inline fn isFullscreen(self: *const WindowInfo) bool {
        return self.fullscreen & 1 != 0;
    }
    
    /// Returns true if fullscreen mode is supported (see `.fullscreen`)
    pub inline fn hasFullscreen(self: *const WindowInfo) bool {
        return self.fullscreen & 2 != 0;
    }
    
};

pub const DragEvent = extern struct {
    /// Mouse X position in the local space of the element's bounding rect
    clientX: i16 = 0,
    /// Mouse Y position in the local space of the element's bounding rect
    clientY: i16 = 0,
    /// If non-zero, data that is being dragged during a drag & drop operation can
    /// be obtained via various DnD related API calls (only available when called
    /// from event handler).
    isDataTransfer: u8 = 0,
    /// Encoded bitmask of currently pressed modifier keys, see `KeyModifier` enum
    modifiers: u8 = 0,
    /// Encoded bitmask of all currently pressed mouse buttons, see `MouseButton`
    /// enum
    buttons: u8 = 0,
    /// Event related mouse button ID (if any)
    button: MouseButton,
};

pub const InputEvent = extern struct {
    /// Value of the targeted input element.
    /// The memory is owned by the DOM API and will be freed immediately after the
    /// event handler has returned.
    value: bindgen.ConstStringPtr,
    /// Length of the value string
    len: u32,
    /// Encoded bitmask of currently pressed modifier keys, see `KeyModifier` enum
    modifiers: u8 = 0,
    
    pub inline fn getValue(self: *const InputEvent) [:0]const u8 {
        return self.value[0..self.len :0];
    }
    
};

pub const KeyEvent = extern struct {
    /// Value/name of the key pressed
    key: [15:0]u8,
    /// Number of characters of the `key` string
    len: u8 = 0,
    /// Encoded bitmask of currently pressed modifier keys, see `KeyModifier` enum
    modifiers: u8 = 0,
    /// Non-zero value indicates key is being held down such that it's automatically
    /// repeating
    repeat: u8 = 0,
    
    pub inline fn getKey(self: *const KeyEvent) [:0]const u8 {
        return self.key[0..@as(usize, self.len) :0];
    }
    
    pub inline fn hasModifier(self: *const KeyEvent, mod: KeyModifier) bool {
        return self.modifiers & @intFromEnum(mod) != 0;
    }
    
};

pub const MouseEvent = extern struct {
    /// Mouse X position in the local space of the element's bounding rect
    clientX: i16 = 0,
    /// Mouse Y position in the local space of the element's bounding rect
    clientY: i16 = 0,
    /// Encoded bitmask of currently pressed modifier keys, see `KeyModifier` enum
    modifiers: u8 = 0,
    /// Encoded bitmask of all currently pressed mouse buttons, see `MouseButton`
    /// enum
    buttons: u8 = 0,
    /// Event related mouse button ID (if any)
    button: MouseButton,
};

pub const PointerEvent = extern struct {
    /// Mouse X position in the local space of the element's bounding rect
    clientX: i16 = 0,
    /// Mouse Y position in the local space of the element's bounding rect
    clientY: i16 = 0,
    /// Unique pointer ID
    id: u32 = 0,
    /// Normalized pressure value 0..1
    pressure: f32 = 0,
    /// The plane angle (in degrees, in the range of -90 to 90) between the Y-Z
    /// plane and the plane containing both the pointer (e.g. pen stylus) axis and
    /// the Y axis.
    tiltX: i8 = 0,
    /// The plane angle (in degrees, in the range of -90 to 90) between the X-Z
    /// plane and the plane containing both the pointer (e.g. pen stylus) axis and
    /// the X axis.
    tiltY: i8 = 0,
    /// The clockwise rotation of the pointer (e.g. pen stylus) around its major
    /// axis in degrees, with a value in the range 0 to 359.
    twist: u16 = 0,
    pointerType: PointerType,
    /// Non-zero if event's pointer is the primary pointer (in a multitouch
    /// scenario)
    isPrimary: u8,
    /// Encoded bitmask of currently pressed modifier keys, see `KeyModifier` enum
    modifiers: u8 = 0,
    /// Encoded bitmask of all currently pressed mouse buttons, see `MouseButton`
    /// enum
    buttons: u8 = 0,
    /// Event related mouse button ID (if any)
    button: MouseButton,
};

pub const ScrollEvent = extern struct {
    /// Horizontal scroll offset in fractional CSS pixels.
    scrollX: f32,
    /// Vertical scroll offset in fractional CSS pixels.
    scrollY: f32,
};

pub const TouchEvent = extern struct {
    /// Touch X position in the local space of the element's bounding rect
    clientX: i16 = 0,
    /// Touch Y position in the local space of the element's bounding rect
    clientY: i16 = 0,
    /// Encoded bitmask of currently pressed modifier keys, see `KeyModifier` enum
    modifiers: u8 = 0,
};

pub const WheelEvent = extern struct {
    /// Scroll X delta
    deltaX: i16 = 0,
    /// Scroll Y delta
    deltaY: i16 = 0,
    /// Scroll Z delta
    deltaZ: i16 = 0,
    /// Delta mode
    mode: WheelDeltaMode,
    /// Encoded bitmask of currently pressed modifier keys, see `KeyModifier` enum
    modifiers: u8 = 0,
    /// Encoded bitmask of currently pressed mouse buttons, see `MouseButton` enum
    buttons: u8 = 0,
};

pub const EventBody = extern union {
    drag: DragEvent,
    input: InputEvent,
    key: KeyEvent,
    mouse: MouseEvent,
    pointer: PointerEvent,
    scroll: ScrollEvent,
    touch: TouchEvent,
    wheel: WheelEvent,
};

pub const Event = extern struct {
    id: EventType,
    /// Target element ID, > 1 if a known (WASM created) element, otherwise:
    /// 
    /// - -2: = unknown
    /// - -1: window
    /// - 0: document.head
    /// - 1: document.body
    target: i32,
    /// Event details / payload. Currently, only the following event types have a
    /// defined body:
    /// 
    /// - drag
    /// - input
    /// - key
    /// - mouse
    /// - pointer
    /// - scroll
    /// - touch
    /// - wheel
    body: EventBody,
};

pub const EventCallback = *const fn (event: *const Event, ctx: ?bindgen.OpaquePtr) callconv(.C) void;

/// Function signature for RAF (requestAnimationFrame) event handler
pub const RAFCallback = *const fn (time: f64, ctx: ?bindgen.OpaquePtr) callconv(.C) void;

/// DOM event listener
pub const EventListener = extern struct {
    /// Event listener function. Takes an event and optional pointer to user
    /// supplied arbitrary context data provided when registering the handler via
    /// `addListener()`
    callback: EventCallback,
    /// Optional type erased pointer to arbitrary user context. This pointer can be
    /// cast back into the desired type using this form:
    /// `@ptrCast(?*Foo, @alignCast(@alignOf(Foo), raw))`
    /// Also see: `wasmapi.ptrCast()`
    ctx: ?bindgen.OpaquePtr = null,
};

/// RAF event listener
pub const RAFListener = extern struct {
    /// Animation frame listener function. Takes an hires timestamp and optional
    /// pointer to user supplied arbitrary context data provided when registering
    /// the handler via `requestAnimationFrame()`
    callback: RAFCallback,
    /// Optional type erased pointer to arbitrary user context. This pointer can be
    /// cast back into the desired type using this form:
    /// `@ptrCast(?*Foo, @alignCast(@alignOf(Foo), raw))`
    /// Also see: `wasmapi.ptrCast()`
    ctx: ?bindgen.OpaquePtr = null,
};

/// Data structure used for declarative creation of DOM elements / trees (passed
/// to `createElement()`)
/// Also see `CreateCanvasOpts` for canvas specific use cases
pub const CreateElementOpts = extern struct {
    /// DOM element name
    tag: bindgen.ConstStringPtr,
    /// Namespace URI or wellknown registered alias (e.g. svg, xlink, xmlns)
    ns: bindgen.ConstStringPtr = "",
    /// ID attrib
    id: bindgen.ConstStringPtr = "",
    /// Element class attrib
    class: bindgen.ConstStringPtr = "",
    /// Element inner text body
    text: bindgen.ConstStringPtr = "",
    /// Element inner HTML body
    html: bindgen.ConstStringPtr = "",
    /// Parent element ID. If >=0 the new element will be attached to that parent
    /// element. Set to -1 to leave new element unattached (default unless nested)
    parent: i32 = -1,
    /// Insertion index for new element or -1 to append (default)
    index: i32 = -1,
    /// Optional slice of child element specs, which will be automatically attached
    /// as children to this element (their `parent` ID will be ignored)
    children: ConstCreateElementOptsSlice = children(&[_]CreateElementOpts{}),
    /// Optional slice of attribute definitions for this element. Also see provided
    /// `Attrib` factory functions for convenience.
    attribs: ConstAttribSlice = attribs(&[_]Attrib{}),
};

/// Data structure used for declarative creation of canvas elements (passed to
/// `createCanvas()`)
pub const CreateCanvasOpts = extern struct {
    /// Canvas width (in CSS pixels)
    width: u16,
    /// Canvas height (in CSS pixels)
    height: u16,
    /// Element ID attrib
    id: bindgen.ConstStringPtr = "",
    /// Element class attrib
    class: bindgen.ConstStringPtr = "",
    /// Same as CreateElementOpts.parent
    parent: i32,
    /// Same as CreateElementOpts.index
    index: i32 = -1,
    /// Device pixel ratio for computing physical pixel dimensions, see
    /// `getWindowInfo()`
    dpr: u8 = 1,
    /// Optional slice of attribute definitions for this element. Also see provided
    /// `Attrib` factory functions for convenience.
    attribs: ConstAttribSlice = attribs(&[_]Attrib{}),
};

/// DOM element attribute definition given as part of `CreateElementOpts`
pub const Attrib = extern struct {
    name: bindgen.ConstStringPtr,
    value: AttribValue,
    kind: AttribType,
    
    pub fn event(name: [*:0]const u8, callback: EventCallback, ctx: ?*anyopaque) Attrib {
        return Attrib{ .name = name, .kind = .event, .value = .{ .event = .{ .callback = callback, .ctx = ctx } } };
    }
    
    pub fn flag(name: [*:0]const u8, val: bool) Attrib {
        return Attrib{ .name = name, .kind = .flag, .value = .{ .flag = if (val) 1 else 0 } };
    }
    
    pub fn number(name: [*:0]const u8, val: f64) Attrib {
        return Attrib{ .name = name, .kind = .num, .value = .{ .num = val } };
    }
    
    pub fn string(name: [*:0]const u8, val: [*:0]const u8) Attrib {
        return Attrib{ .name = name, .kind = .str, .value = .{ .str = val } };
    }
    
};

pub const AttribValue = extern union {
    event: EventListener,
    flag: u8,
    num: f64,
    str: bindgen.ConstStringPtr,
};

pub const AttribType = enum(u8) {
    event,
    flag,
    num,
    str,
};
