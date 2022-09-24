export const copyright = (startYear: number, author: string) => {
	const now = new Date().getFullYear();
	return startYear < now
		? `${startYear} - ${now} ${author}`
		: `${startYear} ${author}`;
};
