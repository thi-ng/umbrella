import type { Fn, Predicate } from "@thi.ng/api";
import type {
	Attribs,
	FormAttribs,
	InputAttribs,
	InputCheckboxAttribs,
	InputFileAttribs,
	InputNumericAttribs,
	InputRadioAttribs,
	InputTextAttribs,
	SelectAttribs,
	TextAreaAttribs,
} from "@thi.ng/hiccup-html";
import type { ComponentLike } from "@thi.ng/rdom";
import type { ISubscriber, ISubscription } from "@thi.ng/rstream";

export interface CommonAttribs {
	wrapperAttribs: Partial<Attribs>;
	labelAttribs: Partial<Attribs>;
	descAttribs: Partial<Attribs>;
}

export interface FormItem {
	/**
	 * Value/widget type identifier. Used by {@link compileForm} to delegate
	 */
	type: string;
	/**
	 * Attrib overrides for the actual input element.
	 */
	attribs?: Partial<Attribs>;
}

export interface Form {
	type: "form";
	items: FormItem[];
	attribs?: Partial<FormAttribs>;
}

export interface Container extends FormItem {
	type: "container";
	items: FormItem[];
}

export interface Custom extends Pick<FormItem, "type"> {
	type: "custom";
	body: ComponentLike;
}

export interface Group extends FormItem {
	type: "group";
	items: FormItem[];
	label?: string | false;
}

export interface Value extends FormItem, Partial<CommonAttribs> {
	id: string;
	name?: string;
	label?: string | false;
	desc?: any;
	required?: boolean;
	readonly?: boolean;
	attribs?: Partial<InputAttribs>;
}

export interface WithPresets<T> {
	/**
	 * Array of possible preset values.
	 */
	list?: T[];
}

export interface Num extends Value, WithPresets<number> {
	type: "num";
	min?: number;
	max?: number;
	placeholder?: string;
	size?: number;
	step?: number;
	value?: ISubscription<number, number>;
	attribs?: Partial<InputNumericAttribs>;
}

export interface Range extends Omit<Num, "type" | "placeholder" | "size"> {
	type: "range";
	vlabel?: boolean | number | Fn<number, string>;
}

export interface Str extends Value, WithPresets<string> {
	type: "str";
	min?: number;
	max?: number;
	pattern?: string | RegExp | Predicate<string>;
	placeholder?: string;
	size?: number;
	value?: ISubscription<string, string>;
	attribs?: Partial<InputTextAttribs>;
}

export interface Email extends Omit<Str, "type"> {
	type: "email";
	autocomplete?: boolean;
}

export interface Phone extends Omit<Str, "type"> {
	type: "tel";
	autocomplete?: boolean;
}

export interface UrlVal extends Omit<Str, "type"> {
	type: "url";
}

export interface Password extends Omit<Str, "type"> {
	type: "password";
	autocomplete?: boolean;
}

export interface Text extends Value {
	type: "text";
	cols?: number;
	rows?: number;
	placeholder?: string;
	value?: ISubscription<string, string>;
	attribs?: Partial<TextAreaAttribs>;
}

export interface Color extends Value, WithPresets<string> {
	type: "color";
	value?: ISubscription<string, string>;
}

export interface DateTime extends Value, WithPresets<string> {
	type: "dateTime";
	min?: string;
	max?: string;
	step?: number;
	value?: ISubscription<string, string>;
}

export interface DateVal extends Omit<DateTime, "type"> {
	type: "date";
}

export interface Time extends Omit<DateTime, "type"> {
	type: "time";
}

export interface Week extends Omit<DateTime, "type" | "list"> {
	type: "week";
}

export interface Month extends Omit<DateTime, "type" | "list"> {
	type: "month";
}

export interface Select<T> extends Value {
	items: (T | SelectItem<T> | SelectItemGroup<T>)[];
	value?: ISubscription<T, T>;
	attribs?: Partial<Omit<SelectAttribs, "multiple">>;
}

export interface SelectItemGroup<T> {
	name: string;
	items: (T | SelectItem<T>)[];
}
export interface SelectItem<T> {
	value: T;
	label?: string;
	desc?: string;
}

export interface SelectStr<T extends string = string> extends Select<T> {
	type: "selectStr";
}

export interface SelectNum<T extends number = number> extends Select<T> {
	type: "selectNum";
}

export interface MultiSelect<T> extends Value {
	items: (T | SelectItem<T> | SelectItemGroup<T>)[];
	value?: ISubscription<T[], T[]>;
	size?: number;
	attribs?: Partial<Omit<SelectAttribs, "multiple">>;
}

export interface MultiSelectStr<T extends string = string>
	extends MultiSelect<T> {
	type: "multiSelectStr";
}

