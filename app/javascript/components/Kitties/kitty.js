import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
`
const Photo = styled.div`
  width: 50px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 100%
    border: 1px solid #efefef;
  }
  
`
const Name = styled.div`
  padding: 20px 0 10px 0;
`
const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height: 50px;

  a {
    color: #fff;
    background: #000;
    border-radius: 4px;
    padding: 10px 50px;
    border: 1px solid #000;
    width: 100%;
    text-decoration: none;
  }
`


const Kitty = (props) => {
  return (
    <Card>
      <Photo>
        <img src={props.attributes.image_url} alt={props.attributes.name}/>
      </Photo>
      <Name>{props.attributes.name}</Name>
      <div className="kitty-score">{props.attributes.avg_score}</div>
      <LinkWrapper>
        <Link to={`/kitties/${props.attributes.slug}`}>View Kitty</Link>
      </LinkWrapper>
    </Card>
  )
}

export default Kitty
