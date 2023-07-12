const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    signature: "./src/signature.ts",
    //page2: "./src/page2.ts",
    //page3: "./src/page3.ts",
    // Add more entry points as needed
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "scripts"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
