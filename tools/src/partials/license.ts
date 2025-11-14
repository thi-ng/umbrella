// SPDX-License-Identifier: Apache-2.0
export const copyright = (startYear: number) => {
	const now = new Date().getFullYear();
	return startYear < now ? `${startYear} - ${now}` : `${startYear}`;
};
