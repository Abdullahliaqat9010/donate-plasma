import React from 'react'
import axios from 'axios'
import CityOption from '../components/city_options'
import BloodGroupOptions from '../components/blood_group_options'
import styled from 'styled-components'
import {Spinner} from 'react-bootstrap'
import firebase from '../firebase'

const Container = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:center;
    height:650px;
    width:auto;
`;

const ContainerContent = styled.div`
    width:350px;
    height:650px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    padding-top:50;
    flex-direction:column;
    background-color : white;
    border-radius : 5px;
    box-shadow : 0px 2px 5px grey;
`;

const SubmitButton = styled.button`
    width : 120px; 
    height : 50px;
    /* margin-left : 60px; */
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

const ChangeNumber = styled.button`
    background-color:white;
    color: #f7464c;
    border-radius:5px;
    border:solid #f7464c 1px;
    outline:none;
    margin-left:5px;
    &:hover,:active{
        border:none;
        color: white;
        background-color:#f7464c;
        outline:none;
    }
`;

const RegisterDonor = ({phone,fetchProfile})=>{
    const [name,setName] = React.useState("")
    const [age,setAge] = React.useState("")
    const [city,setCity] = React.useState("")
    const [bloodGroup,setBloodGroup] = React.useState("")
    const [loading,setLoading] = React.useState(false)
    
    const submitForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post('https://donate-plasma.herokuapp.com/donor',{
            name,
            age,
            city,
            bloodGroup,
            phone
        })
        //console.log(res.data)
        setLoading(false)
        fetchProfile()
        //props.history.push('/')
    } 
    // React.useEffect(()=>{
    //     console.log(phone)
    // },[])
    return(
        <Container >
        <ContainerContent >
        <form style={{flex:1,width:260,paddingTop:30}} onSubmit={submitForm} >
            <h3 style={{color:"#f7464c"}} >Registration</h3>

            <div style={{marginTop:30}} className="form-group">
                <label><b>Name</b></label>
                <input 
                    required 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your full name" 
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label><b>Age</b></label>
                <input
                    required 
                    type="number" 
                    className="form-control" 
                    placeholder="Enter your Age"
                    min={16} 
                    onChange={(e)=>setAge(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label><b>City</b></label>
            <CityOption required getValueFromCity={(city)=>setCity(city)} />
            </div>
            <div className="form-group">
            <label><b>Blood Group</b></label>
                <BloodGroupOptions required getValueFromBloodGroup={(bloodGroup)=>setBloodGroup(bloodGroup)} />
            </div>
            <div className="form-group">
                <label><b>Phone Number</b></label>
                <div style={{display:"flex"}} >
                    <input disabled value={phone} type="tel" className="form-control" placeholder="Enter your Phone Number" />
                    <ChangeNumber onClick={async()=>await firebase.auth().signOut()} >Change</ChangeNumber>
                </div>
            </div>

            <div style={{display:"flex",justifyContent:"center",width:"auto"}} >
                <SubmitButton>
                {
                    loading ? 
                    <Spinner animation="border" />:
                    "Submit"
                }
                </SubmitButton>
            </div>
            <p style={{textAlign:"center",fontSize:10,marginTop:15}} >By proceeding you are agreeing to the terms that your information including your contact number will be publically available and you will provide <b>free donation.</b></p>
            
        </form>
        </ContainerContent>
        </Container>
    )
}

export default RegisterDonor