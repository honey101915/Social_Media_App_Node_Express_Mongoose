import React, { useState, FormEvent, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import {
    checkDataEmptyOrNot,
    checkPasswordValidations,
    isValidEmail,
} from "../../utils/validations";
import { notifyError, notifySuccess } from "../../utils/ToastConfig";
import { getAllInterestsApi, signupApi } from "../../redux/reduxActions/authActions";
import { Header, Loader } from "../../components";
import { ApiError, ApiSuccessResponse } from "../../utils/helperFunctions";

const Register: React.FC = () => {

    const [allAvailInterests, getAllAvailInterests] = useState([])

    const [loading, setLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [profession, setProfession] = useState<string>("");
    const [interests, setInterests] = useState<string[]>([]);
    const [about, setAbout] = useState<string>("");

    useEffect(() => {
        _getAllInterests()
    }, [])

    const _getAllInterests = () => {
        getAllInterestsApi().then((res: any) => {
            getAllAvailInterests(res?.data)
        }).catch((error) => {
            notifyError(ApiError(error))
        })
    }

    const _emptyStates = () => {
        setUserName("");
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setDob("");
        setAge("");
        setGender("");
        setProfession("");
        setAbout("");
        setInterests([]);
    };

    const _checkValidations = (e: FormEvent) => {
        e.preventDefault();

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 100);

        if (checkDataEmptyOrNot(userName)) {
            notifyError("Username is required.");
            return;
        } else if (checkDataEmptyOrNot(name)) {
            notifyError("Name is required.");
            return;
        } else if (!isValidEmail(email)) {
            notifyError("Enter a valid email.");
            return;
        } else if (
            !checkPasswordValidations(password, "Password must be at least 6 characters.")
        ) {
            return;
        } else if (checkDataEmptyOrNot(phoneNumber)) {
            notifyError("Phone number is required.");
            return;
        } else if (checkDataEmptyOrNot(dob)) {
            notifyError("Date of birth is required.");
            return;
        } else if (checkDataEmptyOrNot(age)) {
            notifyError("Age is required.");
            return;
        } else if (checkDataEmptyOrNot(gender)) {
            notifyError("Gender is required.");
            return;
        } else if (checkDataEmptyOrNot(profession)) {
            notifyError("Profession is required.");
            return;
        } else if (interests.length === 0) {
            notifyError("At least one interest must be selected.");
            return;
        } else {
            _registerUser();
        }
    };

    const _registerUser = () => {
        setLoading(true);
        const _apiData = {
            userName: userName.trim() + String(Math.random()),
            name: name.trim(),
            email: String(Math.random()) + email.trim(),
            password: password.trim(),
            phoneNumber: phoneNumber.trim(),
            dob: dob.trim(),
            age: age.trim(),
            gender: gender.trim(),
            profession: profession.trim(),
            interests,
            about: about.trim(),
        };

        signupApi(_apiData)
            .then((res) => {
                setLoading(false);
                notifySuccess(ApiSuccessResponse(res));
                _emptyStates();
            })
            .catch((error) => {
                notifyError(ApiError(error));
                setLoading(false);
            });
    };

    const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setInterests((prevInterests) =>
            checked ? [...prevInterests, value] : prevInterests.filter((interest) => interest !== value)
        );
    };

    return (
        <div className="register-container">
            <Header title={"Register"} />
            <form className="register-form" onSubmit={_checkValidations}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="profession">Profession</label>
                    <input
                        type="text"
                        id="profession"
                        placeholder="Enter your profession"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                    />

                    <label htmlFor="profession">Interests</label>
                    <div className="interests-fieldset">
                        <div className="checkbox-container">

                            {allAvailInterests.map((item: any) => {
                                return (
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={item?.name}
                                            checked={interests.includes(item?.name)}
                                            onChange={handleInterestChange}
                                        />
                                        {item?.name}
                                    </label>
                                )
                            })}
                            {/* Add more interests as needed */}
                        </div>
                    </div>

                    <label htmlFor="about">About You</label>
                    <textarea
                        id="about"
                        placeholder="Tell us about yourself"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    ></textarea>

                    <button type="submit" className="btn btn-success">
                        Register
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Already have an Account?</p>
                <Link to="/" className="btn btn-primary">
                    Login
                </Link>
            </div>
            {loading && <Loader />}
        </div>
    );
};

export default Register;
