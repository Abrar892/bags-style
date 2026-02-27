/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                rose: {
                    gold: '#B76E79',
                    blush: '#E8D5CB',
                    petal: '#F4C2C2',
                    mist: '#FAF0F0',
                },
                amber: {
                    gold: '#D4AF37',
                    champagne: '#F7E7CE',
                    warm: '#C8A96E',
                },
                charcoal: '#2D2D2D',
                'dark-rose': '#4A2028',
            },
            fontFamily: {
                playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
                inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'luxury-gradient': 'linear-gradient(135deg, #FDE7E7 0%, #FFFFFF 40%, #FDF8EE 100%)',
                'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                'rose-gradient': 'linear-gradient(135deg, #B76E79 0%, #9B5066 100%)',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(183, 110, 121, 0.15)',
                'glass-lg': '0 16px 48px 0 rgba(183, 110, 121, 0.2)',
                'gold': '0 8px 24px rgba(212, 175, 55, 0.35)',
                'soft': '0 4px 20px rgba(45, 45, 45, 0.08)',
                'soft-lg': '0 8px 40px rgba(45, 45, 45, 0.12)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '0.6' },
                    '50%': { opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
        },
    },
    plugins: [],
};
