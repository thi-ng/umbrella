import type { Fn, FnAny, NumOrString, Predicate } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { Attribs, FormAttribs } from "@thi.ng/hiccup-html";
import { div } from "@thi.ng/hiccup-html/blocks";
import {
	form as $form,
	button,
	checkbox,
	fieldset,
	inputColor,
	inputFile,
	inputNumber,
	inputRange,
	inputText,
	label,
	legend,
	optGroup,
	option,
	radio,
	select,
	textArea,
} from "@thi.ng/hiccup-html/forms";
import { span } from "@thi.ng/hiccup-html/inline";
import { datalist } from "@thi.ng/hiccup-html/lists";
import {
	$attribs,
	$input,
	$inputCheckbox,
	$inputFile,
	$inputFiles,
	$inputNum,
	$inputTrigger,
	$replace,
	type ComponentLike,
} from "@thi.ng/rdom";
import type { ISubscribable } from "@thi.ng/rstream";
import type {
	Color,
	Container,
	Custom,
	DateTime,
	DateVal,
	Email,
	FileVal,
	Form,
	FormItem,
	FormOpts,
	Group,
	Month,
	MultiFileVal,
	MultiSelect,
	MultiSelectNum,
	MultiSelectStr,
	Num,
	Password,
	Radio,
	RadioNum,
	RadioStr,
	Range,
	Select,
	SelectItem,
	SelectNum,
	SelectStr,
	Str,
	Text,
	Time,
	Toggle,
	Trigger,
	UrlVal,
	Value,
	Week,
} from "./api.js";

export const form = (
	attribs: Partial<FormAttribs>,
	...items: FormItem[]
): Form => ({
	type: "form",
	attribs,
	items,
});

export const container = (
	attribs: Partial<Attribs>,
	...items: FormItem[]
): Container => ({
	type: "container",
	attribs,
	items,
});

export const group = (
	spec: Omit<Group, "type" | "id" | "items"> & { id?: string },
	...items: FormItem[]
): Group => ({
	...spec,
	type: "group",
	items,
});

export const custom = (body: ComponentLike): Custom => ({
	type: "custom",
	body,
});

let __nextID = 0;

type PartialSpec<T extends Value> = Omit<T, "type" | "id"> & { id?: string };

type ReadonlyPartialSpec<T extends Value, V = string> = Omit<
	T,
	"type" | "id" | "readonly" | "value"
> & {
	id?: string;
	readonly: true;
	value?: ISubscribable<V>;
};

const $ =
	<T extends Value, R = string>(type: string, defaults?: Partial<T>) =>
	(spec: PartialSpec<T> | ReadonlyPartialSpec<T, R>): T =>
		<any>{
			id: spec.id || `${type}-${__nextID++}`,
			type,
			...defaults,
			...spec,
		};

export const color = $<Color>("color");
export const date = $<DateVal>("date");
export const dateTime = $<DateTime>("dateTime");
export const email = $<Email>("email", { autocomplete: true });
export const file = $<FileVal, never>("file");
export const month = $<Month>("month");
export const multiFile = $<MultiFileVal, never>("multiFile");
export const multiSelectNum = $<MultiSelectNum, number>("multiSelectNum");
export const multiSelectStr = $<MultiSelectStr>("multiSelectStr");
export const num = $<Num, number>("num");
export const password = $<Password>("password", { autocomplete: true });
export const phone = $<Email>("tel", { autocomplete: true });
export const radioNum = $<RadioNum, number>("radioNum");
export const radioStr = $<RadioStr>("radioStr");
export const range = $<Range, number>("range");
export const search = $<Str>("search");
export const selectNum = $<SelectNum, number>("selectNum");
export const selectStr = $<SelectStr>("selectStr");
export const str = $<Str, string>("str");
export const text = $<Text>("text");
export const time = $<Time>("time");
export const toggle = $<Toggle, boolean>("toggle");
export const trigger = $<Trigger>("trigger");
export const url = $<UrlVal>("url");
export const week = $<Week>("week");

/** @internal */
const __genID = (id: string, opts: Partial<FormOpts>) =>
	opts.prefix ? opts.prefix + id : id;

