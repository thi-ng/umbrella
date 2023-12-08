import type { Predicate } from "@thi.ng/api";
import type {
	Attribs,
	FormAttribs,
	InputFileAttribs,
} from "@thi.ng/hiccup-html";
import type { ComponentLike } from "@thi.ng/rdom";
import type { ISubscriber, ISubscription } from "@thi.ng/rstream";

export interface CommonAttribs {
	wrapperAttribs: Partial<Attribs>;
	labelAttribs: Partial<Attribs>;
	descAttribs: Partial<Attribs>;
}

export interface FormItem {
	type: string;
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
}

export interface Num extends Value {
	type: "num";
	list?: number[];
	min?: number;
	max?: number;
	placeholder?: string;
	size?: number;
	step?: number;
	value: ISubscription<number, number>;
}

export interface Range extends Omit<Num, "type" | "placeholder" | "size"> {
	type: "range";
	vlabel?: boolean;
	vlabelPrec?: number;
}

export interface Str extends Value {
	type: "str";
	list?: string[];
	min?: number;
	max?: number;
	match?: string | RegExp | Predicate<string>;
	placeholder?: string;
	size?: number;
	value: ISubscription<string, string>;
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
	value: ISubscription<string, string>;
}

export interface Color extends Value {
	type: "color";
	list?: string[];
	value: ISubscription<string, string>;
}

export interface DateTime extends Value {
	type: "dateTime";
	min?: string;
	max?: string;
	step?: number;
	list?: string[];
	value: ISubscription<string, string>;
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
	value: ISubscription<T, T>;
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

export interface SelectStr extends Select<string> {
	type: "selectStr";
}

export interface SelectNum extends Select<number> {
	type: "selectNum";
}

export interface MultiSelect<T> extends Value {
	items: (T | SelectItem<T> | SelectItemGroup<T>)[];
	value: ISubscription<T[], T[]>;
	size?: number;
}

export interface MultiSelectStr extends MultiSelect<string> {
	type: "multiSelectStr";
}

export interface MultiSelectNum extends MultiSelect<number> {
	type: "multiSelectNum";
}

export interface Toggle extends Value {
	type: "toggle";
	value: ISubscription<boolean, boolean>;
}

export interface Trigger extends Value {
	type: "trigger";
	title: string;
	value: ISubscriber<boolean>;
}

export interface Radio<T> extends Value {
	items: (T | SelectItem<T>)[];
	value: ISubscription<T, T>;
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
	value: ISubscriber<File>;
}

export interface MultiFileVal extends Value {
	type: "multiFile";
	accept?: string[];
	value: ISubscriber<FileList>;
}

type KnownTypes =
	| Container
	| Color
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
	| Str
	| Text
	| Time
	| Toggle
	| Trigger
	| UrlVal
	| Week;

type KnownTypeAttribs =
	| KnownTypes["type"]
	| "radio"
	| "radioItem"
	| "radioItemLabel"
	| "radioItemWrapper"
	| "select";

export interface TypeAttribs
	extends Record<KnownTypeAttribs, Partial<Attribs>> {
	form: Partial<FormAttribs>;
	[id: string]: Partial<Attribs>;
}

export interface FormOpts extends CommonAttribs {
	prefix: string;
	behaviors: Partial<BehaviorOpts>;
	typeAttribs: Partial<TypeAttribs>;
	groupLabelAttribs: Partial<Attribs>;
	rangeLabelAttribs: Partial<Attribs>;
}

export interface BehaviorOpts {
	labels: boolean;
	rangeOnInput: boolean;
	strOnInput: boolean;
	textOnInput: boolean;
	radioLabelBefore: boolean;
	toggleLabelBefore: boolean;
}
