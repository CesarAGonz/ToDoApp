/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Azul medio
          light: '#60A5FA', // Azul claro
          dark: '#1E3A8A', // Azul marino oscuro
        },
        secondary: {
          DEFAULT: '#1E40AF', // Azul oscuro
          light: '#3B82F6', // Azul medio
          dark: '#172554', // Azul marino muy oscuro
        },
        success: '#10B981', // Verde azulado
        danger: '#EF4444', // Rojo
        background: {
          light: '#F0F9FF', // Azul muy claro para el fondo en modo claro
          dark: '#0F172A', // Azul marino muy oscuro para el fondo en modo oscuro
        },
        text: {
          light: '#1E3A8A', // Azul oscuro para texto en modo claro
          dark: '#E2E8F0', // Gris muy claro para texto en modo oscuro
        },
      },
    },
  },
  plugins: [],
};