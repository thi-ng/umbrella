#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>
#include <stdint.h>

// Declares an imported symbol from named import module
// The prefix is only used for the C side, NOT for exported name
#define WASM_IMPORT(MODULE, TYPE, NAME, PREFIX)                     \
  extern __attribute__((import_module(MODULE), import_name(#NAME))) \
  TYPE PREFIX##NAME

// Same as EMSCRIPTEN_KEEP_ALIVE, ensures symbol will be exported
#define WASM_KEEP __attribute__((used))

// Generate malloc/free wrappers only if explicitly enabled by defining this
// symbol. If undefined some function stubs are exported.
#ifdef WASMAPI_MALLOC
#include <stdlib.h>
size_t WASM_KEEP _wasm_allocate(size_t numBytes) {
  return (size_t)malloc(numBytes);
}
void WASM_KEEP _wasm_free(size_t addr) { free((void*)addr); }
#else
size_t WASM_KEEP _wasm_allocate(size_t num_bytes) { return 0; }
void WASM_KEEP _wasm_free(size_t addr) {}
#endif

WASM_IMPORT("wasmapi", void, printI8, wasm_)(int8_t x);
WASM_IMPORT("wasmapi", void, printU8, wasm_)(uint8_t x);
WASM_IMPORT("wasmapi", void, printU8Hex, wasm_)(uint8_t x);
WASM_IMPORT("wasmapi", void, printI16, wasm_)(int16_t x);
WASM_IMPORT("wasmapi", void, printU16, wasm_)(uint16_t x);
WASM_IMPORT("wasmapi", void, printU16Hex, wasm_)(uint16_t x);
WASM_IMPORT("wasmapi", void, printI32, wasm_)(int32_t x);
WASM_IMPORT("wasmapi", void, printU32, wasm_)(uint32_t x);
WASM_IMPORT("wasmapi", void, printU32Hex, wasm_)(uint32_t x);
WASM_IMPORT("wasmapi", void, printI64, wasm_)(int64_t x);
WASM_IMPORT("wasmapi", void, printU64, wasm_)(uint64_t x);
WASM_IMPORT("wasmapi", void, printU64Hex, wasm_)(uint64_t x);
WASM_IMPORT("wasmapi", void, printF32, wasm_)(float x);
WASM_IMPORT("wasmapi", void, printF64, wasm_)(double x);

WASM_IMPORT("wasmapi", void, _printI8Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printU8Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printI16Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printU16Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printI32Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printU32Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printI64Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printU64Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printF32Array, wasm)(void* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printF64Array, wasm)(void* addr, size_t len);

WASM_IMPORT("wasmapi", void, _printStr0, wasm)(void* addr);
WASM_IMPORT("wasmapi", void, _printStr, wasm)(void* addr, size_t len);

WASM_IMPORT("wasmapi", void, debug, wasm_)(void);

void wasm_printPtr(void* ptr) { wasm_printU32Hex((size_t)ptr); }

#ifdef __cplusplus
}
#endif
