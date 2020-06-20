import React from 'react';
import CityOptions from '../components/city_options'
import BloodGroupOptions from '../components/blood_group_options';
import axios from 'axios'
import Loading from '../components/loading';

// const people = [
//     {key : '123', Name: 'Elson Correia', info: {age: 24, bloodGroup : 'A positive', city : 'Lahore'}},
//     {key : '124', Name: 'John Doe', info: {age: 18, bloodGroup : 'A positive', city : 'Lahore'}},
//     {key : '125', Name: 'Jane Doe', info: {age: 34, bloodGroup : 'A positive', city : 'Lahore'}},
//     {key : '126', Name: 'Maria Carvalho', info: {age: 22, bloodGroup : 'A positive', city : 'Lahore'}},
//     {key : '127', Name: 'Kelly Correia', info:{age: 23, bloodGroup : 'A positive', city : 'Lahore'}},
//     {key : '128', Name: 'Don Quichote', info: {age: 39, bloodGroup : 'A positive', city : 'Lahore'}},
//     {key : '129', Name: 'Marcus Correia', info: {age: 20, bloodGroup : 'A positive', city : 'Lahore'}},
//     {key : '130', Name: 'Bruno Gonzales', info: {age: 25, bloodGroup : 'A positive', city : 'Lahore'}},
//     {key : '131', Name: 'Alonzo Correia', info: {age: 44, bloodGroup : 'A positive', city : 'Lahore'}}
//   ]
 
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
    const res = await axios.get('http://localhost:5000/donors',{
      params : {
        city : city,
        bloodGroup : bloodGroup
      }
    })
    const donors = res.data
    setSearchResults(donors)
    setLoading(false)
  }

  // const contactDonor = async (uid)=>{
  //   const res = await axios.get('http://localhost:5000/contactDonor',{
  //     params:{
  //       uid
  //     }
  //   })
  //   const phone = res.data.phone
  //   console.log(phone)
  // }

  React.useEffect(()=>{
    fetchDonors()
  },[])

  return(
    <div className="scrollbar scrollbar-primary">
      <p style = {{fontWeight : 'bold'}}>Please Select Your City and blood group to search a Donor</p>
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
                <button type="button" className="btn btn-success btn-sm float-right">Contact</button>
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
          <div style={{height:400,display:"flex",alignItems: "center", justifyContent:"center"}} ><p style={{fontSize:20,fontWeight:"bold"}}>No Result</p></div> :
          <div style={{height:40*(10-searchResults.length)}} /> 
        )
      }
    </div>
  )
}

export default FindDonor