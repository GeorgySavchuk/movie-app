import './App.css';
import NavBar from "./components/NavBar/NavBar";
import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import classes from "./components/Main/Main.module.css";
import AppRouter from "./components/AppRouter/AppRouter";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import { setAuth } from '../src/store/slices/authSlice';
function App() {
    const auth = getAuth()
    const dispatch = useDispatch()
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(setAuth({ isAuth: true, user}));
            } else {
                dispatch(setAuth({isAuth: false, user: {}}))
            }
        })
    }, [auth]);
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar/>
            <main className={classes.main}>
                <AppRouter/>
            </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
