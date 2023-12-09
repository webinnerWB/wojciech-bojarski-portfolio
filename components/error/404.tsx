import React, { FC } from "react";
import style from '../../style/error.module.scss';

const Error404: FC = () => {
    return (
        <div className={style.errorWrapper}>
            <h1>Error 404</h1>
            <img className="img-fluid" src="../../error_page/error.png" alt="Error-img"/>
        </div>
    );
};

export default Error404;
