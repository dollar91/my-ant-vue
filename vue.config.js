const path = require("path");
const webpack = require("webpack");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const themePlugin = new AntDesignThemePlugin({
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  mainLessFile: "",
  themeVariables: ["@primary-color"],
  generateOnce: false
});
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  devServer: {
    port: 7070,
    proxy: {
      "/api": {
        target: "http://localhost:7070",
        onProxyReq: function(proxyReq, req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            try {
              const mock = require(`./mock/${name}`);
              const result = mock(req.method);
              delete require.cache[require.resolve(`./mock/${name}`)];
              return res.send(result);
            } catch (e) {
              if (e.code === "MODULE_NOT_FOUND") {
                return res.status(404).send();
              }
              return res.status(500).send(e);
            }
          }
        }
      }
    }
  }
};
