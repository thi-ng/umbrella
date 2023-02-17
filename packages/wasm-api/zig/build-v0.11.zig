//! Build helpers for using modules/packages distributed via NPM
//! Intended for use with https://thi.ng/wasm-api and support packages
//!
//! This version of the script is only compatible with:
//! Zig v0.11.0-dev.1622+fc48467a9 or newer
//!
//! Use build.zig (in this same directory) for earlier Zig versions

const std = @import("std");
const Build = std.Build;

/// Config options
pub const WasmLibOpts = struct {
    /// Base path to common node_modules directory under which
    /// all to be imported modules are located
    base: []const u8 = "node_modules",
    /// Relative path to root source file
    root: []const u8 = "zig/main.zig",
    /// Relative path to output directory
    out: []const u8 = "src",
    /// Additional WASM API support modules.
    /// Only need to specify custom/extra modules
    /// `wasm-api` and `wasm-api-bindgen` are auto-added as dependency for all...
    modules: ?[]const ModuleSpec = null,
    /// Build mode override (else allows config via CLI args)
    mode: ?std.builtin.Mode = null,
    /// Additional WASM target features, e.g. `.simd128` to enable SIMD
    features: ?[]const std.Target.wasm.Feature = null,
    /// Initial memory (in bytes, MUST be multiple of 0x10000)
    initialMemory: ?u64 = null,
    /// Max memory (in bytes, MUST be multiple of 0x10000)
    maxMemory: ?u64 = null,
};

/// WASM API sub-module declaration
pub const ModuleSpec = struct {
    /// module import name/ID
    name: []const u8,
    /// Relative path to configured base path
    path: []const u8,
    /// Module IDs of other modules this module depends on
    /// Only need to specify custom/extra modules
    /// `wasm-api` and `wasm-api-bindgen` are auto-added as dependency for all...
    dependencies: ?[]const []const u8 = null,
};

/// Creates and returns a build step to build a dynamic WASM library, configured
/// with given options and package declarations. The given package specs will be inserted
pub fn wasmLib(b: *Build, opts: WasmLibOpts) *Build.CompileStep {
    const lib = b.addSharedLibrary(.{
        .name = "main",
        .root_source_file = .{ .path = "zig/main.zig" },
        .target = .{
            .cpu_arch = .wasm32,
            .os_tag = .freestanding,
            .cpu_features_add = if (opts.features) |features| std.Target.wasm.featureSet(features) else std.Target.Cpu.Feature.Set.empty,
        },
        .optimize = if (opts.mode) |m| m else b.standardOptimizeOption(.{}),
    });
    if (lib.optimize == .ReleaseSmall or lib.optimize == .ReleaseFast) lib.strip = true;
    lib.setOutputDir(opts.out);
    lib.rdynamic = true;
    lib.import_symbols = true;
    lib.initial_memory = opts.initialMemory;
    lib.max_memory = opts.maxMemory;
    lib.addModule(
        "wasm-api",
        b.createModule(.{
            .source_file = modulePath(b.allocator, opts.base, "@thi.ng/wasm-api/zig/lib.zig"),
        }),
    );
    lib.addModule(
        "wasm-api-bindgen",
        b.createModule(.{
            .source_file = modulePath(b.allocator, opts.base, "@thi.ng/wasm-api-bindgen/zig/lib.zig"),
        }),
    );
    if (opts.modules) |modules| {
        for (modules) |mod| {
            register(lib, mod, opts);
        }
    }
    return lib;
}

/// Registers a single package and its deps (also injects core wasm-api deps)
pub fn register(step: *Build.CompileStep, mod: ModuleSpec, opts: WasmLibOpts) void {
    const num = if (mod.dependencies) |ids| ids.len else 0;
    var dpkgs = step.builder.allocator.alloc(Build.ModuleDependency, num + 2) catch unreachable;
    dpkgs[0] = if (step.modules.get("wasm-api")) |m| .{ .name = "wasm-api", .module = m } else unreachable;
    dpkgs[1] = if (step.modules.get("wasm-api-bindgen")) |m| .{ .name = "wasm-api-bindgen", .module = m } else unreachable;
    var i: usize = 2;
    if (mod.dependencies) |ids| {
        for (ids) |id| {
            if (step.modules.get(id)) |m| {
                if (isDuplicateId(dpkgs[0..i], id)) {
                    std.log.info("ignoring duplicate dependency: {s}", .{id});
                    continue;
                }
                dpkgs[i] = .{ .name = id, .module = m };
                i += 1;
            } else @panic("unknown dependency");
        }
    }
    step.addModule(mod.name, step.builder.createModule(.{
        .source_file = modulePath(step.builder.allocator, opts.base, mod.path),
        .dependencies = dpkgs[0..i],
    }));
}

fn isDuplicateId(deps: []Build.ModuleDependency, name: []const u8) bool {
    for (deps) |d| {
        if (std.mem.eql(u8, d.name, name)) return true;
    }
    return false;
}

fn modulePath(allocator: std.mem.Allocator, base: []const u8, path: []const u8) Build.FileSource {
    return .{ .path = std.fs.path.join(allocator, &.{ base, path }) catch unreachable };
}
