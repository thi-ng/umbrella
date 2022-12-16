/**
 * Class behavior mixin based on:
 * - http://raganwald.com/2015/06/26/decorators-in-es7.html
 *
 * Additionally only injects/overwrites properties in target, which are NOT
 * marked with
 * [`@nomixin`](https://docs.thi.ng/umbrella/api/functions/nomixin.html) (i.e.
 * those which haven't set their `configurable` property descriptor flag to
 * `false`)
 *
 * @param behaviour - to mixin
 * @param sharedBehaviour -
 * @returns decorator function
 */
export const mixin = (behaviour: any, sharedBehaviour: any = {}) => {
	const instanceKeys = Reflect.ownKeys(behaviour);
	const sharedKeys = Reflect.ownKeys(sharedBehaviour);
	const typeTag = Symbol("isa");

	function _mixin(clazz: any) {
		for (let key of instanceKeys) {
			const existing = Object.getOwnPropertyDescriptor(
				clazz.prototype,
				key
			);
			if (!existing || existing.configurable) {
				Object.defineProperty(clazz.prototype, key, {
					value: behaviour[key],
					writable: true,
				});
			} else {
				// console.log(`not patching: ${clazz.name}.${key.toString()}`);
			}
		}
		Object.defineProperty(clazz.prototype, typeTag, { value: true });
		return clazz;
	}

	for (let key of sharedKeys) {
		Object.defineProperty(_mixin, key, {
			value: sharedBehaviour[key],
			enumerable: sharedBehaviour.propertyIsEnumerable(key),
		});
	}

	Object.defineProperty(_mixin, Symbol.hasInstance, {
		value: (x: any) => !!x[typeTag],
	});

	return _mixin;
};
