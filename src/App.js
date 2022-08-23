import './App.css';
import {useEffect, useState} from 'react';
import {db, storage, functions} from './firebase.js';


function App() {
  const [blocos, setBlocos] = useState([]);
  const [repetidor, setRepetidor] = useState(0);
  const [ideiaGerada, setIdeiaGerada] = useState("");


  function gerador(){
    let verboSelecionado = blocos[2].info.lista[Math.floor(Math.random() * blocos[0].info.lista.length)];
    let substantivo1Selecionado = blocos[1].info.lista[Math.floor(Math.random() * blocos[0].info.lista.length)];
    let substantivo2Selecionado = blocos[1].info.lista[Math.floor(Math.random() * blocos[0].info.lista.length)];
    let localSelecionado = blocos[0].info.lista[Math.floor(Math.random() * blocos[0].info.lista.length)];

    let ideia = (substantivo1Selecionado + verboSelecionado + substantivo2Selecionado + localSelecionado)
    
    return(ideia)
  }
  

  useEffect(()=>{
    db.collection('blocos').onSnapshot(snapshot =>{
      setBlocos(snapshot.docs.map(function(document){
        return {id:document.id, info:document.data()}
      }))
    })

    if(blocos.length === 0){
      console.log("repetidor agora esta em " + repetidor + " e o obj blocos está vazia")

      setTimeout(() => {
        setRepetidor((repetidor) => repetidor + 1);
      }, 100);

    }else{
      console.log("o repetidor agora esta em " + repetidor + " e é pra array dos blocos estar pronta, vê ai")
      
      setIdeiaGerada(gerador());
    }


  },[repetidor])
   

  return (
    <div className="App">
      <header>
        <h2>ideias batidas</h2>
      </header>

      <div id="ideia">{ideiaGerada}</div>
      <button className="botão-gerador" onClick={() => setRepetidor((repetidor) => repetidor + 1)} >gerar nova ideia</button>
      
      </div>
  );
}

export default App;
