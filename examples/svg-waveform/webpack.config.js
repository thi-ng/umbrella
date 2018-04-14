const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" }
        ]
    },
    devServer: {
        contentBase: "public"
    }
};
