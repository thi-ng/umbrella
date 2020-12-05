/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: "/",
        src: "/_dist_",
    },
    plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-webpack"],
    installOptions: {
        installTypes: true,
    },
    buildOptions: {
        baseUrl: "/webgl-ssao",
    },
};
