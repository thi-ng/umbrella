/*
 * Obligatory Todo list demo (in < 50 LOC excl. comments)
 * Total filesize: 18KB minified
 *
 * Other packages used:
 * - @thi.ng/atom for state handling
 * - @thi.ng/transducers for task list processing
 *
 * @author Karsten Schmidt
 */

import { IObjectOf } from "@thi.ng/api/api";
import { Atom, Cursor, History } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom/start";
import { setIn, updateIn } from "@thi.ng/paths";
import { iterator } from "@thi.ng/transducers/iterator";
import { pairs } from "@thi.ng/transducers/iter/pairs";
import { map } from "@thi.ng/transducers/xform/map";

interface Task {
    done: boolean;
    body: string;
}

// central app state (immutable)
const db = new Atom({ tasks: {}, nextID: 0 });
// attach undo/redo history for `tasks` branch (arbitrary undo limit of 100 steps)
const tasks = new History<IObjectOf<Task>>(new Cursor(db, "tasks"), 100);
// cursor for direct access to `nextID`
const nextID = new Cursor<number>(db, "nextID");

// state updaters
// each applies its updates via the history atom wrapper
// the `atom.setter` calls produce an immutable update function for given paths
const addNewTask = () => tasks.swap((tasks) => setIn(tasks, nextID.swap((id) => id + 1), { body: "", done: false }));
const toggleTask = (id) => tasks.swap((tasks) => updateIn(tasks, [id, "done"], done => !done));
const updateTask = (id, body) => tasks.swap((tasks) => setIn(tasks, [id, "body"], body));

// single task component
// the text field uses lifecycle hooks to set keyboard focus for new tasks
const taskItem = (id, task: Task) =>
    ["div",
        { class: "task" + (task.done ? " done" : "") },
        ["input",
            {
                type: "checkbox",
                checked: task.done,
                onclick: () => toggleTask(id),
            }],
        [{
            init: (el) => !el.value && el.focus(),
            render: () =>
                ["input",
                    {
                        type: "text",
                        placeholder: "todo...",
                        value: task.body,
                        onkeydown: (e) => e.key === "Enter" && e.target.blur(),
                        onblur: (e) => updateTask(id, (<HTMLInputElement>e.target).value)
                    }]
        }]];

// complete task list
// uses transducer to transform all tasks using above component function
const taskList = () => {
    const tasks = db.deref().tasks;
    return Object.keys(tasks).length ?
        ["div#tasks", ...iterator(map(([id, t]) => taskItem(id, t)), pairs(tasks))] :
        ["div", "nothing todo, get busy..."];
};

const toolbar = () =>
    ["div#toolbar",
        ["button", { onclick: () => addNewTask() }, "+ Add"],
        ["button", { onclick: () => tasks.undo(), disabled: !tasks.canUndo() }, "Undo"],
        ["button", { onclick: () => tasks.redo(), disabled: !tasks.canRedo() }, "Redo"]];

// static header component (simple array)
const header =
    ["h1", "My tasks",
        ["small", "made with \u2764 ",
            ["a", { href: "https://github.com/thi-ng/umbrella/tree/master/packages/hdom" }, "@thi.ng/hdom"]]];

// kick off UI w/ root component function
start(document.getElementById("app"), () => ["div", header, toolbar, taskList]);
