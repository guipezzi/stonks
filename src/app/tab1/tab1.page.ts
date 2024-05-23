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
  array: any[] = [];
  itensEstoque: any[] = [];
  constructor(private EstoqueServ: EstoqueService,
    private navCtrl: NavController) {
    
  }
  ionViewWillEnter(){
    this.itensEstoque = [...this.EstoqueServ.getAll()];
  }
}
