import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'

const SushiContainer = ({ displayedSushi, renderFourSushis, buySushi }) => {
  return (
    <Fragment>
      <div className="belt">
        {displayedSushi.map(sushi => (
          sushi.img_url ?
          <div className="belt" onClick={e => buySushi(sushi.price, sushi)} key={sushi.id}><img style={{width:'100px'}} src={sushi.img_url}/><p>{sushi.name}-${sushi.price}</p></div>
          :
          <div className="belt" key={sushi.id}><p>{sushi.name}-${sushi.price}</p></div>
        ))}
        <MoreButton renderFourSushis={renderFourSushis} />
      </div>
    </Fragment>
  )
}

export default SushiContainer