export interface MultiSelectNum<T extends number = number>
	extends MultiSelect<T> {
	type: "multiSelectNum";
}

export interface Toggle extends Value {
	type: "toggle";
	value?: ISubscription<boolean, boolean>;
}

export interface Trigger extends Value {
	type: "trigger";
	title: string;
	value?: ISubscriber<boolean>;
	attribs?: Partial<InputCheckboxAttribs>;
}

export interface Radio<T> extends Value {
	items: (T | SelectItem<T>)[];
	value?: ISubscription<T, T>;
	attribs?: Partial<InputRadioAttribs>;
}

export interface RadioNum extends Radio<number> {
	type: "radioNum";
}

export interface RadioStr extends Radio<string> {
	type: "radioStr";
}

export interface FileVal extends Value {
	type: "file";
	accept?: string[];
	capture?: InputFileAttribs["capture"];
	value?: ISubscriber<File>;
	attribs?: Partial<InputFileAttribs>;
}

export interface MultiFileVal extends Value {
	type: "multiFile";
	accept?: string[];
	value?: ISubscriber<FileList>;
	attribs?: Partial<InputFileAttribs>;
}

type KnownTypes =
	| Color
	| Container
	| DateTime
	| DateVal
	| Email
	| FileVal
	| Group
	| Month
	| MultiFileVal
	| MultiSelectNum
	| MultiSelectStr
	| Num
	| Password
	| Phone
	| Range
	| SelectNum
	| SelectStr
	| Str
	| Text
	| Time
	| Toggle
	| Trigger
	| UrlVal
	| Week;

/**
 * Type specific attribute overrides
 */
export interface TypeAttribs
	extends Record<KnownTypes["type"], Partial<Attribs>> {
	form: Partial<FormAttribs>;
	/**
	 * Attribs for {@link group} label elements
	 */
	groupLabel: Partial<Attribs>;
	/**
	 * Attribs for the actual {@link radio} `<input>` element
	 */
	radio: Partial<InputRadioAttribs>;
	/**
	 * Attribs for the outermost {@link radio} group wrapper element (incl. main
	 * group label)
	 */
	radioWrapper: Partial<Attribs>;
	/**
	 * Attribs for the wrapper element only containing the {@link radio} items.
	 */
	radioItems: Partial<Attribs>;
	/**
	 * Attribs for the wrapper element of a single {@link radio} item (incl.
	 * input element and its label)
	 */
	radioItem: Partial<Attribs>;
	/**
	 * Attribs for a single {@link radio} item's label
	 */
	radioItemLabel: Partial<Attribs>;
	/**
	 * Attribs for {@link range} label elements
	 */
	rangeLabel: Partial<Attribs>;
	/**
	 * Attribs for the wrapper element of a single {@link range} widget (incl.
	 * input element and optional value label)
	 */
	rangeWrapper: Partial<Attribs>;

	[id: string]: Partial<Attribs>;
}

export interface FormOpts extends CommonAttribs {
	/**
	 * ID prefix to prepend for all {@link FormItem}s. Needed if the a form is
	 * to used in multiple places at the same time.
	 */
	prefix: string;
	/**
	 * Type specific behavior options.
	 */
	behaviors: Partial<BehaviorOpts>;
	/**
	 * Type specific attrib overrides
	 */
	typeAttribs: Partial<TypeAttribs>;
}

export interface BehaviorOpts {
	/**
	 * If false, no label elements will be generated.
	 *
	 * @defaultValue true
	 */
	labels: boolean;
	/**
	 * If false, no `value` attributes and event handlers will be generated.
	 *
	 * @defaultValue true
	 */
	values: boolean;
	/**
	 * Unless false, {@link range} widgets will emit `oninput` events, if false
	 * only `onchange` events.
	 *
	 * @defaultValue true
	 */
	rangeOnInput: boolean;
	/**
	 * Unless false, {@link str}-like widgets will emit `oninput` events, if
	 * false only `onchange` events.
	 *
	 * @defaultValue true
	 */
	strOnInput: boolean;
	/**
	 * Unless false, {@link text} elements will emit `oninput` events, if false
	 * only `onchange` events.
	 *
	 * @defaultValue true
	 */
	textOnInput: boolean;
	/**
	 * If true, the label for individual radio items will come before the actual
	 * input element. By default, the order is reversed.
	 *
	 * @defaultValue false
	 */
	radioLabelBefore: boolean;
	/**
	 * Number of fractional digits for range sliders.
	 *
	 * @defaultValue 2
	 */
	rangeLabelFmt: number | Fn<number, string>;
	/**
	 * If true, the label for toggle widgets will come before the actual
	 * input element. By default, the order is reversed.
	 *
	 * @defaultValue false
	 */
	toggleLabelBefore: boolean;
}
