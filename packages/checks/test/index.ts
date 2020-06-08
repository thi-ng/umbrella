import * as assert from "assert";
import * as vm from "vm";
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
import { isNil } from "../src/is-nil";
import { isHexColor } from "../src/is-hex-color";

describe("checks", function () {
    it("existsAndNotNull", () => {
        assert.ok(existsAndNotNull([]), "empty array");
        assert.ok(existsAndNotNull(new Uint8Array(1)), "typedarray");
        assert.ok(existsAndNotNull({}), "obj");
        assert.ok(existsAndNotNull("[]"), "string");
        assert.ok(existsAndNotNull(0), "zero");
        assert.ok(!existsAndNotNull((<any>{})["foobar"]), "prop");
        assert.ok(!existsAndNotNull(null), "null");
        assert.ok(!existsAndNotNull(undefined), "null");
    });

    it("isArray", () => {
        assert.ok(isArray([]), "empty array");
        assert.ok(!isArray(new Uint8Array(1)), "typedarray");
        assert.ok(!isArray({}), "obj");
        assert.ok(!isArray("[]"), "string");
        assert.ok(!isArray(0), "zero");
        assert.ok(!isArray(null), "null");
        assert.ok(!isArray(undefined), "null");
    });

    it("isTypedArray", () => {
        assert.ok(isTypedArray(new Uint8Array(1)), "u8");
        assert.ok(isTypedArray(new Uint8ClampedArray(1)), "u8c");
        assert.ok(isTypedArray(new Uint16Array(1)), "u16");
        assert.ok(isTypedArray(new Uint32Array(1)), "u32");
        assert.ok(isTypedArray(new Int8Array(1)), "i8");
        assert.ok(isTypedArray(new Int16Array(1)), "i16");
        assert.ok(isTypedArray(new Int32Array(1)), "i32");
        assert.ok(isTypedArray(new Float32Array(1)), "f32");
        assert.ok(isTypedArray(new Float64Array(1)), "f64");
        assert.ok(!isTypedArray([]), "empty array");
        assert.ok(!isTypedArray({}), "obj");
        assert.ok(!isTypedArray("[]"), "string");
        assert.ok(!isTypedArray(0), "zero");
        assert.ok(!isTypedArray(null), "null");
        assert.ok(!isTypedArray(undefined), "null");
    });

    it("isArrayLike", () => {
        assert.ok(isArrayLike([]), "empty array");
        assert.ok(isArrayLike(new Uint8Array(1)), "typedarray");
        assert.ok(isArrayLike({ length: 1 }), "obj.length");
        assert.ok(isArrayLike("[]"), "string");
        assert.ok(!isArrayLike({}), "empty obj");
        assert.ok(!isArrayLike(0), "zero");
        assert.ok(!isArrayLike(null), "null");
        assert.ok(!isArrayLike(undefined), "null");
        assert.ok(!isArrayLike((x: any, y: any) => x + y), "null");
    });

    it("isObject", () => {
        class Foo {}
        assert.ok(isObject([]), "empty array");
        assert.ok(isObject(new Uint8Array(1)), "typedarray");
        assert.ok(isObject({}), "obj");
        assert.ok(isObject(new Foo()), "class");
        assert.ok(!isObject(Foo), "fn");
        assert.ok(!isObject("[]"), "string");
        assert.ok(!isObject(0), "zero");
        assert.ok(!isObject(null), "null");
        assert.ok(!isObject(undefined), "null");
    });

    it("isPlainObject", () => {
        const ctxClass = vm.runInNewContext("class A {}; new A();");
        const ctxObj = vm.runInNewContext("({})");

        class Foo {}

        assert.ok(isPlainObject({}), "obj");
        assert.ok(isPlainObject(Object.create(null)), "obj");
        assert.ok(isPlainObject(new Object()), "obj ctor");
        assert.ok(!isPlainObject(Foo), "fn");
        assert.ok(
            !isPlainObject((function* (): IterableIterator<any> {})()),
            "generator"
        );
        assert.ok(!isPlainObject(new Foo()), "class");
        assert.ok(!isPlainObject([]), "empty array");
        assert.ok(!isPlainObject(new Uint8Array(1)), "typedarray");
        assert.ok(!isPlainObject("[]"), "string");
        assert.ok(!isPlainObject(0), "zero");
        assert.ok(!isPlainObject(null), "null");
        assert.ok(!isPlainObject(undefined), "null");
        assert.ok(isPlainObject(ctxObj), "vm ctx obj");
        assert.ok(!isPlainObject(ctxClass), "vm ctx class");
    });

    it("isString", () => {
        assert.ok(isString(""), "empty string");
        assert.ok(isString("a"), "empty string");
        assert.ok(!isString({}), "obj");
        assert.ok(!isString([]), "array");
        assert.ok(!isString(new Uint8Array(1)), "typedarray");
        assert.ok(!isString(0), "zero");
        assert.ok(!isString(null), "null");
        assert.ok(!isString(undefined), "null");
    });

    it("isFunction", () => {
        assert.ok(
            isFunction((_: any) => {}),
            "fn"
        );
        assert.ok(isFunction(Uint8Array), "ctor");
        assert.ok(isFunction("a".toString), "toString");
        assert.ok(!isFunction("a"), "empty string");
        assert.ok(!isFunction({}), "obj");
        assert.ok(!isFunction([]), "array");
        assert.ok(!isFunction(new Uint8Array(1)), "typedarray");
        assert.ok(!isFunction(0), "zero");
        assert.ok(!isFunction(null), "null");
        assert.ok(!isFunction(undefined), "undefined");
    });

    it("implementsFunction", () => {
        assert.ok(implementsFunction({ a: () => true }, "a"), "obj");
        assert.ok(implementsFunction([], Symbol.iterator), "arr iterator");
        assert.ok(implementsFunction("", Symbol.iterator), "string iterator");
        assert.ok(!implementsFunction(0, Symbol.iterator), "zero");
        assert.ok(!implementsFunction(null, Symbol.iterator), "null");
        assert.ok(!implementsFunction(undefined, Symbol.iterator), "undefined");
    });

    it("isSymbol", () => {
        assert.ok(isSymbol(Symbol.iterator), "iterator");
        assert.ok(!isSymbol("iterator"), "string");
        assert.ok(!isFunction(0), "zero");
        assert.ok(!isFunction(null), "null");
        assert.ok(!isFunction(undefined), "undefined");
    });

    it("isTransferable", () => {
        assert.ok(isTransferable(new ArrayBuffer(4)), "arraybuffer");
        assert.ok(!isTransferable(new Uint8Array(4)), "typedarray");
        assert.ok(!isTransferable([]), "array");
        assert.ok(!isTransferable("a"), "string");
        assert.ok(!isTransferable(0), "zero");
        assert.ok(!isTransferable(null), "null");
        assert.ok(!isTransferable(undefined), "undefined");
    });

    it("isNil", () => {
        assert.ok(isNil(undefined), "undefined");
        assert.ok(isNil(null), "null");
        assert.ok(!isNil("foo"), "string");
        assert.ok(!isNil({}), "empty object");
        assert.ok(!isNil([]), "empty array");
        assert.ok(!isNil(""), "empty string");
        assert.ok(!isNil(false), "false");
        assert.ok(!isNil(true), "true");
        assert.ok(!isNil(() => {}), "function");
    });

    it("isHexColor", () => {
        assert.ok(isHexColor("#123"), "valid 3 digits rgb");
        assert.ok(isHexColor("#ff3300"), "valid 6 digits rrggbb");
        assert.ok(isHexColor("#f30f"), "valid 4 digits rgba");
        assert.ok(isHexColor("#ff3300ff"), "valid 8 digits rrggbbaa");
        assert.ok(!isHexColor(undefined), "undefined");
        assert.ok(!isHexColor(null), "null");
        assert.ok(!isHexColor(""), "empty string");
        assert.ok(!isHexColor("foo"), "invalid: foo");
        assert.ok(!isHexColor("123"), "invalid: 123");
        assert.ok(!isHexColor("#12."), "invalid: #12.");
        assert.ok(!isHexColor("#j23"), "invalid: #j23");
        assert.ok(!isHexColor("#jf3300"), "invalid: #jf3300");
        assert.ok(!isHexColor("#j30f"), "invalid: #j30f");
        assert.ok(!isHexColor("#jf3300ff"), "invalid: #jf3300ff");
        assert.ok(!isHexColor("hi #123"), "invalid: hi #123");
        assert.ok(!isHexColor("#ff3300 hi"), "invalid: #ff3300 hi");
        assert.ok(!isHexColor("hi #ff3300 hi"), "invalid: hi #ff3300 hi");
        assert.ok(!isHexColor("#123 #123"), "invalid: #123 #123");
    });
});
