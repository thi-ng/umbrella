/**
 * Property decorator factory. Sets `configurable` flag of PropertyDescriptor
 * to given state.
 *
 * @param state - true, if propoerty is configurable
 */
export const configurable = (state: boolean): MethodDecorator =>
	function (_: any, __: string | symbol, descriptor: PropertyDescriptor) {
		descriptor.configurable = state;
	};
