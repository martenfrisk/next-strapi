module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    // mode: 'all',
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
  },
  theme: {
    fontFamily: {
      'rozha': ['Rozha One', 'ui-serif', 'system-ui'],
      'sansa': ['Sansation', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        camo: {
          100: "#d7d9d8",
          200: "#afb3b1",
          300: "#868e8a",
          400: "#5e6863",
          500: "#36423c",
          600: "#2b3530",
          700: "#202824",
          800: "#161a18",
          900: "#0b0d0c"
        },
        coolgray: {
            50: '#FBFDFE',
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CFD8E3",
            400: "#97A6BA",
            500: "#64748B",
            600: "#475569",
            700: "#364152",
            800: "#27303F",
            900: "#1A202E"
        },
      }
    },
  },
  variants: {
    extend: {
      display: ['group-hover', 'hover', 'responsive', 'focus'],
    }
  },
  plugins: [],
}
