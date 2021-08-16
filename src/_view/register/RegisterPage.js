import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { userActions } from "../../_actions"

function RegisterPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const registering = useSelector((state) => state.registration.registering)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.logout())
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setUser((user) => ({ ...user, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    setSubmitted(true)
    if (user.firstName && user.lastName && user.username && user.password) {
      dispatch(userActions.register(user))
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className={
                              "form-control" +
                              (submitted && !user.firstName ? " is-invalid" : "")
                            }
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                          />

                          {submitted && !user.firstName && (
                            <div className="invalid-feedback d-block">
                              First Name is required
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            className={
                              "form-control" +
                              (submitted && !user.lastName ? " is-invalid" : "")
                            }
                          />

                          {submitted && !user.lastName && (
                            <div className="invalid-feedback">
                              Last Name is required
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="username">
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className={
                              "form-control" +
                              (submitted && !user.username ? " is-invalid" : "")
                            }
                          />

                          {submitted && !user.username && (
                            <div className="invalid-feedback d-block">
                              Username is required
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className={
                              "form-control" +
                              (submitted && !user.password ? " is-invalid" : "")
                            }
                          />

                          {submitted && !user.password && (
                            <div className="invalid-feedback">
                              Password is required
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button className="btn btn-primary me-3">
                          {registering && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Register
                        </button>
                        <Link to="/login" className="btn btn-danger">
                          Cancel
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { RegisterPage }
