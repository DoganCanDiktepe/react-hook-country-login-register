import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { countryActions, userActions } from "../../_actions"

function HomePage() {
  const [inputs, setInputs] = useState({
    country: "",
    singleSearch: false,
  })
  const { country, singleSearch } = inputs

  const users = useSelector((state) => state.users)
  const user = useSelector((state) => state.authentication.user)
  const countries = useSelector((state) => state.countries)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getAll())
    getCountries()
  }, [])

  function getCountries() {
    dispatch(countryActions.getAll())
  }

  function clearCountries() {
    dispatch(countryActions.clearCountries())
  }

  function handleDeleteUser(id) {
    dispatch(userActions.delete(id))
  }

  function handleChange(e) {
    const { name, value, type } = e.target
    let defaultValue = value
    if (type === "checkbox") {
      defaultValue = !singleSearch
    }

    setInputs((inputs) => ({ ...inputs, [name]: defaultValue }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (country) {
      dispatch(countryActions.searchByName(country, singleSearch))
    }
  }

  return (
    <div>
      <header>
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="32"
              className="me-2"
              viewBox="0 0 118 94"
              role="img"
            >
              <title>{user.firstName}</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="fs-4">Hi {user.firstName}</span>
          </a>

          <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <Link to="/login" className="btn btn-danger">
              Logout
            </Link>
          </nav>
        </div>

        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Country</h5>
              <p className="card-text">
                You can get all list, or you can make filter or you can search single
                country.
              </p>
              <form
                className="mb-5 w-100 d-flex align-items-center justify-content-between"
                onSubmit={handleSubmit}
              >
                <div className="input-group d-flex justify-content-between">
                  <div className="input-group-text">
                    <input
                      className="form-check-input mt-0 me-3"
                      type="checkbox"
                      id="singleSearch"
                      name="singleSearch"
                      defaultChecked={singleSearch}
                      onChange={handleChange}
                      value={singleSearch}
                      aria-label="Checkbox for following text input"
                    />
                    <label htmlFor="singleSearch">Single Search</label>
                  </div>
                  <div className="form-outline flex-fill">
                    <input
                      id="country"
                      type="search"
                      name="country"
                      value={country}
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {countries.loading ? (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    ) : (
                      <i className="bi bi-search"></i>
                    )}
                  </button>
                  <a onClick={getCountries} className="btn btn-info">
                    ALL
                  </a>
                  <a onClick={clearCountries} className="btn btn-danger">
                    CLEAR
                  </a>
                </div>
              </form>
              {countries.loading && (
                <em className="py-5">
                  <i className="bi bi-hourglass-bottom"></i>
                </em>
              )}

              {countries.items && (
                <div className="row">
                  {countries.items.map((country, index) => (
                    <div key={index} className="col-12 col-sm-2 mb-5">
                      <div className="card">
                        <img src={country.flag} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{country.name}</h5>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <strong>Population: </strong>
                              {country.population}
                            </li>
                            <li className="list-group-item">
                              <strong>Capital: </strong>
                              {country.capital}
                            </li>
                            <li className="list-group-item">
                              <strong>Region: </strong>
                              {country.region}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="card mt-5">
            <div className="card-header fw-bold">User List</div>
            {users.loading && (
              <em className="py-5">
                <i className="bi bi-hourglass-bottom"></i>
              </em>
            )}
            {users.items && (
              <ul className="list-group">
                {users.items.map((user, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={user.id}
                    data-index={index}
                  >
                    {user.firstName + " " + user.lastName}

                    {user.deleting ? (
                      <em> - Deleting...</em>
                    ) : user.deleteError ? (
                      <span className="text-danger">
                        - ERROR: {user.deleteError}
                      </span>
                    ) : (
                      <a
                        className="btn bg-danger btn-sm text-white"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <i className="bi bi-x-circle-fill"></i>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export { HomePage }
