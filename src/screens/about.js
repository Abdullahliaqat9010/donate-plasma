import React from 'react'
import Image from 'react-bootstrap/Image'
import team from '../assets/team.svg'
import styled from 'styled-components'
import logo from '../assets/mobile.svg'
import Jumbotron from 'react-bootstrap/Jumbotron'

const Container = styled.div`
    display:flex;
    flex-direction:${window.innerWidth > 1000 ? "row":"column"};
    align-items:"center";
    justify-content:"center";
`;

const About = ()=>{
    return(
        <div>
            <Container  >
                {
                    window.innerWidth < 1000 ?
                    <Jumbotron style={{backgroundColor : "white",display:"flex",alignItems:"center",justifyContent:"center"}} fluid>
                        <Image width={300} src={logo}  />
                    </Jumbotron>
                    :<Image src={logo} width={250} height={250} />
                }
                <p style={{fontFamily:"Roboto",color:"#716f74",lineHeight:2,wordSpacing:4,padding:40}} > 
                Donate-Plasma is a project intended to serve the 
                community of Pakistan in this deadly crisis of Covid-19. Our mission is to save lives of people
                across the Pakistan by connecting them with a right donor. We are motivated to work hard 
                and reach out to potential donors so that they can support our mission of saving lives 
                by being a part of our campaign. 
                Our network is spreading all across 
                the Pakistan and we are hoping to serve our users in every corner of Pakistan.</p>
            </Container>
            <Container >
                {
                    window.innerWidth > 1000 ?
                    <>
                    <p style={{fontFamily:"Roboto",color:"#716f74",lineHeight:2,wordSpacing:4,padding:40}} > Our team aims to provide clients with the solutions to their IT problems. 
                        Our policy is to understand our customers and give the optimal software services and solutions.
                        We are adept at multiple services and softwares, many of them integrate with each other. 
                        It would be wise to employ softwares which can be integrated together instead singular software
                        modules that do not have a healthy communication. 
                        We strive to give the best of our efforts to our clients and if not, we can redirect them 
                        to a firm that provide the required service.
                    </p>
                    {
                    window.innerWidth < 1000 ?
                    <Jumbotron style={{backgroundColor : "white",display:"flex",alignItems:"center",justifyContent:"center"}} fluid>
                        <Image width={300} src={team}  />
                    </Jumbotron>
                    :<Image src={team} width={250} height={250} />
                    }</> :
                    <>
                    {
                    window.innerWidth < 1000 ?
                    <Jumbotron style={{backgroundColor : "white",display:"flex",alignItems:"center",justifyContent:"center"}} fluid>
                        <Image width={300} src={team}  />
                    </Jumbotron>
                    :<Image src={team} width={250} height={250} />
                    }
                    <p style={{fontFamily:"Roboto",color:"#716f74",lineHeight:2,wordSpacing:4,padding:40}} > Our team aims to provide clients with the solutions to their IT problems. 
                        Our policy is to understand our customers and give the optimal software services and solutions.
                        We are adept at multiple services and softwares, many of them integrate with each other. 
                        It would be wise to employ softwares which can be integrated together instead singular software
                        modules that do not have a healthy communication. 
                        We strive to give the best of our efforts to our clients and if not, we can redirect them 
                        to a firm that provide the required service.
                    </p>
                    </>
                }
            </Container>
        </div>
        
    )
}

export default About