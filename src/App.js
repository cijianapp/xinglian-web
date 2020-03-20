import React from "react";
import "./App.css";
import ReactModal from "react-modal";

import Header from "./components/header";
import Main from "./components/main";
import { SvgMask } from "./components/collections";

function App() {
  ReactModal.setAppElement("#root");

  return (
    <div className="App">
      <SvgMask></SvgMask>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
