import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import './home.css'



const Home = () => {

    return (
        <Fragment>
            <div className='home'>
                <div className='container'>
                    <Link to="/index">                       
                        <button className='btn-home'>START</button>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}





export default Home;