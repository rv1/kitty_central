import React, { useEffect } from 'react'
import Kitty from './kitty'
import { useKitty } from '../../providers/cat_provider'
import { fetchAllKitties } from '../../clients/v1'
import {
  Grid, Header, Home, Subheader,
} from './kitties.styles'

const Kitties = () => {
  const [state, dispatch] = useKitty()
  const { kitties } = state

  useEffect(() => {
    fetchAllKitties(dispatch)
  }, [])

  const grid = kitties.map((item) => (
    <Kitty
      key={item.attributes.name}
      attributes={item.attributes}
    />
  ))
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
