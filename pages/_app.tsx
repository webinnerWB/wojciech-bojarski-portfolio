import type { AppProps } from 'next/app'
import WeatherContextProvider from '../components/services/WeatherContext'
import TimeZoneContextProvider from '../components/services/TimeZoneContext'
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
    return(
        <>
            <Head>
                <title>Portfolio Wojciech Bojarski</title>
                <script src="https://kit.fontawesome.com/fced0552ee.js" crossOrigin="anonymous"></script>
            </Head>
            <div className='container'>
                <div className='row'>
                    <WeatherContextProvider>
                        <TimeZoneContextProvider>
                            <Component {...pageProps}/>
                        </TimeZoneContextProvider>
                    </WeatherContextProvider>
                </div>
            </div>
        </>
    )
}
