import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../services/estoque.service';
import { IEstoque } from 'src/models/estoque.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  totalItensEstoque$: Observable<number>;
  totalTiposItens$: Observable<number>;
  mediaPrecoProdutos$: Observable<number>;
  itensReposicao$: Observable<IEstoque[]>;

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit() {
    this.calcularEstatisticas();
  }

  calcularEstatisticas() {
    const itensEstoque$ = this.estoqueService.getAll();

    // Calcular total de itens em estoque
    this.totalItensEstoque$ = itensEstoque$.pipe(
      map((itens) => itens.reduce((acc, item) => acc + item.quantidade, 0))
    );

    // Calcular total de tipos de itens
    this.totalTiposItens$ = itensEstoque$.pipe(map((itens) => itens.length));

    // Calcular média de preço dos produtos
    this.mediaPrecoProdutos$ = itensEstoque$.pipe(
      map((itens) => {
        const totalPrecoProdutos = itens.reduce(
          (acc, item) => acc + item.precoUnit,
          0
        );
        return totalPrecoProdutos / itens.length;
      })
    );

    // Encontrar itens que precisam de reposição
    this.itensReposicao$ = itensEstoque$.pipe(
      map((itens) => itens.filter((item) => item.quantidade < item.estoqueMin))
    );
  }
}
