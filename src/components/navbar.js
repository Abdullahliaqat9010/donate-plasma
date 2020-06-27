import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.svg'

const StyledLink = styled.div`
    color : black;
    font-size : 17px;
    display : flex;
    align-items: center;
    justify-content : center;
    width: 120px;
    height : 40px;
    border-radius : 5px; 
    margin-left : 10px;
    
        
    &:hover {
        color : white;
        background-color : #f7464c;
        border : none;
    };
    @media (max-width:1000px) {
        margin-top : 10px;
        margin-bottom : 10px;
        margin-left : 0px;
        padding: 10px;
        border : 1px solid #ccc;
    }  
`;

const Logo = styled.img`
    
    width: 50px;
    height: 50px;
    alt : "logo";
    margin-right : 10px;
    content : url(${logo});

    @media (min-width:1000px) {
        width: 100px;
        height: 100px;
        margin-right : 10px;
    }  
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
    
    font-weight:bold;
    font-size:20px;
    @media (min-width:1000px) {
        font-size:30px;
    }
`;

const Divider = styled.hr`
    margin-top : -5px;
    border-top: 1px solid #ccc;
`;

const NavBar = ()=>{
    const [expanded,setExpanded] = React.useState(false)
    return (
        <React.Fragment>    
            <Navbar onToggle={()=>setExpanded(!expanded)} expanded={expanded} expand="lg" variant="light">
                <Container>
                    <StyledNavbarBrand style={{color:"#f7464c"}} href="/"><Logo />Donate Plasma</StyledNavbarBrand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto pr-5" >
                            <Link style={{textDecoration:"none"}} to="/" ><StyledLink onClick={()=>setExpanded(false)}>Home</StyledLink></Link>
                            <Link style={{textDecoration:"none"}} to="/becomeDonor" ><StyledLink onClick={()=>setExpanded(false)} >Donate Now</StyledLink></Link>
                            <Link style={{textDecoration:"none"}} to="/findDonor" ><StyledLink onClick={()=>setExpanded(false)} >Find Donor</StyledLink></Link>
                            <Link style={{textDecoration:"none"}} to="/about" ><StyledLink onClick={()=>setExpanded(false)} >About Us</StyledLink></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Divider/>
        </React.Fragment>
    )
}

export default NavBar
