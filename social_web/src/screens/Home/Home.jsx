import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Header } from '../../components';

const posts = [
    {
        id: 1,
        username: 'johndoe',
        userImage: 'https://via.placeholder.com/50',
        postImage: 'https://wallpapers.com/images/featured/new-york-city-5oaa14h4mw6w3o71.jpg',
        caption: 'Enjoying the beautiful sunset!',
    },
    {
        id: 2,
        username: 'janedoe',
        userImage: 'https://via.placeholder.com/50',
        postImage: 'https://wallpapers.com/images/featured/new-york-city-5oaa14h4mw6w3o71.jpg',
        caption: 'Great time hiking with friends.',
    },
    // Add more posts as needed
];

const Home = () => {
    return (
        <Container fluid className="home-page">
            <Header title={"Home"} />
            <Row className="justify-content-center">
                <Col md={6}>
                    {posts.map(post => (
                        <Card key={post.id} className="mb-4">
                            <Card.Header className="d-flex align-items-center">
                                <img
                                    src={post.userImage}
                                    alt={post.username}
                                    className="rounded-circle me-3"
                                    width="10"
                                    height="10"
                                />
                                <h5 className="mb-0">{post.username}</h5>
                            </Card.Header>
                            <Card.Img variant="top" src={post.postImage} />
                            <Card.Body>
                                <Card.Text>{post.caption}</Card.Text>
                                <div className="post-actions d-flex justify-content-between mt-3">
                                    <div>
                                        <Button variant="link" className="p-0 me-3">
                                            <FaHeart size={24} />
                                        </Button>
                                        <Button variant="link" className="p-0 me-3">
                                            <FaComment size={24} />
                                        </Button>
                                        <Button variant="link" className="p-0">
                                            <FaShare size={24} />
                                        </Button>
                                    </div>
                                    <Button variant="link" className="p-0">
                                        <FaBookmark size={24} />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
