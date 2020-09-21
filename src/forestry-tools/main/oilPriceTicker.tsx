import React, { useEffect, useState } from 'react'

import arrowDown from '../images/arrow-down.svg'
import arrowUp from '../images/arrow-up.svg'
import droplet from '../images/droplet.svg'

export const OilPriceTicker = ({ styles }) => {
  const [oilData, setOilData] = useState([])
  const [oilPrices, setOilPrices] = useState([])

  useEffect(() => {
    typeof window !== 'undefined' && window.fetch('https://api.eia.gov/series/?api_key=2c64d808bf1a095b0a22eb601b723c20&series_id=PET.RWTC.D;PET.RBRTE.D').then(async res => {
      const data = await res.json()
      setOilData(data.series)
    })
  }, [])

  useEffect(() => {
    if (oilData.length) {
      const calculateObject = (name, series) => {
        const price = series.data[0][1]
        const previous = series.data[1][1]
        const difference = price - previous
        const change = (((series.data[0][1] / series.data[1][1]) - 1) * 100).toFixed(2) + '%'
        return ({
          name,
          decrease: difference < 0,
          price,
          difference: (difference < 0 ? '' : '+') + difference.toFixed(2),
          change: (difference < 0 ? '' : '+') + change
        })
      }

      setOilPrices([
        calculateObject('WTI', oilData[0]),
        calculateObject('Brent', oilData[1])
      ])
    }
  }, [oilData])
  return (
    <div className={styles.priceContainer}>
      {oilPrices.map((oilPrice, i) => {
        return (
          <div key={i} className={styles.oilPrice}>
            <span className={styles.name}>{oilPrice.name}</span>
            <span className={styles.iconsContainer}>
              <img className={styles.icon} src={droplet} alt='oil' />
              <span className={styles.change + `${oilPrice.decrease ? ` ${styles.decrease}` : ` ${styles.increase}`}`}>
                {oilPrice.decrease ? (
                  <img className={styles.icon} src={arrowDown} alt='down' />
                ) : (
                  <img className={styles.icon} src={arrowUp} alt='up' />
                )}
              </span>
            </span>
            <span className={styles.price}>{oilPrice.price}</span>
            <span className={styles.difference}>{oilPrice.difference}</span>
            <span className={styles.percent + `${oilPrice.decrease ? ` ${styles.decrease}` : ` ${styles.increase}`}`}>{oilPrice.change}</span>
          </div>
        )
      })}
    </div>
  )
}
