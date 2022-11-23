#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stdalign.h>
#include "wasmapi.h"


typedef struct { uint8_t* ptr; size_t len; } WASM_U8Slice;
typedef struct { const uint8_t* ptr; size_t len; } WASM_ConstU8Slice;

typedef struct WASM_B WASM_B;

typedef struct { WASM_B* ptr; size_t len; } WASM_BSlice;
typedef struct { const WASM_B* ptr; size_t len; } WASM_ConstBSlice;

typedef struct WASM_A WASM_A;

struct WASM_A {
    WASM_U8Slice slice;
    WASM_ConstU8Slice constSlice;
    uint8_t* ptr;
    const uint8_t* constPtr;
    uint8_t* ptr2;
    uint8_t* ptr2sentinel;
    const uint8_t* constPtr2;
    const uint8_t* constPtr2sentinel;
    uint8_t array[2];
    WASM_B bsingle;
    WASM_BSlice bslice;
    WASM_ConstBSlice constBSlice;
    WASM_B* bptr;
    WASM_B* bptr2;
};

size_t __attribute__((used)) WASM_A_align() {
    return alignof(WASM_A);
}

size_t __attribute__((used)) WASM_A_size() {
    return sizeof(WASM_A);
}

size_t __attribute__((used)) WASM_A_slice_align() {
    return alignof(WASM_U8Slice);
}

size_t __attribute__((used)) WASM_A_slice_offset() {
    return offsetof(WASM_A, slice);
}

size_t __attribute__((used)) WASM_A_slice_size() {
    return sizeof(WASM_U8Slice);
}

size_t __attribute__((used)) WASM_A_constSlice_align() {
    return alignof(WASM_ConstU8Slice);
}

size_t __attribute__((used)) WASM_A_constSlice_offset() {
    return offsetof(WASM_A, constSlice);
}

size_t __attribute__((used)) WASM_A_constSlice_size() {
    return sizeof(WASM_ConstU8Slice);
}

size_t __attribute__((used)) WASM_A_ptr_align() {
    return alignof(uint8_t*);
}

size_t __attribute__((used)) WASM_A_ptr_offset() {
    return offsetof(WASM_A, ptr);
}

size_t __attribute__((used)) WASM_A_ptr_size() {
    return sizeof(uint8_t*);
}

size_t __attribute__((used)) WASM_A_constPtr_align() {
    return alignof(const uint8_t*);
}

size_t __attribute__((used)) WASM_A_constPtr_offset() {
    return offsetof(WASM_A, constPtr);
}

size_t __attribute__((used)) WASM_A_constPtr_size() {
    return sizeof(const uint8_t*);
}

size_t __attribute__((used)) WASM_A_ptr2_align() {
    return alignof(uint8_t*);
}

size_t __attribute__((used)) WASM_A_ptr2_offset() {
    return offsetof(WASM_A, ptr2);
}

size_t __attribute__((used)) WASM_A_ptr2_size() {
    return sizeof(uint8_t*);
}

size_t __attribute__((used)) WASM_A_ptr2sentinel_align() {
    return alignof(uint8_t*);
}

size_t __attribute__((used)) WASM_A_ptr2sentinel_offset() {
    return offsetof(WASM_A, ptr2sentinel);
}

size_t __attribute__((used)) WASM_A_ptr2sentinel_size() {
    return sizeof(uint8_t*);
}

size_t __attribute__((used)) WASM_A_constPtr2_align() {
    return alignof(const uint8_t*);
}

size_t __attribute__((used)) WASM_A_constPtr2_offset() {
    return offsetof(WASM_A, constPtr2);
}

size_t __attribute__((used)) WASM_A_constPtr2_size() {
    return sizeof(const uint8_t*);
}

size_t __attribute__((used)) WASM_A_constPtr2sentinel_align() {
    return alignof(const uint8_t*);
}

size_t __attribute__((used)) WASM_A_constPtr2sentinel_offset() {
    return offsetof(WASM_A, constPtr2sentinel);
}

size_t __attribute__((used)) WASM_A_constPtr2sentinel_size() {
    return sizeof(const uint8_t*);
}

size_t __attribute__((used)) WASM_A_array_align() {
    return alignof(uint8_t[2]);
}

size_t __attribute__((used)) WASM_A_array_offset() {
    return offsetof(WASM_A, array);
}

size_t __attribute__((used)) WASM_A_array_size() {
    return sizeof(uint8_t[2]);
}

size_t __attribute__((used)) WASM_A_bsingle_align() {
    return alignof(WASM_B);
}

size_t __attribute__((used)) WASM_A_bsingle_offset() {
    return offsetof(WASM_A, bsingle);
}

size_t __attribute__((used)) WASM_A_bsingle_size() {
    return sizeof(WASM_B);
}

size_t __attribute__((used)) WASM_A_bslice_align() {
    return alignof(WASM_BSlice);
}

size_t __attribute__((used)) WASM_A_bslice_offset() {
    return offsetof(WASM_A, bslice);
}

size_t __attribute__((used)) WASM_A_bslice_size() {
    return sizeof(WASM_BSlice);
}

size_t __attribute__((used)) WASM_A_constBSlice_align() {
    return alignof(WASM_ConstBSlice);
}

size_t __attribute__((used)) WASM_A_constBSlice_offset() {
    return offsetof(WASM_A, constBSlice);
}

size_t __attribute__((used)) WASM_A_constBSlice_size() {
    return sizeof(WASM_ConstBSlice);
}

size_t __attribute__((used)) WASM_A_bptr_align() {
    return alignof(WASM_B*);
}

size_t __attribute__((used)) WASM_A_bptr_offset() {
    return offsetof(WASM_A, bptr);
}

size_t __attribute__((used)) WASM_A_bptr_size() {
    return sizeof(WASM_B*);
}

size_t __attribute__((used)) WASM_A_bptr2_align() {
    return alignof(WASM_B*);
}

size_t __attribute__((used)) WASM_A_bptr2_offset() {
    return offsetof(WASM_A, bptr2);
}

size_t __attribute__((used)) WASM_A_bptr2_size() {
    return sizeof(WASM_B*);
}

struct WASM_B {
    uint16_t a;
};

size_t __attribute__((used)) WASM_B_align() {
    return alignof(WASM_B);
}

size_t __attribute__((used)) WASM_B_size() {
    return sizeof(WASM_B);
}

size_t __attribute__((used)) WASM_B_a_align() {
    return alignof(uint16_t);
}

size_t __attribute__((used)) WASM_B_a_offset() {
    return offsetof(WASM_B, a);
}

size_t __attribute__((used)) WASM_B_a_size() {
    return sizeof(uint16_t);
}


#ifdef __cplusplus
}
#endif
