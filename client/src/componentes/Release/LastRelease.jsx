import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import '../../Styles/_lastrelease.scss'
export default function LastRelease() {
    const [lastreleased, setLast] = useState([])
    const loading = useSelector(store => store.loading)

    useEffect(() => {
    const getLastReleased = async () => {
        const resp = await axios.get('http://localhost:3001/videogames/released')
        setLast(resp.data.results)
    }
    getLastReleased()
    }, [])

    if(lastreleased.length < 1){
        return (
            <div className="loading">
                loading
            </div>
        )
    } else {

        return (
            <div className="release-container">
                <div className="release-header">
                <h3>What's new!</h3>
                </div>
                <div className="release-body">
        {lastreleased.map((element) => {
            return(
                <div className="relasedgamecontainer" key={element.id}>
                    <div className="realeasedimg">
                        <img src={element.background_image} alt={element.slug} style={{width: "100%"}}/> 
                        <p>{element.name}</p> 
                       
                    </div>
                </div>
            )
        })}
                </div>            
            </div>
        )
    }
}
