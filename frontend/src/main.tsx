import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import StoreProvider from "./redux/store/StoreProvider.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <StoreProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </StoreProvider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
