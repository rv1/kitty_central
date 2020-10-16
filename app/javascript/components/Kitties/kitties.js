import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Kitty from './kitty'
import { Grid, Header, Home, Subheader } from "./kitties.styles";

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
