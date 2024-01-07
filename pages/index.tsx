import React, { FC } from "react";
import Link from 'next/link'

const Main: FC = () => {
    return(
        <div className='col-12'>
             <p>
                Hola
            </p>
            <Link href="/weather">
                Weather
            </Link>
            <br/>
            <Link href="/store">
                WEB-Store
            </Link>
        </div>
    )
}

export default Main
