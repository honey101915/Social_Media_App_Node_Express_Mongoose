import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import { _hitLogoutApi } from '../../redux/reduxActions/authActions';
import { useSelector } from 'react-redux';
// import { Header } from '../../components';

const Profile = () => {

    const userData = useSelector((state) => state?.authReducers?.userData || {})
    console.log(userData, "userDatauserDatauserData");

    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const _moveToEditScreen = () => {
        navigate("/editProfile");
    };

    const handleLogout = () => {
        _hitLogoutApi()
        console.log('Logged out');
        navigate('/login');
    };

    const toggleLogoutModal = () => {
        setShowLogoutModal(!showLogoutModal);
    };

    return (
        <Container fluid className="profile-page">
            <Header title={"Profile"} />
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="profile-card">
                        <Card.Header className="text-center position-relative">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="profile-img"
                            />
                            <Card.Title className="mt-3">{userData?.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Username: {userData?.userName}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">User Type: {userData?.userType}</Card.Subtitle>
                            <Button
                                variant="primary"
                                className="edit-button"
                                onClick={_moveToEditScreen}
                            >
                                <FaEdit /> Edit Profile
                            </Button>
                        </Card.Header>
                        <Card.Body className="profile-details">
                            <Form>
                                <Form.Group as={Row} controlId="formName" className="mb-4">
                                    <Form.Label column sm={3}>Name:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value={userData?.name} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formEmail" className="mb-4">
                                    <Form.Label column sm={3}>Email:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="email" value={userData?.email} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPhone" className="mb-4">
                                    <Form.Label column sm={3}>Phone Number:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value={userData?.phoneNumber} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formDob" className="mb-4">
                                    <Form.Label column sm={3}>Date of Birth:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="date" value={userData?.dob} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formAge" className="mb-4">
                                    <Form.Label column sm={3}>Age:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value={userData?.age} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formGender" className="mb-4">
                                    <Form.Label column sm={3}>Gender:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value={userData?.gender} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formProfession" className="mb-4">
                                    <Form.Label column sm={3}>Profession:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value={userData?.profession} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formInterests" className="mb-4">
                                    <Form.Label column sm={3}>Interests:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value="Coding, Reading, Traveling" readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formAbout" className="mb-4">
                                    <Form.Label column sm={3}>About:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control as="textarea" rows={3} value={userData?.about} readOnly />
                                    </Col>
                                </Form.Group>

                                <Button
                                    variant="danger"
                                    className="logout-button"
                                    onClick={toggleLogoutModal}
                                >
                                    Logout
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={toggleLogoutModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to logout?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleLogoutModal}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Yes, Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Profile;
