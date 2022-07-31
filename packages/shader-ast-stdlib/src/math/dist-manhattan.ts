import type { Vec2Term, Vec3Term, Vec4Term } from "@thi.ng/shader-ast";
import { add, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $x, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { abs } from "@thi.ng/shader-ast/builtin/math";

export const distManhattan2 = (
	a: Vec2Term | Vec3Term | Vec4Term,
	b: Vec2Term | Vec3Term | Vec4Term
) => add(abs(sub($x(a), $x(b))), abs(sub($y(a), $y(b))));

export const distManhattan3 = (
	a: Vec3Term | Vec4Term,
	b: Vec3Term | Vec4Term
) => add(distManhattan2(a, b), abs(sub($z(a), $z(b))));

export const distManhattan4 = (a: Vec4Term, b: Vec4Term) =>
	add(distManhattan2(a, b), distManhattan2($(a, "zw"), $(b, "zw")));
