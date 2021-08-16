import { countryConstants } from "../_constants"
import { countryService } from "../_services"
import { alertActions } from "./"

export const countryActions = {
  getAll,
  searchByName,
  clearCountries,
}

function getAll() {
  return (dispatch) => {
    dispatch(request())

    countryService.getAll().then(
      (countries) => {
        dispatch(success(countries))
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      }
    )
  }

  function request() {
    return { type: countryConstants.COUNTRY_GETALL_REQUEST }
  }
  function success(countries) {
    return { type: countryConstants.COUNTRY_GETALL_SUCCESS, countries }
  }
  function failure(error) {
    return { type: countryConstants.COUNTRY_GETALL_FAILURE, error }
  }
}

function searchByName(name, single) {
  return (dispatch) => {
    dispatch(request())

    countryService.searchByName(name, single).then(
      (countries) => {
        dispatch(success(countries))
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      }
    )
  }

  function request() {
    return { type: countryConstants.COUNTRY_SEARCH_REQUEST }
  }
  function success(countries) {
    return { type: countryConstants.COUNTRY_SEARCH_SUCCESS, countries }
  }
  function failure(error) {
    return { type: countryConstants.COUNTRY_SEARCH_FAILURE, error }
  }
}

function clearCountries() {
  return { type: countryConstants.CLEAR }
}
