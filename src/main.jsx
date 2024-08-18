// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import store from './store/store.js'
// import { Provider } from 'react-redux'
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { Toaster } from "./components/ui/sonner.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);