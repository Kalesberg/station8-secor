import React, { useEffect, useMemo, useState } from 'react'
import parse from 'html-react-parser'
import { Chart } from 'react-charts'

import { classNames, Image } from '../../../../functions'

import styles from './infographic.module.scss'

export default ({ block, images }) => {
  const [active, setActive] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [scaled, setScaled] = useState(1)

  const data = [{
    label: 'Boiling Point Distribution',
    data: block.features[active].data.map(obj => ({ primary: obj.percent, secondary: obj.value }))
  }]

  const series = useMemo(
    () => ({
      showPoints: true
    }),
    []
  )

  const ticks = useMemo(
    () => ({
      showPoints: true
    }),
    []
  )

  const axes = useMemo(
    () => [
      {
        primary: true,
        type: 'linear',
        position: 'bottom',
        show: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ticks: () => [0, 0.2, 0.4, 0.6, 0.8, 1]
      },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const renderSVG = () => (
    <defs>
      <linearGradient id='0' x1='0' x2='0' y1='1' y2='0'>
        <stop offset='0%' stopColor='#181E49' />
        <stop offset='100%' stopColor='#F52A36' />
      </linearGradient>
    </defs>
  )

  const getSeriesStyle = React.useCallback(
    series => ({
      color: `url(#${series.index % 4})`,
      opacity:
        active > -1
          ? series.index === active
            ? 1
            : 0.3
          : 1
    }),
    [active]
  )

  const handleRotate = () => {
    setRotation(rotation + 90)
    setScaled(scaled === 3 ? 0 : scaled + 1)
    setActive(active === block.features.length - 1 ? 0 : active + 1)
  }

  // useEffect(() => {
  //   console.log('active', active)
  // }, [active])

  // console.log(block)
  return (
    <section className={classNames(block, styles)}>
      <div className={styles.titleGroup}>
        <h2 className={styles.title}>{block.title}</h2>
        <h3 className={styles.subtitle}>{block.subtitle}</h3>
      </div>
      <div className={styles.infographic}>
        <div className={styles.barrelContainer}>
          <div className={styles.ring} style={{ transform: `rotate(${rotation}deg)` }}>
            <Image className={styles.barrelOne} images={images} src={block.image.image} container='div' style={{ transform: `rotate(${rotation * -1}deg) scale(${scaled === 2 ? 1.8 : 1})` }} />
            <Image className={styles.barrelTwo} images={images} src={block.image.image} container='div' style={{ transform: `rotate(${rotation * -1}deg) scale(${scaled === 1 ? 1.8 : 1})` }} />
            <Image className={styles.barrelThree} images={images} src={block.image.image} container='div' style={{ transform: `rotate(${rotation * -1}deg) scale(${scaled === 0 ? 1.8 : 1})` }} />
            <Image className={styles.barrelFour} images={images} src={block.image.image} container='div' style={{ transform: `rotate(${rotation * -1}deg) scale(${scaled === 3 ? 1.8 : 1})` }} />
          </div>
          <div className={styles.overlay} />
          <div className={styles.rotate} onClick={handleRotate} />
        </div>
        <div className={styles.list}>
          <div className={styles.listContainer}>
            {block.features.map((blend, i) => {
              return (
                <div key={i} className={styles.blend + `${i === active ? ` ${styles.active}` : ''}`}>
                  {blend.list.map((item, i) => {
                    return (
                      <div key={i} className={styles.item + `${i === active ? ` ${styles.active}` : ''}`}>
                        <Image src={item.icon} className={styles.icon} images={images} />
                        <p className={styles.feature}>{item.feature}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <Chart data={data} series={series} axes={axes} ticks={ticks} getSeriesStyle={getSeriesStyle} renderSVG={renderSVG} tooltip />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {block.body && parse(block.body)}
      </div>
    </section>
  )
}
