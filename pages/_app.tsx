import type { AppProps } from 'next/app'
import WeatherContextProvider from '../components/services/weather/WeatherContext'
import TimeZoneContextProvider from '../components/services/weather/TimeZoneContext'
import MultiWeatherProvider from '../components/services/weather/MultiWeatherContext'
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
    return(
        <>
            <Head>
                <title>Portfolio Wojciech Bojarski</title>
                <script src="https://kit.fontawesome.com/fced0552ee.js" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
            </Head>
            <div className='container-fluid'>
                <div className='row'>
                    <WeatherContextProvider>
                        <TimeZoneContextProvider>
                            <MultiWeatherProvider>
                                <Component {...pageProps}/>
                            </MultiWeatherProvider>
                        </TimeZoneContextProvider>
                    </WeatherContextProvider>
                </div>
            </div>
        </>
    )
}
