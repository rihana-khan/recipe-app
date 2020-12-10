import React, { useRef, useState } from 'react';
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
import './Registration.css'



function SignUp(props) {

    let name = useRef(); //store name field value ref
    let username = useRef(); // store username filed value ref
    let email = useRef(); //store email field value ref
    let password = useRef();//store password field value ref
    let [loading, setLoading] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();

        setLoading(true);
        fetch('/users/post-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.current.value,
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                setLoading(false);
                props.history.push('/login');
            })
            .catch((err) => setLoading(false));
    };

    return (
        // container=contains everyting of our code
        <Container component="main" maxWidth="xs">
            <div className="paper">
                {/* avatar=wrapper for styling */}
                <Avatar className="avatar">
                    <LockOutlinedIcon />
                    {/* LockOutlinedIcon=icon */}
                </Avatar>
                <h1 className="sign-head">
                    Sign up
               </h1>
                <form className="form" onSubmit={handleSignUp} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={name}
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>
                        {/* Grid=row */}
                        <Grid item xs={12}>
                            {/* metarial ui input field design=TextField */}
                            <TextField
                                inputRef={username}
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                inputRef={email}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                inputRef={password}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                    >
                        {loading ? <Loader width={5} height={5} /> : 'Sign Up'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default withRouter(SignUp);
