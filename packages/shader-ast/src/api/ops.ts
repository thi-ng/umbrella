// SPDX-License-Identifier: Apache-2.0
export type MathOperator = "+" | "-" | "*" | "/" | "%" | "++" | "--";
export type LogicOperator = "!" | "||" | "&&";
export type ComparisonOperator = "<" | "<=" | "==" | "!=" | ">=" | ">";
export type BitOperator = "<<" | ">>" | "|" | "&" | "^" | "~";
export type Operator =
	| MathOperator
	| LogicOperator
	| ComparisonOperator
	| BitOperator;
