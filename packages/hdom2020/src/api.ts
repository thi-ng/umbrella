import type { Fn0 } from "@thi.ng/api";
import type { IAtom } from "@thi.ng/atom";
import type { ISubscribable } from "@thi.ng/rstream";

export interface IComponent<T = any> {
    el?: Element;
    mount(parent: Element, ...xs: any[]): Promise<Element>;
    unmount(): Promise<void>;
    update(state?: T): void;
}

export interface IMountWith<T, M> extends IComponent<T> {
    mount(parent: Element, state: M): Promise<Element>;
}

export type IMountWithAtom<T> = IMountWith<T, IAtom<T>>;

export type IMountWithState<T> = IMountWith<T, T>;

export interface SubscribedElement<T = any> extends IComponent {
    sub?: ISubscribable<T>;
}

export interface CompiledComponent extends IComponent {
    subs?: ISubscribable<any>[];
    children?: IComponent[];
}

export type ComponentLike =
    | IComponent<any>
    | [string | Function, ...(any | null)[]];

export type Callback = Fn0<void>;

export type Task = Fn0<void>;

export interface IScheduler {
    add(scope: any, task: Task): void;
    cancel(scope: any): void;
}
