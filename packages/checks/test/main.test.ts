import { expect, test } from "bun:test";
import * as vm from "vm";
import {
	existsAndNotNull,
	implementsFunction,
	isArray,
	isArrayLike,
	isFunction,
	isHexColor,
	isNil,
	isObject,
	isPlainObject,
	isProtoPath,
	isString,
	isSymbol,
	isTransferable,
	isTypedArray,
} from "../src/index.js";

test("existsAndNotNull", () => {
	expect(existsAndNotNull([])).toBeTrue();
	expect(existsAndNotNull(new Uint8Array(1))).toBeTrue();
	expect(existsAndNotNull({})).toBeTrue();
	expect(existsAndNotNull("[]")).toBeTrue();
	expect(existsAndNotNull(0)).toBeTrue();
	expect(existsAndNotNull((<any>{})["foobar"])).toBeFalse();
	expect(existsAndNotNull(null)).toBeFalse();
	expect(existsAndNotNull(undefined)).toBeFalse();
});

test("isArray", () => {
	expect(isArray([])).toBeTrue();
	expect(isArray(new Uint8Array(1))).toBeFalse();
	expect(isArray({})).toBeFalse();
	expect(isArray("[]")).toBeFalse();
	expect(isArray(0)).toBeFalse();
	expect(isArray(null)).toBeFalse();
	expect(isArray(undefined)).toBeFalse();
});

test("isTypedArray", () => {
	expect(isTypedArray(new Uint8Array(1))).toBeTrue();
	expect(isTypedArray(new Uint8ClampedArray(1))).toBeTrue();
	expect(isTypedArray(new Uint16Array(1))).toBeTrue();
	expect(isTypedArray(new Uint32Array(1))).toBeTrue();
	expect(isTypedArray(new Int8Array(1))).toBeTrue();
	expect(isTypedArray(new Int16Array(1))).toBeTrue();
	expect(isTypedArray(new Int32Array(1))).toBeTrue();
	expect(isTypedArray(new Float32Array(1))).toBeTrue();
	expect(isTypedArray(new Float64Array(1))).toBeTrue();
	expect(isTypedArray([])).toBeFalse();
	expect(isTypedArray({})).toBeFalse();
	expect(isTypedArray("[]")).toBeFalse();
	expect(isTypedArray(0)).toBeFalse();
	expect(isTypedArray(null)).toBeFalse();
	expect(isTypedArray(undefined)).toBeFalse();
});

test("isArrayLike", () => {
	expect(isArrayLike([])).toBeTrue();
	expect(isArrayLike(new Uint8Array(1))).toBeTrue();
	expect(isArrayLike({ length: 1 })).toBeTrue();
	expect(isArrayLike("[]")).toBeTrue();
	expect(isArrayLike({})).toBeFalse();
	expect(isArrayLike(0)).toBeFalse();
	expect(isArrayLike(null)).toBeFalse();
	expect(isArrayLike(undefined)).toBeFalse();
	expect(isArrayLike((x: any, y: any) => x + y)).toBeFalse();
});

test("isObject", () => {
	class Foo {}
	expect(isObject([])).toBeTrue();
	expect(isObject(new Uint8Array(1))).toBeTrue();
	expect(isObject({})).toBeTrue();
	expect(isObject(new Foo())).toBeTrue();
	expect(isObject(Foo)).toBeFalse();
	expect(isObject("[]")).toBeFalse();
	expect(isObject(0)).toBeFalse();
	expect(isObject(null)).toBeFalse();
	expect(isObject(undefined)).toBeFalse();
});

test("isPlainObject", () => {
	const ctxClass = vm.runInNewContext("class A {}; new A();");
	const ctxObj = vm.runInNewContext("({})");

	class Foo {}

	expect(isPlainObject({})).toBeTrue();
	expect(isPlainObject(Object.create(null))).toBeTrue();
	expect(isPlainObject(new Object())).toBeTrue();
	expect(isPlainObject(Foo)).toBeFalse();
	expect(
		isPlainObject((function* (): IterableIterator<any> {})())
	).toBeFalse();
	expect(isPlainObject(new Foo())).toBeFalse();
	expect(isPlainObject([])).toBeFalse();
	expect(isPlainObject(new Uint8Array(1))).toBeFalse();
	expect(isPlainObject("[]")).toBeFalse();
	expect(isPlainObject(0)).toBeFalse();
	expect(isPlainObject(null)).toBeFalse();
	expect(isPlainObject(undefined)).toBeFalse();
	expect(isPlainObject(ctxObj)).toBeTrue();
	expect(isPlainObject(ctxClass)).toBeFalse();
});

