import React from 'react'
import StyledJumbotron from '../components/jumbutron'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const BtnContainer = styled.div`
    display : flex;
    flex-direction : row;
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
    &:active,&:hover{
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
            <BtnContainer  >
                <Link to="/becomeDonor" ><StlyedBtn >Donate Now</StlyedBtn></Link>
                <Link to="/findDonor" ><StlyedBtn >Find Donor</StlyedBtn></Link>
            </BtnContainer>
        </React.Fragment>
    )
}
export default Home