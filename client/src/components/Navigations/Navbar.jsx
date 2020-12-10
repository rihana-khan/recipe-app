import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from '../../contexts/AuthContext';
import SearchIcon from '@material-ui/icons/Search';

import './Navbar.css';
import Search from '../../pages/Search';

function Navbar(props) {

    const [searchVal, setSearchVal] = useState('');
    const [username, setUsername] = useState('');
    const context = useContext(AuthContext);

    useEffect(() => {
        if (context.userId) {
            fetch('/users/getUserName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: context.userId,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setUsername(res.username);
                });
        }
    }, [context]);

    useEffect(() => {
        if (!searchVal) { }
        else {
            props.history.push('/search/' + searchVal);
        }
    }, [props.history, searchVal]);

    const handleLogout = () => {
        context.logout();

        props.history.push('/login');
    };
    return (
        <header className="main-navigation">

            <div className="main-navigation__logo">
                <Link to={'/'}>
                    <img src={require('../../logo.png')} alt="" />
                </Link>
            </div>
            <div className="search_field_wrap">
                <input
                    type="text"
                    placeholder="Search for recipes"
                    value={searchVal}
                    onChange={event => {
                        setSearchVal(event.target.value)
                    }}
                />
                <SearchIcon className="searchSVG"></SearchIcon>
            </div>
            <nav className="main-navigation__items">
                <ul>
                    <li>
                        <NavLink exact={true} to="/">
                            Home
                        </NavLink>
                    </li>
                    {!context.token && (
                        <li>
                            <NavLink exact={true} to="/login">
                                Login
                            </NavLink>
                        </li>
                    )}
                    {context.userId && (
                        <li>
                            <NavLink exact={true} to={`/users/${username}`}>
                                Profile
                     </NavLink>
                        </li>
                    )}
                    {context.token && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                    <div className="theme_btn_wrap" onClick={props.handleTheme} >
                        <span>
                            <Brightness2Icon />
                        </span>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default withRouter(Navbar);