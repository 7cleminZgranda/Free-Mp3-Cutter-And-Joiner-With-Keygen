var path = require("path");
var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  context: __dirname,
  entry: {
    main: "./assets/js/index",
  },
  output: {
    path: path.resolve(__dirname, "assets/webpack_bundles/"),
    // publicPath should match your Django's STATIC_URL config.
    // This is required otherwise the frontend will try to fetch
    // our chunk generated by the dynamic import from "/" instead of "/static/".
    // Remember to also add `os.path.join(BASE_DIR, "assets", "webpack_bundles")` to
    // STATICFILES_DIRS in Django settings:
    publicPath: "auto", // or "/static/webpack_bundles/",
    filename: "[name]-[contenthash].js",
  },

  plugins: [
    new BundleTracker({ path: __dirname, filename: "webpack-stats.json" }),
  ],

  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};