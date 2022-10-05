import { CATEGORIES_ACTION_TYPES } from './category.types'

export const CATEGORIES_INTIAL_STATE = {
  categoriesMap: {},
}

export const categoriesReducer = (state = CATEGORIES_INTIAL_STATE, action = {}) => {
  const { type, payload } = action
  switch (type) {
    default:
      return state
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload,
      }
  }
}
