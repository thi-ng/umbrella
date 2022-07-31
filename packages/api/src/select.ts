export type Select2<T, Q, A, B> = T extends Q ? A : B;

export type Select3<T, Q1, Q2, A, B, C> = T extends Q1
	? A
	: T extends Q2
	? B
	: C;

export type Select4<T, Q1, Q2, Q3, A, B, C, D> = T extends Q1
	? A
	: T extends Q2
	? B
	: T extends Q3
	? C
	: D;
