import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.page.html',
  styleUrls: ['./update-stock.page.scss'],
})
export class UpdateStockPage {
  public estoque: IEstoque = createIEstoque();
  constructor(
    private EstoqueServ: EstoqueService,
    private navCtrl: NavController
  ) {}
  public atualizar() {}
}
