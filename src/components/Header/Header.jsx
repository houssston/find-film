import React from 'react';
import logo from '../../assets/img/logo.png';
import s from './Header.module.css';


const Header = () => {

    return (
        <header>
            <div className={s.wrapper}>
                <div className={s.content}>
                    <a className={s.logo} href={'/'}>
                        <img className={s.logo__img} src={logo} alt={'Logo'}/>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
