import * as assert from "assert";

import { existsAndNotNull } from "../src/exists-not-null";
import { implementsFunction } from "../src/implements-function";
import { isArray } from "../src/is-array";
import { isArrayLike } from "../src/is-arraylike";
import { isFunction } from "../src/is-function";
import { isObject } from "../src/is-object";
import { isPlainObject } from "../src/is-plain-object";
import { isString } from "../src/is-string";
import { isSymbol } from "../src/is-symbol";
import { isTransferable } from "../src/is-transferable";
import { isTypedArray } from "../src/is-typedarray";

describe("checks", function () {

    it("existsAndNotNull", () => {
        assert(existsAndNotNull([]), "empty array");
        assert(existsAndNotNull(new Uint8Array(1)), "typedarray");
        assert(existsAndNotNull({}), "obj");
        assert(existsAndNotNull("[]"), "string");
        assert(existsAndNotNull(0), "zero");
        assert(!existsAndNotNull({}["foobar"]), "prop");
        assert(!existsAndNotNull(null), "null");
        assert(!existsAndNotNull(undefined), "null");
    });

    it("isArray", () => {
        assert(isArray([]), "empty array");
        assert(!isArray(new Uint8Array(1)), "typedarray");
        assert(!isArray({}), "obj");
        assert(!isArray("[]"), "string");
        assert(!isArray(0), "zero");
        assert(!isArray(null), "null");
        assert(!isArray(undefined), "null");
    });

    it("isTypedArray", () => {
        assert(isTypedArray(new Uint8Array(1)), "u8");
        assert(isTypedArray(new Uint8ClampedArray(1)), "u8c");
        assert(isTypedArray(new Uint16Array(1)), "u16");
        assert(isTypedArray(new Uint32Array(1)), "u32");
        assert(isTypedArray(new Int8Array(1)), "i8");
        assert(isTypedArray(new Int16Array(1)), "i16");
        assert(isTypedArray(new Int32Array(1)), "i32");
        assert(isTypedArray(new Float32Array(1)), "f32");
        assert(isTypedArray(new Float64Array(1)), "f64");
        assert(!isTypedArray([]), "empty array");
        assert(!isTypedArray({}), "obj");
        assert(!isTypedArray("[]"), "string");
        assert(!isTypedArray(0), "zero");
        assert(!isTypedArray(null), "null");
        assert(!isTypedArray(undefined), "null");
    });

    it("isArrayLike", () => {
        assert(isArrayLike([]), "empty array");
        assert(isArrayLike(new Uint8Array(1)), "typedarray");
        assert(isArrayLike({ length: 1 }), "obj.length");
        assert(isArrayLike("[]"), "string");
        assert(!isArrayLike({}), "empty obj");
        assert(!isArrayLike(0), "zero");
        assert(!isArrayLike(null), "null");
        assert(!isArrayLike(undefined), "null");
        assert(!isArrayLike((x, y) => x + y), "null");
    });

    it("isObject", () => {
        function Foo() { };
        assert(isObject([]), "empty array");
        assert(isObject(new Uint8Array(1)), "typedarray");
        assert(isObject({}), "obj");
        assert(isObject(new Foo()), "class");
        assert(!isObject(Foo), "fn");
        assert(!isObject("[]"), "string");
        assert(!isObject(0), "zero");
        assert(!isObject(null), "null");
        assert(!isObject(undefined), "null");
    });

    it("isPlainObject", () => {
        function Foo() { };
        assert(isPlainObject({}), "obj");
        assert(isPlainObject(new Object()), "obj ctor");
        assert(!isPlainObject(Foo), "fn");
        assert(!isPlainObject(new Foo()), "class");
        assert(!isPlainObject([]), "empty array");
        assert(!isPlainObject(new Uint8Array(1)), "typedarray");
        assert(!isPlainObject("[]"), "string");
        assert(!isPlainObject(0), "zero");
        assert(!isPlainObject(null), "null");
        assert(!isPlainObject(undefined), "null");
    });

    it("isString", () => {
        assert(isString(""), "empty string");
        assert(isString("a"), "empty string");
        assert(!isString({}), "obj");
        assert(!isString([]), "array");
        assert(!isString(new Uint8Array(1)), "typedarray");
        assert(!isString(0), "zero");
        assert(!isString(null), "null");
        assert(!isString(undefined), "null");
    });

    it("isFunction", () => {
        assert(isFunction((_) => null), "fn");
        assert(isFunction(Uint8Array), "ctor");
        assert(isFunction("a".toString), "toString");
        assert(!isFunction("a"), "empty string");
        assert(!isFunction({}), "obj");
        assert(!isFunction([]), "array");
        assert(!isFunction(new Uint8Array(1)), "typedarray");
        assert(!isFunction(0), "zero");
        assert(!isFunction(null), "null");
        assert(!isFunction(undefined), "undefined");
    });

    it("implementsFunction", () => {
        assert(implementsFunction({ a: () => true }, "a"), "obj");
        assert(implementsFunction([], Symbol.iterator), "arr iterator");
        assert(implementsFunction("", Symbol.iterator), "string iterator");
        assert(!implementsFunction(0, Symbol.iterator), "zero");
        assert(!implementsFunction(null, Symbol.iterator), "null");
        assert(!implementsFunction(undefined, Symbol.iterator), "undefined");
    });

    it("isSymbol", () => {
        assert(isSymbol(Symbol.iterator), "iterator");
        assert(!isSymbol("iterator"), "string");
        assert(!isFunction(0), "zero");
        assert(!isFunction(null), "null");
        assert(!isFunction(undefined), "undefined");
    });

    it("isTransferable", () => {
        assert(isTransferable(new ArrayBuffer(4)), "arraybuffer");
        assert(!isTransferable(new Uint8Array(4)), "typedarray");
        assert(!isTransferable([]), "array");
        assert(!isTransferable("a"), "string");
        assert(!isTransferable(0), "zero");
        assert(!isTransferable(null), "null");
        assert(!isTransferable(undefined), "undefined");
    });

});
