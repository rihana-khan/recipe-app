import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from '../components/loader/Loader';
import './ForgetPass.css';



function ForgetPassword(props) {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const email = useRef();

    function sendEmail(e) {
        e.preventDefault();
        setLoading(true);
        /*fetch('/users/post-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.current.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
                if (res.error === "Email doesn't exist") {
                    setErrorMsg("Sorry, Email doesn't exist");
                } else if (res.message === 'recovery email sent') {
                    setSuccessMsg(
                        'Recovery email sent, please check your email'
                    );
                    email.current.value = '';
                }
            })
            .catch((err) => {
                setLoading(false);
                setErrorMsg('Something went wrong');
            }); */
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
                {errorMsg && (
                    <div className="error_msg_wrap">
                        <h2>Sorry, Email doesn't exist</h2>
                    </div>
                )}
                {successMsg && (
                    <div className="success_msg_wrap">
                        <h2>{successMsg}</h2>
                    </div>
                )}
                <Avatar className="avatar">
                    <LockOutlinedIcon />
                </Avatar>
                <h1 className="Forget-head">
                    Forget Password
               </h1>
                <form className="form" onSubmit={sendEmail}>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                    >
                        {loading ? (
                            <Loader width={5} height={5} />
                        ) : (
                                'Send Password Reset Email'
                            )}
                    </Button>
                </form>
                <Link to="/login">Back to Login</Link>
            </div>
        </Container>
    );
};

export default ForgetPassword;
