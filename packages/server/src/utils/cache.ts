export const isUnmodified = (etag: string, header?: string) =>
	header
		? header.includes(",")
			? header.split(/,\s+/g).some((x) => x === etag)
			: header === etag
		: false;
