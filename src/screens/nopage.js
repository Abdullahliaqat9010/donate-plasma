import React from 'react'
import Image from 'react-bootstrap/Image'
import page404 from '../assets/404.svg'

const NoPage = ()=> {
    return(
        <div style={{display:"flex",alignItems:"center",paddingTop:50,flexDirection:"column",justifyContent:"flex-start",textAlign:"center",height:600}} >
            <Image width={300} height={300} src={page404} />
            <h1 style={{color:"#f7464c"}} >404 Page not found</h1>
        </div>
    )
}

export default NoPage