import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Kitties from "./Kitties/kitties";
import Kitty from "./Kitty/kitty";
import { KittyProvider } from '../context/KittyContext'

const App = () => {
  return (
    <KittyProvider>
      <Switch>
        <Route exact path="/" component={Kitties}/>
        <Route exact path="/kitties/:slug" component={Kitty}/>
      </Switch>
    </KittyProvider>
  )
}

export default App
