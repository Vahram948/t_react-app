import React, { createContext, useContext, useReducer } from "react";
import { initialState } from "./Reducer";

const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children, state , reducer}) => {

    return (
        <GlobalContext.Provider value={useReducer(reducer, state)}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useStateValue = () => useContext(GlobalContext)
