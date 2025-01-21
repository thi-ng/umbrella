// SPDX-License-Identifier: Apache-2.0
import { anchor, button, div, h1, inputText, li } from "@thi.ng/hiccup-html";
import { pickRandom } from "@thi.ng/random";
import { $compile, $input, $list } from "@thi.ng/rdom";
import { reactive, stream } from "@thi.ng/rstream";
import { packages } from "./packages.js";

// reactive state values
const input = reactive("");
const inputReset = input.map(() => "");
const status = stream<{ type: string; msg: string }>();
const answers = reactive<string[]>([]);
const remaining = answers.map((x) => packages.length - x.length);

// input processing & quiz logic
input.subscribe({
	next(guess) {
		guess = guess.trim();
		if (!guess) return;
		// valid package name?
		if (!packages.includes(guess)) {
			status.next({
				type: "wrong",
				msg: "😩 Not a package (yet?). Try again?",
			});
			return;
		}
		// duplicate?
		if (answers.deref()!.includes(guess)) {
			status.next({
				type: "dupe",
				msg: "😉 You've already guessed that one!",
			});
			return;
		}
		// a winner!
		answers.next([...answers.deref()!, guess]);
		status.next({
			type: "ok",
			msg: pickRandom([
				"👍 Yeah, that's a good one!",
				"🤩 Yass!",
				"✌️ You've got it!",
				"👏 Amazing!",
				"🤌 You're a true superuser!",
			]),
		});
	},
});

// define & mount reactive UI components in DOM
$compile(
	div(
		{},
		h1({}, "thi.ng/umbrella package quiz"),
		div("#remaining", {}, remaining, " packages left to guess"),
		div(
			{},
			inputText({
				id: "input",
				placeholder: "package name (w/o prefix)",
				value: inputReset,
				onchange: $input(input),
			}),
			div(
				"#controls",
				{},
				button(
					{
						onclick: () =>
							input.next(
								(<HTMLInputElement>(
									document.getElementById("input")!
								)).value
							),
					},
					"guess!"
				),
				button(
					{
						onclick: () => answers.next(packages.slice()),
					},
					"give up!"
				)
			)
		),
		div(
			"#status",
			{ class: status.map((x) => x.type) },
			status.map((x) => x.msg)
		),
		$list(answers, "ol#answers", {}, (x) =>
			li({}, anchor({ href: `https://thi.ng/${x}` }, x))
		)
	)
).mount(document.getElementById("app")!);
