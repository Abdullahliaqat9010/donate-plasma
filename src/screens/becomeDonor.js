import React from 'react'
import axios from 'axios'
// import styled from 'styled-components'
import firebase from '../firebase'
import VerifyNumber from '../components/verify_number'
import RegisterDonor from '../components/register_donor'
import EditDeleteDonor from '../components/edit_delete_donor'
import Loading from '../components/loading'

// const StyledAlert = styled.div`
//     padding : 10px;
//     border-radius : 5px;
//     background-color : ${(props)=>
//         props.msgType === "success" ?
//         "green"
//         :
//         "red"
//     };
//     color: white;
//     position : absolute;
//     bottom : 50px;
//     display : ${({show})=>show?"block":"none"};
// `;


const BecomeDonor = (props)=> {
    
    const [phone,setPhone] = React.useState("")
    const [loggedIn,setLoggedIn] = React.useState(false)
    const [profileExists, setProfileExists] = React.useState(false)
    const [profile,setProfile] = React.useState(null)
    const [loading,setLoading] = React.useState(true)
    
    const fetchProfileHandler = async()=>{
        await fetchProfile()
    }
    const fetchProfile = () => {
        return new Promise(async(res,rej)=>{
            const response = await axios.get('https://donate-plasma.herokuapp.com/profile')
            const _profile = response.data
            console.log(_profile)
            if(_profile.length > 0){
                setProfile(_profile[0])
                setProfileExists(true)
            }
            res()
        })
    }

    React.useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user)=>{
            if(user){
                //console.log(user.uid)
                axios.defaults.headers.common['Authorization'] = "Bearer "+await user.getIdToken()
                setPhone(user.phoneNumber)
                await fetchProfile()
                //await firebase.auth().signOut()
                setLoggedIn(true)
            }
            else{
                setLoggedIn(false)
            }
            setLoading(false)
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
            loggedIn ?
                profileExists ? 
                    <EditDeleteDonor {...props} profile={profile} fetchProfile={fetchProfileHandler} />:
                    <RegisterDonor phone={phone} fetchProfile={fetchProfileHandler} />        
            :
            <VerifyNumber/>
            }
        </React.Fragment>
    )
}

export default BecomeDonor