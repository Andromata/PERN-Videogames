import './App.css';

import {Route} from 'react-router-dom'
import {Fragment}from 'react'

//Componentes
import Home from './componentes/Home'
import Index from './componentes/Index'
import Description from './componentes/Description/Description'
import Post from './componentes/Post/Post'


function App() {
  return (
<Fragment>  
  <Route exact path='/'  component={Home}/>
  <Route path='/index' component={Index}/>
  <Route exact path='/addgame' component={Post}/>
  <Route exact path='/index/description/:id' component={Description}/>
 </Fragment>
   
    
  );
}

export default App;
