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
