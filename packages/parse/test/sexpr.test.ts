import { expect, test } from "bun:test";
import { defContext, defGrammar, type ParseScope } from "../src/index.js";

const grammar = `
list: '('! <expr> ')'! ;
sym: ( <ALPHA_NUM> | [?!$+\\u002d*/.~#^=<>] )+ => join ;
expr: ( <FLOAT> | <STRING> | <sym> | <list> | <WS1> )* ;
prog: <START> <expr> <END> => hoist ;
`;

const prune = (scope: ParseScope<any>) => {
	if (!scope) return;
	delete scope.state;
	if (scope.result == null) delete scope.result;
	if (scope.children) {
		for (let c of scope.children) {
			prune(c);
		}
	} else {
		delete scope.children;
	}
	return scope;
};

test("s-expr", () => {
	const lang = defGrammar(grammar);
	expect(lang).toBeDefined();
	const ctx = defContext(
		`(def hello (x) (str "hello, " x))\n\n(print (hello -12.3))`
	);
	expect(lang!.rules.prog(ctx)).toBeTrue();
	const tree = prune(ctx.root);
	expect(tree).toEqual(<any>{
		id: "root",
		children: [
			{
				id: "expr",
				children: [
					{
						id: "list",
						children: [
							{
								id: "expr",
								children: [
									{
										id: "sym",
										result: "def",
									},
									{
										id: "sym",
										result: "hello",
									},
									{
										id: "list",
										children: [
											{
												id: "expr",
												children: [
													{
														id: "sym",
														result: "x",
													},
												],
											},
										],
									},
									{
										id: "list",
										children: [
											{
												id: "expr",
												children: [
													{
														id: "sym",
														result: "str",
													},
													{
														id: "string",
														result: "hello, ",
													},
													{
														id: "sym",
														result: "x",
													},
												],
											},
										],
									},
								],
							},
						],
					},
					{
						id: "list",
						children: [
							{
								id: "expr",
								children: [
									{
										id: "sym",
										result: "print",
									},
									{
										id: "list",
										children: [
											{
												id: "expr",
												children: [
													{
														id: "sym",
														result: "hello",
													},
													{
														id: "real",
														result: -12.3,
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	});
});