/** @internal */
const __genLabel = (
	x: Pick<Value, "id" | "label" | "desc" | "labelAttribs" | "descAttribs">,
	opts: Partial<FormOpts>
) =>
	label(
		{ ...opts.labelAttribs, ...x.labelAttribs, for: __genID(x.id, opts) },
		x.label ?? x.id,
		x.desc ? span({ ...opts.descAttribs, ...x.descAttribs }, x.desc) : null
	);

/** @internal */
const __genList = (id: string, list: NumOrString[]) =>
	datalist({ id: id + "--list" }, ...list.map((value) => option({ value })));

/** @internal */
const __genCommon = (
	val: Value & { list?: any[] },
	opts: Partial<FormOpts>
) => {
	const res: ComponentLike[] = [];
	if (val.label !== false && opts.behaviors?.labels !== false) {
		res.push(__genLabel(val, opts));
	}
	if (val.list) {
		res.push(__genList(__genID(val.id, opts), val.list));
	}
	return res;
};

/** @internal */
const __attribs = (
	attribs: Partial<Attribs>,
	events: Partial<Attribs>,
	val: Value & { value?: any; list?: any[] },
	opts: Partial<FormOpts>,
	value: string | false = "value"
) => {
	const id = __genID(val.id, opts);
	Object.assign(attribs, val.attribs, {
		id,
		name: val.name || val.id,
		list: val.list ? id + "--list" : undefined,
		required: val.required,
		readonly: val.readonly,
	});
	if (!val.readonly) {
		Object.assign(attribs, events);
	}
	if (value !== false) {
		attribs[value] = val.value;
	}
	return attribs;
};

/** @internal */
const __component = (
	val: Value & { value?: any; list?: any[] },
	opts: Partial<FormOpts>,
	el: Fn<Partial<Attribs>, ComponentLike> | FnAny<ComponentLike>,
	attribs: Partial<Attribs>,
	events: Partial<Attribs>,
	value: string | false = "value",
	...body: any[]
) =>
	div(
		{ ...opts.wrapperAttribs, ...val.wrapperAttribs },
		...__genCommon(val, opts),
		// @ts-ignore extra args
		el(__attribs(attribs, events, val, opts, value), ...body)
	);

/** @internal */
const __edit = <T extends Str>(val: T) => {
	if (val.pattern) {
		let match: Predicate<string>;
		if (isFunction(val.pattern)) {
			match = val.pattern;
		} else {
			const re = isString(val.pattern)
				? new RegExp(val.pattern)
				: val.pattern;
			match = (x: string) => re.test(x);
		}
		return (e: InputEvent) => {
			const target = <HTMLInputElement>e.target;
			const body = target.value;
			const ok = match(body);
			if (ok) val.value!.next(body);
			$attribs(target, { invalid: !ok });
		};
	}
	return $input(val.value!);
};

/**
 * Compiles given {@link FormItem} spec into a hiccup/rdom component, using
 * provided options to customize attributes and behaviors.
 *
 * @remarks
 * This function is polymorphic and dynamically extensible for new/custom form
 * element types. See thi.ng/defmulti readme for instructions.
 */
export const compileForm: MultiFn2<
	FormItem,
	Partial<FormOpts>,
	ComponentLike
