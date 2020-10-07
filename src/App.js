import React from 'react';
import './App.css';
import Routes from './Routes'

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './redux/rootReducer';

const store = createStore(rootReducer)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Routes />
      </Provider>
    </div>  
  );
}

export default App;
