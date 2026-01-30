module.exports = [
  {
    path: "esm/index.js",
    limit: "100 KB",
    modifyWebpackConfig: (config) => {
      config.module.rules.push({
        test: /\.less$/,
        use: 'ignore-loader'
      });
      return config;
    }
  }
];
