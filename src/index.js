import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"

import { store } from "./_helpers"

import { App } from "./_view/app"

import { configureFakeBackend } from "./_helpers"

import * as serviceWorker from "./serviceWorker"

configureFakeBackend()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
)

serviceWorker.unregister()
