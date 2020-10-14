import React from 'react'
import { Link } from 'react-router-dom'
import Rating from "../rating/rating";
import { Card, Photo, Name, LinkWrapper } from './kitty.styles'

const Kitty = (props) => {
  return (
    <Card>
      <Photo>
        <img src={props.attributes.image_url} alt={props.attributes.name}/>
      </Photo>
      <Name>{props.attributes.name}</Name>
      <Rating score={props.attributes.avg_score}/>
      <LinkWrapper>
        <Link to={`/kitties/${props.attributes.slug}`}>View Kitty</Link>
      </LinkWrapper>
    </Card>
  )
}

export default Kitty
