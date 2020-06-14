export const withSize = (icon: any[], size: string) => [
    icon[0],
    { ...icon[1], width: size, height: size },
    ...icon.slice(2),
];
