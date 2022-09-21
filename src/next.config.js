const withPWA = require("next-pwa")({
    disable: process.env.NODE_ENV === "development",
    register: true,
    scope: "/",
    sw: "sw.js",
    //...
});

module.exports = withPWA({
    reactStrictMode: true,
});
