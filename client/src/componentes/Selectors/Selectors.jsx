import React, { Fragment } from 'react'
import Btnfilters from '../Btnfilters/Btnfilters'
import Genfilter from '../Btnfilters/Genfilter'
import SearchBar from './SearchBar'
import '../../Styles/_selectors.scss'

export default function Selectors() {
    return (
        <Fragment>
            <div className="selectors-container">
            <Genfilter />
            <Btnfilters />
            <SearchBar />
            </div>        
        </Fragment>
    )
}
