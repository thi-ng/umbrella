export const __removeAllIDs = (
	impl: { removeID(id: string): boolean },
	ids: Iterable<string>
) => {
	let ok = true;
	for (let id of ids) {
		ok = impl.removeID(id) && ok;
	}
	return ok;
};
