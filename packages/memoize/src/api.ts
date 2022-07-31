export interface MapLike<A, B> {
	has(key: A): boolean;
	get(key: A): B | undefined;
	set(key: A, val: B): any;
}
