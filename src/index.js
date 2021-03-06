import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import'jquery/dist/jquery.slim'
import 'popper.js/dist/umd/popper'
import 'bootstrap/dist/js/bootstrap'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/store'
import {BrowserRouter} from 'react-router-dom'
ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

