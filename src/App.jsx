import React from 'react';
import './App.css';
import {useQuery} from "@apollo/client";
import {CATEGORY_NAMES} from "./Queries/queries";

function App() {
  const {loading, error, data} = useQuery(CATEGORY_NAMES);
  return (
   <p>
     {console.log(data.categories)}
     placeholder
   </p>
  );
}

export default App;
