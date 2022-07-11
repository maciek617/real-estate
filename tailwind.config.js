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
                'cookies': 'rgba(0,0,0,0.9)',
                'modal': 'rgba(0,0,0,0.6)'
            },
            backgroundImage: {
                'hero-img': 'linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),' +
                    ' url(../assets/buildings/house_2.jpg);',
                'footer-img': 'linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),' +
                    ' url(../assets/buildings/house_6.jpg)'
            },
            height: {
                'vh': '100vh',
                '70': '75vh',
                '256': '38rem',
                'mobile': '350px',
                'tablet': '550px',
                'desktop': '750px'
            },
            minHeight: {
                'mn': '112px',
                "ct": '62vh',
                "70vh": '70vh',
            },
            minWidth: {
                'term': '100px',
            },
            maxWidth: {
                'filterVw': '300px',
                'half' : '50vw'
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