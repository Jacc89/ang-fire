import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-fire';

  userData!: Observable<any>;
  constructor(private firestore:Firestore){
    this.getData();
  }
// add
  addData(f:any){
   console.log(f.value); 
   const collectionInstance = collection(this.firestore, 'users');
   addDoc(collectionInstance, f.value)
    .then(() => {
    console.log('Data saved successfully');
   })
   .catch((err)=> {
    console.log(err);
   })
  }

  // get
  getData(){
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField:'id' })
    .subscribe(val =>{
      console.log(val);
    })
    this.userData = collectionData(collectionInstance, { idField:'id' });
  }

  // update
  updateData(id:string){
    const docInstance = doc(this.firestore, 'users', id);
    const updateData={
      nombre: 'nombre',
      apellidos:'apellido',
      direccion:'direccion',
      telefono: 'telefono'
    }

    updateDoc(docInstance, updateData)
    .then(()=>{
      console.log('Data Update');
    }).catch((err)=>{
      console.log(err);
    })

  }
  // delete
  deleteData(id:string){
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance)
    .then(()=>{
      console.log('Data Delete');
    })
    .catch((err)=>{
      console.log(err);
    })
  }



}
