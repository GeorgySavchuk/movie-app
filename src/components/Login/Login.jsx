import React from 'react';
import classes from './Login.module.css'
import {useNavigate} from "react-router-dom";
const Login = () => {
    let navigate = useNavigate()
    const confirmLogin = e => {
        e.preventDefault()
        navigate('/')
    }
    return (
        <div className={classes.box__container}>
            <div className={classes.box}>
                <div className={classes.square} style={{'--i': 0}}></div>
                <div className={classes.square} style={{'--i': 1}}></div>
                <div className={classes.square} style={{'--i': 2}}></div>
                <div className={classes.square} style={{'--i': 3}}></div>
                <div className={classes.square} style={{'--i': 4}}></div>
                <div className={classes.container}>
                    <div className={classes.form}>
                        <h2>Логин</h2>
                        <form action="">
                            <div className={classes.input__box}>
                                <input type="text" placeholder="Почта"/>
                            </div>
                            <div className={classes.input__box}>
                                <input type="text" placeholder="Пароль"/>
                            </div>
                            <div className={classes.input__box}>
                                <input type="submit" value="Войти" onClick={confirmLogin}/>
                            </div>
                            <p className={classes.forget}>Забыли пароль? <a href="" onClick={e => e.preventDefault()}>Перейти</a></p>
                            <p className={classes.forget}>Ещё нет аккаунта? <a href="" onClick={e => e.preventDefault()}>Зарегистрироваться</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;