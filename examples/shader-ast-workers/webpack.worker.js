module.exports = {
    entry: "./src/worker.ts",
    output: {
        filename: "worker.js",
        path: __dirname + "/public",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                options: { name: "[path][hash].[ext]" },
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.worker.json",
                        },
                    },
                ],
            },
        ],
    },
    node: false,
};
