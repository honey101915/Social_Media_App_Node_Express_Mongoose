import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { checkDataEmptyOrNot, checkLength, checkPasswordValidations, isValidEmail } from "../../utils/validations";
import { notifyError, notifySuccess } from "../../utils/ToastConfig";
import { signupApi } from "../../redux/reduxActions/authActions";
import { Loader } from "../../components";
import { ApiError, ApiSuccessResponse } from "../../utils/helperFunctions";

const Register = () => {
    const [loading, setLoading] = useState(false);

    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const _checkValidations = (e) => {
        e.preventDefault();

        if (checkDataEmptyOrNot(userName)) {
            notifyError("User name is required of minimum 3 characters")
            return;
        } else if (checkDataEmptyOrNot(name)) {
            notifyError("Name is required of minimum 3 characters")
            return;
        } else if (!isValidEmail(email)) {
            notifyError("Enter valid email")
            return;
        } else if (!checkPasswordValidations(password, "Password must be of 6 characters.")) {
            return;
        } else if (checkDataEmptyOrNot(phoneNumber)) {
            notifyError("Phone number is required of minimum 8 characters")
            return;
        } else {
            _registerUser()
        }
    }

    const _registerUser = () => {
        setLoading(true)
        let _apiData = {
            userName: userName.trim(),
            name: name.trim(),
            email: String(email).trim(),
            password: String(password).trim(),
            phoneNumber: String(phoneNumber).trim()
        }

        signupApi(_apiData).then((res) => {
            console.log(res, "resresres");
            setLoading(false)
            notifySuccess(ApiSuccessResponse(res))
        }).catch((error) => {
            notifyError(ApiError(error))
            setLoading(false)
        })
    }

    return (
        <div className="addUser">
            <h3>Sign Up</h3>
            <form className="addUserForm" onSubmit={_checkValidations}>
                <div className="inputGroup">

                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="off"
                        placeholder="Enter your username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="off"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="Password"
                        autoComplete="off"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="Phone Number">Phone Number</label>
                    <input
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        autoComplete="off"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button type="submit" class="btn btn-success">
                        Sign Up
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Already have an Account? </p>
                <Link to="/" type="submit" class="btn btn-primary">
                    Login
                </Link>
            </div>
            {loading ? <Loader /> : <></>}
        </div>
    );
};

export default Register;