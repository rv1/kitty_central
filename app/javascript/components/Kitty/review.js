import React from 'react'
import Rating from '../rating/rating'
import {
  Card, Title, Description, RatingContainer,
} from './review.styles'

const Review = (props) => {
  const { score, title, description } = props

  return (
    <Card>
      <RatingContainer>
        <Rating score={score} />
      </RatingContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  )
}

export default Review
