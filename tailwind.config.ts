import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#E86A33", // Orange
                    light: "#F28B55",
                    dark: "#CC5A2B",
                },
                accent: "#F28B55",
                secondary: "#0f2922",
                background: {
                    light: "#f8f7f5",
                    dark: "#0b1612",
                },
                surface: {
                    dark: "#13231c",
                },
                navy: "#0A1929",
                orange: "#F25421",
            },
            fontFamily: {
                display: ["Teko", "sans-serif"],
                body: ["Inter", "system-ui", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
        },
    },
    plugins: [],
};

export default config;
