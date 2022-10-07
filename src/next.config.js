const withPWA = require("next-pwa")({
    disable: process.env.NODE_ENV === "development",
    register: true,
    scope: "/",
    sw: "sw.js",
    //...
});

module.exports = withPWA({
    reactStrictMode: true,
    env: {
        AW_URL: process.env.AW_URL,
        AW_PROJECT: process.env.AW_PROJECT,
    },
});
