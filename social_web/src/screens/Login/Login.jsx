import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { loginApi } from "../../redux/reduxActions/authActions";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const _handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("email : ", email)
        console.log("password : ", password)

        loginApi().then((res) => {
            console.log(res, "resresres");
        }).catch((error) => {
            console.log(error, "errorerrorerror");
        })
    }

    return (
        <div className="addUser">
            <h3>Sign in</h3>
            <form className="addUserForm" onSubmit={_handleOnSubmit}>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="Password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" class="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Don't have Account? </p>
                <Link to="/register" type="submit" class="btn btn-success">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;