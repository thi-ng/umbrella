#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include "wasmapi.h"

typedef void (*WASM_A)(uint32_t* x, WASM_ConstStringPtr y);

typedef struct { WASM_A* ptr; size_t len; } WASM_ASlice;
typedef struct { const WASM_A* ptr; size_t len; } WASM_ConstASlice;

typedef struct WASM_B WASM_B;

struct WASM_B {
    WASM_A a;
    WASM_A* ptr;
    WASM_A* ptr2;
    WASM_A array[2];
    WASM_ASlice slice;
};


#ifdef __cplusplus
}
#endif
