const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/tasks/v1",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      pathRewrite: {
        "/api/tasks/v1": "",
      },
    })
  );
  app.use(
    "/api/auth/v1",
    createProxyMiddleware({
      target: "http://localhost:2999",
      changeOrigin: true,
      pathRewrite: {
        "/api/auth/v1": "",
      },
    })
  );
};
