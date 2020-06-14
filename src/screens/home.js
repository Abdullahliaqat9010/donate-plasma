import React from 'react'
//import BecomeDonorSection from '../components/become_donor_section'
//import FindDonorSection from '../components/find_donor_section'
//import CarouselComponent from '../components/carousel_component'
import StyledJumbotron from '../components/jumbutron'
//import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const BtnContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`;

const StlyedBtn = styled.button`
    height: 50px;
    margin : 10px;
    width : 150px;
    border : none;
    border-radius : 10px;
    box-shadow : 0px 5px 10px #ccc;
    background-color : #f7464c;
    color : white;
    &:active{
        background-color : white;
        color : #f7464c;
    }
    &:focus{
        outline : none;
    }
`;

const CaptionContainer = styled.div`
    text-align : center;
    font-weight : 600;
`;

const Caption = styled.p`

`;

const Home = ()=>{
    return(
        <React.Fragment>
            <CaptionContainer className="d-lg-none" >
                <Caption>"IF ANYONE SAVED A LIFE IT WOULD BE AS IF HE SAVED THE LIFE OF THE WHOLE HUMANITY"<br/> QURAN 5:32</Caption>
            </CaptionContainer>
            <StyledJumbotron />
            <BtnContainer className="d-lg-none" >
                <StlyedBtn >Donate Now</StlyedBtn>
                <StlyedBtn >Find Donor</StlyedBtn>
            </BtnContainer>
        </React.Fragment>
    )
}
export default Home