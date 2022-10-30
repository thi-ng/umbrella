//! Barebones convenience package declarations for hybrid JS/Zig packages
//! distributed via NPM and sourced from a common "node_modules" parent dir

const std = @import("std");

arena: std.heap.ArenaAllocator,
basePath: []const u8,
packages: std.StringArrayHashMap(std.build.Pkg),

const Self = @This();

pub const Pkg = struct {
    /// Package ID used for @import
    id: []const u8,
    /// Package sub path (appended to base path)
    path: []const u8,
    /// Dependencies aka other package IDs.
    /// All of them must already have been registered
    deps: ?[]const []const u8 = null,
};

pub fn init(opts: struct {
    base: []const u8,
    packages: ?[]const Pkg = null,
}) Self {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    var self = Self{
        .arena = arena,
        .basePath = opts.base,
        .packages = std.StringArrayHashMap(std.build.Pkg).init(arena.allocator()),
    };
    const api = "wasmapi";
    self.packages.put(api, .{
        .name = api,
        .source = .{ .path = self.modulePath("@thi.ng/wasm-api/zig/lib.zig") },
    }) catch unreachable;
    if (opts.packages) |pkgs| {
        for (pkgs) |pkg| {
            self.register(pkg.id, pkg.path, pkg.deps);
        }
    }
    return self;
}

pub fn deinit(self: *Self) void {
    self.arena.deinit();
}

pub fn register(
    self: *Self,
    name: []const u8,
    path: []const u8,
    dependencies: ?[]const []const u8,
) void {
    var pkg = std.build.Pkg{
        .name = name,
        .source = .{ .path = self.modulePath(path) },
    };
    const num = if (dependencies) |deps| deps.len else 0;
    var dpkgs = self.arena.allocator().alloc(std.build.Pkg, num + 1) catch unreachable;
    dpkgs[0] = if (self.packages.get("wasmapi")) |api| api else unreachable;
    if (dependencies) |deps| {
        var i: usize = 0;
        while (i < deps.len) : (i += 1) {
            if (self.packages.get(deps[i])) |p| {
                dpkgs[i + 1] = p;
            } else @panic("unknown dependency");
        }
    }
    pkg.dependencies = dpkgs;
    self.packages.put(name, pkg) catch unreachable;
}

pub fn addAllTo(self: *const Self, step: *std.build.LibExeObjStep) void {
    for (self.packages.values()) |pkg| step.addPackage(pkg);
}

fn modulePath(self: *Self, path: []const u8) []const u8 {
    return std.fs.path.join(self.arena.allocator(), &.{ self.basePath, path }) catch unreachable;
}
