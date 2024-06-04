import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { EstoqueService } from '../services/estoque.service';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';

@Component({
  selector: 'app-item-novo',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  public estoque: IEstoque = createIEstoque();
  constructor(
    private EstoqueServ: EstoqueService,
    private navCtrl: NavController
  ) {}
  public salvar() {
    if (
      this.estoque.nome &&
      this.estoque.marca &&
      this.estoque.tipo &&
      this.estoque.quantidade &&
      this.estoque.precoUnit &&
      this.estoque.estoqueMin
    ) {
      console.log('Salvar', this.estoque);
      this.EstoqueServ.add(this.estoque);
      this.navCtrl.navigateRoot('tabs/tab1');
    } else {
      console.log(
        'Não é possível salvar uma item vazio. Preencha todos os campos'
      );
    }
  }
  public async uparImagem() {
    const image = await this.getImage();

    if (!image) {
      return; // User cancelled or error
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.fileName}`);

      // Create a reference to the uploaded file in storage
      const uploadTask = uploadBytesResumable(storageRef, image.data);

      // Track upload progress (optional)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File uploaded successfully!', downloadURL);
              this.estoque.imagemUrl = downloadURL; // Update item with download URL
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        }
      );

      // Show a loading indicator while uploading (optional)
      // ...
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
}
