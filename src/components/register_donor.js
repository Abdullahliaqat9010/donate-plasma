import React from 'react'
import axios from 'axios'
import CityOption from '../components/city_options'
import BloodGroupOptions from '../components/blood_group_options'
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
    margin-left : 90px;
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

const RegisterDonor = ({phone,fetchProfile})=>{
    const [name,setName] = React.useState("")
    const [age,setAge] = React.useState("")
    const [city,setCity] = React.useState("")
    const [bloodGroup,setBloodGroup] = React.useState("")
    const [loading,setLoading] = React.useState(false)
    
    const submitForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await axios.post('http://localhost:5000/donor',{
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
        <form style={{flex:1,width:300}} onSubmit={submitForm} >
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
                <input disabled value={phone} type="tel" className="form-control" placeholder="Enter your Phone Number" />
            </div>

            <SubmitButton>
            {
                loading ? 
                <Spinner animation="border" />:
                "Submit"
            }
            </SubmitButton>
            <p style={{textAlign:"center",fontSize:10}} >By proceeding you are agreeing to the terms that your number will be available for public</p>
            
        </form>
        </ContainerContent>
        </Container>
    )
}

export default RegisterDonor