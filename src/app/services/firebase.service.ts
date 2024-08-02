import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData,query, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage,uploadString,ref,getDownloadURL, deleteObject } from 'firebase/storage';



@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject( AngularFirestore );
  storage = inject( AngularFireStorage);
  utilSvc = inject(UtilsService);

  // ==================== Autenticación ====================
  getAuth(){
    return getAuth();
  }

  //=========== Acceder ==============
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //=========== Crear Usuario ==============
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //=========== Actualizar Usuario ==========
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser,{displayName});
  }

  //======= Enviar email para restablecer contraseña =========
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(),email);
  }

  // ======= Cerrar sesión =========
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilSvc.routerLink('/auth');
  }

//========== Base de datos =============

//========== Obtener documentos de una colección =========
getCollectionData(path: string, collectionQuery?: any){
  const ref = collection(getFirestore(),path);
  return collectionData(query(ref, collectionQuery),{idField: 'id'})
  
}

//========= Setear un Documento ==========
setDocument(path: string, data: any){
  return setDoc(doc(getFirestore(),path),data);
}

//========= Actualizar un Documento ==========
updateDocument(path: string, data: any){
  return updateDoc(doc(getFirestore(),path),data);
}

//========= Eliminar un Documento ==========
deleteDocument(path: string){
  return deleteDoc(doc(getFirestore(),path));
}

//========= Obtener un documento ========
async getDocument(path:string){
  return (await getDoc(doc(getFirestore(),path))).data();
}

//========= Agregar Documento ===========
addDocument(path: string, data: any){
  return addDoc(collection(getFirestore(),path),data);
}

//=========== Almacenamiento ============

//========== Subir Imagen =============
async uploadImage(path: string, dataUrl: string){
  return uploadString(ref(getStorage(),path),dataUrl,'data_url').then(()=>{
    return getDownloadURL(ref(getStorage(),path))
  })

}

//======== Obtener ruta de la imagen con su url ===========
async getFilePath(url: string){
  return ref(getStorage(),url).fullPath

}

// ======== Eliminar archivo ===========
deleteFile(path: string){
  return deleteObject(ref(getStorage(),path));
}

//========Realtime Database============


}
