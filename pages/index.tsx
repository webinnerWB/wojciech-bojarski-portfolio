import React from "react";
import Link from 'next/link'
const Main = () => {
    return(
        <div className='col-12'>
             <p>
                Hola
            </p>
            <Link href="/weather">
                Weather
            </Link>
        </div>
    )
}

export default Main