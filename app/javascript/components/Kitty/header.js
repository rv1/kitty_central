import React from 'react'
import { Wrapper, TotalReviews, TotalOutOf } from './header.styles'

const Header = (props) => {
  const { name, image_url, avg_score } = props.attributes
  const total = props.reviews.length

  return (
    <Wrapper>
      <h1>
        <img src={image_url} />
        {name}
      </h1>
      <div>
        <TotalReviews>
          {total}
          {' '}
          User Reviews
        </TotalReviews>
        <div className="starRating" />
        <TotalOutOf>
          {avg_score}
          {' '}
          out of 5
        </TotalOutOf>
      </div>
    </Wrapper>
  )
}

export default Header
