import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfile.css'; // Import custom CSS file
import { Header } from '../../components';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { updateProfileApi } from '../../redux/reduxActions/homeActions';
import { notifyError, notifySuccess } from '../../utils/ToastConfig';
import { ApiError, ApiSuccessResponse } from '../../utils/helperFunctions';
import ListModal from '../../components/ListModal/ListModal';
import { getAllInterestsApi, getAllLanguagesApi } from '../../redux/reduxActions/authActions';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
    const navigate = useNavigate();

    const userData = useSelector((state: any) => state?.authReducers?.userData || {})
    const allInterests = useSelector((state: any) => state?.authReducers?.allInterests || {})
    const allLanguages = useSelector((state: any) => state?.authReducers?.allLanguages || {})

    console.log(userData, "userDatauserDatauserData", allInterests);

    const [profileData, setProfileData] = useState<any>({
        name: userData?.name || "",
        email: userData?.email || "",
        phoneNumber: userData?.phoneNumber || "",
        dob: userData?.dob || "",
        age: userData?.age || "",
        gender: userData?.gender || "",
        profession: userData?.profession || "",
        interests: userData?.interests || [],
        preferredLanguages: userData?.preferredLanguages || [],
        about: userData?.about || "",
        selectedSchool: userData?.school || {},
        selectedCollege: userData?.college || {}
    });

    const [openModal, setOpenModal] = useState<any>({
        isOpen: false,
        type: null,
        heading: null,
        subHeading: null,
    })

    useEffect(() => {
        if (Array.isArray(allInterests) && allInterests.length === 0) {
            _getAllInterests()
        }
        if (Array.isArray(allLanguages) && allLanguages.length === 0) {
            _getAllLanguages()
        }
    }, [])


    const _getAllInterests = () => {
        getAllInterestsApi().then((res: any) => {
        }).catch((error) => {
            notifyError(ApiError(error))
        })
    }

    const _getAllLanguages = () => {
        getAllLanguagesApi().then((res: any) => {
        }).catch((error: any) => {
            notifyError(ApiError(error))
        })
    }


    // Handle input change
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const _handleInterestChange = (e: any) => {
        const _arr = profileData.interests.filter((val: any) => val != e?._id)
        console.log(_arr, "profileDataprofileData _arr_arr_arr");
        if (_arr.length < profileData.interests.length) {
            setProfileData((prevData: any) => ({ ...prevData, interests: _arr }))
        } else {
            setProfileData((prevData: any) => ({ ...prevData, interests: [...profileData.interests, e] }))
        }
    };

    const _handleLanguageChange = (e: any) => {
        const _arr = profileData.preferredLanguages.filter((val: any) => val != e?._id)
        if (_arr.length < profileData.preferredLanguages.length) {
            setProfileData((prevData: any) => ({ ...prevData, preferredLanguages: _arr }))
        } else {
            setProfileData((prevData: any) => ({ ...prevData, preferredLanguages: [...profileData.preferredLanguages, e] }))
        }
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Updated Profile Data:', profileData);
    };

    const _onSaveChanges = () => {
        const _apiData = {
            name: profileData?.name.trim(),
            phoneNumber: profileData?.phoneNumber,
            dob: profileData?.dob.trim(),
            age: profileData?.age,
            gender: profileData?.gender.trim(),
            profession: profileData?.profession.trim(),
            about: profileData?.about.trim(),
            interests: profileData.interests.filter((val: any) => val._id).map((val: any) => val._id),
            preferredLanguages: profileData.preferredLanguages.filter((val: any) => val._id).map((val: any) => val._id),
            school: profileData.selectedSchool?._id,
            college: profileData.selectedCollege?._id,
        };
        console.log(_apiData, "updateProfileApi _apiData");
        updateProfileApi(_apiData).then((res) => {
            console.log(res, "updateProfileApi res");
            notifySuccess(ApiSuccessResponse(res))
            navigate(-1);
        }).catch((error) => {
            notifyError(ApiError(error))
        })
    }

    const _openSchoolModal = () => {
        setOpenModal({
            isOpen: true,
            type: "_SCHOOL",
            heading: "Select your school",
            subHeading: "School List",
        })
    }

    const _openCollegeModal = () => {
        setOpenModal({
            isOpen: true,
            type: "_COLLEGE",
            heading: "Select your University/College",
            subHeading: "University/College List",
        })
    }

    return (
        <Container fluid className="edit-profile-page">
            <Header title="Edit Profile" />
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="profile-card">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} controlId="formName" className="mb-4">
                                    <Form.Label column sm={3}>Username:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={userData?.userName}
                                            onChange={handleChange}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formName" className="mb-4">
                                    <Form.Label column sm={3}>Name:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={profileData?.name}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formEmail" className="mb-4">
                                    <Form.Label column sm={3}>Email:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={profileData?.email}
                                            onChange={handleChange}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPhoneNumber" className="mb-4">
                                    <Form.Label column sm={3}>Phone Number:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="number"
                                            name="phoneNumber"
                                            value={profileData?.phoneNumber}
                                            onChange={handleChange}
                                            maxLength={14}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formDob" className="mb-4">
                                    <Form.Label column sm={3}>Date of Birth:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            // value={moment(profileData?.dob).format("DD-MM-YYYY")}
                                            value={profileData?.dob}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formAge" className="mb-4">
                                    <Form.Label column sm={3}>Age:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="number"
                                            name="age"
                                            value={profileData?.age}
                                            onChange={handleChange}
                                            maxLength={2}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formGender" className="mb-4">
                                    <Form.Label column sm={3}>Gender:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Select
                                            name="gender"
                                            value={profileData?.gender || ""}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formProfession" className="mb-4">
                                    <Form.Label column sm={3}>Profession:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="profession"
                                            value={profileData?.profession}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formInterests" className="mb-4">
                                    <Form.Label column sm={3}>Interests:</Form.Label>
                                    <Col sm={9}>
                                        <div className="interests-fieldset">
                                            <div className="checkbox-container">
                                                {allInterests.map((interest: any, index: any) => (
                                                    <div
                                                        className="box-container"
                                                        key={index}>
                                                        <Form.Check
                                                            type="checkbox"
                                                            label={interest?.name}
                                                            name="interests"
                                                            value={interest?._id}
                                                            onChange={() => _handleInterestChange(interest)}
                                                            className="mb-2"
                                                            style={{ textTransform: 'capitalize', color: 'black' }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formInterests" className="mb-4">
                                    <Form.Label column sm={3}>Preferred Languages:</Form.Label>
                                    <Col sm={9}>
                                        <div className="interests-fieldset">
                                            <div className="checkbox-container">
                                                {allLanguages.map((lang: any, index: any) => (
                                                    <div
                                                        className="box-container"
                                                        key={index}>
                                                        <Form.Check
                                                            type="checkbox"
                                                            label={lang?.name}
                                                            name="interests"
                                                            value={lang?._id}
                                                            onChange={() => _handleLanguageChange(lang)}
                                                            className="mb-2"
                                                            style={{ textTransform: 'capitalize', color: 'black' }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPhoneNumber" className="mb-4">
                                    <Form.Label column sm={3}>School</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            value={profileData?.selectedSchool?.name || ""}
                                            onClick={_openSchoolModal}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPhoneNumber" className="mb-4">
                                    <Form.Label column sm={3}>College</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            value={profileData?.selectedCollege?.university || ""}
                                            onClick={_openCollegeModal}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formAbout" className="mb-4">
                                    <Form.Label column sm={3}>About:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="about"
                                            value={profileData?.about}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="mt-3" onClick={_onSaveChanges}>
                                    Save Changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {openModal?.isOpen &&
                <ListModal
                    payload={openModal}
                    handleContinue={(_cb: any) => {
                        console.log('====================================');
                        console.log(_cb, "_cb_cb_cb_cb_cb_cb");
                        console.log('====================================');
                        if (openModal?.type === "_COLLEGE") {
                            // setSelectedCollege(_cb)
                            setProfileData((prevData: any) => ({ ...prevData, selectedCollege: _cb }))
                        } else {
                            // setSelectedSchool(_cb)
                            setProfileData((prevData: any) => ({ ...prevData, selectedSchool: _cb }))
                        }

                        setOpenModal({
                            isOpen: false,
                            type: null,
                            heading: null,
                            subHeading: null,
                        })
                    }}
                    handleClose={() => {
                        setOpenModal({
                            isOpen: false,
                            type: null,
                            heading: null,
                            subHeading: null,
                        })
                    }}
                />}
        </Container>
    );
};

export default EditProfile;
