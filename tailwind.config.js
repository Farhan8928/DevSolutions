/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#06070A',
          900: '#0A0B0F',
          800: '#101218',
          700: '#191C24',
          600: '#272A35',
          500: '#3A3E4D'
        },
        accent: {
          lime: '#C8FF00',
          violet: '#7C5CFF',
          rose: '#FF5C8A'
        }
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 2.4s linear infinite'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        aurora: {
          '0%,100%': { transform: 'translate3d(-10%,-10%,0) scale(1)' },
          '50%': { transform: 'translate3d(10%,5%,0) scale(1.15)' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
}
