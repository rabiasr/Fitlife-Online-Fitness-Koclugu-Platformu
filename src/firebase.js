import { initializeApp } from "firebase/app";
import toast from "react-hot-toast";
import { getAuth, createUserWithEmailAndPassword, updatePassword, sendEmailVerification, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import store from "./store"
import { giris as girisHandle, cikis as cikisHandle } from "./store/auth"
import { collection, query, where, getDocs, getFirestore, addDoc,doc, setDoc, updateDoc } from "firebase/firestore";

import { setDbstore } from "./store/db";

const firebaseConfig = {
    apiKey: "apikey",
    authDomain: "authdomain",
    projectId: "projectid",
    storageBucket: "storagebucket",
    messagingSenderId: "messagingsenderid",
    appId: "appid"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)

export const kayit = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        toast.error(error.message)
    }

}

export const giris = async (email, password) => {

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        toast.error(error.message)
    }

}

export const cikis = async () => {

    try {
        await signOut(auth)
        return true
    } catch (error) {
        toast.error(error.message)
    }

}

export const guncelle = async data => {
    try {
        await updateProfile(auth.currentUser, data)
        toast.success("Profil guncellendi")
        return true
    } catch (error) {
        toast.error(error.message)
    }

}
export const dogrula = async () => {
    try {
        await sendEmailVerification(auth.currentUser)
        toast.success(`Doğrulama maili ${auth.currentUser.email} adresine gönderildi`)
    } catch (error) {
        toast.error(error.message)
    }
}

export const sifreGuncelle = async password => {
    try {
        await updatePassword(auth.currentUser, password)
        toast.success("Parola guncellendi")
        return true
    } catch (error) {
        toast.error(error.message)
    }

}

onAuthStateChanged(auth, (user) => {
    if (user) {


        store.dispatch(girisHandle({
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            uid: user.uid
        }))
    }
    else {
        store.dispatch(cikisHandle(user))
    }
})

export const kayitEkle = async data => {
    const sonuc = await addDoc(collection(db, "kullanicilar"), data)
    if (sonuc) {
        toast.success("Kayıt başarıyla eklendi")
    } else {
        toast.error("Kayıt eklenemedi")
    }
}

export const danisankayitEkle = async data => {
    const sonuc = await addDoc(collection(db, "danisanlar"), data)
    if (sonuc) {
        toast.success("Kayıt başarıyla eklendi")
    } else {
        toast.error("Kayıt eklenemedi")
    }
}

export const antrenorkayitEkle = async data => {
    const sonuc = await addDoc(collection(db, "antrenorler"), data)
    if (sonuc) {
        toast.success("Kayıt başarıyla eklendi")
    } else {
        toast.error("Kayıt eklenemedi")
    }
}

export const veriGuncelle =async (tablo,uid,input,deger)=>{
    const veriRef = doc(db, `${tablo}`, `${uid}`);
 
    await updateDoc(veriRef, {
        [input ]: deger
    });
    

   

}


export const veriAl = async (tablo, uid) => {

    const q = query(collection(db, `${tablo}`), where("uid", "==", uid));
    let rol
    const querySnapshot = await getDocs(q);
    const veri =querySnapshot.docs.map(doc => doc.data());
        return veri;



};

export const veriAlrol= async (tablo, uid) => {
 
    const q = query(collection(db, `${tablo}`), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    let rol =""
    const veri=querySnapshot.docs.map(doc => doc.data(
     
   ));
   veri.forEach(item => {
    
    rol = item.rol;
    console.log("Rol:", rol);
  
   })
     return rol;
};



export const getDocumentByUid = async (tablo, uid) => {
    const q = query(collection(db, `${tablo}`), where("uid", "==", uid));
  const belgeSnapshot = await getDocs(q);
   let docid
  belgeSnapshot.forEach((doc) => {
      docid=doc.id
    console.log('Belge ID:', doc.id, 'Data:', doc.data());
     
  });
  return docid
};


export const getDocumentByUidk = async (tablo, uid) => {
    const q = query(collection(db, `${tablo}`), where("uid", "==", uid));
  const belgeSnapshot = await getDocs(q);
   let docid
  belgeSnapshot.forEach((doc) => {
      docid=doc.id
    console.log('Belge ID:', doc.id, 'Data:', doc.data());
     
  });
  return docid
};
 




export default app