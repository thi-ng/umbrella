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
                    config.node = false;
                    config.resolve = {
                        alias: {
                            process: false,
                            util: false,
                        }
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
        baseUrl: "/umbrella/xml-converter",
    },
    workspaceRoot: "../..",
};
