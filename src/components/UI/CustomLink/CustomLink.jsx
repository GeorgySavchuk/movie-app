import React from 'react';
import {Link} from "react-router-dom";

const CustomLink = ({to, onClick, children, style}) => {
    return (
        <Link to={to} onClick={onClick} style={style}>
            {children}
        </Link>
    );
};

export default CustomLink;