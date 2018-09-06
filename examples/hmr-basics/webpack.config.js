const webpack = require("webpack");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: ".",
        hot: true
    }
};
