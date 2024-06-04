import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { Capacitor, Plugins } from '@capacitor/core';

const { Filesystem } = Plugins;

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
        'Não é possível salvar um item vazio. Preencha todos os campos'
      );
    }
  }

  public async uparImagem() {
    try {
      // Abrir o file picker
      const file = await this.pickFile();

      if (file) {
        // Fazer upload da imagem
        const storageRef = ref(getStorage(), `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Progress callback...
          },
          (error) => {
            // Error callback...
            console.error('Upload failed', error);
          },
          () => {
            // Complete callback...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              this.estoque.imageUrl = downloadURL;
            });
          }
        );
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  private async pickFile(): Promise<File | null> {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          resolve(file);
        } else {
          reject(null);
        }
      };
      input.click();
    });
  }
}
