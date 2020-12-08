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
    installOptions: {
        installTypes: true,
    },
    buildOptions: {
        baseUrl: "/umbrella/svg-barchart",
    },
};
