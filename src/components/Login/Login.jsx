import { useState, useEffect } from 'react';

import './Login.css';

import Card from '../UI/Card';
import Button from '../UI/Button';

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            console.log('Checking form validity!');

            setFormIsValid(
                emailIsValid && passwordIsValid
            );


        }
        , 500);

        return () => {
            clearTimeout(timeOut);
        }
    }, [enteredEmail, enteredPassword]);

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(enteredEmail, enteredPassword);
        console.log('Submitted!');
    }

    return (
        <Card className="login">
            <form onSubmit={submitHandler}>
                <div className={`control ${emailIsValid === false ? 'invalid' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div className={`control ${passwordIsValid === false ? 'invalid' : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className="actions">
                    <Button type="submit" disabled={!formIsValid} >Login</Button>
                </div>
            </form>
        </Card>
    )
}

export default Login;