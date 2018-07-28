import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import './scss/main.scss'
import App from './containers/App'

import { Provider } from 'react-redux'
import store from './store'

render(<Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter>
</Provider>, document.getElementById('app'))
