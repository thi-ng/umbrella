const gradient = (type: string, attribs: any, stops: [any, string][]) =>
    [type,
        attribs,
        ...stops.map(
            ([offset, col]) => ["stop", { offset, "stop-color": col }]
        )
    ];

export const linearGradient = (id: string, x1, y1, x2, y2, stops: [any, string][]) =>
    gradient(
        "linearGradient",
        { id, x1, y1, x2, y2 },
        stops
    );

export const radialGradient = (id: string, cx, cy, r, stops: [any, string][]) =>
    gradient(
        "radialGradient",
        { id, cx, cy, r },
        stops
    );
