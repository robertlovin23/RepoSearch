const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        "/github/*",
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};