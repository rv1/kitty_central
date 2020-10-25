import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Kitties from './Kitties/kitties'
import Kitty from './Kitty/kitty'
import { CatProvider } from '../providers/cat_provider'

const App = () => (
  <CatProvider>
    <Switch>
      <Route exact path="/" component={Kitties} />
      <Route exact path="/kitties/:slug" component={Kitty} />
    </Switch>
  </CatProvider>
)

export default App
