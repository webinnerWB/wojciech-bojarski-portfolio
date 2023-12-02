const weatherInfo = [
    {
        id: 200,
        description: 'thunderstorm with light rain',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 201,
        description: 'thunderstorm with rain',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 200,
        description: 'thunderstorm with heavy rain',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 210,
        description: 'light thunderstorm',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 211,
        description: 'thunderstorm',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 212,
        description : 'heavy thunderstorm ',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 221,
        description: 'ragged thunderstorm',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 230,
        description: 'thunderstorm with light drizzle',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 231,
        description: 'thunderstorm with drizzle',
        img: '/weather_icons/thunder.svg'
    },
    {
        id: 232,
        description: 'thunderstorm with heavy drizzle',
        img: '/weather_icons/thunder.svg'
    },

    {
        id: 300,
        description: 'light intensity drizzle',
        img: '/weather_icons/rainy-4.svg'
    },
    {
        id: 301,
        description: 'drizzle',
        img: '/weather_icons/rainy-5.svg'
    },
    {
        id: 302,
        description: 'heavy intensity drizzle',
        img: '/weather_icons/rainy-6.svg'
    },
    {
        id: 310,
        description: 'light intensity drizzle rain',
        img: '/weather_icons/rainy-4.svg'
    },
    {
        id: 311,
        description: 'drizzle rain',
        img: '/weather_icons/rainy-4.svg'
    },
    {
        id: 312,
        description: 'heavy intensity drizzle rain',
        img: '/weather_icons/rainy-6.svg'
    },
    {
        id: 313,
        description: 'shower rain and drizzle',
        img: '/weather_icons/rainy-5.svg'
    },
    {
        id: 314,
        description: 'heavy shower rain and drizzle',
        img: '/weather_icons/rainy-7.svg'
    },
    {
        id: 321,
        description: 'shower drizzle',
        img: '/weather_icons/rainy-5.svg'
    },
    
    {
        id: 500,
        description: 'light rain',
        img: '/weather_icons/rainy-2.svg'
    },
    {
        id: 501,
        description: 'moderate rain',
        img: '/weather_icons/rainy-2.svg'
    },
    {
        id: 502,
        description: 'heavy intensity rain',
        img: '/weather_icons/rainy-7.svg'
    },
    {
        id: 503,
        description: 'very heavy rain',
        img: '/weather_icons/rainy-7.svg'
    },
    {
        id: 504,
        description: 'extreme rain',
        img: '/weather_icons/rainy-7.svg'
    },
    {
        id: 511,
        description: 'freezing rain',
        img: '/weather_icons/rainy-5.svg'
    },
    {
        id: 520,
        description: 'light intensity shower rain',
        img: '/weather_icons/rainy-4.svg'
    },
    {
        id: 521,
        description: 'shower rain',
        img: '/weather_icons/rainy-6.svg'
    },
    {
        id: 522,
        description: 'heavy intensity shower rain',
        img: '/weather_icons/rainy-7.svg'
    },
    {
        id: 531,
        description: 'ragged shower rain',
        img: '/weather_icons/rainy-6.svg'
    },

    {
        id: 600,
        description: 'light snow',
        img: '/weather_icons/snowy-2.svg'
    },
    {
        id: 601,
        description: 'snow',
        img: '/weather_icons/snowy-6.svg'
    },
    {
        id: 602,
        description: 'heavy snow',
        img: '/weather_icons/snowy-6.svg'
    },
    {
        id: 611,
        description: 'sleet',
        img: '/weather_icons/snowy-6.svg'
    },
    {
        id: 612,
        description: 'light shower sleet',
        img: '/weather_icons/snowy-5.svg'
    },
    {
        id: 613,
        description: 'shower sleet',
        img: '/weather_icons/snowy-5.svg'
    },
    {
        id: 615,
        description: 'light rain and snow',
        img: '/weather_icons/snowy-5.svg'
    },
    {
        id: 616,
        description: 'rain and snow',
        img: '/weather_icons/snowy-5.svg'
    },
    {
        id: 620,
        description: 'light shower snow',
        img: '/weather_icons/snowy-5.svg'
    },
    {
        id: 621,
        description: 'shower snow',
        img: '/weather_icons/snowy-5.svg'
    },
    {
        id: 622,
        description: 'heavy shower snow',
        img: '/weather_icons/snowy-6.svg'
    },
            
    {
        id: 701,
        description: 'mist',
        img: '/weather_icons/fog.gif'
    },
    {
        id: 711,
        description: 'smoke',
        // img: '/weather_icons/'
    },
    {
        id: 721,
        description: 'haze',
        // img: '/weather_icons/'
    },
    {
        id: 731,
        description: 'sand/dust whirls',
        // img: '/weather_icons/'
    },
    {
        id: 741,
        description: 'fog',
        img: '/weather_icons/fog.gif'
    },
    {
        id: 751,
        description: 'sand',
        // img: '/weather_icons/'
    },
    {
        id: 761,
        description: 'dust',
        // img: '/weather_icons/'
    },
    {
        id: 762,
        description: 'volcanic ash',
        // img: '/weather_icons/'
    },
    {
        id: 771,
        description: 'squalls',
        // img: '/weather_icons/'
    },
    {
        id: 781,
        description: 'tornado',
        // img: '/weather_icons/'
    },

    {
        id: 800,
        description: 'clear sky',
        img: '/weather_icons/day.svg',
        n: '/weather_icons/night.svg'
    },

    {
        id: 801,
        description: 'few clouds: 11-25%',
        img: '/weather_icons/cloudy-day-1.svg',
        n: '/weather_icons/cloudy-night-1.svg' 
    },
    {
        id: 802,
        description: 'scattered clouds: 25-50%',
        img: '/weather_icons/cloudy-day-2.svg',
        n: '/weather_icons/cloudy-night-2.svg'
    },
    {
        id: 803,
        description: 'broken clouds: 51-84%',
        img: '/weather_icons/cloudy-day-3.svg',
        n: '/weather_icons/cloudy-night-3.svg'
    },
    {
        id: 804,
        description: 'overcast clouds: 85-100%',
        img: '/weather_icons/cloudy.svg'
    },
]

export default weatherInfo
