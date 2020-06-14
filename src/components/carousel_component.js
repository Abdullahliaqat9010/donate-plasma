import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import styled from 'styled-components'
import bg from '../assets/mobile.svg'
const StyledImage = styled.img`
    background-position : right;
    background-size : cover;
    height:auto;
    width: auto;
`;
const CarouselComponent = () => (
    <Carousel style={{margin:-15,marginBottom:15,color:"black"}} >
        <Carousel.Item style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
            <StyledImage
                src={bg}
                alt="First slide"
            />
            <Carousel.Caption style={{color:"black"}} >
            <h3> slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <StyledImage
                src={bg}
                alt="First slide"
            />
            <Carousel.Caption style={{color:"black"}} >
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
</Carousel>
)

export default CarouselComponent