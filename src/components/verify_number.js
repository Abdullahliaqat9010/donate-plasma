import React from 'react'
import {Spinner} from 'react-bootstrap'
import logo from '../assets/logo.svg'
import firebase from '../firebase'
import styled from 'styled-components'


const LoginContainer = styled.div`
    height : 500px;
    width : auto;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const LoginContainerContent = styled.div`
    height : 500px;
    width : 350px;
    background-color : white;
    border-radius : 5px;
    box-shadow : 0px 2px 5px grey;
    display : flex;
    align-items : center;
    justify-content : flex-start;
    flex-direction : column;
    padding-top : 20px;
`;

const LoginHeading = styled.p`
    font-size : 20px;
    font-weight : 300;
    color: #f7464c;
    margin-top : 10px;
`;

const LoginBtn = styled.button`
    width : 100px; 
    height : 50px;
    /* padding : 10px; */
    background-color : #f7464c;
    border : none;
    border-radius : 5px;
    color: white;
    margin-top : 10px;
    box-shadow : 0px 2px 5px gray;
    
    &:hover , &:active {
        background-color : white;
        color : #f7464c;
        outline : none;
    }
`;

const ChangeMobile = styled.button`
    padding-top : 10px;
    font-size : 12px;
    background-color : transparent;
    border : none;
    outline : none;
    &:hover , &:active {
        color : #f7464c;
    }
`;

const VerifyNumber = () => {
    const [sendCode,setSendCode] = React.useState(true)
    const [loading,setLoading] = React.useState(false)
    const [code,_setCode] = React.useState("")
    const [phone,_setPhone] = React.useState("")
    const [verfiyCodeEvent,setVerifyCodeEvent] = React.useState(null)
    
    const setPhoneNumber = (e) => {
        _setPhone(e.target.value)
    }

    const setOTPCode = (e) => {
        _setCode(e.target.value)
    }

    const sendVerificationCode = async() => {
        setLoading(true)
        let _phone = phone
        _phone = _phone.substr(1)
        const pk = "+92"
        _phone = pk.concat(_phone)
        let recaptcha =  new firebase.auth.RecaptchaVerifier('recaptcha-container',{size:"invisible"})
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        const e = await firebase.auth().signInWithPhoneNumber(_phone,recaptcha)
        setVerifyCodeEvent(e)
        setLoading(false)
        setSendCode(false)
    }

    const verifyCode = () => {
        setLoading(true)
        verfiyCodeEvent.confirm(code)
    }

    return(
        <LoginContainer>
        <LoginContainerContent>
            <img src={logo} width={100} height={100} alt="Logo"/>
            <LoginHeading>Verify your Phone Number</LoginHeading>
            <div style={{width:280,marginTop:40}}  className="form-group">
                <label style={{fontSize:12,fontWeight:400,color:"#f7464c"}} >Phone Number</label>
                <input 
                    disabled={!sendCode} 
                    type="tel" 
                    className="form-control" 
                    placeholder="Enter your Phone Number"
                    maxLength={11} 
                    onChange = {setPhoneNumber}
                />
            </div>
            <div style={{width:280}}  className="form-group">
                <label style={{fontSize:12,fontWeight:400,color:"#f7464c"}} >Code</label>
                <input
                    disabled={sendCode}  
                    className="form-control" 
                    placeholder="Enter your 6 digit OTP"
                    maxLength={6}
                    onChange={setOTPCode} 
                />
            </div>
            {
                sendCode ? 
                <LoginBtn disabled={loading} onClick={sendVerificationCode} >
                {
                    loading ?
                    <Spinner animation="border"/>:
                    `Send Code`
                }
                </LoginBtn>:
                <LoginBtn disabled={loading} onClick={verifyCode} >
                {
                    loading ?
                    <Spinner animation="border"/>:
                    `Verify`
                }
                </LoginBtn>
            }
            {
                !sendCode && 
                <ChangeMobile onClick={()=>setSendCode(false)} >Change mobile number?</ChangeMobile> 
            }
        </LoginContainerContent>    
    </LoginContainer>
    )
}

export default VerifyNumber