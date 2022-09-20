const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
});

module.exports = withPWA({
    // next.js config
    reactStrictMode: true,
});
