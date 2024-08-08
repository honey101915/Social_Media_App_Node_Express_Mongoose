import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../redux/reduxActions/authActions";
import { notifySuccess, notifyError, notifyInfo } from "../../utils/ToastConfig";
import { Loader } from "../../components";

import "../../components/Loader/Loader.css";
import "./Login.css";
import "../../App.css"
import { checkDataEmptyOrNot, checkIsEmpty, checkPasswordValidations, isValidEmail } from "../../utils/validations";
import { ApiError, ApiSuccessResponse } from "../../utils/helperFunctions";


const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('ritika@gmail.com');
    const [password, setPassword] = useState('123456');


    const _checkValidations = (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            notifyError("Enter valid email")
            return;
        } else if (!checkPasswordValidations(password, "Password must be of 6 characters.")) {
            return;
        } else {
            setLoading(true)
            _handleOnSubmit(e)
        }
    }

    const _handleOnSubmit = (e) => {
        e.preventDefault();
        let _apiData = {
            email: String(email).trim(),
            password: String(password).trim()
        }

        loginApi(_apiData).then((res) => {
            console.log(res, "resresres");
            setLoading(false)
            notifySuccess(ApiSuccessResponse(res))
            _moveToProfile()
        }).catch((error) => {
            notifyError(ApiError(error))
            setLoading(false)
        })
    }

    const _moveToProfile = () => navigate('/profile');

    return (
        <div className="addUser">

            <h3>Sign in</h3>
            <form className="addUserForm" onSubmit={_checkValidations}>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        // autoComplete="off"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="Password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // autoComplete="off"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Don't have Account? </p>
                <Link to="/register" type="submit" className="btn btn-success">
                    Sign Up
                </Link>
            </div>
            {loading ? <Loader /> : <></>}
        </div>
    );
};

export default Login;