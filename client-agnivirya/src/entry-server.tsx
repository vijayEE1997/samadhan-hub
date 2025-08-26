import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'

export function render(url: string, initialState: any = {}) {
  const app = React.createElement(App, { initialState })
  const html = ReactDOMServer.renderToString(app)
  
  return {
    html,
    initialState
  }
}

export { App }
