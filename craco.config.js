const path = require("path");
const CracoLessPlugin = require("craco-less");
module.exports = {
  webpack: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
