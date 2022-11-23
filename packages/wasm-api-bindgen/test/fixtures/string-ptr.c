#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stdalign.h>
#include "wasmapi.h"


typedef struct WASM_Foo WASM_Foo;

struct WASM_Foo {
    WASM_StringPtr single;
    WASM_ConstStringPtr constSingle;
    WASM_ConstStringPtr multi[2];
    WASM_ConstStringPtr* singlePtr;
    WASM_ConstStringPtr* multiPtr;
    WASM_StringPtrSlice slice;
    WASM_ConstStringPtrSlice constSlice;
};

size_t __attribute__((used)) WASM_Foo_align() {
    return alignof(WASM_Foo);
}

size_t __attribute__((used)) WASM_Foo_size() {
    return sizeof(WASM_Foo);
}

size_t __attribute__((used)) WASM_Foo_single_align() {
    return alignof(WASM_StringPtr);
}

size_t __attribute__((used)) WASM_Foo_single_offset() {
    return offsetof(WASM_Foo, single);
}

size_t __attribute__((used)) WASM_Foo_single_size() {
    return sizeof(WASM_StringPtr);
}

size_t __attribute__((used)) WASM_Foo_constSingle_align() {
    return alignof(WASM_ConstStringPtr);
}

size_t __attribute__((used)) WASM_Foo_constSingle_offset() {
    return offsetof(WASM_Foo, constSingle);
}

size_t __attribute__((used)) WASM_Foo_constSingle_size() {
    return sizeof(WASM_ConstStringPtr);
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
    return alignof(WASM_StringPtrSlice);
}

size_t __attribute__((used)) WASM_Foo_slice_offset() {
    return offsetof(WASM_Foo, slice);
}

size_t __attribute__((used)) WASM_Foo_slice_size() {
    return sizeof(WASM_StringPtrSlice);
}

size_t __attribute__((used)) WASM_Foo_constSlice_align() {
    return alignof(WASM_ConstStringPtrSlice);
}

size_t __attribute__((used)) WASM_Foo_constSlice_offset() {
    return offsetof(WASM_Foo, constSlice);
}

size_t __attribute__((used)) WASM_Foo_constSlice_size() {
    return sizeof(WASM_ConstStringPtrSlice);
}


#ifdef __cplusplus
}
#endif
