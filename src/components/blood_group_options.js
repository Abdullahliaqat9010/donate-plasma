import React from 'react'
import styled from 'styled-components'

const ResetButton = styled.button`
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
const BloodGroupOptions = ({getValueFromBloodGroup,required,value,reset}) => {
    const [selected,setSelected] = React.useState(value)
    const handleSelected = (selection)=>{
      getValueFromBloodGroup(selection)
        setSelected(selection)
    }
    return(
      <div style={{display:"flex"}} >
        <select value={selected} required={required} className="form-control" onChange={(ref)=>handleSelected(ref.target.value)} >
          <option value="">Select blood group</option>
          <option value="A positive">A positive</option>
          <option value="A negative">A negative</option>
          <option value="B positive">B positive</option>
          <option value="B negative">B negative</option>
          <option value="AB positive">AB positive</option>
          <option value="AB negative">AB negative</option>
          <option value="O positive">O positive</option>
          <option value="O negative">O negative</option>
        </select>
        {
          reset &&
          <ResetButton 
              onClick={()=>{
                  handleSelected("")
              }}
          >Reset</ResetButton>}
      </div>
    )
}

export default BloodGroupOptions