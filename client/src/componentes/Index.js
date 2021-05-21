import React, { Fragment, useEffect} from 'react'
import {Route, Link} from 'react-router-dom'
import NavBar from './NavBar/NavBar.js'
import axios from 'axios'
import '../Styles/index.scss'
import {addGame, loadingGame, addGenres, addPlatforms} from '../Redux/actions/action'
import { useDispatch, useSelector } from "react-redux"
import Catalogue from './Cards/Catalogue.jsx'
import Selectors from './Selectors/Selectors'
import LastRelease from './Release/LastRelease.jsx'

const Index = ()=>{
  const dispatch = useDispatch()
  
  useEffect(() => {
    const getVideogames = async ()=>{
      dispatch(loadingGame(true))
      const resp = await axios.get('http://localhost:3001/videogames')
      const respgenres = await axios.get('http://localhost:3001/genres')
      const respplatforms = await axios.get('http://localhost:3001/platforms')
      dispatch(addGenres(respgenres.data))
      dispatch(addPlatforms(respplatforms.data))
      dispatch(addGame(resp.data));
      dispatch(loadingGame(false))    
    }
    getVideogames()        
  },[]);
  
  const { loading, totalVg } = useSelector(store => store)  
    
return(
  <Fragment>

<div className='index'>
    
    <NavBar/>  
    <div className="addgame">
      <h4>Add Game</h4>
      <Link to="/addgame">
    <button>+</button>
    </Link>
    </div>
    <div className="selectors">
    <Selectors/>
    </div>
    <div className="index-body">
    <LastRelease />  
    <div className="cards">    
    <Route exact path='/index' render={() => (
    <Catalogue/>
  )}
/>
    </div>
    </div>

    </div>
  </Fragment>

)
}

export default Index;