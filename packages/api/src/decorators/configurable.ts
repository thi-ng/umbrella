/**
 * Property decorator factory. Sets `configurable` flag of PropertyDescriptor
 * to given state.
 *
 * @param state
 */
export function configurable(state: boolean): MethodDecorator {
    return function (_: any, __: string | symbol, descriptor: PropertyDescriptor) {
        descriptor.configurable = state;
    };
}
