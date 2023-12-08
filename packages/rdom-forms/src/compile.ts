import type { Fn, FnAny, NumOrString, Predicate } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { Attribs } from "@thi.ng/hiccup-html";
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

export const form = (...items: FormItem[]): Form => ({
	type: "form",
	items,
});

export const container = (...items: FormItem[]): Container => ({
	type: "container",
	items,
});

export const custom = (body: ComponentLike): Custom => ({
	type: "custom",
	body,
});

let __nextID = 0;

const $ =
	<T extends FormItem>(type: string, defaults?: Partial<T>) =>
	(spec: Omit<T, "type" | "id"> & { id?: string }): T =>
		<any>{
			id: spec.id || `${type}-${__nextID++}`,
			type,
			...defaults,
			...spec,
		};

export const group = $<Group>("group");
export const toggle = $<Toggle>("toggle");
export const trigger = $<Trigger>("trigger");
export const num = $<Num>("num");
export const range = $<Range>("range");
export const color = $<Color>("color");
export const file = $<FileVal>("file");
export const multiFile = $<MultiFileVal>("multiFile");
export const str = $<Str>("str");
export const text = $<Text>("text");
export const search = $<Str>("search");
export const email = $<Email>("email", { autocomplete: true });
export const phone = $<Email>("tel", { autocomplete: true });
export const url = $<UrlVal>("url");
export const password = $<Password>("password", { autocomplete: true });
export const date = $<DateVal>("date");
export const dateTime = $<DateTime>("dateTime");
export const time = $<Time>("time");
export const week = $<Week>("week");
export const month = $<Month>("month");
export const selectStr = $<SelectStr>("selectStr");
export const multiSelectStr = $<MultiSelectStr>("multiSelectStr");
export const selectNum = $<SelectNum>("selectNum");
export const multiSelectNum = $<MultiSelectNum>("multiSelectNum");
export const radioNum = $<RadioNum>("radioNum");
export const radioStr = $<RadioStr>("radioStr");

const __genID = (id: string, opts: Partial<FormOpts>) =>
	opts.prefix ? opts.prefix + id : id;

const __genLabel = (
	x: Pick<Value, "id" | "label" | "desc" | "labelAttribs" | "descAttribs">,
	opts: Partial<FormOpts>
) =>
	label(
		{ ...opts.labelAttribs, ...x.labelAttribs, for: __genID(x.id, opts) },
		x.label ?? x.id,
		x.desc ? span({ ...opts.descAttribs, ...x.descAttribs }, x.desc) : null
	);

const __genList = (id: string, list: NumOrString[]) =>
	datalist({ id: id + "--list" }, ...list.map((value) => option({ value })));

const __genCommon = (
	val: Value & { list?: any[] },
	opts: Partial<FormOpts>
) => {
	const res: ComponentLike[] = [];
	if (val.label !== false && opts.behaviors?.labels !== false)
		res.push(__genLabel(val, opts));
	if (val.list) res.push(__genList(__genID(val.id, opts), val.list));
	return res;
};

const __attribs = (
	attribs: Partial<Attribs>,
	val: Value & { value: any; list?: any[] },
	opts: Partial<FormOpts>,
	value: string | false = "value"
) => {
	const id = __genID(val.id, opts);
	Object.assign(attribs, val.attribs, {
		id,
		name: val.name || val.id,
		list: val.list ? id + "--list" : undefined,
		required: val.required,
	});
	if (value) attribs[value] = val.value;
	return attribs;
};

const __component = (
	val: Value & { value: any; list?: any[] },
	opts: Partial<FormOpts>,
	el: Fn<Partial<Attribs>, ComponentLike> | FnAny<ComponentLike>,
	attribs: Partial<Attribs>,
	value: string | false = "value",
	...body: any[]
) =>
	div(
		{ ...opts.wrapperAttribs, ...val.wrapperAttribs },
		...__genCommon(val, opts),
		// @ts-ignore extra args
		el(__attribs(attribs, val, opts, value), ...body)
	);

