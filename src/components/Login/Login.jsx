import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/slices/authSlice';
import { PulseLoader } from 'react-spinners';
import {auth} from "../../firebase/FirebaseInit";
const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control } = useForm();
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const confirmLogin = async (data) => {
        try{
            setIsLoading(true)
            const {user} = await signInWithEmailAndPassword(auth, data.email, data.password)
            dispatch(setAuth({isAuth: true, user}))
            navigate('/')
        } catch(err) {
            setError('login', { message: 'Неправильный email или пароль'});
        } finally {
            setIsLoading(false)
        }
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
                        <form action="" onSubmit={handleSubmit(confirmLogin)}>
                            <div className={classes.input__box}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            placeholder="Почта"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    )}
                                    rules={{
                                        required: "Данное поле обязательно",
                                        pattern: {
                                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Некорректный email"
                                        }
                                }}
                                />
                            </div>
                            {errors.email && <p className={classes.error}>{errors.email.message}</p>}
                            <div className={classes.input__box}>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <input
                                            type="password"
                                            placeholder="Пароль"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    )}
                                    rules={{
                                        required: "Данное поле обязательно",
                                        minLength: {
                                            value: 6,
                                            message: "Пароль должен содержать минимум 6 символов",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Пароль не должен превышать 20 символов",
                                        },
                                    }}
                                />
                            </div>
                            {errors.password && <p className={classes.error}>{errors.password.message}</p>}
                            <div className={classes.input__box}>
                                <button>{
                                    isLoading
                                        ? <PulseLoader
                                            color="#141414"
                                            size={10}
                                        />
                                        : <p>Войти</p>
                                }
                                </button>
                            </div>
                            {errors.login && <p className={classes.error}>{errors.login.message}</p>}
                            <p className={classes.forget}>Ещё нет аккаунта?
                                <a href="" onClick={e => {
                                    e.preventDefault()
                                    navigate('/registration')
                                }}> Зарегистрироваться</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;