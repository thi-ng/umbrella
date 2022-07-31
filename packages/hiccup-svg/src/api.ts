export type Vec2Like = ArrayLike<number>;

// Reference:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

export type PathSegmentMove = ["M" | "m", Vec2Like];
export type PathSegmentLine = ["L" | "l", Vec2Like];
export type PathSegmentHLine = ["H" | "h", number];
export type PathSegmentVLine = ["V" | "v", number];
export type PathSegmentCubic = ["C" | "c", Vec2Like, Vec2Like, Vec2Like];
export type PathSegmentQuadratic = ["Q" | "q", Vec2Like, Vec2Like];
export type PathSegmentCubicChain = ["S" | "s", Vec2Like, Vec2Like];
export type PathSegmentQuadraticChain = ["T" | "t", Vec2Like];
export type PathSegmentArc = [
	"A" | "a",
	number,
	number,
	number,
	boolean,
	boolean,
	Vec2Like
];
export type PathSegmentClose = ["Z" | "z"];

export type PathSegment =
	| PathSegmentMove
	| PathSegmentLine
	| PathSegmentHLine
	| PathSegmentVLine
	| PathSegmentCubic
	| PathSegmentQuadratic
	| PathSegmentCubicChain
	| PathSegmentQuadraticChain
	| PathSegmentArc
	| PathSegmentClose;

export type GradientStop = [string | number, string];
