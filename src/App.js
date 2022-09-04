import './App.css';
import {useEffect, useState} from 'react';
import {db} from './firebase.js';
import {query} from "firebase/firestore";




function App() {
  const [blocos, setBlocos] = useState([]);
  const [repetidor, setRepetidor] = useState(0);
  const [ideiaGerada, setIdeiaGerada] = useState("gerando ideia...");
  
    
  function gerador(){
    let verboSelecionado = blocos[2].info.lista[Math.floor(Math.random() * blocos[2].info.lista.length)];
    let substantivoSelecionado = blocos[1].info.lista[Math.floor(Math.random() * blocos[1].info.lista.length)];
    let localSelecionado = blocos[0].info.lista[Math.floor(Math.random() * blocos[0].info.lista.length)];

    let ideia = (substantivoSelecionado + verboSelecionado + localSelecionado)
    
    return(ideia)
  }












  function salvarIdeia(gatilho){
    let nota = gatilho.target.value;
    let ideiasSalvas = db.collection("ideias-salvas"); 
    let q = query(ideiasSalvas.where("conteudo", "==", ideiaGerada));
    

    q.get()
    .then((querySnapshot) => {

      if(querySnapshot.empty === false){/**se ja foi salvo**/
        console.log("já foi salvo")

        querySnapshot.forEach((doc) => {
          let atualizador = {pontuação: doc.data().pontuação + parseInt(nota), avaliações: doc.data().avaliações + 1}
          ideiasSalvas.doc(doc.id).update({
            pontuação: atualizador.pontuação, 
            avaliações: atualizador.avaliações,
            media: (atualizador.pontuação) / (atualizador.avaliações)
          });
        });

      }else if(querySnapshot.empty === true){/**se não foi salvo**/
        console.log("ainda não foi salva")

        ideiasSalvas.add({
          conteudo: ideiaGerada,
          pontuação: parseInt(nota),
          avaliações: 1,
          media: parseInt(nota)
        })
      }

    })
    .catch((error) => {
      console.log("erro ao pegar os documentos no servidor: ", error);
    })

    
    let estrelas = document.getElementsByClassName("estrelas")
    
    for(let i= 0; i<estrelas.length; i++){
      estrelas[i].disabled = true;
    }
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
      let estrelas = document.getElementsByClassName("estrelas")
      for(let i= 0; i<estrelas.length; i++){
        estrelas[i].disabled = false;
        estrelas[i].checked = false;
      }
    }

  },[repetidor])
   

  return (
    <div className="App">
      <header>
        <h2 id="logo">ideias batidas</h2>
      </header>

      <div id="ideia">{ideiaGerada}</div>

      <form id="caixa-avaliação">
        <p>avalie essa ideia:</p>
        <div>
          <input className="estrelas" type="radio" name='nota' value="1" onClick={salvarIdeia}></input>
          <input className="estrelas" type="radio" name='nota' value="2" onClick={salvarIdeia}></input>
          <input className="estrelas" type="radio" name='nota' value="3" onClick={salvarIdeia}></input>
          <input className="estrelas" type="radio" name='nota' value="4" onClick={salvarIdeia}></input>
          <input className="estrelas" type="radio" name='nota' value="5" onClick={salvarIdeia}></input>
        </div>
      </form>
      
      <button className="botão-gerador" onClick={() => setRepetidor((repetidor) => repetidor + 1)} >gerar nova ideia</button>
      
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4248303869237438"
     crossorigin="anonymous"></script>
    </div>
  );
}

export default App;
