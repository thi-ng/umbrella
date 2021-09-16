import type { IObjectOf } from "@thi.ng/api";
import { defAtom } from "@thi.ng/atom/atom";
import { defCursor } from "@thi.ng/atom/cursor";
import { defHistory } from "@thi.ng/atom/history";
import { defView } from "@thi.ng/atom/view";
import { start } from "@thi.ng/hdom/start";
import { pairs } from "@thi.ng/transducers/iter/pairs";
import { map } from "@thi.ng/transducers/xform/map";

interface Task {
    done: boolean;
    body: string;
}

type Tasks = IObjectOf<Task>;

interface State {
    tasks: Tasks;
    nextID: number;
}

// central app state (immutable)
const db = defAtom<State>({ tasks: {}, nextID: 0 });
// attach undo/redo history for `tasks` branch (arbitrary undo limit of 100 steps)
const tasks = defHistory(defCursor<State, "tasks">(db, ["tasks"]), 100);
// cursor for direct access to `nextID`
const nextID = defCursor(db, ["nextID"]);
// create derived view of tasks transformed into components
const items = defView(db, ["tasks"], (tasks: Tasks) => [
    ...map(([id, t]) => taskItem(id, t), pairs(tasks)),
]);

// state updaters
// each applies its updates via the history atom wrapper
// the `atom.setter` calls produce an immutable update function for given paths
const addNewTask = () =>
    tasks.resetIn([nextID.swap((id) => id + 1)], { body: "", done: false });
const toggleTask = (id: string) =>
    tasks.swapIn(<const>[id, "done"], (done) => !done);
const updateTask = (id: string, body: string) =>
    tasks.resetIn(<const>[id, "body"], body);

// single task component
const taskItem = (id: string, task: Task): any[] => {
    const checkAttribs = {
        type: "checkbox",
        checked: task.done,
        onclick: () => toggleTask(id),
    };
    const textAttribs = {
        type: "text",
        placeholder: "todo...",
        value: task.body,
        onkeydown: (e: any) => e.key === "Enter" && e.target.blur(),
        onblur: (e: any) => updateTask(id, (<HTMLInputElement>e.target).value),
    };
    return [
        "div",
        { class: "task" + (task.done ? " done" : "") },
        ["input", checkAttribs],
        ["input", textAttribs],
    ];
};

// complete task list
// uses transducer to transform all tasks using above component function
const taskList = () => {
    const _items = items.deref()!;
    return _items.length
        ? ["div#tasks", _items]
        : ["div", "nothing todo, get busy..."];
};

const button =
    (onclick: EventListener, body: string) => (_: any, disabled: boolean) =>
        ["button", { onclick, disabled }, body];

const toolbar = () => {
    const btAdd = button(() => addNewTask(), "+ Add");
    const btUndo = button(() => tasks.undo(), "Undo");
    const btRedo = button(() => tasks.redo(), "Redo");
    return () => [
        "div#toolbar",
        [btAdd],
        [btUndo, !tasks.canUndo()],
        [btRedo, !tasks.canRedo()],
    ];
};

// static header component (simple array)
const header = [
    "h1",
    "My tasks",
    [
        "small",
        "made with \u2764 ",
        [
            "a",
            {
                href: "https://github.com/thi-ng/umbrella/tree/develop/packages/hdom",
            },
            "@thi.ng/hdom",
        ],
    ],
];

const app = () => {
    return ["div", header, toolbar(), taskList];
};

// kick off UI w/ root component function
start(app());
