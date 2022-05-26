import React from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap'
// import { Container } from 'react-bootstrap'
import Axios from 'axios';
import dashboard from './dashboard'
import Cookies from 'js-cookie';
// import Alert from 'react-popup-alert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class admin extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            passwd: '',
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (/^([\w\d](\.)*)+\@([\w\.]{1,2})+(\w)$/.test(this.state.email)) {
            if ((this.state.passwd.length > 5)) {
                let admin_users = {
                    email: this.state.email,
                    passwd: this.state.passwd
                };
                Axios.post('http://localhost:5000/signin', { admin_users })
                    .then(res => {
                        if (res.data.role !== "super") {
                            toast.error("You are NOT ADMIN");
                        }
                        else {
                            toast(res.data.statusMessage);
                            // Cookies.set(this.state.email, this.state.passwd, {expires: 1});
                            this.props.history.push('./dashboard')
                            this.state = {
                                email: '',
                                passwd: ''
                            };
                            Array.from(document.querySelectorAll("input")).forEach(
                                input => (input.value = '')
                            );
                        }


                    })
                    .catch((err) => {
                        toast.error(err.response.data.error);
                    });
            }
            else {
                toast.error("Minimum Password Length Is 6");
            }
        }
        else {
            toast.error("Enter Proper Mail ID");
        }
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
                <Navbar style={{ backgroundColor: '#f09941' }}>
                    <Container>
                        <Navbar.Brand href="/signup" style={{ color: '#233c7b', fontSize: 35, fontWeight: 500 }}>Invigilator</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" style={{ color: '#233c7b', fontSize: 25, fontWeight: 500, marginLeft: '20', marginTop: 8 }}>
                                <Nav.Link href="/admin">Admin</Nav.Link>
                                <Nav.Link href="/signup">User</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <ToastContainer/>
                <div className='container'>

                    <Container style={{ marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
                        <Form onSubmit={this.handleSubmit} style={{ width: '40%' }} >
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password"
                                    name="passwd"
                                    value={this.state.passwd}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type="submit" color="primary" style={{ width: '50%' }} >Login</Button>
                            </div>

                        </Form>
                    </Container>
                </div>
            </div>
        )
    }
}