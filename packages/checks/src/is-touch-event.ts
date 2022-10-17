/**
 * On Firefox `TouchEvent` is undefined if the hardware doesn't support touch.
 * Therefore this predicate checks for that first before verifying if `e` is
 * indeed a `TouchEvent`.
 *
 * @param e
 */
export const isTouchEvent = (e: Event): e is TouchEvent =>
	typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