> = defmulti<FormItem, Partial<FormOpts>, ComponentLike>(
	(x) => x.type,
	{
		multiFile: "file",
		dateTime: "date",
		time: "date",
		week: "date",
		month: "date",
		email: "str",
		password: "str",
		tel: "str",
		search: "str",
		url: "str",
		radioNum: "radio",
		radioStr: "radio",
		selectNum: "select",
		selectStr: "select",
		multiSelectNum: "multiSelect",
		multiSelectStr: "multiSelect",
	},
	{
		form: ($val, opts) => {
			const val = <Form>$val;
			return $form(
				{ ...opts.typeAttribs?.form, ...val.attribs },
				...val.items.map((x) => compileForm(x, opts))
			);
		},

		container: ($val, opts) => {
			const val = <Container>$val;
			return div(
				{ ...opts.typeAttribs?.container, ...val.attribs },
				...val.items.map((x) => compileForm(x, opts))
			);
		},

		group: ($val, opts) => {
			const val = <Group>$val;
			const children: ComponentLike[] = [];
			if (val.label) {
				children.push(
					legend({ ...opts.typeAttribs?.groupLabel }, val.label)
				);
			}
			return fieldset(
				{ ...opts.typeAttribs?.group, ...val.attribs },
				...children,
				...val.items.map((x) => compileForm(x, opts))
			);
		},

		custom: (val) => (<Custom>val).body,

		toggle: ($val, opts) => {
			const val = <Toggle>$val;
			const label = __genLabel(val, opts);
			const ctrl = checkbox(
				__attribs(
					{ ...opts.typeAttribs?.toggle },
					{ onchange: $inputCheckbox((<Toggle>$val).value!) },
					val,
					opts,
					"checked"
				)
			);
			return div(
				{ ...opts.wrapperAttribs, ...val.wrapperAttribs },
				...(opts.behaviors?.toggleLabelBefore !== false
					? [label, ctrl]
					: [ctrl, label])
			);
		},

		trigger: ($val, opts) =>
			__component(
				<Trigger>$val,
				opts,
				button,
				{ ...opts.typeAttribs?.trigger },
				{ onchange: $inputTrigger((<Trigger>$val).value!) },
				false,
				(<Trigger>$val).title
			),

		radio: ($val, opts) => {
			const val = <Radio<any>>$val;
			const labelAttribs = {
				...opts.typeAttribs?.radioItemLabel,
				...val.labelAttribs,
			};
			const $option = ($item: any | SelectItem<any>) => {
				const item = isPlainObject($item) ? $item : { value: $item };
				const id = val.id + "-" + item.value;
				const label = __genLabel(
					{
						id,
						label: item.label || item.value,
						desc: item.desc,
						labelAttribs,
						descAttribs: val.descAttribs,
					},
					opts
				);
				const ctrl = radio({
					...opts.typeAttribs?.radio,
					...val.attribs,
					onchange: val.value
						? () => val.value!.next(item.value)
						: undefined,
					id: __genID(id, opts),
					name: val.name || val.id,
					checked: val.value
						? val.value.map((x) => x === item.value)
						: undefined,
					value: item.value,
				});
				return div(
					{ ...opts.typeAttribs?.radioItem },
					...(opts.behaviors?.radioLabelBefore
						? [label, ctrl]
						: [ctrl, label])
				);
			};
			return div(
				{
					...opts.wrapperAttribs,
					...opts.typeAttribs?.radioWrapper,
					...val.wrapperAttribs,
				},
				...__genCommon(val, opts),
				div(
					{ ...opts.typeAttribs?.radioItems },
					...val.items.map($option)
				)
			);
		},

		color: ($val, opts) =>
			__component(
				<Color>$val,
				opts,
				inputColor,
				{ ...opts.typeAttribs?.color },
				{ onchange: $input((<Color>$val).value!) }
			),

		file: ($val, opts) => {
			const val = <FileVal>$val;
			const isMulti = val.id.startsWith("multi");
			return __component(
				val,
				opts,
				inputFile,
				{
					...opts.typeAttribs?.num,
					accept: val.accept,
					capture: val.capture,
					multiple: isMulti,
				},
				{
					onchange: isMulti
						? $inputFiles((<MultiFileVal>$val).value!)
						: $inputFile(val.value!),
				},
				false
			);
		},

		num: ($val, opts) => {
			const val = <Num>$val;
			return __component(
				val,
				opts,
				inputNumber,
				{
					...opts.typeAttribs?.num,
					min: val.min,
					max: val.max,
					step: val.step,
					placeholder: val.placeholder,
					size: val.size,
				},
				{ onchange: $inputNum(val.value!) }
			);
		},

		range: ($val, opts) => {
			const val = <Range>$val;
			const edit =
				opts.behaviors?.rangeOnInput === false ? "onchange" : "oninput";
			return div(
				{ ...opts.wrapperAttribs, ...val.wrapperAttribs },
				...__genCommon(val, opts),
				div(
					{},
					inputRange(
						__attribs(
							{
								...opts.typeAttribs?.range,
								min: val.min,
								max: val.max,
								step: val.step,
							},
							{ [edit]: $inputNum(val.value!) },
							val,
							opts
						)
					),
					val.value && val.vlabel !== false
						? span(
								{ ...opts.typeAttribs?.rangeLabel },
								val.value.map((x) =>
									x.toFixed(val.vlabelPrec ?? 3)
								)
						  )
						: undefined
				)
			);
		},

		str: ($val, opts) => {
			const val = <Str>$val;
			const type =
				{ dateTime: "datetime-local" }[$val.type] ||
				($val.type !== "str" ? $val.type : "text");
			const edit =
				opts.behaviors?.strOnInput === false ? "onchange" : "oninput";
			return __component(
				val,
				opts,
				inputText,
				{
					...(opts.typeAttribs?.[val.type] || opts.typeAttribs?.str),
					type,
					autocomplete: (<any>val).autocomplete,
					minlength: val.min,
					maxlength: val.max,
					placeholder: val.placeholder,
					pattern: isString(val.pattern) ? val.pattern : undefined,
					size: val.size,
				},
				{ [edit]: __edit(val) }
			);
		},

		text: ($val, opts) => {
			const val = <Text>$val;
			const edit =
				opts.behaviors?.textOnInput === false ? "onchange" : "oninput";
			return __component(
				val,
				opts,
				textArea,
				{
					...opts.typeAttribs?.text,
					cols: val.cols,
					rows: val.rows,
					placeholder: val.placeholder,
				},
				{ [edit]: $input(val.value!) }
			);
		},

		date: ($val, opts) => {
			const val = <DateVal>$val;
			const type = { dateTime: "datetime-local" }[$val.type] || $val.type;
			return __component(
				val,
				opts,
				inputText,
				{
					...(opts.typeAttribs?.[$val.type] ||
						opts.typeAttribs?.date),
					type,
					min: val.min,
					max: val.max,
					step: val.step,
				},
				{ onchange: $input(val.value!) }
			);
		},

		select: ($val, opts) => {
			const val = <Select<NumOrString>>$val;
			const isNumeric = val.type.endsWith("Num");
			const $option = ($item: any | SelectItem<any>, sel: any) => {
				const item = isPlainObject($item) ? $item : { value: $item };
				return option(
					{
						value: item.value,
						selected: sel === item.value,
					},
					item.label || item.value
				);
			};
			const $select = (sel?: NumOrString) =>
				select(
					__attribs(
						{
							...(opts.typeAttribs?.[val.type] ||
								opts.typeAttribs?.select),
						},
						{
							onchange: isNumeric
								? $inputNum(val.value!)
								: $input(val.value!),
						},
						val,
						opts,
						false
					),
					...val.items.map((item) =>
						isPlainObject(item) && "items" in item
							? optGroup(
									{ label: item.name },
									...item.items.map((i) => $option(i, sel))
							  )
							: $option(item, sel)
					)
				);
			return div(
				{ ...opts.wrapperAttribs, ...val.wrapperAttribs },
				...__genCommon(val, opts),
				val.value ? $replace(val.value.map($select)) : $select()
			);
		},

		multiSelect: ($val, opts) => {
			const val = <MultiSelect<NumOrString>>$val;
			const isNumeric = val.type.endsWith("Num");
			const coerce: Fn<HTMLOptionElement, NumOrString> = isNumeric
				? (x) => parseFloat(x.value)
				: (x) => x.value;
			const sel = val.value
				? val.value.map((x) => (isArray(x) ? x : [x]))
				: null;
			const $option = ($item: any | SelectItem<any>) => {
				const item = isPlainObject($item) ? $item : { value: $item };
				return option(
					{
						value: item.value,
						selected: sel
							? sel.map(($sel) => $sel.includes(item.value))
							: false,
					},
					item.label || item.value
				);
			};
			return __component(
				val,
				opts,
				select,
				{
					...(opts.typeAttribs?.[val.type] ||
						opts.typeAttribs?.multiSelect),
					multiple: true,
					size: val.size,
				},
				{
					onchange: (e: InputEvent) => {
						val.value!.next(
							[
								...(<HTMLSelectElement>e.target)
									.selectedOptions,
							].map(coerce)
						);
					},
				},
				false,
				...val.items.map((item) =>
					isPlainObject(item) && "items" in item
						? optGroup(
								{ label: item.name },
								...item.items.map($option)
						  )
						: $option(item)
				)
			);
		},
	}
);
