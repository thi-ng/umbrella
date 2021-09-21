yarn asc assembly/index.ts -b simd.wasm -t simd.wat --optimize --enable simd --runtime stub --importMemory --memoryBase 0

# apply binaryen optimizer
wasm-opt simd.wasm -o opt.wasm -Oz

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
