import {createStore, applyMiddleware, compose} from 'redux'
import {thunk} from 'redux-thunk';
import rootReducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)) //esta linea es para poder hacer peticiones al server
)

export default store; // Exportar store(tienda)