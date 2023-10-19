#!/bin/sh
BUILD=zig-out/lib

zig build

# apply binaryen optimizer
wasm-opt $BUILD/leb128.wasm -o $BUILD/opt.wasm -Oz

# display as .wast text format
wasm-dis $BUILD/opt.wasm -o $BUILD/opt.wast

# encode as base64
cat << EOF > src/binary.ts
// thing:no-export
/**
 * Generated @ $(date -u +"%Y-%m-%dT%H:%M:%SZ")
 *
 * @internal
 */
export const BINARY = "$(base64 -i $BUILD/opt.wasm)";
EOF
