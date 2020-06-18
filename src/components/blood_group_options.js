import React from 'react'

const BloodGroupOptions = ({getValueFromBloodGroup}) => (
    <select className="form-control" onChange={(ref)=>getValueFromBloodGroup(ref.target.value)} >
        <option value="" hidden>Select blood group</option>
        <option value="A positive">A positive</option>
        <option value="A negative">A negative</option>
        <option value="B positive">B positive</option>
        <option value="B negative">B negative</option>
        <option value="AB positive">AB positive</option>
        <option value="AB negative">AB negative</option>
        <option value="O positive">O positive</option>
        <option value="O negative">O negative</option>
  </select>
)

export default BloodGroupOptions