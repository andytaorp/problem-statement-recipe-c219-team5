import { createContext, useReducer } from 'react';

export const RecipeContext = createContext();

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPE': 
      return {
        ...state,
        recipes: action.payload
      };
    case 'CREATE_RECIPE':
      return {
        ...state,
        recipes: [action.payload, ...state.recipes]
      };
    case 'DELETE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter((r) => r._id !== action.payload._id)
      };
    case 'UPDATE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? { ...recipe, ...action.payload } : recipe
        ),
      };
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: action.payload
      };
    default:
      return state;
  }
};

export const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, {
    recipes: [],
    sortOrder: 'none' 
  });

  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};
