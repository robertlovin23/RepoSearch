import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';

//Creates the redux stores. Passes in the Reducer's index file and reduxThunk middleware as argument
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Pass store to provider tag that is a wrapper for the React App
ReactDOM.render(
                  <Provider store={store}>
                    <App />
                  </Provider>,
document.getElementById('root'));
