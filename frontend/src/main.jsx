import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom"
import { ProductProvider } from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <ChakraProvider>
    
  <ProductProvider>
    <App />
    </ProductProvider>
  </ChakraProvider>
    </BrowserRouter>

);