test("isString", () => {
	expect(isString("")).toBeTrue();
	expect(isString("a")).toBeTrue();
	expect(isString({})).toBeFalse();
	expect(isString([])).toBeFalse();
	expect(isString(new Uint8Array(1))).toBeFalse();
	expect(isString(0)).toBeFalse();
	expect(isString(null)).toBeFalse();
	expect(isString(undefined)).toBeFalse();
});

test("isFunction", () => {
	expect(isFunction((_: any) => {})).toBeTrue();
	expect(isFunction(Uint8Array)).toBeTrue();
	expect(isFunction("a".toString)).toBeTrue();
	expect(isFunction("a")).toBeFalse();
	expect(isFunction({})).toBeFalse();
	expect(isFunction([])).toBeFalse();
	expect(isFunction(new Uint8Array(1))).toBeFalse();
	expect(isFunction(0)).toBeFalse();
	expect(isFunction(null)).toBeFalse();
	expect(isFunction(undefined)).toBeFalse();
});

test("implementsFunction", () => {
	expect(implementsFunction({ a: () => true }, "a")).toBeTrue();
	expect(implementsFunction([], Symbol.iterator)).toBeTrue();
	expect(implementsFunction("", Symbol.iterator)).toBeTrue();
	expect(implementsFunction(0, Symbol.iterator)).toBeFalse();
	expect(implementsFunction(null, Symbol.iterator)).toBeFalse();
	expect(implementsFunction(undefined, Symbol.iterator)).toBeFalse();
});

test("isSymbol", () => {
	expect(isSymbol(Symbol.iterator)).toBeTrue();
	expect(isSymbol("iterator")).toBeFalse();
	expect(isFunction(0)).toBeFalse();
	expect(isFunction(null)).toBeFalse();
	expect(isFunction(undefined)).toBeFalse();
});

test("isTransferable", () => {
	expect(isTransferable(new ArrayBuffer(4))).toBeTrue();
	expect(isTransferable(new Uint8Array(4))).toBeFalse();
	expect(isTransferable([])).toBeFalse();
	expect(isTransferable("a")).toBeFalse();
	expect(isTransferable(0)).toBeFalse();
	expect(isTransferable(null)).toBeFalse();
	expect(isTransferable(undefined)).toBeFalse();
});

test("isNil", () => {
	expect(isNil(undefined)).toBeTrue();
	expect(isNil(null)).toBeTrue();
	expect(isNil("foo")).toBeFalse();
	expect(isNil({})).toBeFalse();
	expect(isNil([])).toBeFalse();
	expect(isNil("")).toBeFalse();
	expect(isNil(false)).toBeFalse();
	expect(isNil(true)).toBeFalse();
	expect(isNil(() => {})).toBeFalse();
});

test("isHexColor", () => {
	expect(isHexColor("#123")).toBeTrue();
	expect(isHexColor("#ff3300")).toBeTrue();
	expect(isHexColor("#f30f")).toBeTrue();
	expect(isHexColor("#ff3300ff")).toBeTrue();
	expect(isHexColor(undefined)).toBeFalse();
	expect(isHexColor(null)).toBeFalse();
	expect(isHexColor("")).toBeFalse();
	expect(isHexColor("foo")).toBeFalse();
	expect(isHexColor("123")).toBeFalse();
	expect(isHexColor("#12.")).toBeFalse();
	expect(isHexColor("#j23")).toBeFalse();
	expect(isHexColor("#jf3300")).toBeFalse();
	expect(isHexColor("#j30f")).toBeFalse();
	expect(isHexColor("#jf3300ff")).toBeFalse();
	expect(isHexColor("hi #123")).toBeFalse();
	expect(isHexColor("#ff3300 hi")).toBeFalse();
	expect(isHexColor("hi #ff3300 hi")).toBeFalse();
	expect(isHexColor("#123 #123")).toBeFalse();
});

test("isProtoPath", () => {
	expect(isProtoPath("foo.__proto.bar")).toBeFalse();
	expect(isProtoPath("foo.bar")).toBeFalse();
	expect(isProtoPath("")).toBeFalse();
	expect(isProtoPath("__proto__")).toBeTrue();
	expect(isProtoPath("prototype")).toBeTrue();
	expect(isProtoPath("constructor")).toBeTrue();
	expect(isProtoPath("foo.__proto__.bar")).toBeTrue();
	expect(isProtoPath([])).toBeFalse();
	expect(isProtoPath([""])).toBeFalse();
	expect(isProtoPath(["foo", 23])).toBeFalse();
	expect(isProtoPath(["prototype.foo"])).toBeFalse();
	expect(isProtoPath(["__proto__"])).toBeTrue();
	expect(isProtoPath(["foo", "__proto__", "bar"])).toBeTrue();
});
