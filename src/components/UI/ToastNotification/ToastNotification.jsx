import React, {useEffect, useState} from 'react';
import classes from "../ToastNotification/ToastNotification.module.css"
const ToastNotification = ({ isActive, onClose, message }) => {
    const [isProgressActive, setIsProgressActive] = useState(false);
    useEffect(() => {
        let timer1;
        let timer2;

        if (isActive) {
            setIsProgressActive(true)

            timer1 = setTimeout(() => {
                onClose();
            }, 5000);

            timer2 = setTimeout(() => {
                setIsProgressActive(false);
            }, 5300);
        } else {
            setIsProgressActive(false);
        }
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [isActive, onClose]);

    return (
        <div className={`${classes.toast} ${isActive ? classes.toastActive : ''}`}>
            <div className={classes.toastContent}>
                <div className={classes.message}>
                    <span className={classes.text}>{message}</span>
                </div>
            </div>
            <div className={`${classes.progress} ${isProgressActive ? classes.progressActive : ''}`}></div>
        </div>
    );
};

export default ToastNotification;