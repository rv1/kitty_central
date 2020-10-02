import React from 'react'
import Rating from '../rating/rating'
import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  padding: 20px;
  margin: 0px 20px 20px 0px;
`

const Title = styled.div`
  padding: 20px 0 0 0;
  font-size: 18px;
`

const Description = styled.div`
  padding: 0 0 20px 0;
  font-size: 14px;
`

const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
`

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