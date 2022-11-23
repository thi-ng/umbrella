#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>

typedef char* WASM_StringPtr;
typedef const char* WASM_ConstStringPtr;

typedef void* WASM_OpaquePtr;
typedef const void* WASM_ConstOpaquePtr;

// slice-based string
typedef struct { WASM_StringPtr ptr; size_t len; } WASM_String;
typedef struct { WASM_ConstStringPtr ptr; size_t len; } WASM_ConstString;

// defines slice wrapper structs for given pointer types
#define WASMAPI_SLICE(PREFIX, NAME, PTR, CONSTPTR) \
  typedef struct { PTR* ptr; size_t len;  } PREFIX##NAME##Slice; \
  typedef struct { CONSTPTR* ptr; size_t len; } PREFIX##Const##NAME##Slice;

// slice of string slices
WASMAPI_SLICE(WASM_, String, WASM_String, WASM_ConstString)

// slice of string pointers
WASMAPI_SLICE(WASM_, StringPtr, WASM_StringPtr, WASM_ConstStringPtr)

// slice of opaque pointers
WASMAPI_SLICE(WASM_, OpaquePtr, WASM_OpaquePtr, WASM_ConstOpaquePtr)

#ifdef __cplusplus
}
#endif
