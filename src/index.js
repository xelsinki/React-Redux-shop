/*  
index.js - Основной файл REACT

Koska muut tekemäni tiedostot sijaitsevat kansiossa node_modules,
importeissa ei tarvitse mainita koko polkua

DevTools Plugin:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
*/

import "./main.css";

// Importoidaan React & React-DOM
import React from "react";
import ReactDOM from "react-dom";

// REDUX - Store & Middleware
import { createStore, applyMiddleware } from "redux";
// Для удобного DEBUG
import { composeWithDevTools } from "redux-devtools-extension";

// Для асинхронных запросов
import thunk from "redux-thunk";

// Импортируем компоненты из React-Router & React-Redux
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";
import { Provider } from "react-redux";
import { Router, Route } from "react-router";

// Importoidaan Reduxin Reducers
import reducers from "reducers";

// Importoidaan konteinerit Layout, Phones, Phone
import Phones from 'containers/phones';
import Layout from 'containers/layout';
import Phone from 'containers/phone';
import Basket from 'containers/basket';



//Luodaan Reduxin Store
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const history = syncHistoryWithStore(browserHistory, store);

// Отрисовываем DOM в элементе root
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
  
      <Route component={Layout}>
        {/* Создаем пути - Routes  для Layout*/}
        <Route path="/" component={Phones} /> 
        <Route path='/categories/:id' component={Phones}/>
        <Route path='/basket' component={Basket}/>      
      </Route>
      {/* Route для отдельной страницы Phone  */}
      <Route path='/phones/:id' component={Phone} />
    </Router>
  </Provider>,
  document.getElementById("root")
);


