import type { Fn } from "@thi.ng/api";

export enum Unit {
	IN = 1, // inches
	MM, // millimeters
	FT = 4, // feet
	MI, // miles
	M, // meters
	KM, // kilometers
	MIL, // mils
	UM, // microns
	CM, // centimeters
	UIN, // microinches
}

export enum Type {
	INT,
	FLOAT,
	STR,
	HSTR,
	DATE,
	POINTER,
}

export enum SpecVersion {
	IGES50 = 8,
	IGES51 = 9,
	IGES52 = 10,
	IGES53 = 11,
}

export enum DraftVersion {
	NONE = 0,
	ISO,
	AFNOR,
	ANSI,
	BSI,
	CSA,
	DIN,
	JIS,
}

export type SectionType = "G" | "S" | "D" | "P" | "T";

export enum LineFontPattern {
	NONE = 0,
	SOLID,
	DASHED,
	PHANTOM,
	CENTERLINE,
	DOTTED,
}

export enum Color {
	NONE = 0,
	BLACK,
	RED,
	GREEN,
	BLUE,
	YELLOW,
	MAGENTA,
	CYAN,
	WHITE,
}

export enum StatusBlank {
	VISIBLE = 0,
	BLANK,
}

export enum StatusSubord {
	INDEPENDENT = 0,
	PHYSICAL,
	LOGICAL,
	BOTH,
}

export enum StatusUsage {
	GEOMETRY = 0,
	ANNOTATION,
	DEFINITION,
	OTHER,
	LOGICAL,
	PARAMETRIC2D,
	CONSTRUCTIVE,
}

export enum StatusHierarchy {
	GLOBAL_TOP_DOWN = 0,
	GLOBAL_DEFER,
	USE_PROP,
}

export enum PolylineMode {
	OPEN,
	CLOSED,
	FILLED,
}

export enum BooleanOp {
	UNION = 1,
	INTERSECTION,
	DIFFERENCE,
}

export type BooleanNode = number | BooleanTree;

export interface BooleanTree extends Array<BooleanNode> {
	[0]: BooleanOp;
}

export enum EntityType {
	POLYLINE = 106,
	LINE = 110,
	POINT = 116,
	CSG_BOX = 150,
	CSG_CYLINDER = 154,
	BOOLEAN_TREE = 180,
}

export interface EntityOpts {
	color: Color;
	pattern: LineFontPattern;
}

// spec page 24 (53)
export interface DictEntry {
	type: number;
	param: number;
	struct: number;
	pattern: LineFontPattern;
	level: number;
	view: number;
	matrix: number;
	labelAssoc: number;
	status: Partial<EntityStatus>;
	index: number;
	lineWeight: number;
	color: Color;
	lineCount: number;
	form: number;
	label: string;
	subscript: number;
}

export interface EntityStatus {
	blank: StatusBlank;
	subord: StatusSubord;
	usage: StatusUsage;
	hierarchy: StatusHierarchy;
}

// see spec: pg.18 (47)
export interface GlobalParams {
	delimParam: string;
	delimRecord: string;
	senderProductID: string;
	receiverProductID: string;
	fileName: string;
	generator: string;
	generatorVersion: string;
	intBits: number;
	singleMaxPow: number;
	singleDigits: number;
	doubleMaxPow: number;
	doubleDigits: number;
	modelScale: number;
	units: Unit;
	numLineWeights: number;
	maxLineWeight: number;
	created: Date;
	modified: Date;
	precision: number;
	maxCoord: number;
	author: string;
	authorOrg: string;
	specVersion: SpecVersion;
	draftVersion: DraftVersion;
}

export type Param = [any, Type];

export interface IGESDocument {
	start: string[];
	globals: GlobalParams;
	dict: string[];
	param: string[];
	offsets: {
		S: number;
		G: number;
		P: number;
		D: number;
	};
	$FF: Fn<number, string>;
	$PARAM: Fn<any[], string>;
}

export const DEFAULT_GLOBALS: Partial<GlobalParams> = {
	generator: "@thi.ng/iges",
	generatorVersion: "0.0.1",
	specVersion: SpecVersion.IGES53,
	draftVersion: DraftVersion.NONE,
	delimParam: ",",
	delimRecord: ";",
	intBits: 32,
	singleMaxPow: 38,
	singleDigits: 6,
	doubleMaxPow: 308,
	doubleDigits: 15,
	modelScale: 1,
	units: Unit.MM,
	precision: 3,
	numLineWeights: 1,
	maxLineWeight: 0.254,
};