const __edit = <T extends Str>(val: T) => {
	if (val.match) {
		let match: Predicate<string>;
		if (isFunction(val.match)) {
			match = val.match;
		} else {
			const re = isString(val.match) ? new RegExp(val.match) : val.match;
			match = (x: string) => re.test(x);
		}
		return (e: InputEvent) => {
			const target = <HTMLInputElement>e.target;
			const body = target.value;
			const ok = match(body);
			if (ok) val.value.next(body);
			$attribs(target, { invalid: !ok });
		};
	}
	return $input(val.value);
};

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
			if (val.label)
				children.push(legend({ ...opts.groupLabelAttribs }, val.label));
			return fieldset(
				{ ...opts.typeAttribs?.group, ...val.attribs },
				...children,
				...val.items.map((x) => compileForm(x, opts))
			);
		},

		custom: (val) => (<Custom>val).body,

		toggle: ($val, opts) =>
			__component(
				<Toggle>$val,
				opts,
				checkbox,
				{
					...opts.typeAttribs?.toggle,
					onchange: $inputCheckbox((<Toggle>$val).value),
				},
				"checked"
			),

		trigger: ($val, opts) =>
			__component(
				<Trigger>$val,
				opts,
				button,
				{
					...opts.typeAttribs?.trigger,
					onchange: $inputTrigger((<Trigger>$val).value),
				},
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
					...val.attribs,
					onchange: () => val.value.next(item.value),
					id: __genID(id, opts),
					name: val.name || val.id,
					checked: val.value.map((x) => x === item.value),
					value: item.value,
				});
				return div(
					{ ...opts.typeAttribs?.radioItem },
					...(opts.behaviors?.radioLabelBefore !== false
						? [label, ctrl]
						: [ctrl, label])
				);
			};
			return div(
				{
					...opts.wrapperAttribs,
					...opts.typeAttribs?.radio,
					...val.wrapperAttribs,
				},
				...__genCommon(val, opts),
				div(
					{ ...opts.typeAttribs?.radioItemWrapper },
					...val.items.map($option)
				)
			);
		},

		color: ($val, opts) =>
			__component(<Color>$val, opts, inputColor, {
				...opts.typeAttribs?.color,
				onchange: $input((<Color>$val).value),
			}),

		file: ($val, opts) => {
			const val = <FileVal>$val;
			const isMulti = val.id.startsWith("multi");
			return __component(
				val,
				opts,
				inputFile,
				{
					...opts.typeAttribs?.num,
					onchange: isMulti
						? $inputFiles((<MultiFileVal>$val).value)
						: $inputFile(val.value),
					accept: val.accept,
					capture: val.capture,
					multiple: isMulti,
				},
				false
			);
		},

		num: ($val, opts) => {
			const val = <Num>$val;
			return __component(val, opts, inputNumber, {
				...opts.typeAttribs?.num,
				onchange: $inputNum(val.value),
				min: val.min,
				max: val.max,
				step: val.step,
				placeholder: val.placeholder,
				size: val.size,
			});
		},

		range: ($val, opts) => {
			const val = <Range>$val;
			const edit =
				opts.behaviors?.rangeOnInput === false ? "onchange" : "oninput";
			return div(
				{ ...opts.wrapperAttribs, ...val.wrapperAttribs },
				...__genCommon(val, opts),
				inputRange(
					__attribs(
						{
							...opts.typeAttribs?.range,
							[edit]: $inputNum(val.value),
							min: val.min,
							max: val.max,
							step: val.step,
						},
						val,
						opts
					)
				),
				val.vlabel !== false
					? span(
							{ ...opts.rangeLabelAttribs },
							val.value.map((x) => x.toFixed(val.vlabelPrec ?? 3))
					  )
					: undefined
			);
		},

		str: ($val, opts) => {
			const val = <Str>$val;
			const type =
				{ dateTime: "datetime-local" }[$val.type] ||
				($val.type !== "str" ? $val.type : "text");
			const edit =
				opts.behaviors?.strOnInput === false ? "onchange" : "oninput";
			return __component(val, opts, inputText, {
				...(opts.typeAttribs?.[val.type] || opts.typeAttribs?.str),
				[edit]: __edit(val),
				type,
				autocomplete: (<any>val).autocomplete,
				minlength: val.min,
				maxlength: val.max,
				placeholder: val.placeholder,
				pattern: isString(val.match) ? val.match : undefined,
				size: val.size,
			});
		},

		text: ($val, opts) => {
			const val = <Text>$val;
			const edit =
				opts.behaviors?.textOnInput === false ? "onchange" : "oninput";
			return __component(val, opts, textArea, {
				...opts.typeAttribs?.text,
				[edit]: $input(val.value),
				cols: val.cols,
				rows: val.rows,
				placeholder: val.placeholder,
			});
		},

		date: ($val, opts) => {
			const val = <DateVal>$val;
			const type = { dateTime: "datetime-local" }[$val.type] || $val.type;
			return __component(val, opts, inputText, {
				...(opts.typeAttribs?.[$val.type] || opts.typeAttribs?.date),
				onchange: $input(val.value),
				type,
				min: val.min,
				max: val.max,
				step: val.step,
			});
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
			const $select = (sel: NumOrString) =>
				select(
					__attribs(
						{
							...opts.typeAttribs?.select,
							onchange: isNumeric
								? $inputNum(val.value)
								: $input(val.value),
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
				$replace(val.value.map($select))
			);
		},

		multiSelect: ($val, opts) => {
			const val = <MultiSelect<NumOrString>>$val;
			const isNumeric = val.type.endsWith("Num");
			const coerce: Fn<HTMLOptionElement, NumOrString> = isNumeric
				? (x) => parseFloat(x.value)
				: (x) => x.value;
			const sel = val.value.map((x) => (isArray(x) ? x : [x]));
			const $option = ($item: any | SelectItem<any>) => {
				const item = isPlainObject($item) ? $item : { value: $item };
				return option(
					{
						value: item.value,
						selected: sel.map(($sel) => $sel.includes(item.value)),
					},
					item.label || item.value
				);
			};
			return __component(
				val,
				opts,
				select,
				{
					...opts.typeAttribs?.multiSelect,
					onchange: (e: InputEvent) => {
						val.value.next(
							[
								...(<HTMLSelectElement>e.target)
									.selectedOptions,
							].map(coerce)
						);
					},
					multiple: true,
					size: val.size,
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
