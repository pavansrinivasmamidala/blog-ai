import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const initialState = {
  blogData: null
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_BLOG_DATA":
      return {
        ...state,
        blogData: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
