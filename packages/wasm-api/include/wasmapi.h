#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>
#include <stdint.h>

// Declares an extern symbol from named import module
// The prefix is only used for the C side, _not_ for exported NAME
#define WASMAPI_IMPORT(MODULE, TYPE, NAME, PREFIX) \
  extern __attribute__((import_module(MODULE), import_name(#NAME))) TYPE PREFIX##NAME

// Same as EMSCRIPTEN_KEEP_ALIVE, ensures symbol will be exported
#define WASMAPI_KEEP __attribute__((used))

// Generate malloc/free wrappers only if explicitly enabled by defining this
// symbol. If undefined some function stubs are exported.
#ifdef WASMAPI_MALLOC

#include <stdlib.h>
size_t WASMAPI_KEEP _wasm_allocate(size_t numBytes) {
  return (size_t)malloc(numBytes);
}
void WASMAPI_KEEP _wasm_free(size_t addr, size_t numBytes) {
  free((void*)addr);
}

#else

size_t WASMAPI_KEEP _wasm_allocate(size_t numBytes) {
  return 0;
}
void WASMAPI_KEEP _wasm_free(size_t addr, size_t numBytes) {
}

#endif  // WASMAPI_MALLOC

WASMAPI_IMPORT("wasmapi", void, printI8, wasm_)(int8_t x);
WASMAPI_IMPORT("wasmapi", void, printU8, wasm_)(uint8_t x);
WASMAPI_IMPORT("wasmapi", void, printU8Hex, wasm_)(uint8_t x);
WASMAPI_IMPORT("wasmapi", void, printI16, wasm_)(int16_t x);
WASMAPI_IMPORT("wasmapi", void, printU16, wasm_)(uint16_t x);
WASMAPI_IMPORT("wasmapi", void, printU16Hex, wasm_)(uint16_t x);
WASMAPI_IMPORT("wasmapi", void, printI32, wasm_)(int32_t x);
WASMAPI_IMPORT("wasmapi", void, printU32, wasm_)(uint32_t x);
WASMAPI_IMPORT("wasmapi", void, printU32Hex, wasm_)(uint32_t x);
WASMAPI_IMPORT("wasmapi", void, printI64, wasm_)(int64_t x);
WASMAPI_IMPORT("wasmapi", void, printU64, wasm_)(uint64_t x);
WASMAPI_IMPORT("wasmapi", void, printU64Hex, wasm_)(uint64_t x);
WASMAPI_IMPORT("wasmapi", void, printF32, wasm_)(float x);
WASMAPI_IMPORT("wasmapi", void, printF64, wasm_)(double x);

WASMAPI_IMPORT("wasmapi", void, printHexdump, wasm_)(const void* addr, size_t len);

WASMAPI_IMPORT("wasmapi", void, _printI8Array, wasm)(const int8_t* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printU8Array, wasm)(const uint8_t* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printI16Array, wasm)(const int16_t* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printU16Array, wasm)(const uint16_t* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printI32Array, wasm)(const int32_t* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printU32Array, wasm)(const uint32_t* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printI64Array, wasm)(const int64_t* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printU64Array, wasm)(const uint64_t* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printF32Array, wasm)(const float* addr, size_t len);
WASMAPI_IMPORT("wasmapi", void, _printF64Array, wasm)(const double* addr, size_t len);

WASMAPI_IMPORT("wasmapi", void, printStrZ, wasm_)(const char* addr);
WASMAPI_IMPORT("wasmapi", void, _printStr, wasm)(const char* addr, size_t len);

WASMAPI_IMPORT("wasmapi", void, debug, wasm_)(void);
WASMAPI_IMPORT("wasmapi", void, panic, wasm_)(const char*, size_t len);

WASMAPI_IMPORT("wasmapi", double, timer, wasm_)(void);
WASMAPI_IMPORT("wasmapi", uint64_t, epoch, wasm_)(void);

void wasm_printPtr(const void* ptr) {
  wasm_printU32Hex((size_t)ptr);
}

#ifdef __cplusplus
}
#endif
