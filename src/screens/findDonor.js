import React from 'react';
import CityOptions from '../components/city_options'
import BloodGroupOptions from '../components/blood_group_options';
import axios from 'axios'
import Loading from '../components/loading';
import {Link} from 'react-router-dom'
 
const FindDonor = ()=>{
  const [city,changeCity] = React.useState("")
  const [bloodGroup,changeBloodGroup] = React.useState("")
  const [searchResults,setSearchResults] = React.useState([])
  const [loading,setLoading] = React.useState(true)
  const getValueFromCity = (_city) =>{
    changeCity(_city)
  }
  const getValueFromBloodGroup = (_bloodGroup) =>{
    changeBloodGroup(_bloodGroup)
  }
  const fetchDonors = async() => {
    searchResults.length = 0
    setLoading(true)
    const res = await axios.get('https://donate-plasma.herokuapp.com/donors',{
      params : {
        city : city,
        bloodGroup : bloodGroup
      }
    })
    const donors = res.data
    setSearchResults(donors)
    setLoading(false)
  }


  React.useEffect(()=>{
    fetchDonors()
  },[])

  return(
    <div className="scrollbar scrollbar-primary">
      <p style = {{fontWeight : 'bold'}}>Please Select Your City and Blood Group to Search a Donor</p>
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <CityOptions reset getValueFromCity={getValueFromCity} />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <BloodGroupOptions reset getValueFromBloodGroup={getValueFromBloodGroup} />
          </div>
        </div>
      </div>
      <div>
        <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={fetchDonors}>Search</button>
      </div>
      {
        loading ?
        <Loading/>
        :
        <div>
        <ul className = 'list group' style={{marginLeft:-40,marginTop:20}} >
          {searchResults.map((person) => {
              return(
                <li className="list-group-item list-group-item-light" key={person.uid}>
                <div className="row">
                <div className = "col-sm" style={{textAlign:"center"}}>
                <b>Name: </b>
                <span>{person.name} </span>
                </div>
                <div className = "col-sm" style={{textAlign:"center"}}>
                <b> Age: </b>
                <span>{person.age} </span> 
                </div>
                <div className = "col-sm" style={{textAlign:"center"}}>
                <b>Blood Group: </b>
                <span>{person.bloodGroup}</span>
                </div>
                <div className = "col-sm" style={{textAlign:"center"}}>
                <b>City: </b>
                <span>{person.city} </span>
                </div>
                <div className = "col-sm">
                <Link to={`/contactDonor/${person.uid}`} ><button className="btn btn-success btn-sm float-right">Contact</button></Link>
                </div>
                </div>
                </li>
              )
          })}
        </ul>
      </div>
      }
      {
        searchResults.length < 10 && !loading &&
        (
          searchResults.length === 0 ?
          <div style={{height:400,display:"flex",alignItems: "center", justifyContent:"center",textAlign:"center"}} ><p style={{fontSize:20,fontWeight:"bold"}}>Sorry we could 
          not find a donor in this area. Try searching for nearby areas. </p></div> :
          <div style={{height:40*(10-searchResults.length)}} /> 
        )
      }
    </div>
  )
}

export default FindDonor