import './App.css';
import {useEffect, useState} from 'react';
import {db, storage, functions} from './firebase.js';


function App() {
  const [blocos, setBlocos] = useState([]);

  useEffect(()=>{
    db.collection('blocos').onSnapshot(snapshot =>{
      setBlocos(snapshot.docs.map(function(document){
        return {id:document.id, info:document.data()}

        
      })) 
    })
  },[]) 

  //console.log(blocos[0].info.lista[0]) aparentemente assim q se retira um item de uam das array
   

  return (
    <div className="App">
      <header>
        <h2>ideias batidas</h2>
        <br />
        
        <div>aqui deveriam estar as ideias</div>
      </header>
    </div>
  );
}

export default App;
