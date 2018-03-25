export type Stack = any[];
export type StackEnv = any;
export type StackFn = (ctx: StackContext) => StackContext;
export type StackProgram = any[];
export type StackProc = StackFn | StackProgram;
export type Trap = (e: Error, stack: Stack, program: StackProgram, i: number) => boolean;
export type RunResult = [StackContext, boolean];

export interface StackContext extends Array<any> {
    [0]: Stack;
    [1]?: StackEnv;
}
