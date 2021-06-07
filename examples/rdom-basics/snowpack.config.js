/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: "/",
        src: "/_dist_",
    },
    plugins: [
        "@snowpack/plugin-typescript",
        [
            "@snowpack/plugin-webpack",
            {
                extendConfig: (config) => {
                    config.node = {
                        process: false,
                        setImmediate: false,
                        util: "empty",
                    };
                    return config;
                },
            },
        ],
    ],
    packageOptions: {
        source: "local",
        types: true,
        knownEntrypoints: ["tslib"]
    },
    buildOptions: {
        baseUrl: "/umbrella/rdom-basics",
    },
    workspaceRoot: "../..",
};
