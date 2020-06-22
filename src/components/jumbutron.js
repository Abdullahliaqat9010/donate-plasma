import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import mobile_cover from '../assets/mobile.svg'
import desktop_cover from '../assets/desktop.svg'
import Loading from '../components/loading'

const StyledJumbotron = () => {
    const [loading,setLoading] = React.useState(true)
    
    return(
        <React.Fragment>
            {loading && <Loading/>}
            <Jumbotron style={{backgroundColor : "white", margin:-15,display:"flex",alignItems:"center",justifyContent:"center"}} fluid>
                <Image onLoad={()=>setLoading(false)} src={window.innerWidth > 500 ? desktop_cover : mobile_cover} fluid />
            </Jumbotron>
        </React.Fragment>
    )
}

export default StyledJumbotron