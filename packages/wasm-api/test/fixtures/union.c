#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include "wasmapi.h"


typedef struct WASM_A WASM_A;

typedef union WASM_B WASM_B;

struct WASM_A {
    uint8_t a;
    uint8_t __pad0[3];
    uint32_t b;
    uint16_t* c;
    uint8_t __pad1[2];
    double d;
};

union WASM_B {
    WASM_A a[3];
    uint64_t b;
};


#ifdef __cplusplus
}
#endif
