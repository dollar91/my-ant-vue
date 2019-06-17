module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
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
