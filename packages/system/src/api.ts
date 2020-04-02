import type { Keys, Fn } from "@thi.ng/api";

export interface ILifecycle {
    start(): Promise<boolean>;
    stop(): Promise<boolean>;
}

export type SystemMap<T> = Record<Keys<T>, ILifecycle>;

export type ComponentFactory<T extends SystemMap<T>> = Fn<T, ILifecycle>;

export type SystemSpecs<T extends SystemMap<T>> = Record<
    Keys<T>,
    {
        factory: ComponentFactory<T>;
        deps?: Keys<T>[];
    }
>;
