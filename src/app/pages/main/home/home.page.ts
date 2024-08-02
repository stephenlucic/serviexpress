import { Component, OnInit, inject } from '@angular/core';
import { User } from 'firebase/auth';
import { Product } from 'src/app/models/product.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] =[];
  loading: boolean = false;

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getProducts();
    
  }

  // ======= Obtener los productos ========
  getProducts(){
    let path = `users/${this.user().uid}/products`;

    this.loading = true;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res:any) => {
        console.log(res);
        this.products = res;

        this.loading = false;

        sub.unsubscribe();
      }
    })

  }
 

  //========== Agregar o actualizar un producto ==========
 async addUpdateProduct(product?: Product){

  let success = await  this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    })

    if(success) this.getProducts();
  }


//========== Confirmar la eliminición del producto ==========
  async confirmDeleteProducts(product: Product) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Producto',
      message: '¿Quieres eliminar este producto?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteProduct(product)
          }
        }
      ]
    });
  
  }


    //========= Eliminar Producto ==========
    async deleteProduct(product:Product){
    

      let path = `users/${this.user().uid}/products/${product.id}`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let imagePath = await this.firebaseSvc.getFilePath(product.image);
      await this.firebaseSvc.deleteFile(imagePath);
      


      this.firebaseSvc.deleteDocument(path).then(async res =>{

        this.products = this.products.filter(p => p.id !== product.id);
       

        this.utilsSvc.presentToast({
          message: 'Producto eliminado exitosamente',
          duration: 1500,
          color: "success",
          position: "middle",
          icon: 'checkmark-circle-outline'
        })

        
      }).catch(error =>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: "primary",
          position: "middle",
          icon: 'alert-circle-outline'
        })

      }).finally(()=>{
        loading.dismiss();
      })

    
   
  }


  
}
