/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#0f3d26',
        amber: '#cfa462',
        sage: '#e6efea',
        ivory: '#fdfbf7',
        moss: '#1a5c3a',
        bark: '#8b6534',
        mist: '#f0f6f2',
        charcoal: '#1c1c1e',
        'jya-deep': '#0D3323',
        'jya-mid': '#12432D',
        'jya-green': '#1B5137',
        'jya-cream': '#FBF8F1',
        // Redesign Brand Palette:
        'jya-forest': '#103F2E',
        'jya-dark': '#0B3326',
        'jya-sage': '#A5B99A',
        'jya-ivory': '#F9F6EE',
        'jya-gold': '#C9A45C',
        'jya-beige': '#EDE5D5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
