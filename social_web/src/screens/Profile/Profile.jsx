import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa'; // Import the icon from react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css'; // Import custom CSS file
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';

const Profile = () => {
    const navigate = useNavigate();
    const _moveToEditScreen = () => {
        navigate("/editProfile");
    };

    return (
        <Container fluid className="profile-page">
            <Header title="Profile" />
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="profile-card">
                        <Card.Header className="text-center position-relative">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="profile-img"
                            />
                            <Card.Title className="mt-3">John Doe</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Username: johndoe</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">User Type: Premium</Card.Subtitle>
                            <Button variant="primary" className="edit-button"
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
                                        <Form.Control type="text" value="John Doe" readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formEmail" className="mb-4">
                                    <Form.Label column sm={3}>Email:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="email" value="john.doe@example.com" readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPhone" className="mb-4">
                                    <Form.Label column sm={3}>Phone Number:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value="+1234567890" readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formDob" className="mb-4">
                                    <Form.Label column sm={3}>Date of Birth:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="date" value="1990-01-01" readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formAge" className="mb-4">
                                    <Form.Label column sm={3}>Age:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value="34" readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formGender" className="mb-4">
                                    <Form.Label column sm={3}>Gender:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value="Male" readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formProfession" className="mb-4">
                                    <Form.Label column sm={3}>Profession:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" value="Software Engineer" readOnly />
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
                                        <Form.Control as="textarea" rows={3} value="Lorem ipsum dolor sit amet, consectetur adipiscing elit." readOnly />
                                    </Col>
                                </Form.Group>

                                <Button variant="danger" className="logout-button">Logout</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
