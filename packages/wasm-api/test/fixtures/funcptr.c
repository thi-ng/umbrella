#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>
#include <stdint.h>

typedef struct { const char* ptr; size_t len; } WASM_String;

typedef void (*WASM_A)(uint32_t* x, WASM_String y);
typedef struct WASM_B WASM_B;
struct WASM_B {
    WASM_A a;
    WASM_A* ptr;
    WASM_A array[2];
    struct { WASM_A* ptr; size_t len; } slice;
};


#ifdef __cplusplus
}
#endif
