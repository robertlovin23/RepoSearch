const { createProxyMiddleware } = require('http-proxy-middleware');

//Uses a proxy middleware to connect endpoint's from Express to the client-side.
module.exports = function(app) {
    app.use(
        "/github/*",
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};