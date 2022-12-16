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
        PB_URL: process.env.PB_URL,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
});
