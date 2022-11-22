#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stdalign.h>
#include "wasmapi.h"


typedef struct WASM_Foo WASM_Foo;

struct WASM_Foo {
    WASM_ConstString single;
    WASM_String singleMut;
    WASM_ConstString multi[2];
    WASM_ConstString* singlePtr;
    WASM_ConstString* multiPtr;
    WASM_ConstStringSlice slice;
    WASM_StringSlice mutSlice;
};

size_t __attribute__((used)) WASM_Foo_align() {
    return alignof(WASM_Foo);
}

size_t __attribute__((used)) WASM_Foo_size() {
    return sizeof(WASM_Foo);
}

size_t __attribute__((used)) WASM_Foo_single_align() {
    return alignof(WASM_ConstString);
}

size_t __attribute__((used)) WASM_Foo_single_offset() {
    return offsetof(WASM_Foo, single);
}

size_t __attribute__((used)) WASM_Foo_single_size() {
    return sizeof(WASM_ConstString);
}

size_t __attribute__((used)) WASM_Foo_singleMut_align() {
    return alignof(WASM_String);
}

size_t __attribute__((used)) WASM_Foo_singleMut_offset() {
    return offsetof(WASM_Foo, singleMut);
}

size_t __attribute__((used)) WASM_Foo_singleMut_size() {
    return sizeof(WASM_String);
}

size_t __attribute__((used)) WASM_Foo_multi_align() {
    return alignof(WASM_ConstString[2]);
}

size_t __attribute__((used)) WASM_Foo_multi_offset() {
    return offsetof(WASM_Foo, multi);
}

size_t __attribute__((used)) WASM_Foo_multi_size() {
    return sizeof(WASM_ConstString[2]);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_align() {
    return alignof(WASM_ConstString*);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_offset() {
    return offsetof(WASM_Foo, singlePtr);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_size() {
    return sizeof(WASM_ConstString*);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_align() {
    return alignof(WASM_ConstString*);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_offset() {
    return offsetof(WASM_Foo, multiPtr);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_size() {
    return sizeof(WASM_ConstString*);
}

size_t __attribute__((used)) WASM_Foo_slice_align() {
    return alignof(WASM_ConstStringSlice);
}

size_t __attribute__((used)) WASM_Foo_slice_offset() {
    return offsetof(WASM_Foo, slice);
}

size_t __attribute__((used)) WASM_Foo_slice_size() {
    return sizeof(WASM_ConstStringSlice);
}

size_t __attribute__((used)) WASM_Foo_mutSlice_align() {
    return alignof(WASM_StringSlice);
}

size_t __attribute__((used)) WASM_Foo_mutSlice_offset() {
    return offsetof(WASM_Foo, mutSlice);
}

size_t __attribute__((used)) WASM_Foo_mutSlice_size() {
    return sizeof(WASM_StringSlice);
}


#ifdef __cplusplus
}
#endif
