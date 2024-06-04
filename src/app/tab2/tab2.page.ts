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

const storage = getStorage();
const metadata = {
  contentType: 'image/jpeg',
};

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
  public uparImagem() {}
}
