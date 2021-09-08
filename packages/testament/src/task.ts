import type { Task } from "./api";

export const TASKS: Task[] = [];

export const registerTask = (task: Task) => {
    TASKS.push(task);
};

export const executeTasks = async () => {
    while (TASKS.length) {
        await TASKS.shift()!();
    }
};
