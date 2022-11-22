#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stdalign.h>
#include "wasmapi.h"


typedef struct WASM_Foo WASM_Foo;

struct WASM_Foo {
    WASM_ConstStringPtr single;
    WASM_StringPtr singleMut;
    WASM_ConstStringPtr multi[2];
    WASM_ConstStringPtr* singlePtr;
    WASM_ConstStringPtr* multiPtr;
    WASM_ConstStringPtrSlice slice;
    WASM_StringPtrSlice mutSlice;
};

size_t __attribute__((used)) WASM_Foo_align() {
    return alignof(WASM_Foo);
}

size_t __attribute__((used)) WASM_Foo_size() {
    return sizeof(WASM_Foo);
}

size_t __attribute__((used)) WASM_Foo_single_align() {
    return alignof(WASM_ConstStringPtr);
}

size_t __attribute__((used)) WASM_Foo_single_offset() {
    return offsetof(WASM_Foo, single);
}

size_t __attribute__((used)) WASM_Foo_single_size() {
    return sizeof(WASM_ConstStringPtr);
}

size_t __attribute__((used)) WASM_Foo_singleMut_align() {
    return alignof(WASM_StringPtr);
}

size_t __attribute__((used)) WASM_Foo_singleMut_offset() {
    return offsetof(WASM_Foo, singleMut);
}

size_t __attribute__((used)) WASM_Foo_singleMut_size() {
    return sizeof(WASM_StringPtr);
}

size_t __attribute__((used)) WASM_Foo_multi_align() {
    return alignof(WASM_ConstStringPtr[2]);
}

size_t __attribute__((used)) WASM_Foo_multi_offset() {
    return offsetof(WASM_Foo, multi);
}

size_t __attribute__((used)) WASM_Foo_multi_size() {
    return sizeof(WASM_ConstStringPtr[2]);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_align() {
    return alignof(WASM_ConstStringPtr*);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_offset() {
    return offsetof(WASM_Foo, singlePtr);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_size() {
    return sizeof(WASM_ConstStringPtr*);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_align() {
    return alignof(WASM_ConstStringPtr*);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_offset() {
    return offsetof(WASM_Foo, multiPtr);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_size() {
    return sizeof(WASM_ConstStringPtr*);
}

size_t __attribute__((used)) WASM_Foo_slice_align() {
    return alignof(WASM_ConstStringPtrSlice);
}

size_t __attribute__((used)) WASM_Foo_slice_offset() {
    return offsetof(WASM_Foo, slice);
}

size_t __attribute__((used)) WASM_Foo_slice_size() {
    return sizeof(WASM_ConstStringPtrSlice);
}

size_t __attribute__((used)) WASM_Foo_mutSlice_align() {
    return alignof(WASM_StringPtrSlice);
}

size_t __attribute__((used)) WASM_Foo_mutSlice_offset() {
    return offsetof(WASM_Foo, mutSlice);
}

size_t __attribute__((used)) WASM_Foo_mutSlice_size() {
    return sizeof(WASM_StringPtrSlice);
}


#ifdef __cplusplus
}
#endif
