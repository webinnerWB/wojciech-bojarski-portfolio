import React, {useState, useEffect, FC} from "react";

import style from '../../style/store.module.scss'

type results = {
    valueSearch: string|null,
    results: any[]
}

const SearchResults: FC<results> = ({ valueSearch, results }: results) => {
    return (
      <>
        {results && results.length > 0 ? (
          <>
            <h2 className={style.searchTitle}>Search results for: "{valueSearch}"</h2>
            <div className={style.productWrapper}>
              {results.map((result, index) => (
                <div key={index} className={style.product}>
                  <p>{result.name.map((namePart: any, nameIndex: number) => (
                    nameIndex === 0 ?
                        namePart.charAt(0).toUpperCase() + namePart.slice(1) :
                        namePart
                  )).join(' ')
                  }</p>
                  <img src= {result.imgurl} className={style.poductImg}/>
                  <p>{result.price}$</p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </>
    );
  };

export default SearchResults