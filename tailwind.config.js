/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
      extend: {
          colors: {
            toyotared: '#EB0A1E',
            darktoyotared: '#990511',
            toyotagray: '#58595B', 
            offwhite: '#fcf7f1',
          },
      },
  },
  plugins: [
    function ( { addComponents }) {
      addComponents({
        '.btn': {
          backgroundColor: '#EB0A1E',
          color: 'white',  // toyotared color
          borderWidth: '2px',
          borderColor: '#EB0A1E',  // toyotared border color
          borderRadius: '0.5rem', // rounded-lg
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // shadow-lg
          transition: 'background-color 0.3s, color 0.3s', // transition duration

          '&:hover': {
            backgroundColor: 'white',  // toyotared color on hover
            color: '#EB0A1E',  // white text on hover
          },
        },
        '.section-header': {
          fontSize: '2.25rem', // equivalent to text-4xl
          fontWeight: '700',   // equivalent to font-bold
          color: 'black',    // toyotared color
          marginBottom: '.5rem', // equivalent to mb-6
        },
      });
    }
  ],
};