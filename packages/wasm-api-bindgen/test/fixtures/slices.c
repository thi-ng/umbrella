#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stdalign.h>
#include "wasmapi.h"


typedef struct { uint8_t* ptr; size_t len; } WASM_U8Slice;
typedef struct { const uint8_t* ptr; size_t len; } WASM_ConstU8Slice;

typedef struct WASM_A WASM_A;

typedef struct { WASM_A* ptr; size_t len; } WASM_ASlice;
typedef struct { const WASM_A* ptr; size_t len; } WASM_ConstASlice;

typedef struct WASM_B WASM_B;

struct WASM_A {
    uint16_t a;
};

size_t __attribute__((used)) WASM_A_align() {
    return alignof(WASM_A);
}

size_t __attribute__((used)) WASM_A_size() {
    return sizeof(WASM_A);
}

size_t __attribute__((used)) WASM_A_a_align() {
    return alignof(uint16_t);
}

size_t __attribute__((used)) WASM_A_a_offset() {
    return offsetof(WASM_A, a);
}

size_t __attribute__((used)) WASM_A_a_size() {
    return sizeof(uint16_t);
}

struct WASM_B {
    WASM_U8Slice slice;
    WASM_ConstU8Slice constSlice;
    uint8_t* ptr;
    const uint8_t* constPtr;
    uint8_t* ptr2;
    uint8_t* ptr2sentinel;
    const uint8_t* constPtr2;
    const uint8_t* constPtr2sentinel;
    uint8_t* ptrMulti;
    uint8_t* ptrMultiSentinel;
    const uint8_t* constPtrMulti;
    const uint8_t* constPtrMultiSentinel;
    int32_t array[2];
    int32_t arraySentinel[2];
    // Hidden sentinel. Must be manually initialized to 0
    int32_t __arraySentinelSentinel;
    WASM_A aSingle;
    WASM_ASlice aSlice;
    WASM_ConstASlice constASlice;
    WASM_A* aPtr;
    WASM_A* aPtr2;
    // Multiple A's
    WASM_A* aPtrMulti;
};

size_t __attribute__((used)) WASM_B_align() {
    return alignof(WASM_B);
}

size_t __attribute__((used)) WASM_B_size() {
    return sizeof(WASM_B);
}

size_t __attribute__((used)) WASM_B_slice_align() {
    return alignof(WASM_U8Slice);
}

size_t __attribute__((used)) WASM_B_slice_offset() {
    return offsetof(WASM_B, slice);
}

size_t __attribute__((used)) WASM_B_slice_size() {
    return sizeof(WASM_U8Slice);
}

size_t __attribute__((used)) WASM_B_constSlice_align() {
    return alignof(WASM_ConstU8Slice);
}

size_t __attribute__((used)) WASM_B_constSlice_offset() {
    return offsetof(WASM_B, constSlice);
}

size_t __attribute__((used)) WASM_B_constSlice_size() {
    return sizeof(WASM_ConstU8Slice);
}

