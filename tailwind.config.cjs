module.exports = { content: ['./index.html', './src/**/*.{ts,tsx}'], theme: { extend: {
      colors: {
        success: {
          DEFAULT: '#16a34a',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        destructive: {
          DEFAULT: '#dc2626',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom, rgba(147,51,234,0.10) 0%, rgba(147,51,234,0.06) 20%, rgba(59,130,246,0.05) 40%, rgba(59,130,246,0.03) 60%, rgba(255,255,255,0.02) 80%, rgba(255,255,255,0) 100%)',
      },
    } }, plugins: [] };
