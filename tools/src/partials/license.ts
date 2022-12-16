export const copyright = (startYear: number) => {
	const now = new Date().getFullYear();
	return startYear < now ? `${startYear} - ${now}` : `${startYear}`;
};
