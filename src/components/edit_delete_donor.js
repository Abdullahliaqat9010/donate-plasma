import React from 'react'
import CityOption from '../components/city_options'
import BloodGroupOptions from '../components/blood_group_options'
import styled from 'styled-components';
import axios from 'axios'
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

const EditButton = styled.button`
    width : 120px; 
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

const DeleteButton = styled.button`
    width : 120px; 
    height : 50px;
    margin-left : 60px;
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

const EditDeleteDonor = (props) => {
    var {profile,fetchProfile} = props
    const [name,setName] = React.useState(profile.name)
    const [age,setAge] = React.useState(profile.age)
    const [city,setCity] = React.useState(profile.city)
    const [bloodGroup,setBloodGroup] = React.useState(profile.bloodGroup)
    const [editLoading,setEditLoading] = React.useState(false)
    const [deleteLoading,setDeleteLoading] = React.useState(false)
    
    const EditDonor = async (e) => {
        e.preventDefault()
        setEditLoading(true)
        const res = await axios.put('http://localhost:5000/donor',{
            name,
            age,
            city,
            bloodGroup,
        })
        setEditLoading(false)
        console.log(res.data)
        fetchProfile()
        //props.history.push('/')
    }
    
    const DeleteDonor = async (e) => {
        e.preventDefault()
        setDeleteLoading(true)
        const res = await axios.delete('http://localhost:5000/donor')
        setDeleteLoading(false)
        console.log(res.data)
        //fetchProfile()
        props.history.push('/')
    }

    return(
        
        <Container>
            <ContainerContent>
            <form style={{flex:1,paddingTop:30,width:300}} onSubmit={EditDonor} >
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

            <EditButton onClick={EditDonor} type="submit" >
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
        </ContainerContent>
        </Container>
    )
}

export default EditDeleteDonor