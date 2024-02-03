import {createContext, useContext, useState} from "react";

const UseMovieProps = createContext()
export const MoviePropsProvider = ({children}) => {
    const [currentProps, setCurrentProps] = useState({})

    return (
     <UseMovieProps.Provider value={{currentProps, setCurrentProps}}>
         {children}
     </UseMovieProps.Provider>
    )
}
export const useMovieProps = () => useContext(UseMovieProps)