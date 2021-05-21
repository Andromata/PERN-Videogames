import {applyMiddleware, createStore} from 'redux';
import reducer from './Redux/reducer/reducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// const reduxChrome = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;