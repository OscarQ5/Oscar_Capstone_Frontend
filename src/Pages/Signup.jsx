import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap'

const Signup = ({ setUser, setToken }) => {
    const API = import.meta.env.VITE_BASE_URL
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        password_hash: '',
        Number: 0,
        role: ''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`${API}/users`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                if(res.user.user_id){
                    setUser(res.user)
                    setToken(res.token)
                    setFormData((prev) => ({
                        Name: '',
                        email: '',
                        password_hash: '',
                        Number: 0,
                        role: ''
                    }))
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Container style={{ marginTop: "50px" }}>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Primary Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password_hash">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password_hash"
                                value={formData.password_hash}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Number">
                            <Form.Label>Number</Form.Label>
                            <Form.Control
                                type="Number"
                                placeholder="Primary Contact Number"
                                name="Number"
                                value={formData.Number}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Whats your role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;