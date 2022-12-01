const std = @import("std");

/// Definition for a (usually hybrid) Zig package which will be distributed via NPM
pub const Pkg = struct {
    /// Package ID used for @import
    id: []const u8,
    /// Package sub path (appended to base path)
    path: []const u8,
    /// Package dependencies aka other package IDs.
    /// All of them must already have been registered
    deps: ?[]const []const u8 = null,
};

pub const PkgOpts = struct {
    /// Base path to common node_modules directory under which
    /// all to be imported packages are located
    base: []const u8 = "node_modules",
    /// Additional WASM API support packages.
    /// We don't need to specify core wasmapi, only custom/extra ones
    /// `wasm-api` and `wasm-api-bindgen` are also auto-added
    /// as dependency for each of these...
    packages: ?[]const Pkg = null,
};

/// Dependency graph for WASM API packages
/// Expands & resolves the more compact/convenient/human friendly format of PkgOpts
/// into the data structures used by Zig's build system
/// Provides a `addAllTo()` function to add all declared packages to a build step
pub const PkgGraph = struct {
    arena: std.heap.ArenaAllocator,
    basePath: []const u8,
    packages: std.StringArrayHashMap(std.build.Pkg),

    const Self = @This();

    pub fn init(opts: PkgOpts) Self {
        var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
        var self = Self{
            .arena = arena,
            .basePath = opts.base,
            .packages = std.StringArrayHashMap(std.build.Pkg).init(arena.allocator()),
        };
        const api = "wasm-api";
        self.packages.put(api, .{
            .name = api,
            .source = .{ .path = self.modulePath("@thi.ng/wasm-api/zig/lib.zig") },
        }) catch unreachable;
        const apiTypes = "wasm-api-bindgen";
        self.packages.put(apiTypes, .{
            .name = apiTypes,
            .source = .{ .path = self.modulePath("@thi.ng/wasm-api-bindgen/zig/lib.zig") },
        }) catch unreachable;
        if (opts.packages) |pkgs| {
            for (pkgs) |pkg| {
                self.register(pkg.id, pkg.path, pkg.deps);
            }
        }
        return self;
    }

    pub fn deinit(self: *const Self) void {
        self.arena.deinit();
    }

    /// Registers a single package and its deps (also injects core wasm-api deps)
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
        var dpkgs = self.arena.allocator().alloc(std.build.Pkg, num + 2) catch unreachable;
        dpkgs[0] = if (self.packages.get("wasm-api")) |p| p else unreachable;
        dpkgs[1] = if (self.packages.get("wasm-api-bindgen")) |p| p else unreachable;
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

    /// Adds all registered packages to the given build step
    pub fn addAllTo(self: *const Self, step: *std.build.LibExeObjStep) void {
        for (self.packages.values()) |pkg| step.addPackage(pkg);
    }

    fn modulePath(self: *Self, path: []const u8) []const u8 {
        return std.fs.path.join(self.arena.allocator(), &.{ self.basePath, path }) catch unreachable;
    }
};

/// Config options
pub const WasmLibOpts = struct {
    /// Relative path to base directory for WASM API packages
    base: []const u8 = "node_modules",
    /// Relative path to root source file
    root: []const u8 = "zig/main.zig",
    /// Relative path to output directory
    out: []const u8 = "src",
    /// Package definitions for additional WASM API modules
    packages: ?[]const Pkg = null,
    /// Build mode override (else allows config via CLI args)
    mode: ?std.builtin.Mode = null,
    /// Additional WASM target features, e.g. `.simd128` to enable SIMD
    features: ?[]const std.Target.wasm.Feature = null,
};

/// Creates and returns a build step to build a dynamic WASM library, configured
/// with given options and package declarations. The given package specs will be inserted
pub fn wasmLib(b: *std.build.Builder, opts: WasmLibOpts) *std.build.LibExeObjStep {
    const lib = b.addSharedLibrary("main", opts.root, .unversioned);
    lib.setTarget(.{
        .cpu_arch = .wasm32,
        .os_tag = .freestanding,
        .cpu_features_add = if (opts.features) |features| std.Target.wasm.featureSet(features) else std.Target.Cpu.Feature.Set.empty,
    });
    const mode = if (opts.mode) |m| m else b.standardReleaseOptions();
    lib.setBuildMode(mode);
    if (mode == .ReleaseSmall or mode == .ReleaseFast) lib.strip = true;
    const pkgs = PkgGraph.init(.{ .base = opts.base, .packages = opts.packages });
    defer pkgs.deinit();
    pkgs.addAllTo(lib);
    lib.setOutputDir(opts.out);
    return lib;
}
