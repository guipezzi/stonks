import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';
import { NavController } from '@ionic/angular';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  itensEstoque: IEstoque[] = [];
  constructor(
    private EstoqueServ: EstoqueService,
    private navCtrl: NavController
  ) {}

  public listarItens() {
    this.EstoqueServ.getAll().subscribe((itensEstoque) => {
      this.itensEstoque = itensEstoque;
    });
    console.log(this.itensEstoque);
  }

  public deletar(id: string) {
    this.EstoqueServ.delete(id);
    this.listarItens();
  }

  public atualizar(id: string) {
    this.navCtrl.navigateRoot('tabs/tab2');
  }

  public incrementarQuantidade(id: string) {
    const item = this.itensEstoque.find((item) => item.id === id);
    item.quantidade = item.quantidade + 1;
    this.EstoqueServ.update(item);
  }

  public decrementarQuantidade(id: string) {
    const item = this.itensEstoque.find((item) => item.id === id);
    if (item.quantidade > 0) {
      item.quantidade = item.quantidade - 1;
    }
    this.EstoqueServ.update(item);
  }

  ionViewWillEnter() {
    this.listarItens();
  }
}
