import { IObjectOf } from "@thi.ng/api/api";

export interface ILifecycle {
    init?(el: Element, ctx: any, ...args: any[]);
    render(ctx: any, ...args: any[]): any;
    release?(ctx: any, ...args: any[]);
}

export interface ComponentAttribs {
    class?: string;
    disabled?: boolean;
    href?: string;
    id?: string;
    key?: string;
    style?: string | IObjectOf<string | number>;
    [_: string]: any;
}

export const DEBUG = false;
