import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
    display : flex;
    /* flex-direction : column; */
    /* flex : 1; */
    height : 80px;
    width : auto;
    background-color : #f7464c;
    justify-content : center;
    align-items : center;
    text-align : center;
    color: #fff;
    margin-top : 20px;
    padding-top : 20px;
`;

const Footer = ()=>{
    return(
        <FooterContainer>
            <p >Copyright &copy; 2020 Donate Plasma | Powered by SABZarts</p>
        </FooterContainer>
    )
}

export default Footer