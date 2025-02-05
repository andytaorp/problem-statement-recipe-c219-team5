import { createContext, useReducer } from "react";

export const AIContext = createContext();

const aiReducer = (state, action) => {
  switch (action.type) {
    case "SET_AI_RESULT":
      return { ...state, aiResult: action.payload };
    case "CLEAR_AI_RESULT":
      return { ...state, aiResult: null };
    default:
      return state;
  }
};

export const AIContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(aiReducer, { aiResult: null });

  return (
    <AIContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AIContext.Provider>
  );
};
