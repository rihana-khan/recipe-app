import React, { useState, useContext, useRef } from 'react';
//import AuthContext from '../contexts/auth-context';
import { Link, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from '../components/loader/Loader';
import AuthContext from '../contexts/AuthContext';
import './Login.css'



function Login(props) {
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrorMsg] = useState('');


    const context = useContext(AuthContext);
    const email = useRef();
    const password = useRef();

    function handleSubmit(e) {

        e.preventDefault();
        setLoading(true);
        fetch('/users/post-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
                console.log(res)
                if (!res.error) {
                    context.login(res.accessToken, res.userId, res.expiresIn);
                    localStorage.setItem(
                        'userInfo',
                        JSON.stringify(res.accessToken)
                    );
                    localStorage.setItem('userId', JSON.stringify(res.userId));
                    localStorage.setItem(
                        'tokenExpiration',
                        JSON.stringify(res.expiresIn)
                    );
                    props.history.push('/');
                } else {
                    setErrorMsg(res.error);
                }
            })
            .catch((err) => {
                setLoading(false);
            });

    };

    return (
        <Container component="main" maxWidth="xs">
            {errMsg && (
                <div className="error_msg_wrap">
                    <h2>{errMsg}</h2>
                </div>
            )}
            <CssBaseline />
            <div className="paper">
                <Avatar className="avatar">
                    {/* avatar=wrapper for styling */}
                    <LockOutlinedIcon />
                    {/* LockOutlinedIcon=icon */}
                </Avatar>
                <h1 className="login-head" >
                    Login
                   </h1>
                <form className="form" onSubmit={handleSubmit}>
                    {/* metarial ui input field design=TextField */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={email}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        inputRef={password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                    >
                        {loading ? <Loader width={5} height={5} /> : 'Sign in'}
                    </Button>
                    <Grid container>
                        <Grid item xs>

                            <Link to="/forget-password">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to="/registration">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default withRouter(Login);
