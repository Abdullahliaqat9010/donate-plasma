import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import mobile_cover from '../assets/mobile.svg'
import desktop_cover from '../assets/desktop.svg'

const StyledJumbotron = () => (
    <Jumbotron style={{backgroundColor : "white", margin:-15,display:"flex",alignItems:"center",justifyContent:"center"}} fluid>
        <Image src={window.innerWidth > 500 ? desktop_cover : mobile_cover} fluid />
    </Jumbotron>
)

export default StyledJumbotron