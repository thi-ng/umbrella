#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>
#include <stdint.h>

typedef struct WASM_A WASM_A;
struct WASM_A {
    uint8_t a;
    uint8_t __pad0[3];
    uint32_t b;
    uint16_t* c;
    uint8_t __pad1[2];
    double d;
};

typedef union WASM_B WASM_B;
union WASM_B {
    WASM_A a[3];
    uint64_t b;
};


#ifdef __cplusplus
}
#endif
