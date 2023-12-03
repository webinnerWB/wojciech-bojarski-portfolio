import React, { useContext, useEffect, useState} from 'react'
import TemperatureMainInfo from '../../components/weatherElements/TemeratureMainInfo'
import { WeatherContext, ServiceGetWeatherContextProps } from '../../components/services/WeatherContext'
import { ServiceTimeZoneContextProps, TimeZoneContext } from '../../components/services/TimeZoneContext'
import { ServiceMultiWeatherContextProps, MultiWeatherContext } from '../../components/services/MultiWeatherContext'
import WeatherInfoBox from '../../components/weatherElements/WeatherInfoBox'
import { Clock } from '../../components/Clock'
import { CurrentDayForecast } from '../../components/weatherElements/CurrentDayForecast'
import weatherInfo from '../../components/weatherElements/weatherInfoJSON'
import { Swiper, SwiperSlide } from '../../components/Swiper'

import style from '../../style/weather.module.scss'

const WeatherMainPage = () => {
    const [iconID, setIconID] = useState<number|null>(null)
    const [temp, setTemp] = useState<number|null>(null)
    const [name, setName] = useState<string|null>(null)
    const [imgURL, setImgURL] = useState<string|null>(null)
    const [imgDesc, setImgDesc] = useState<string|null>(null)
    const [imgForecastURL, setImgForecastURL] = useState<any[]>([])
    const [imgDescForecastURL, setImgDescForecastURL] = useState<any[]>([])
    const [icon, setIcon] = useState<string|null>(null)
    const [forecastDataArray, setForecastDataArray] = useState<any[]>([])
    const [currentDay, setCurrentDay] = useState<string|null>(null)
    const [forecastDataInfo, setforecastDataInfo ] = useState<any>()
    const [showForecast, setShowForecast] = useState<boolean>(false)

    const {
        handleCityName,
        data,
        getWeatherData,
        getTimeFromTimeZone
    }: ServiceGetWeatherContextProps = useContext(WeatherContext)

    const {
        dataTimeZone,
        getTimeZonaData
    }: ServiceTimeZoneContextProps = useContext(TimeZoneContext)

    const {
        dataMultiWeather,
        getMultiWeather
    }: ServiceMultiWeatherContextProps = useContext(MultiWeatherContext)

    const generateIcon = (iconData:any[]) => {
        if(Array.isArray(iconData)) {
            iconData.forEach((item, i) => {
                let icon
                let arrayIconID = 0
                arrayIconID = item.weather[0].id
                icon = item.weather[0].icon

                const matchedInfo = weatherInfo.find(el => arrayIconID === el.id);
                if (matchedInfo) {
                    if(((arrayIconID === 800) || (arrayIconID === 801) || (arrayIconID === 802) || (arrayIconID === 803)) && (icon.slice(-1) === 'n') && matchedInfo.n) {
                        setImgForecastURL(prev => [...prev, matchedInfo.n]);
                    }else if(matchedInfo.img) {
                        setImgForecastURL(prev => [...prev, matchedInfo.img]);
                        }
                    setImgDescForecastURL(prev => [...prev, matchedInfo.description]);
                }
            })
        }else{
            const matchedInfo = weatherInfo.find(el => iconID === el.id);
            if (matchedInfo) {
                if(((iconID === 800) || (iconID === 801) || (iconID === 802) || (iconID === 803)) && (icon === 'n') && matchedInfo.n) {
                    setImgURL(matchedInfo.n);
                }else if(matchedInfo.img) {
                    setImgURL(matchedInfo.img);
                    }
                setImgDesc(matchedInfo.description);
            }
        }
    }
    useEffect(() => {
        setForecastDataArray([])
        setImgForecastURL([])
        if (data) {
            generateIcon(data.weather[0])
        }
    }, [data, dataMultiWeather]);

   
    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        if(data){
            console.log(data)
            setTemp(Math.floor(data.main.temp))
            setName(data.name)
            setIconID(data.weather[0].id)
            setIcon(data.weather[0].icon.slice(-1))
        }
    }, [data])

    useEffect(() => {
        if(data) {
            getTimeZonaData(data.coord.lat, data.coord.lon)
            getMultiWeather(data.coord.lat, data.coord.lon)
        }
    }, [data])

    useEffect(() => {

        if(dataMultiWeather) {
            if(forecastDataArray.length === 0){
                dataMultiWeather.forEach(el => {
                    setForecastDataArray(prev => [...prev, el])
                })
            }
            if (data && dataMultiWeather && forecastDataArray.length > 0) {
                setImgForecastURL([])
                generateIcon(forecastDataArray)
                console.log(`forecastDataArray: `, forecastDataArray)
            }
        }
    }, [data, dataMultiWeather, forecastDataArray])

    useEffect(() => {
        if(data&& dataTimeZone) {
            const now = new Date(parseInt(data.dt) *1000).toLocaleDateString(`${data.sys.country.toLowerCase()}-${data.sys.country}`, {timeZone: dataTimeZone.timezone})
            const date = now.split('.')
            let day = date[0]
            let month = date[1]
            const year =date[2]
            const currentDate = `${day}.${month}.${year}`;
            setCurrentDay(currentDate)
            // console.log(dataTimeZone.date)
        }
    }, [data, dataTimeZone])

    useEffect(() => {
        if(forecastDataInfo) {
            setIconID(forecastDataInfo.weather[0].id)
            setIcon(forecastDataInfo.weather[0].icon.slice(-1))
            if(iconID) {
                generateIcon(forecastDataInfo.weather[0])
            }
        }
    }, [forecastDataInfo])

    useEffect(() => {
        if(forecastDataInfo && showForecast) {
            generateIcon(forecastDataInfo.weather[0])
            console.log(forecastDataInfo)
            console.log(iconID)

        }
    }, [iconID])

    const FORECASTtoDay = forecastDataArray.filter(el => {
        const elDay = new Date(el.dt * 1000).toLocaleDateString()
        return  currentDay === elDay
    });
    
    const FORECASTnext = forecastDataArray.filter(el => {
        const elDay = new Date(el.dt * 1000).toLocaleDateString()
        return elDay !== currentDay
    });
    console.log(`FORECASTtoDay: `, FORECASTtoDay)
    const multiWeatherForecastTemplateToDay = FORECASTtoDay.map((el, index) => (
        <SwiperSlide id={el.dt} key={`slide-${el.dt}`} onClick={() => showForecastDetails(el)}>
            <CurrentDayForecast 
            time={data && dataMultiWeather && dataTimeZone && forecastDataArray.length > 0 && getTimeFromTimeZone(dataTimeZone.timezone, data.sys.country, el.dt)}
            icon={dataMultiWeather && (FORECASTtoDay[0].dt !== forecastDataArray[0].dt && FORECASTtoDay[0].dt === forecastDataArray[1].dt) ?  
                imgForecastURL[index+1] : imgForecastURL[index]}
            temp={data && dataMultiWeather && dataTimeZone && forecastDataArray.length > 0 && Math.floor(el.main.temp)}
            />
        </SwiperSlide>
    ));

    const showForecastDetails = (el:any) => {
        setforecastDataInfo(el)
        setIconID(null)
        setIcon(null)
        setShowForecast(true)
    }

    return(
        <div className='col-12'>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                getWeatherData(e);
            }}>
                <div className="form-group">
                    <label htmlFor="cityName">City</label>
                    <input 
                        type="cityName" 
                        className="form-control" 
                        id="cityName" 
                        aria-describedby="cityName" 
                        placeholder="City"
                        onChange={(e) => handleCityName(e.target.value)}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
            <div className='row'>
                <div className='col-6'>
                    {data && <TemperatureMainInfo 
                        temp={data && !showForecast ? temp : Math.floor(forecastDataInfo.main.temp)} 
                        name={ data && name } 
                        iconURL={ data && imgURL}
                        imgDesc={ data && imgDesc}
                    />}
                    {data &&
                        <div className={style.boxContainer}>
                            <WeatherInfoBox 
                            icon={<i className={`fa-regular fa-clock fa-2xs ${style.iconStyle}`} ></i>}
                            title='Current time'
                            value={dataTimeZone && data ? <Clock date={dataTimeZone.date} time={dataTimeZone.time_12}/> : ''}/>
                            
                            <WeatherInfoBox 
                            icon={<i className={`fa-solid fa-wind fa-2xs ${style.iconStyle}`} ></i>}
                            title='Wind speed'
                            value={`${data && !showForecast ? data.wind.speed : forecastDataInfo.wind.speed} m/s`}/>

                            <WeatherInfoBox 
                            icon={<i className={`fa-regular fa-face-smile fa-2xs ${style.iconStyle}`} ></i>}
                            title='Pressure'
                            value={`${data && !showForecast ? data.main.pressure : forecastDataInfo.main.pressure} hPa`}/>

                            <WeatherInfoBox 
                            icon={<i className={`fa-solid fa-droplet fa-2xs ${style.iconStyle}`} ></i>}
                            title='Humidity'
                            value={`${data && !showForecast ? data.main.humidity : forecastDataInfo.main.humidity }%`}/>
                            
                            <WeatherInfoBox 
                            icon={<i className={`fa-solid fa-temperature-high fa-2xs ${style.iconStyle}`} ></i>}
                            title='Feels like'
                            value={`${data && !showForecast ? Math.floor(data.main.feels_like) : Math.floor(forecastDataInfo.main.feels_like) }℃`}/>
                            
                            <WeatherInfoBox 
                            icon={<i className={`fa-solid fa-temperature-high fa-2xs ${style.iconStyle}`} ></i>}
                            title='Clouds'
                            value={`${data && !showForecast ? data.clouds.all : forecastDataInfo.clouds.all }%`}/>

                            {!showForecast && 
                                <WeatherInfoBox 
                                icon={<i className={`fa-regular fa-sun fa-2xs ${style.iconStyle}`} ></i>}
                                title='Sunrise time'
                                value={dataTimeZone && data && getTimeFromTimeZone(dataTimeZone.timezone, data.sys.country, data.sys.sunrise)}/>
                            }
                            {!showForecast && 
                                <WeatherInfoBox 
                                icon={<i className={`fa-regular fa-moon fa-2xs ${style.iconStyle}`} ></i>}
                                title='Sunset time'
                                value={dataTimeZone && data && getTimeFromTimeZone(dataTimeZone.timezone, data.sys.country, data.sys.sunset)}/>
                            }
                        </div>
                    }
                </div>
                <div className='col-6'>
                    {dataMultiWeather &&
                       <>
                        <h3 className={style.h3}>Today`s weather forecast:</h3>
                        <Swiper>
                            {multiWeatherForecastTemplateToDay.length > 0 ? multiWeatherForecastTemplateToDay : <span className={style.nodata}>No data</span>}
                        </Swiper>
                       </>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default WeatherMainPage