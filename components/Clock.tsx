import React,{
    FC,
    useEffect,
    useState
} from "react"

type clockData = {
    date: string,
    time: string
}

export const Clock: FC<clockData> = ({date, time}: clockData) => {
const splitDate = date.split('-')
const [year, setYear] = useState<string>(splitDate[0])
const [month, setMonth] = useState<string>(splitDate[1])
const [day, setDay] = useState<string>(splitDate[2])
const splitTime = time.split(':')
const [hour, setHour] = useState<number>(parseInt(splitTime[0]))
const [min, setMin] = useState<number>(parseInt(splitTime[1]))
const splitTmesec = splitTime[2].split(' ')
const [sec, setSec] = useState<number>(parseInt(splitTmesec[0]))
const [amPm, setAmPm] = useState<string>(splitTmesec[1])

useEffect(() => {
    setHour(parseInt(splitTime[0]))
    setMin(parseInt(splitTime[1]))
    setSec(parseInt(splitTmesec[0]))
    setAmPm(splitTmesec[1])
    const timer = setInterval(() => {
        countSec()
    }, 1000)

    return () => {
        clearInterval(timer)
    }
}, [time, date])

useEffect(() => {
    if(sec === 60) {
        setSec(0)
        setMin(prev => prev + 1)
    }
}, [sec])

useEffect(() => {
    if(min === 60) {
        setMin(0)
        setHour(prev => prev + 1)
    }
}, [min])

useEffect(() => {
    if(hour === 13) {
        setHour(1)
    }
}, [hour])

const countSec = () => {
    setSec(prev => prev + 1)
}

const pre0 = () => {
    if(hour < 10) {
        return '0'
    }else{
        return ''
    }
} 
const pre1 = () => {
    if(min < 10) {
        return '0'
    }else{
        return ''
    }
} 
const pre2 = () => {
    if(sec < 10){
        return '0'
    }else{
        return ''
    }
} 

return (
    <>
        <em>{`${day}-${month}-${year} `}</em>
        <em>{`${pre0()}${hour}:${pre1()}${min}:${pre2()}${sec} ${amPm}`}</em>
    </>
)
}