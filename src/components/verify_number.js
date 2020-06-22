import React from 'react'
import {Spinner} from 'react-bootstrap'
import logo from '../assets/logo.svg'
import firebase from '../firebase'
import styled from 'styled-components'


const LoginContainer = styled.div`
    height : 550px;
    width : auto;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const LoginContainerContent = styled.div`
    height : 550px;
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
        border : none;
        outline : none;
    }
`;

const StyledInput = styled.input`
    border:${({error})=>{
        if(error){
            return "2px solid red"
        }
        else{
            return "1px solid #e0dede"
        }
    }};
`;

const VerifyNumber = () => {
    const [sendCode,setSendCode] = React.useState(true)
    const [loading,setLoading] = React.useState(false)
    const [code,_setCode] = React.useState("")
    const [phone,_setPhone] = React.useState("")
    const [verfiyCodeEvent,setVerifyCodeEvent] = React.useState(null)
    const [numberError, setNumberError] = React.useState(false)
    const [codeError, setCodeError] = React.useState(false)
    
    const setPhoneNumber = (e) => {
        _setPhone(e.target.value)
    }

    const setOTPCode = (e) => {
        _setCode(e.target.value)
    }

    const sendVerificationCode = async() => {
        try {
            setLoading(true)
            let _phone = phone
            _phone = _phone.substr(1)
            const pk = "+92"
            _phone = pk.concat(_phone)
            
            let recaptcha = window.RecaptchaVerifier
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            const e = await firebase.auth().signInWithPhoneNumber(_phone,recaptcha)
            setVerifyCodeEvent(e)
            setLoading(false)
            setSendCode(false)
            setNumberError(false)
        } catch (error) {
            
            setLoading(false)
            setNumberError(true)
        }
    }

    const verifyCode = async() => {
        try {
            setLoading(true)
            await verfiyCodeEvent.confirm(code)
            setLoading(false)
            setCodeError(false)
        } catch (error) {
            setLoading(false)
            setCodeError(true)
            console.log(error)
        }
    }

    React.useEffect(()=>{
        if(window.RecaptchaVerifier){
            window.RecaptchaVerifier.reset()
        }
        else{
            window.RecaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{size:"invisible"})
        }
        
        return ()=>{
            window.RecaptchaVerifier.reset()
        }
    },[])

    return(
        <LoginContainer>
        <LoginContainerContent>
            <img src={logo} width={100} height={100} alt="Logo"/>
            <LoginHeading>Verify your Phone Number</LoginHeading>
            
            <div style={{width:280,marginTop:40,height:80}}  className="form-group">
                <label style={{fontSize:12,fontWeight:400,color:"#f7464c"}} >Phone Number</label>
                <StyledInput 
                    disabled={!sendCode} 
                    type="tel" 
                    className="form-control" 
                    placeholder="Enter your Phone Number"
                    maxLength={11} 
                    onChange = {setPhoneNumber}
                    error={numberError}
                />
                {numberError && <p style={{fontSize:10,color:"red"}} >Invalid Phone Number, Try Again</p>}
            </div>
            <div style={{width:280,height:80}}  className="form-group">
                <label style={{fontSize:12,fontWeight:400,color:"#f7464c"}} >Code</label>
                <StyledInput
                    disabled={sendCode}  
                    className="form-control" 
                    placeholder="Enter your 6 digit OTP"
                    maxLength={6}
                    onChange={setOTPCode}
                    error={codeError} 
                />
                {codeError && <p style={{fontSize:10,color:"red"}} >Invalid or Expired OTP. Try Again</p>}
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
                <ChangeMobile 
                    onClick={()=>{
                        setSendCode(true)
                        window.RecaptchaVerifier.reset()
                    }} 
                >
                Change mobile number?</ChangeMobile> 
            }
        </LoginContainerContent>    
    </LoginContainer>
    )
}

export default VerifyNumber