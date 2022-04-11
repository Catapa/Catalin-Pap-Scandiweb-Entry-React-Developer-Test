import React from 'react';
import './App.css';
import styles from './styles.module.css';
import Header from "./Components/Header/Header";
import Heading from "./Components/Heading/Heading";

function App() {
  return (
      <>
          <Header/>
          <Heading text={'Category Name'}/>
      </>

  );
}

export default App;
