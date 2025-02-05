import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPE': 
      return {
        recipe: action.payload
      }
    case 'CREATE_RECIPE':
      return {
        recipe: [action.payload, ...state.recipe]
      }
    case 'UPDATE_RECIPE':
      return {
        recipe: state.recipe.map((w) => 
          w._id === action.payload._id ? action.payload : w
        )
      }
    case 'DELETE_RECIPE':
      return {
        recipe: state.recipe.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    recipe: null
  })

  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
      { children }
    </WorkoutsContext.Provider>
  )
}

//test