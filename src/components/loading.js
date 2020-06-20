import React from 'react'
import styled from 'styled-components'
import {Spinner} from 'react-bootstrap'

const Container = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:center;
    height:600px;
    width:auto;
`;

const ContainerContent = styled.div`
    width:350px;
    height:600px;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const Loading = ()=>(
    <Container>
        <ContainerContent>
            <Spinner animation="grow" style={{color:"#f7464c"}} />
        </ContainerContent>
    </Container>
)

export default Loading