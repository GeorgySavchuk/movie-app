import React from 'react';
import classes from './Footer.module.css'
import vk from "../UI/images/img.png"
import telegram from "../UI/images/telegram.png"
import twitter from "../UI/images/twitter.png"
const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.social__icons}>
                <button className={classes.social__btn1}>
                    <svg viewBox="0 0 64 64" enableBackground="new 0 0 64 64"><path d="M53.9 41.6c-4.7-4.6-4.1-3.9 1.6-11.8 3.4-4.8 4.8-7.8 4.4-9.1-.2-.8-2.9-.6-2.9-.6h-8.4s-1.3 0-1.8.9c-.9 1.7-1.3 3.8-3.1 6.9-3.8 6.7-5.3 7.1-5.9 6.7-1.4-1-1.1-3.9-1.1-6 0-6.5.9-9.2-1.8-10-.6-.2-1.1-.2-2-.3-1.1-.1-2.2-.1-3.2-.1-2.5 0-4.4.1-5.7.7-1 .5-1.7 1.6-1.2 1.7.6.1 1.8.4 2.5 1.3.9 1.2.8 4 .8 4s.5 7.7-1.2 8.6c-1.1.7-2.7-.7-6-6.8-1.7-3.1-1.9-5.2-3-6.6-.7-.9-2-1.2-2-1.2h-8s-1.4-.1-1.6.3c-.4.5 0 1.5 0 1.5S10.6 37.2 17.7 45c6.3 7.4 13.7 7 13.7 7s4.3.2 4.9-.9c.4-.4.5-1.6.5-1.6s-.1-4.8 2-5.5c2.1-.7 4.7 4.6 7.5 6.6C48.4 52.2 49 52 50 52h7.5s3.9-.4 2.1-3.7c-.3-.2-1.2-2.3-5.7-6.7z" fill="hsla(0,0%,100%,.6)"></path></svg>
                </button>
                <button className={classes.social__btn2}>
                    <svg viewBox="0 0 512 512" enableBackground="new 0 0 512 512"><path d="m484.689 98.231-69.417 327.37c-5.237 23.105-18.895 28.854-38.304 17.972L271.2 365.631l-51.034 49.086c-5.646 5.647-10.371 10.372-21.256 10.372l7.598-107.722L402.539 140.23c8.523-7.598-1.848-11.809-13.247-4.21L146.95 288.614 42.619 255.96c-22.694-7.086-23.104-22.695 4.723-33.579L455.423 65.166c18.893-7.085 35.427 4.209 29.266 33.065z" fill="hsla(0,0%,100%,.6)"></path></svg>
                </button>
                <button className={classes.social__btn3}>
                    <svg viewBox="0 0 512 512" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M56 56h400v400H56z" fill="none"></path><path d="M161.014 464.013c193.208 0 298.885-160.071 298.885-298.885 0-4.546 0-9.072-.307-13.578A213.737 213.737 0 0 0 512 97.176a209.705 209.705 0 0 1-60.334 16.527 105.426 105.426 0 0 0 46.182-58.102 210.548 210.548 0 0 1-66.703 25.498 105.184 105.184 0 0 0-76.593-33.112c-57.682 0-105.145 47.464-105.145 105.144 0 8.002.914 15.979 2.722 23.773-84.418-4.231-163.18-44.161-216.494-109.752-27.724 47.726-13.379 109.576 32.522 140.226A104.258 104.258 0 0 1 20.48 194.23v1.331c.014 49.814 35.447 93.111 84.275 102.974a104.898 104.898 0 0 1-47.431 1.802c13.727 42.685 53.311 72.108 98.14 72.95a210.83 210.83 0 0 1-130.458 45.056A213.688 213.688 0 0 1 0 416.827a297.42 297.42 0 0 0 161.014 47.104" fill="hsla(0,0%,100%,.6)" fillRule="nonzero" className={classes.social__btn3__svg__path}></path></svg>
                </button>
            </div>
            <div className={classes.quickLinks}>
                <span>Вакансии</span>
                <span>Реклама</span>
                <span>Соглашение</span>
                <span>Справка</span>
                <span>Все фильмы</span>
                <span>Все сериалы</span>
                <span>Служба поддержки</span>
            </div>
            <div className={classes.copyrightText}>
                <p>Copyright © 2023 Мир Кино. All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;