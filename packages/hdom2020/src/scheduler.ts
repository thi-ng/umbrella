import type { Task, IScheduler } from "./api";

export class RAFScheduler implements IScheduler {
    tasks: Map<any, Task[]>;
    raf: number;

    constructor() {
        this.tasks = new Map();
        this.raf = -1;
    }

    add(scope: any, fn: Task) {
        const tasks = this.tasks.get(scope);
        tasks ? tasks.push(fn) : this.tasks.set(scope, [fn]);
        this.raf < 0 &&
            (this.raf = requestAnimationFrame(this.update.bind(this)));
    }

    cancel(scope: any) {
        this.tasks.delete(scope);
    }

    update() {
        for (let tasks of this.tasks.values()) {
            for (let i = tasks.length; --i >= 0; tasks[i]());
        }
        this.tasks.clear();
        this.raf = -1;
    }
}

export class NullScheduler implements IScheduler {
    add(_: any, fn: Task) {
        fn();
    }

    cancel() {}
}

// export let SCHEDULER: IScheduler = new RAFScheduler();
export let SCHEDULER: IScheduler = new NullScheduler();

export const setScheduler = (s: IScheduler) => (SCHEDULER = s);
