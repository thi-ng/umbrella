/**
 * Interface to provide enabled/disabled functionality. Also see
 * `@IEnable` decorator mixin
 *
 * @param T - type for enable/disable option arg
 */
export interface IEnable<T> {
	isEnabled(): boolean;
	/**
	 * Disables this entity.
	 * @param opts - optional implementation specific arg
	 */
	disable(opts?: T): any;
	/**
	 * Enables this entity.
	 * @param opts - optional implementation specific arg
	 */
	enable(opts?: T): any;
	toggle?(): boolean;
}
