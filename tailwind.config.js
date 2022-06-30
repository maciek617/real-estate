/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-mobile': 'rgba(0,0,0,0.9)',
                'fb': '#4267B2',
                'tw': '#1DA1F2',
                'gg': '#db4a39',
                'lk': '#0A66C2'
            },
            backgroundColor: {
                'white-scroll': 'rgba(255, 255, 255, .95)',
            },
            backgroundImage: {
                'hero-img': 'linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),' +
                    ' url(../assets/buildings/house_2.jpg);',
                'footer-img': 'linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),' +
                    ' url(../assets/buildings/house_6.jpg)'
            },
            height: {
                'vh': '100vh',
                '256': '38rem'
            },
            minHeight: {
                'mn': '112px',
            },
            fontSize: {
                'very-large': '1.2rem'
            },
            translate: {
                'trans-center': 'translate(-50%)'
            },
        },
    },
    plugins: [],
}