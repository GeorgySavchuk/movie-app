import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import classes from './Registration.module.css';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider
} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setAuth} from "../../store/slices/authSlice";
import {PulseLoader} from "react-spinners";
import {Controller, useForm} from "react-hook-form";

const Registration = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control } = useForm();
    let navigate = useNavigate()
    const auth = getAuth()
    const dispatch = useDispatch()
    const provider = new GoogleAuthProvider();
    const confirmRegistration = async (data) => {
        try{
            setIsLoading(true)
            await createUserWithEmailAndPassword(auth, data.email, data.password)
            console.log(auth.currentUser)
            await updateProfile(auth.currentUser, {
                displayName: data.userName
            })
            dispatch(setAuth({isAuth: true, user: auth.currentUser}))
            navigate('/')
        } catch(err) {
            setError('registration', { message: err.message});
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
                        <h2>Регистрация</h2>
                        <form action="" onSubmit={handleSubmit(confirmRegistration)}>
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
                                    name="userName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            placeholder="Логин"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    )}
                                    rules={{
                                        required: "Данное поле обязательно",
                                    }}
                                />
                            </div>
                            {errors.userName && <p className={classes.error}>{errors.userName.message}</p>}
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
                                            size={8}
                                        />
                                        : <p>Создать аккаунт</p>
                                }
                                </button>
                            </div>
                            {errors.registration && <p className={classes.error}>{errors.registration.message}</p>}
                            <p className={classes.forget}>Уже есть аккаунт?
                                <a href="" onClick={e => {
                                    e.preventDefault()
                                    navigate('/login')
                                }}> Войти</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;