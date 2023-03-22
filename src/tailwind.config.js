/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./features/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: "#303030",
                    800: "#424242",
                    700: "#5a5a5a",
                    600: "#aaa",
                    500: "#ccc",
                },
                primary: "#ffd600",
                primaryLight: "#ffff52",
                primaryDark: "#c7a500",
                secondary: "#313131",
                danger: "#ff1c1c",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
