/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: "#303030",
                    800: "#424242",
                },
                primary: "#ffd600",
                secondary: "#313131",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
