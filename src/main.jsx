import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { useLocation } from 'react-router-dom';
import { authenticateUser } from './workosService';

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "./styles/styles.scss";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';  
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css'

import './utils/styleVariables'; 

const SsoCallback = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    if (code) {
      authenticateUser(code).then((profile) => {
        setUser(profile);
      });
    }
  }, [location]);

  return (
    <div>
      {user ? <div>Welcome, {user.profile.first_name}!</div> : <div>Loading...</div>}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);



export default SsoCallback;

