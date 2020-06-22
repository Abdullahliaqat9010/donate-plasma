import React from 'react'
import firebase from '../firebase'
import VerifyNumber from '../components/verify_number'
import axios from 'axios'
import Loading from '../components/loading'
import styled from 'styled-components'
import logo from '../assets/logo.svg'

const Container = styled.div`
    height : 400px;
    width : auto;
    display : flex;
    align-items : center;
    justify-content : center;
    margin-bottom : 80px;
    margin-top : 50px;
`;

const ContainerContent = styled.div`
    height : 400px;
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

const Heading = styled.p`
    font-size : 20px;
    font-weight : 300;
    color: #f7464c;
    margin-top : 10px;
`;

const ContactDonor = (props) => {
    const [isLoggedIn, setLoggedIn] = React.useState(false)
    const [profile,setProfile] = React.useState(null)
    const [loading,setLoading] = React.useState(true)
    
    const fetchDonor = async()=>{
        const {uid} = props.match.params
        const res = await axios.get('https://donate-plasma.herokuapp.com/donor',{
            params:{uid}  
        })
        setProfile({...res.data})
        console.log(res.data)
        setLoading(false)
        console.log(profile)
    }

    React.useEffect(()=>{
        let unsubscribe = firebase.auth().onAuthStateChanged(async(user)=>{
            if(user){
                axios.defaults.headers.common['Authorization'] = "Bearer "+await user.getIdToken()
                setLoggedIn(true)
                fetchDonor()
                //setLoading(false)
            }
            else{
                setLoggedIn(false)
                setLoading(false)
            }
        })

        return ()=>{
            unsubscribe()
        }
    },[])
    
    if(loading){
        return(
            <Loading/>
        )
    }
    else
    return(
        <React.Fragment>
            {
                isLoggedIn && profile ?
                <Container>
                    <ContainerContent>
                        <img src={logo} width={100} height={100} alt="Logo"/>
                        <Heading>Donor Details</Heading>
                        <div style={{display:"flex", flexDirection:"column",width:250,paddingTop:10}} >
                            <p><b>Name :</b> {` ${profile.name}`} </p>
                            <p><b>Age :</b> {` ${profile.age}`} </p>
                            <p><b>City :</b> {` ${profile.city}`} </p>
                            <p><b>Blood Group :</b> {` ${profile.bloodGroup}`} </p>
                            <p><b>Phone :</b> {` ${profile.phone}`} </p>
                            {/* <div style={{display:"flex",flexDirection:"row"}} >
                                <p><b>Phone :</b> {` ${profile.phone}`} </p>
                                <p>Copy</p>
                            </div> */}
                        </div>
                    </ContainerContent>
                </Container> 
                :
                <VerifyNumber/> 
            }
        </React.Fragment>
    )
}

export default ContactDonor