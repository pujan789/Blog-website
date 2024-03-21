import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {disableReactDevTools} from "@fvilers/disable-react-devtools"
import {Route, Routes} from 'react-router-dom';

if (process.env.NODE_ENV === "production"){
  disableReactDevTools()
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>)