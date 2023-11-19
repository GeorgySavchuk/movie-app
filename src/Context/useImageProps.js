import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

const UseImageProps = createContext()
export const ImagePropsProvider = ({children}) => {
    const [currentProps, setCurrentProps] = useState({})

    return (
     <UseImageProps.Provider value={{currentProps, setCurrentProps}}>
         {children}
     </UseImageProps.Provider>
    )
}
export const useImageProps = () => useContext(UseImageProps)