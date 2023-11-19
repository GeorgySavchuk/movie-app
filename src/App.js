import './App.css';
import NavBar from "./components/NavBar/NavBar";
import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import classes from "./components/Main/Main.module.css";
import AppRouter from "./components/AppRouter/AppRouter";
import Footer from "./components/Footer/Footer";

function App() {
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
