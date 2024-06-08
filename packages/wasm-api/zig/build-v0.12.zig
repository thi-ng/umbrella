//! Build helpers for using modules/packages distributed via NPM
//! Intended for use with https://thi.ng/wasm-api and support packages
//!
//! This version of the script is only compatible with:
//! Zig v0.12.0
//!
//! Use other build.zig files in this same directory for older Zig versions

const std = @import("std");
const Build = std.Build;

/// Config options
pub const WasmLibOpts = struct {
    /// Base path to common node_modules directory under which
    /// all to be imported modules are located
    base: []const u8 = "node_modules",
    /// Relative path to root source file
    root: []const u8 = "zig/main.zig",
    /// Additional WASM API support modules.
    /// Only need to specify custom/extra modules
    /// `wasm-api` and `wasm-api-bindgen` are auto-added as dependency for all...
    modules: ?[]const ModuleSpec = null,
    /// Build mode override (else allows config via CLI args)
    optimize: ?std.builtin.Mode = null,
    /// Additional WASM target features, e.g. `.simd128` to enable SIMD
    features: ?[]const std.Target.wasm.Feature = null,
    /// Initial memory (in bytes, MUST be multiple of 0x10000)
    initialMemory: ?u64 = null,
    /// Max memory (in bytes, MUST be multiple of 0x10000)
    maxMemory: ?u64 = null,
    // If true, build will also generate docs
    // docs: bool = false,
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

const wasmapi = "wasm-api";
const wasmbind = "wasm-api-bindgen";

/// Creates and returns a build step to build a dynamic WASM library, configured
/// with given options and package declarations. The given package specs will be inserted
pub fn wasmLib(b: *Build, opts: WasmLibOpts) *Build.Step.Compile {
    const optimize = if (opts.optimize) |m| m else b.standardOptimizeOption(.{});
    const lib = b.addExecutable(.{
        .name = "main",
        .root_source_file = .{ .path = opts.root },
        .target = b.resolveTargetQuery(
            .{
                .cpu_arch = .wasm32,
                .os_tag = .freestanding,
                .cpu_features_add = if (opts.features) |features| std.Target.wasm.featureSet(features) else std.Target.Cpu.Feature.Set.empty,
            },
        ),
        .optimize = optimize,
        .strip = (optimize == .ReleaseSmall or optimize == .ReleaseFast),
    });

    // build flags
    // https://github.com/ziglang/zig/pull/17815
    lib.entry = .disabled;
    lib.rdynamic = true;
    lib.import_symbols = true;
    lib.initial_memory = opts.initialMemory;
    lib.max_memory = opts.maxMemory;

    // add default dependencies
    // https://ziggit.dev/t/what-happened-to-addmodule/2908/3
    _ = lib.root_module.addImport(
        wasmapi,
        b.createModule(.{
            .root_source_file = modulePath(b.allocator, opts.base, "@thi.ng/wasm-api/zig/lib.zig"),
        }),
    );
    _ = lib.root_module.addImport(
        wasmbind,
        b.createModule(.{
            .root_source_file = modulePath(b.allocator, opts.base, "@thi.ng/wasm-api-bindgen/zig/lib.zig"),
        }),
    );
    if (opts.modules) |modules| {
        for (modules) |mod| register(lib, mod, opts);
    }
    return lib;
}

/// Registers a single package and its deps (also injects core wasm-api deps)
pub fn register(lib: *Build.Step.Compile, mod: ModuleSpec, opts: WasmLibOpts) void {
    const num = if (mod.dependencies) |ids| ids.len else 0;
    var dpkgs = lib.step.owner.allocator.alloc(Build.Module.Import, num + 2) catch unreachable;
    dpkgs[0] = if (lib.root_module.import_table.get(wasmapi)) |m| .{ .name = wasmapi, .module = m } else unreachable;
    dpkgs[1] = if (lib.root_module.import_table.get(wasmbind)) |m| .{ .name = wasmbind, .module = m } else unreachable;
    var i: usize = 2;
    if (mod.dependencies) |ids| {
        for (ids) |id| {
            if (lib.root_module.import_table.get(id)) |m| {
                if (isDuplicateId(dpkgs[0..i], id)) {
                    std.log.info("ignoring duplicate dependency: {s}", .{id});
                    continue;
                }
                dpkgs[i] = .{ .name = id, .module = m };
                i += 1;
            } else @panic("unknown dependency");
        }
    }
    _ = lib.root_module.addImport(mod.name, lib.step.owner.createModule(.{
        .root_source_file = modulePath(lib.step.owner.allocator, opts.base, mod.path),
        .imports = dpkgs[0..i],
    }));
}

fn isDuplicateId(deps: []Build.Module.Import, name: []const u8) bool {
    for (deps) |d| {
        if (std.mem.eql(u8, d.name, name)) return true;
    }
    return false;
}

fn modulePath(allocator: std.mem.Allocator, base: []const u8, path: []const u8) Build.LazyPath {
    return .{ .path = std.fs.path.join(allocator, &.{ base, path }) catch unreachable };
}
