import { AIContext } from "./context/AIContext";
import { useContext } from "react";

export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw Error("useAIContext must be used inside an AIContextProvider");
  }
  return context;
};
