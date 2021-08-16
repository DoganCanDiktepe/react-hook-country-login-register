import { countryConstants } from "../_constants"

export function countries(state = {}, action) {
  switch (action.type) {
    case countryConstants.COUNTRY_GETALL_REQUEST:
    case countryConstants.COUNTRY_SEARCH_REQUEST:
      return {
        loading: true,
      }
    case countryConstants.COUNTRY_GETALL_SUCCESS:
    case countryConstants.COUNTRY_SEARCH_SUCCESS:
      return {
        items: action.countries,
      }
    case countryConstants.COUNTRY_GETALL_FAILURE:
    case countryConstants.COUNTRY_SEARCH_FAILURE:
      return {
        error: action.error,
        loading: false,
      }
    case countryConstants.CLEAR:
      return {
        items: [],
      }
    default:
      return state
  }
}
