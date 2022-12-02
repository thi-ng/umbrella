#!/bin/sh
zig build-lib -target wasm32-freestanding -dynamic -O ReleaseSmall zig/leb128.zig

# apply binaryen optimizer
wasm-opt leb128.wasm -o opt.wasm -Oz

# display as .wast text format
wasm-dis opt.wasm -o opt.wast

# encode as base64
cat << EOF > src/binary.ts
// thing:no-export
/**
 * Generated @ $(date -u +"%Y-%m-%dT%H:%M:%SZ")
 *
 * @internal
 */
export const BINARY = "$(base64 opt.wasm)";
EOF
