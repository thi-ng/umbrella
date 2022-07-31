export type Stack = any[];
export type StackEnv = any;
export type StackFn = (ctx: StackContext) => StackContext;
export type StackProgram = any[];
export type StackProc = StackFn | StackProgram;

export interface StackContext extends Array<any> {
	[0]: Stack;
	[1]: Stack;
	[2]: StackEnv;
}
