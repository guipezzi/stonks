import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.page.html',
  styleUrls: ['./update-stock.page.scss'],
})
export class UpdateStockPage implements OnInit {
  public estoque: IEstoque = createIEstoque();

  constructor(
    private rotaAtiva: ActivatedRoute,
    private EstoqueServ: EstoqueService,
    private navCtrl: NavController
  ) {}
  ngOnInit(): void {
    const id: string = this.rotaAtiva.snapshot.paramMap.get('id') || '0';
    console.log(id);
    this.EstoqueServ.getUpdate(id).subscribe((estoque) => {
      this.estoque = estoque;
    });
    console.log('Estoque Edit', this.estoque);
  }

  public atualizar() {
    if (
      this.estoque.nome &&
      this.estoque.marca &&
      this.estoque.tipo &&
      this.estoque.quantidade &&
      this.estoque.precoUnit &&
      this.estoque.estoqueMin
    ) {
      console.log('Salvar', this.estoque);
      this.EstoqueServ.updateItem(this.estoque);
      this.navCtrl.navigateRoot('/tabs/tab1');
    } else {
      console.log('Não é possível salvar uma item vazio');
    }
  }
}
