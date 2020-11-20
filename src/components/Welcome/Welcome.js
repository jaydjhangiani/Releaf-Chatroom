import React from 'react'
import './Welcome.css'
import logo from '../../img/releaf.jpg'
import { selectSidebar } from '../../features/sidebarSlice'
import { useSelector } from "react-redux";

function Welcome() {
    const sidebarShow = useSelector(selectSidebar)

    return (
        <div className={`welcome ${sidebarShow === true && "welcome__hide"}`}>
            <div className = "welcome__logo"> 
                <h1>Welcome to the Releaf Chat Room</h1>
                <img src={logo} alt="Welcome to Releaf"/>
            </div>
            <div className = "welcome__text">
            <h3>Through releaf, we wish to encourage the people around us to not neglect their mental health. We wish to put equal emphasis on mental and physical well-being as we believe one is just as important as the other in this tumultuous journey of life.</h3>
            </div>
        </div>
    )
}

export default Welcome
