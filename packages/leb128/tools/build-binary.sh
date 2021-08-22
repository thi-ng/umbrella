#!/bin/sh
zig build-lib -target wasm32-freestanding -dynamic -O ReleaseSmall --strip src/leb128.zig

# apply binaryen optimizer
wasm-opt leb128.wasm -o opt.wasm -Oz

# display as .wat text format
wasm-dis opt.wasm -o opt.wat

# encode as base64
cat << EOF > src/binary.ts
/**
 * Generated @ $(date -u +"%Y-%m-%dT%H:%M:%SZ")
 *
 * @internal
 */
export const BINARY = "$(base64 opt.wasm)";
EOF
