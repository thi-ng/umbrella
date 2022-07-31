import type { ISubscriber } from "@thi.ng/rstream";
import { splice } from "@thi.ng/strings/splice";
import { map } from "@thi.ng/transducers/map";

export const asSet = (x: string) => new Set(map((x) => x.trim(), x.split(",")));

// helper transducer to convert a CSV string into an ES6 Set
export const xformAsSet = map(asSet);

// key event handler for textareas to override Tab key behavior and
// insert spaces at cursor position instead of changing keyboard focus
export const handleTab =
	(stream: ISubscriber<string>) => (e: KeyboardEvent) => {
		// override tab to insert spaces at edit pos
		if (e.key === "Tab") {
			e.preventDefault();
			stream.next(
				splice(
					(<any>e.target).value,
					"    ",
					(<HTMLTextAreaElement>e.target).selectionStart
				)
			);
		}
	};

export const varName = (name: string) => name.replace(/\-+/g, "_");
