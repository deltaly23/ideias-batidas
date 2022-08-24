import './App.css';
import {useEffect, useState} from 'react';
import {db, storage, functions} from './firebase.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";



function App() {
  const [blocos, setBlocos] = useState([]);
  const [repetidor, setRepetidor] = useState(0);
  const [ideiaGerada, setIdeiaGerada] = useState("gerando ideia...");
  

  function gerador(){
    let verboSelecionado = blocos[2].info.lista[Math.floor(Math.random() * blocos[2].info.lista.length)];
    let substantivo1Selecionado = blocos[1].info.lista[Math.floor(Math.random() * blocos[1].info.lista.length)];
    let substantivo2Selecionado = blocos[1].info.lista[Math.floor(Math.random() * blocos[1].info.lista.length)];
    let localSelecionado = blocos[0].info.lista[Math.floor(Math.random() * blocos[0].info.lista.length)];

    let ideia = (substantivo1Selecionado + verboSelecionado + localSelecionado)
    
    return(ideia)
  }

  function salvarIdeia(){
    let ideiasSalvas = db.collection("ideias-salvas");
    let q = query(ideiasSalvas.where("conteudo", "==", ideiaGerada));

    q.get()
    .then((querySnapshot) => {
      if(querySnapshot.empty == false){
        console.log("ja foi salvo")

        /**querySnapshot.forEach((doc) => {
          console.log("conteudo: ", doc.data().conteudo,"pontuação: ", doc.data().pontuação);
        });**/

      }else if(querySnapshot.empty == true){
        console.log("ainda não foi salva")







      }

      
    })
    .catch((error) => {
        console.log("erro ao pegar os documentos no servidor: ", error);
    })
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
      }, 200);

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



      <form>
        <p>avalie essa ideia:</p>
        <input className="estrelas" type="radio" name='nota' value="1" onChange={salvarIdeia}></input>
        <input className="estrelas" type="radio" name='nota' value="2" onChange={salvarIdeia}></input>
        <input className="estrelas" type="radio" name='nota' value="3" onChange={salvarIdeia}></input>
        <input className="estrelas" type="radio" name='nota' value="4" onChange={salvarIdeia}></input>
        <input className="estrelas" type="radio" name='nota' value="5" onChange={salvarIdeia}></input>
      </form>
      <button className="botão-gerador" onClick={() => setRepetidor((repetidor) => repetidor + 1)} >gerar nova ideia</button>
      
      </div>
  );
}

export default App;
