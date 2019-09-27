module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.[hash].js",
        path: __dirname + "/out"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                options: { name: "[path][hash].[ext]" }
            },
            { test: /\.ts$/, use: "ts-loader" }
        ]
    },
    node: false
};
