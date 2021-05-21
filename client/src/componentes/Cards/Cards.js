//REACT-REDUX
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//ACTIONS
import { clearSearch, loadingGame } from '../../Redux/actions/action'

//COMPONENT
import Card from './Card'
import '../../Styles/cards.scss'
import Pagination from '../Pagination/Pagination'
import { filters } from '../Btnfilters/Filters'

const Cards = ({cards}) => {

  const dispatch = useDispatch()
  //STORE
  const loading = useSelector(store => store.loading)
  const videogamesPerPage = useSelector(store => store.videogamesPerPage)
  const currentPage = useSelector(store=> store.currentPage)
  const filtersState = useSelector((store) => store.filters)
  
  //VARIABLES INTERNAS
  const filteredGames =  filters(cards, filtersState)
  const IndiceUltimoJuego = currentPage * videogamesPerPage
  const IndicePrimerJuego = IndiceUltimoJuego - videogamesPerPage
  const currentGames = filteredGames.slice(IndicePrimerJuego, IndiceUltimoJuego)

  //REFRESH ESTADO
  const allGames = () => {
    dispatch(loadingGame(true));
    dispatch(clearSearch([]));
    dispatch(loadingGame(false));    
  }

  useEffect (() => {
  }, [filteredGames, filtersState])

  if (loading) {
    return <div className="lds-hourglass"></div>
  } else {
    return (
      <Fragment>
        {currentGames.map((juego, index) => {
          return (
            <Card key={index} juego={juego} />
          )
        })}

        <Pagination cardsPerPage={videogamesPerPage} totalCards={filteredGames.length} />
      </Fragment>
    )
  }  

}

export default Cards;