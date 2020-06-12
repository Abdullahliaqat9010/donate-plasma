import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import bg from '../assets/bg.png'

const StyledLink = styled.div`
    color : white;
    margin : 5px 5px;
    border-radius : 5px;
    border : 2px solid #f67777;
    width : 70px;
    text-align : center;
    &:hover {
        color : #f67777;
        background-color : white;
    }; 
`;

const BackgroundImage = styled.div`
    background-image : url(${bg});
    background-size : cover;
    background-repeat: no-repeat;
    height : 350px; 
`;
const NavBar = ()=>{
    return (
        <BackgroundImage>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="transparent">
                <Navbar.Brand href="/">Donate Plasma</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" >
                        <Link style={{textDecoration:"none"}} to="/about" ><StyledLink>About</StyledLink></Link>
                        <Link style={{textDecoration:"none"}} to="/" ><StyledLink>Home</StyledLink></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </BackgroundImage>
    )
}

export default NavBar
