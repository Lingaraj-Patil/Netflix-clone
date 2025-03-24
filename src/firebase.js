import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,getAuth, signOut } from 'firebase/auth';
import { addDoc,collection,getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyBNS7LIc455xYeDnopEoomXr1CBsM0Nb9o",
    authDomain: "netflix-clone-63ad2.firebaseapp.com",
    projectId: "netflix-clone-63ad2",
    storageBucket: "netflix-clone-63ad2.firebasestorage.app",
    messagingSenderId: "906302258418",
    appId: "1:906302258418:web:a4386c01a983b99b5de46b",
    measurementId: "G-09LHE6192C"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, 'user'),{
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email,password) => {
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth,db,login,signup,logout} ;