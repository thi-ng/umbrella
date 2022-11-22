#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>
#include <stdint.h>

// Declares an imported symbol from named import module
// The prefix is only used for the C side, NOT for exported name
#define WASM_IMPORT(MODULE, TYPE, NAME, PREFIX) \
  extern __attribute__((import_module(MODULE), import_name(#NAME))) TYPE PREFIX##NAME

// Same as EMSCRIPTEN_KEEP_ALIVE, ensures symbol will be exported
#define WASM_KEEP __attribute__((used))

typedef char* WASM_StringPtr;
typedef const char* WASM_ConstStringPtr;

typedef void* WASM_OpaquePtr;
typedef const void* WASM_ConstOpaquePtr;

// slice-based string
typedef struct { WASM_StringPtr ptr; size_t len; } WASM_String;
typedef struct { WASM_ConstStringPtr ptr; size_t len; } WASM_ConstString;

// slice of string slices
typedef struct { WASM_String* ptr; size_t len; } WASM_StringSlice;
typedef struct { WASM_ConstString* ptr; size_t len; } WASM_ConstStringSlice;

// slice of string pointers
typedef struct { WASM_StringPtr* ptr; size_t len; } WASM_StringPtrSlice;
typedef struct { WASM_ConstStringPtr* ptr; size_t len; } WASM_ConstStringPtrSlice;

// slice of opaque pointers
typedef struct { WASM_OpaquePtr ptr; size_t len; } WASM_OpaquePtrSlice;
typedef struct { WASM_ConstOpaquePtr ptr; size_t len; } WASM_ConstOpaquePtrSlice;

// Generate malloc/free wrappers only if explicitly enabled by defining this
// symbol. If undefined some function stubs are exported.
#ifdef WASMAPI_MALLOC

#include <stdlib.h>
size_t WASM_KEEP _wasm_allocate(size_t numBytes) {
  return (size_t)malloc(numBytes);
}
void WASM_KEEP _wasm_free(size_t addr, size_t numBytes) {
  free((void*)addr);
}

#else

size_t WASM_KEEP _wasm_allocate(size_t numBytes) {
  return 0;
}
void WASM_KEEP _wasm_free(size_t addr, size_t numBytes) {
}

#endif  // WASMAPI_MALLOC

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

WASM_IMPORT("wasmapi", void, _printI8Array, wasm)(const int8_t* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printU8Array, wasm)(const uint8_t* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printI16Array, wasm)(const int16_t* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printU16Array, wasm)(const uint16_t* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printI32Array, wasm)(const int32_t* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printU32Array, wasm)(const uint32_t* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printI64Array, wasm)(const int64_t* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printU64Array, wasm)(const uint64_t* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printF32Array, wasm)(const float* addr, size_t len);
WASM_IMPORT("wasmapi", void, _printF64Array, wasm)(const double* addr, size_t len);

WASM_IMPORT("wasmapi", void, printStrZ, wasm_)(const char* addr);
WASM_IMPORT("wasmapi", void, _printStr, wasm)(const char* addr, size_t len);

WASM_IMPORT("wasmapi", void, debug, wasm_)(void);
WASM_IMPORT("wasmapi", void, panic, wasm_)(const char*, size_t len);

WASM_IMPORT("wasmapi", double, timer, wasm_)(void);
WASM_IMPORT("wasmapi", uint64_t, epoch, wasm_)(void);

void wasm_printPtr(const void* ptr) {
  wasm_printU32Hex((size_t)ptr);
}

#ifdef __cplusplus
}
#endif
