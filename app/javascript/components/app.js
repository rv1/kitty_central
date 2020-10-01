import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Kitties from "./Kitties/kitties";
import Kitty from "./Kitty/kitty";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Kitties}/>
      <Route exact path="/kitties/:slug" component={Kitty}/>
    </Switch>
  )
}

export default App
