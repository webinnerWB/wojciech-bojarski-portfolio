import type { AppProps } from 'next/app'
import WeatherContextProvider from '../components/services/WeatherContext'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
    return(
        <div className='container'>
            <div className='row'>
                <WeatherContextProvider>
                    <Component {...pageProps}/>
                </WeatherContextProvider>
            </div>
        </div>
    )
}
