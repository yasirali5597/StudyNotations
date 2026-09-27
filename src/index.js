import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux"
import {configureStore} from "@reduxjs/toolkit"
// import rootReducer from "./reducers";  // adjust path if needed 
import authReducer from "./slice/authSlice"
import profileReducer from "./slice/profileSlice"
import courseReducer from "./slice/courseSlice"
import cartReducer from "./slice/cartSlice"

// import { combineReducers } from "redux";



const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    // course:courseReducer
    course: courseReducer,
  },
});
console.log(profileReducer)


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
