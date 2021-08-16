import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { userActions } from "../../_actions"

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const { username, password } = inputs
  const loggingIn = useSelector((state) => state.authentication.loggingIn)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(userActions.logout())
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    setSubmitted(true)
    if (username && password) {
      const { from } = location.state || { from: { pathname: "/" } }
      dispatch(userActions.login(username, password, from))
    }
  }

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={
                    "form-control" + (submitted && !username ? " is-invalid" : "")
                  }
                  value={username}
                  onChange={handleChange}
                />
                {submitted && !username && (
                  <div className="invalid-feedback d-block">
                    Username is required
                  </div>
                )}
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={
                    "form-control" + (submitted && !password ? " is-invalid" : "")
                  }
                  value={password}
                  onChange={handleChange}
                />

                {submitted && !password && (
                  <div className="invalid-feedback d-block">
                    Password is required
                  </div>
                )}
              </div>

              <button className="btn btn-success btn-lg btn-block w-100">
                Sign in
                {loggingIn && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
              </button>

              <div className="divider d-flex align-items-center my-4 w-100">
                <p className="text-center fw-bold mx-3 mb-0 text-muted w-100">OR</p>
              </div>

              <Link to="/register" className="btn btn-danger btn-lg btn-block w-100">
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export { LoginPage }
