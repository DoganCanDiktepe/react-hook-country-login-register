import React, { useEffect } from "react"
import { Router, Route, Redirect, BrowserRouter, Switch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { history } from "../../_helpers"
import { alertActions } from "../../_actions"
import { PrivateRoute } from "../../_component"

import { HomePage } from "../home"
import { LoginPage } from "../login"
import { RegisterPage } from "../register"

function App() {
  const alert = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen(() => {
      dispatch(alertActions.clear())
    })
  }, [])

  return (
    <div className="container-fluid">
      {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export { App }
