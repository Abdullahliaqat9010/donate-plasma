import React from 'react'
import CityOption from '../components/city_options'
import BloodGroupOptions from '../components/blood_group_options'
import styled from 'styled-components';
import axios from 'axios'
import {Spinner} from 'react-bootstrap'
import firebase from '../firebase'

const ChangeMobile = styled.p`
    font-size : 12px;
    border : none;
    outline : none;
    &:hover , &:active {
        color : #f7464c;
        border : none;
        outline : none;
    }
`;
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

const EditButton = styled.button`
    width : 120px; 
    height : 40px;
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

const DeleteButton = styled.button`
    width : 120px; 
    height : 40px;
    /* margin-left : 60px; */
    float : right;
    background-color : red;
    border : none;
    border-radius : 5px;
    color: white;
    margin-top : 10px;
    box-shadow : 0px 2px 5px gray;
    
    &:hover , &:active {
        background-color : white;
        color : red;
        outline : none;
    }
`;

const Msg = styled.p`
    color: ${({error,success})=>{
        if(error){
            return "red"
        }
        else if(success){
            return "#79d70f"
        }
    }};
    font-size : 12px;
    font-weight : bolder;
`;

const EditDeleteDonor = (props) => {
    var {profile,fetchProfile} = props
    const [name,setName] = React.useState(profile.name)
    const [age,setAge] = React.useState(profile.age)
    const [city,setCity] = React.useState(profile.city)
    const [bloodGroup,setBloodGroup] = React.useState(profile.bloodGroup)
    const [editLoading,setEditLoading] = React.useState(false)
    const [deleteLoading,setDeleteLoading] = React.useState(false)
    const [success,setSucess] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [msg,setMsg] = React.useState("")
    
    const EditDonor = async (e) => {
        e.preventDefault()
        setSucess(false)
        setError(false)
        setMsg("")
        setEditLoading(true)
        try {
            await axios.put('https://donate-plasma.herokuapp.com/donor',{
                name,
                age,
                city,
                bloodGroup,
            })
            setEditLoading(false)
            fetchProfile()
            setSucess(true)
            setMsg("Changes are made successfully")
        } catch (error) {
            setEditLoading(false)
            setError(true)
            setMsg("An error occured during updating the profile. Try Again")
        }
    }
    
    const DeleteDonor = async (e) => {
        e.preventDefault()
        setSucess(false)
        setError(false)
        setMsg("")
        setDeleteLoading(true)
        try {
            await axios.delete('https://donate-plasma.herokuapp.com/donor')
            setDeleteLoading(false)
            setSucess(true)
            setMsg("Profile has been deleted successfully")
            props.history.push('/')
        } catch (error) {
            setDeleteLoading(false)
            setError(true)
            setMsg("An error occured while deleting the profile. Try Again")
        }
    }

    return(
        
        <Container>
            <ContainerContent>
            <form style={{flex:1,paddingTop:30,width:260}} onSubmit={EditDonor} >
            <h3 style={{color:"#f7464c"}} >Manage Profile</h3>

            <div style={{paddingTop:20}} className="form-group">
                <label><b>Name</b></label>
                <input 
                    required 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your full name" 
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className="form-group">
                <label><b>Age</b></label>
                <input
                    required 
                    type="number" 
                    className="form-control" 
                    placeholder="Enter your Age" 
                    value={age}
                    min={16}
                    onChange={(e)=>setAge(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label><b>City</b></label>
            <CityOption value={city} required getValueFromCity={(city)=>setCity(city)} />
            </div>
            <div className="form-group">
            <label><b>Blood Group</b></label>
                <BloodGroupOptions value={bloodGroup} required getValueFromBloodGroup={(bloodGroup)=>setBloodGroup(bloodGroup)} />
            </div>
            <div className="form-group">
                <label><b>Phone Number</b></label>
                <input disabled value={profile.phone} type="tel" className="form-control" placeholder="Enter your Phone Number" />
            </div>

            <EditButton type="submit" >
                {
                    editLoading ? 
                    <Spinner animation="border"/>:
                    "Save Changes"
                }
            </EditButton>
            <DeleteButton onClick={DeleteDonor} >
                {
                    deleteLoading ? 
                    <Spinner animation="border"/>:
                    "Delete"
                }
            </DeleteButton>
        </form>
            <Msg success={success} error={error} >{msg}</Msg>
            <ChangeMobile onClick={async()=>await firebase.auth().signOut()} >Change mobile number?</ChangeMobile>   
        </ContainerContent>
        </Container>
    )
}

export default EditDeleteDonor