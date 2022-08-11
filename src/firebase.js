import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDpUdDDbus_pcfacExbxSP0mrVU30nwlro",
    authDomain: "ideias-batidas.firebaseapp.com",
    projectId: "ideias-batidas",
    storageBucket: "ideias-batidas.appspot.com",
    messagingSenderId: "446783364347",
    appId: "1:446783364347:web:49e6ea112de0535a91245e",
    measurementId: "G-CXCCL3JDK1"
});

const db = firebase.firestore();
const storage = firebase.storage();
const functions = firebase.functions();

export{db, storage, functions};
