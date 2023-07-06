import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const initialState = {
  title:null,
  blogData: null
};

function reducer(state, action) {
  console.log(action.payload);
  switch (action.type) {
    case "SET_BLOG_DATA":
      return {
        ...state,
        blogData: state.blogData ? state.blogData + action.payload : action.payload,
      };
    case "SET_TITLE":{
      console.log(action.payload);
      return {...state, title: action.payload}
    } 
      
    case "CLEAR_STATE":
      return {
        ...initialState,
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
