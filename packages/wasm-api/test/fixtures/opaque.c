#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include "wasmapi.h"


typedef struct WASM_A WASM_A;

struct WASM_A {
    WASM_OpaquePtr a;
    WASM_OpaquePtr* ptr;
    WASM_OpaquePtr* ptr2;
    WASM_ConstOpaquePtr* constPtr;
    WASM_OpaquePtrSlice slice;
    WASM_ConstOpaquePtrSlice constSlice;
    WASM_OpaquePtr array[3];
};


#ifdef __cplusplus
}
#endif
