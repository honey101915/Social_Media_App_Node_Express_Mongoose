import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfile.css'; // Import custom CSS file
import { Header } from '../../components';

const interestsList = [
    'Reading', 'Traveling', 'Cooking', 'Gaming', 'Music',
    'Sports', 'Photography', 'Movies', 'Coding', 'Fitness'
];

const EditProfile = () => {
    // State to manage form fields
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        dob: '1990-01-01',
        age: '34',
        gender: 'Male',
        profession: 'Software Engineer',
        interests: ['Coding'], // Default selected interests
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // Handle checkbox change
    const handleInterestChange = (e) => {
        const { value, checked } = e.target;
        const { interests } = profileData;
        if (checked) {
            setProfileData({ ...profileData, interests: [...interests, value] });
        } else {
            setProfileData({ ...profileData, interests: interests.filter(interest => interest !== value) });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Updated Profile Data:', profileData);
    };

    return (
        <Container fluid className="edit-profile-page">
            <Header title="Edit Profile" />
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="profile-card">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} controlId="formName" className="mb-4">
                                    <Form.Label column sm={3}>Name:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={profileData.name}
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
                                            value={profileData.email}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPhoneNumber" className="mb-4">
                                    <Form.Label column sm={3}>Phone Number:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="number"
                                            name="phoneNumber"
                                            value={profileData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formDob" className="mb-4">
                                    <Form.Label column sm={3}>Date of Birth:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={profileData.dob}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formAge" className="mb-4">
                                    <Form.Label column sm={3}>Age:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="age"
                                            value={profileData.age}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formGender" className="mb-4">
                                    <Form.Label column sm={3}>Gender:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="gender"
                                            value={profileData.gender}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formProfession" className="mb-4">
                                    <Form.Label column sm={3}>Profession:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="profession"
                                            value={profileData.profession}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formInterests" className="mb-4">
                                    <Form.Label column sm={3}>Interests:</Form.Label>
                                    <Col sm={9}>
                                        {interestsList.map((interest, index) => (
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                label={interest}
                                                name="interests"
                                                value={interest}
                                                checked={profileData.interests.includes(interest)}
                                                onChange={handleInterestChange}
                                                className="mb-2"
                                            />
                                        ))}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formAbout" className="mb-4">
                                    <Form.Label column sm={3}>About:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="about"
                                            value={profileData.about}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="mt-3">
                                    Save Changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditProfile;
