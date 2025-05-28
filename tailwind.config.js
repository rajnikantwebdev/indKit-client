/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                // Dark Ocean Color Palette
                'dark-ocean': {
                    50: '#f0f9ff',   // Very light cyan for rare highlights
                    100: '#e0f2fe',  // Light cyan for subtle highlights
                    200: '#bae6fd',  // Light blue for hover states
                    300: '#7dd3fc',  // Medium blue for interactive elements
                    400: '#38bdf8',  // Bright cyan - main accent color
                    500: '#06b6d4',  // Primary cyan - main brand color
                    600: '#0891b2',  // Darker cyan for pressed states
                    700: '#0e7490',  // Deep cyan for borders
                    800: '#155e75',  // Very dark cyan
                    900: '#164e63',  // Darkest cyan
                },
                'dark-slate': {
                    50: '#f8fafc',   // Lightest - for white text alternatives
                    100: '#f1f5f9',  // Very light - primary text color
                    200: '#e2e8f0',  // Light - secondary text
                    300: '#cbd5e1',  // Medium light - muted text
                    400: '#94a3b8',  // Medium - placeholder text
                    500: '#64748b',  // Medium dark - disabled text
                    600: '#475569',  // Dark - borders
                    700: '#334155',  // Darker - elevated surfaces
                    800: '#1e293b',  // Very dark - secondary background
                    900: '#0f172a',  // Darkest - primary background
                }
            },
            // Optional: Add gradients using your custom colors
            backgroundImage: {
                'dark-ocean-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                'dark-ocean-radial': 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 70%)',
                'accent-gradient': 'linear-gradient(135deg, #06b6d4 0%, #38bdf8 100%)',
            },
            // Optional: Add box shadows with your colors
            boxShadow: {
                'dark-ocean': '0 10px 25px -5px rgba(6, 182, 212, 0.1), 0 4px 6px -2px rgba(6, 182, 212, 0.05)',
                'dark-ocean-lg': '0 25px 50px -12px rgba(6, 182, 212, 0.25)',
            },
            // Optional: Add custom animations
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
  }