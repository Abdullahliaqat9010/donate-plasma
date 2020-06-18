import React from 'react';
import CityOptions from '../components/city_options'
import BloodGroupOptions from '../components/blood_group_options';
import axios from 'axios'

const people = [
    {key : '123', firstName: 'Elson', lastName: 'Correia', info: {age: 24, bloodGroup : 'A positive'}},
    {key : '124',firstName: 'John', lastName: 'Doe', info: {age: 18, bloodGroup : 'A positive'}},
    {key : '125', firstName: 'Jane', lastName: 'Doe', info: {age: 34, bloodGroup : 'A positive'}},
    {key : '126', firstName: 'Maria', lastName: 'Carvalho', info: {age: 22, bloodGroup : 'A positive'}},
    {key : '127', firstName: 'Kelly', lastName: 'Correia', info:{age: 23, bloodGroup : 'A positive'}},
    {key : '128', firstName: 'Don', lastName: 'Quichote', info: {age: 39, bloodGroup : 'A positive'}},
    {key : '129', firstName: 'Marcus', lastName: 'Correia', info: {age: 20, bloodGroup : 'A positive'}},
    {key : '130', firstName: 'Bruno', lastName: 'Gonzales', info: {age: 25, bloodGroup : 'A positive'}},
    {key : '131', firstName: 'Alonzo', lastName: 'Correia', info: {age: 44, bloodGroup : 'A positive'}}
  ]
 
  
  
const FindDonor = ()=>{
  const [city,changeCity] = React.useState("")
  const [bloodGroup,changeBloodGroup] = React.useState("")
  const [searchResults,setSearchResults] = React.useState([])
  const getValueFromCity = (_city) =>{
    changeCity(_city)
  }
  const getValueFromBloodGroup = (_bloodGroup) =>{
    changeBloodGroup(_bloodGroup)
  }
  const fetchDonors = async() => {
    const res = await axios.get('http://localhost:5000',{
      params : {
        city : city,
        bloodGroup : bloodGroup
      }
    })
    console.log(res.data)
  }
  React.useEffect(()=>{
    fetchDonors()
    setSearchResults(people)
  },[])
  return(
    <div className="scrollbar scrollbar-primary">
      <p style = {{fontWeight : 'bold'}}>Please Select Your City and blood group to search a donor</p>
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <CityOptions getValueFromCity={getValueFromCity} />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <BloodGroupOptions getValueFromBloodGroup={getValueFromBloodGroup} />
          </div>
        </div>
      </div>
      <div>
        <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={()=>fetchDonors()}>Search</button>
      </div>
      <div>
        <ul className = 'list group' style={{marginLeft:-40,marginTop:20}} >
          {searchResults.map((person) => {
              return(
                <li className="list-group-item list-group-item-light" key={person.key}>
                <div className="row">
                <div className = "col-sm" style={{textAlign:"center"}}>
                <b>Name: </b>
                <span>{person.firstName} {person.lastName} </span>
                </div>
                <div className = "col-sm" style={{textAlign:"center"}}>
                <b> Age: </b>
                <span>{person.info.age} </span> 
                </div>
                <div className = "col-sm" style={{textAlign:"center"}}>
                <b>Blood Group: </b>
                <span>{person.info.bloodGroup}</span>
                </div>
                <div className = "col-sm" style={{textAlign:"center"}}>
                <b>City: </b>
                <span>Lahore </span>
                </div>
                <div className = "col-sm">
                <button type="button" className="btn btn-success btn-sm float-right">Contact</button>
                </div>
                </div>
                </li>
              )
          })}
        </ul>
      </div>
      {
        searchResults.length < 10 &&
        (
          searchResults.length === 0 ?
          <div style={{height:400,display:"flex",alignItems: "center", justifyContent:"center"}} ><p style={{fontSize:20,fontWeight:"bold"}}>No Result</p></div> :
          <div style={{height:40*(10-searchResults.length)}} /> 
        )
      }
    </div>
  )
}

export default FindDonor