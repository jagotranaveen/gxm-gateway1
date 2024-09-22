import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { useLocation } from 'react-router-dom';


import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "./styles/styles.scss";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';  
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css'

import './utils/styleVariables'; 



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);



export default SsoCallback;

