#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>
#include <stdint.h>

typedef struct { const char* ptr; size_t len; } WASM_String;

typedef struct WASM_A WASM_A;
struct WASM_A {
    void* a;
    void** ptr;
    struct { void** ptr; size_t len; } slice;
    void* array[3];
};


#ifdef __cplusplus
}
#endif
