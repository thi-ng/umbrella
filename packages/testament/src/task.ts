import type { TestResult } from ".";
import type { Task } from "./api";
import { now, timeDiff } from "./utils";

export const TASKS: Task[] = [];

export const registerTask = (task: Task) => {
    TASKS.push(task);
};

export const executeTasks = async () => {
    let results: TestResult[] = [];
    const t0 = now();
    while (TASKS.length) {
        results = results.concat(await TASKS.shift()!());
    }
    results.push({ title: "Total", time: timeDiff(t0, now()), trials: 1 });
    return results;
};