size_t __attribute__((used)) WASM_B_ptr_align() {
    return alignof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptr_offset() {
    return offsetof(WASM_B, ptr);
}

size_t __attribute__((used)) WASM_B_ptr_size() {
    return sizeof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtr_align() {
    return alignof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtr_offset() {
    return offsetof(WASM_B, constPtr);
}

size_t __attribute__((used)) WASM_B_constPtr_size() {
    return sizeof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptr2_align() {
    return alignof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptr2_offset() {
    return offsetof(WASM_B, ptr2);
}

size_t __attribute__((used)) WASM_B_ptr2_size() {
    return sizeof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptr2sentinel_align() {
    return alignof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptr2sentinel_offset() {
    return offsetof(WASM_B, ptr2sentinel);
}

size_t __attribute__((used)) WASM_B_ptr2sentinel_size() {
    return sizeof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtr2_align() {
    return alignof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtr2_offset() {
    return offsetof(WASM_B, constPtr2);
}

size_t __attribute__((used)) WASM_B_constPtr2_size() {
    return sizeof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtr2sentinel_align() {
    return alignof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtr2sentinel_offset() {
    return offsetof(WASM_B, constPtr2sentinel);
}

size_t __attribute__((used)) WASM_B_constPtr2sentinel_size() {
    return sizeof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptrMulti_align() {
    return alignof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptrMulti_offset() {
    return offsetof(WASM_B, ptrMulti);
}

size_t __attribute__((used)) WASM_B_ptrMulti_size() {
    return sizeof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptrMultiSentinel_align() {
    return alignof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_ptrMultiSentinel_offset() {
    return offsetof(WASM_B, ptrMultiSentinel);
}

size_t __attribute__((used)) WASM_B_ptrMultiSentinel_size() {
    return sizeof(uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtrMulti_align() {
    return alignof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtrMulti_offset() {
    return offsetof(WASM_B, constPtrMulti);
}

size_t __attribute__((used)) WASM_B_constPtrMulti_size() {
    return sizeof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtrMultiSentinel_align() {
    return alignof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_constPtrMultiSentinel_offset() {
    return offsetof(WASM_B, constPtrMultiSentinel);
}

size_t __attribute__((used)) WASM_B_constPtrMultiSentinel_size() {
    return sizeof(const uint8_t*);
}

size_t __attribute__((used)) WASM_B_array_align() {
    return alignof(int32_t[2]);
}

size_t __attribute__((used)) WASM_B_array_offset() {
    return offsetof(WASM_B, array);
}

size_t __attribute__((used)) WASM_B_array_size() {
    return sizeof(int32_t[2]);
}

size_t __attribute__((used)) WASM_B_arraySentinel_align() {
    return alignof(int32_t[2]);
}

size_t __attribute__((used)) WASM_B_arraySentinel_offset() {
    return offsetof(WASM_B, arraySentinel);
}

size_t __attribute__((used)) WASM_B_arraySentinel_size() {
    return sizeof(int32_t[2]);
}

size_t __attribute__((used)) WASM_B_aSingle_align() {
    return alignof(WASM_A);
}

size_t __attribute__((used)) WASM_B_aSingle_offset() {
    return offsetof(WASM_B, aSingle);
}

size_t __attribute__((used)) WASM_B_aSingle_size() {
    return sizeof(WASM_A);
}

size_t __attribute__((used)) WASM_B_aSlice_align() {
    return alignof(WASM_ASlice);
}

size_t __attribute__((used)) WASM_B_aSlice_offset() {
    return offsetof(WASM_B, aSlice);
}

size_t __attribute__((used)) WASM_B_aSlice_size() {
    return sizeof(WASM_ASlice);
}

size_t __attribute__((used)) WASM_B_constASlice_align() {
    return alignof(WASM_ConstASlice);
}

size_t __attribute__((used)) WASM_B_constASlice_offset() {
    return offsetof(WASM_B, constASlice);
}

size_t __attribute__((used)) WASM_B_constASlice_size() {
    return sizeof(WASM_ConstASlice);
}

size_t __attribute__((used)) WASM_B_aPtr_align() {
    return alignof(WASM_A*);
}

size_t __attribute__((used)) WASM_B_aPtr_offset() {
    return offsetof(WASM_B, aPtr);
}

size_t __attribute__((used)) WASM_B_aPtr_size() {
    return sizeof(WASM_A*);
}

size_t __attribute__((used)) WASM_B_aPtr2_align() {
    return alignof(WASM_A*);
}

size_t __attribute__((used)) WASM_B_aPtr2_offset() {
    return offsetof(WASM_B, aPtr2);
}

size_t __attribute__((used)) WASM_B_aPtr2_size() {
    return sizeof(WASM_A*);
}

size_t __attribute__((used)) WASM_B_aPtrMulti_align() {
    return alignof(WASM_A*);
}

size_t __attribute__((used)) WASM_B_aPtrMulti_offset() {
    return offsetof(WASM_B, aPtrMulti);
}

size_t __attribute__((used)) WASM_B_aPtrMulti_size() {
    return sizeof(WASM_A*);
}


#ifdef __cplusplus
}
#endif
