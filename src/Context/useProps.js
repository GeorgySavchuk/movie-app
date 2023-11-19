import {createContext, useContext, useState} from "react";

const UseProps = createContext();

export const PropsProvider = ({ children }) => {
    const [imageProps, setImageProps] = useState(null);

    return (
        <UseProps.Provider value={{ imageProps, setImageProps }}>
            {children}
        </UseProps.Provider>
    );
};

export const useProps = () => {
    return useContext(UseProps);
};