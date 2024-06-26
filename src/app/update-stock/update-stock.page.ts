import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.page.html',
  styleUrls: ['./update-stock.page.scss'],
})
export class UpdateStockPage implements OnInit {
  public estoque: IEstoque = createIEstoque();
  public localUrl: string;

  constructor(
    private rotaAtiva: ActivatedRoute,
    private EstoqueServ: EstoqueService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    const id: string = this.rotaAtiva.snapshot.paramMap.get('id') || '0';
    console.log(id);
    firstValueFrom(this.EstoqueServ.getUpdate(id)).then((item) => {
      this.estoque = item;
      console.log('Estoque Edit', this.estoque);
    });
  }

  public async uparImagem() {
    try {
      const file = await this.pickFile();
      this.localUrl = URL.createObjectURL(file);
      if (file) {
        const storageRef = ref(getStorage(), `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.error('Upload failed', error);
          },
          () => {
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

  public atualizar() {
    console.log('Salvar', this.estoque);
    this.EstoqueServ.updateItem(this.estoque);
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
}
