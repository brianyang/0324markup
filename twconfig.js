tailwind.config = {
  content: [
    './templates/**/*.html.twig',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a05ea6',
          light: '#a05ea6',
          10: 'rgba(160, 94, 166, 0.1)',
          gradient: {
            start: '#A05EA7',
            end: '#765FA4'
          }
        },
        secondary: '#739549',
        text: {
          DEFAULT: '#191919',
          muted: '#777776',
          blue: '#18314c',
          purple: '#353d7c',
          pink: '#D91B5B'
        },
        border: {
          muted: 'rgba(115, 117, 120, 0.3)',
          purple: '#353d7c'
        },
        teal: '#0080a3',
        dark: '#231f20',
        purple: '#765ea4',
        bg: {
          lightGray: '#eceded',
        }
      },
      fontFamily: {
        sans: ['Raleway', 'Arial', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
      spacing: {
        '18': '4.5rem',
      },
      backgroundImage: {
        'fade-white': 'linear-gradient(to bottom, #fff 80%, rgba(255,255,255,0) 100%)',
        'primary-gradient': 'linear-gradient(to right, #A05EA7, #765FA4)',
        'teal-primary-gradient': 'linear-gradient(to right, #0081a3 0%, #a05fa6 322.36%)',
        'teal-primary-gradient-2': 'linear-gradient(to right, #0081a3 -110.9%, #a05fa6 211.89%)',
        'teal-primary-gradient-3': 'linear-gradient(to right, #0081a3 -221.37%, #a05fa6 100%)',
        'teal-primary': 'linear-gradient(to right, #0081a3 0%, #a05fa6 155.94%)',
        'light-gray-gradient': 'linear-gradient(88.56deg, rgba(235,236,236,0) 12.58%, #eceded 97.35%)',
        'light-gray-gradient-2': 'linear-gradient(85.44deg, rgba(235,236,236,0) -63.1%, #eceded 94.86%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ... other plugins
  ],
}