import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'
import signup from './signup';
import logout from './logout'

export default class App extends React.Component {
  onNavigateSignup = () => {
    this.props.history.push('/signup');
  }
  render() {
    return (
      <div className="App">
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
        <div className='container'>
          <header className="App-header">
            <h1>Online Examination Portal</h1>
            <Button onClick={this.onNavigateSignup} variant="outlined" color="primary">
              Register Your Organization
            </Button>
          </header>
        </div>
      </div>
    )
  }

}
