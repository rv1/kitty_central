import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Kitty from './kitty'
import styled from 'styled-components'

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`
const Header = styled.div`
  padding: 100px 100px 10px 100px;

  h1 {
    font-size: 42px
  }
`
const Subheader = styled.div`
  font-weight: 300;
  font-size: 26px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
`

const Kitties = () => {
  const [kitties, setKitties] = useState([])

  useEffect(() => {
    axios.get('/api/v1/kitties')
      .then(response => setKitties(response.data.data))
      .catch(response => console.log(response))
  }, [kitties.length])

  const grid = kitties.map(item => {
    return (
      <Kitty
        key={item.attributes.name}
        attributes={item.attributes}
      />
    )
  })
  return (
    <Home>
      <Header>
        <h1>Kitty Central</h1>
        <Subheader>
          Review cats on the internet.
        </Subheader>
      </Header>
      <Grid>
        {grid}
      </Grid>
    </Home>
  )
}

export default Kitties
