#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include "wasmapi.h"


typedef enum WASM_A WASM_A;

typedef struct { WASM_A* ptr; size_t len; } WASM_ASlice;
typedef struct { const WASM_A* ptr; size_t len; } WASM_ConstASlice;

typedef struct WASM_B WASM_B;

enum WASM_A {
    FOO,
    BAR,
    BAZ = 10,
};

struct WASM_B {
    WASM_A single;
    WASM_A array[2];
    WASM_ASlice slice;
    WASM_A* ptr;
    WASM_A* ptr2;
};


#ifdef __cplusplus
}
#endif
